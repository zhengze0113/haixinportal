<template>
  <div>
    <el-row :gutter="20" class="primaryBackground">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="padding:10px;">
          <el-col :span="3" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button
                :disabled="result"
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="showAdd()"
              >添加分类</el-button>
            </div>
          </el-col>
          <el-table
            v-loading="listLoading"
            :data="list"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
          >
            <el-table-column label="名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="说明" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.description}}</span>
              </template>
            </el-table-column>
            <el-table-column label="排序" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button
                  @click="sortTop(scope.row,scope);"
                  type="primary"
                  :disabled="scope.row.sort==1"
                >
                  <i class="el-icon-top"></i>
                </el-button>
                <el-button
                  class="down"
                  type="primary"
                  @click="sortDown(scope.row,scope);"
                  :disabled="scope.$index== list.length-1"
                >
                  <i class="el-icon-bottom"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  class="link"
                  @click="updatecloudServiceCatalog(scope.row)"
                >编辑</el-link>
                <el-link
                  type="danger"
                  class="link"
                  @click.stop="deletedcloudServiceCatalog(scope.row.id)"
                >删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- <pagination :metadata="metadata" :table-change="tableChange" /> -->
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="新建云服务目录">
      <el-row>
        <el-col>
          <div>
            <el-form ref="contents" :model="contents" label-width="80px">
              <el-form-item label="名称" prop="name">
                <el-input v-model="contents.name" />
              </el-form-item>
              <el-form-item label="说明" prop="description">
                <el-input v-model="contents.description" />
              </el-form-item>
              <!-- <el-form-item label="排序">
                <el-input v-model="contents.sort"/>
              </el-form-item>
              -->
            </el-form>
            <div slot="footer" class="dialog-footer" style="float:right;margin-top:20px;">
              <el-button size="mini" type="primary" @click="dialogFormVisible = false">取 消</el-button>
              <el-button size="mini" type="primary" @click="createdcloudServiceCatalogs();">确认</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="organizationShow" title="编辑云服务目录">
      <el-form ref="content" :model="content" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="content.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="content.description" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editServiceCatalog()">确认</el-button>
        <el-button @click="organizationShow = false; active=0">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { requestParams, parseHash } from "@/utils/urlParam";
import Pagination from "@/components/pagination";
import {
  Servicecatalog,
  deleteServicecatalog,
  addServicecatalog,
  updateServicecatalog,
  cloudproduct
} from "@/api/serviceOperatingcms";

export default {
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      result: false,
      dialogFormVisible: false,
      searchInput: "",
      value: "",
      expandRowKeys: [],
      listchild: [],
      search: {
        page: 1,
        rows: 10,
      },
      disable: false,
      disa: false,
      list: [],
      list1: [],
      listcms: [],
      selectRow: null,
      // metadata: undefined,
      // metadataSelect: undefined,
      disabled: "true",
      listLoading: true,
      organizationShow: false,
      contents: {
        tags: "",
        id: "",
        name: "",
        parentId: 0,
        description: "",
        sort: 0
      },
      content: {
        tags: "",
        id: "",
        name: "",
        parentId: 0,
        description: "",
        sort: 0
      },
      seach: { parentId: 0 },
      nowsort: 0,
      topsort: 0,
      downsort: 0,
      seachcloud: { servicecatalog_id: 0 }
    };
  },
  created() {
    this.fetchData();

  },
  methods: {
    // async fetch() {
    //   const  rcloud= await requestParams(cloudproduct);
    // },
    showAdd() {
      this.dialogFormVisible = true;
      this.contents= {
        tags: "",
        id: "",
        name: "",
        parentId: 0,
        description: "",
        sort: 0
      }
    },
    async fetchData() {
      this.listLoading = true;

      const res = await requestParams(Servicecatalog);
      this.list = res;
      for (var i = 0; i < this.list.length; i++) {
        this.nowsort = this.list[i].sort;
      }
      this.listLoading = false;
    },
    // 修改云服务目录
    updatecloudServiceCatalog(row) {
      this.content = JSON.parse(JSON.stringify(row));
      this.organizationShow = true;
    },
    editServiceCatalog() {
      var data = {
        description: this.content.description,
        // icon: this.content.icon,
        name: this.content.name,
        tags: this.content.tags,
        sort: this.content.sort
      };
      updateServicecatalog(this.content.id, data).then(r => {
        if (r.id != "") {
          this.$notify({
            message: "修改成功",
            type: "success"
          });
          this.organizationShow = false;
          this.fetchData();
        } else {
          this.$notify({
            message: "修改失败，请重试",
            type: "warning"
          });
        }
      });
    },
    // 删除云服务目录
    async deletedcloudServiceCatalog(id) {
      this.seachcloud.servicecatalog_id = id;
      const rcloud = await requestParams(cloudproduct, this.seachcloud);
      if (rcloud.length == 0) {
        this.$confirm("此操作将永久删除该服务目录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteServicecatalog(id).then(r => {
              if (r.id != "") {
                this.fetchData();
                this.$notify({
                  type: "success",
                  message: "删除成功!"
                });
              }
            });
          })
          .catch(() => {
            this.$notify({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$notify({
          type: "info",
          message: "请先修改云产品中的服务目录"
        });
      }
    },
    // 创建服务目录
    createdcloudServiceCatalogs() {
      this.contents.parentId = 0;
      this.contents.sort = this.nowsort + 1;
      addServicecatalog(this.contents).then(r => {
        if (r.id != "") {
          // this.$message('创建云服务目录成功');
          this.dialogFormVisible = false;
          this.fetchData();
          this.$notify({
            type: "success",
            message: "创建云服务目录成功"
          });
        } else {
          // this.$message('创建云服务目录失败');
          this.$notify({
            type: "info",
            message: "创建云服务目录失败"
          });
        }
        this.isFather = false;
      });
    },

    // 上移方法
    async sortTop(row, scope) {
      // 1.获取上一个值进行下移
      // var cs = {
      //   sort: row.sort - 1,
      //   parentId: 0
      // };
      var atop = scope.$index;
      this.list[atop - 1].sort = this.list[atop - 1].sort + 1;
      // rgoUp[0].sort = row.sort;
      // const rt = await requestParams(updateServicecatalog,this.list[a-1].id,this.list[a-1]);
      row.sort = row.sort - 1;
      updateServicecatalog(this.list[atop - 1].id, this.list[atop - 1]).then(
        rt => {
          // console.log(rt);
        }
      );
      // 当前值进行向上位移
      updateServicecatalog(row.id, row).then(rb => {
        // console.log(rb);
      });
      this.fetchData();
    },
    // 下移方法
    async sortDown(row, scope) {
      // 1.获取下一个值进行上移
      var bot = scope.$index;
      this.list[bot + 1].sort = this.list[bot + 1].sort - 1;
      updateServicecatalog(this.list[bot + 1].id, this.list[bot + 1]).then(
        rd => {
          //console.log(rd);
        }
      );
      // var cs = {
      //   sort: row.sort + 1,
      //   parentId: 0
      // };
      // const rdownShift = await requestParams(Servicecatalog, cs);
      // rdownShift[0].sort = row.sort;
      // console.log(rdownShift);
      // updateServicecatalog(rdownShift[0].id, rdownShift[0]).then(rd => {
      //   console.log(rd);
      // });
      // 当前值进行向下位移
      row.sort = row.sort + 1;
      updateServicecatalog(row.id, row).then(rd => {
        //console.log(rd);
      });
      this.fetchData();
    },
    createServiceCatalog() {
      this.$refs["contents"].resetFields();
      this.dialogFormVisible = true;
    },
    createdcloudServiceCatalog(data) {
      this.dialogFormVisible = true;
    },
    selctPage(msg) {
      this.search.page = msg;
      this.initSelect();
    },

    handleRowClick(row, column, event) {
      // if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      // const index = this.expandRowKeys.indexOf(row.id);
      // if (index == -1) {
      //   this.expandRowKeys.push(row.id);
      // } else {
      //   this.expandRowKeys.splice(index, 1);
      // }
    },
    handleSelectionChange(val) {
      this.selectRow = val;
      if (val.length > 0) this.disabled = false;
      else {
        this.disabled = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../rewrite.scss";
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
@media screen and (max-width: 1024px) {
  /deep/ .el-select[data-v-2c47a19b] {
    width: 430px !important;
  }
}
/deep/ .el-input {
  font-size: 12px;
}
.primaryBackground {
  background: #ffffff;
  margin: 0px 10px !important;
}
.el-form-item[data-v-2c47a19b][data-v-2c47a19b] {
  margin-bottom: 20px;
}
/deep/.el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.el-textarea__inner {
  width: 93%;
}
.strong {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}

.icon-wrap {
  float: left;
  background: #00609e;
  border-radius: 40px;
  width: 60px;
  height: 60px;
  text-align: center;
  padding-top: 15px;
  margin-right: 10px;
  .icon {
    width: 30px;
    height: 30px;
  }
}
.txt-wrap {
  display: inline-block;
  margin-top: 10px;
  .main-txt {
    font-weight: bold;
  }
  .sub-txt {
    margin-top: 8px;
  }
}
.el-select {
  width: 200px;
  height: 32px;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  //margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
