<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="dialogFormVisible = true"
            >新建</el-button>

            <el-input size="mini" v-model="searchInput" placeholder="请输入订阅租户" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            size="small"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            @row-click="handleRowClick"
            row-key="id"
            :expand-row-keys="expandRowKeys"
          >
            <el-table-column type="selection" ></el-table-column>
            <el-table-column label="订阅租户" align="center" fixed="left">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <!-- <el-table-column label="被订阅服务"  align="center">
              <template slot-scope="scope">
                <span>XXX服务</span>
              </template>
            </el-table-column>-->
            <el-table-column align="center" prop="created_at" label="订阅时间">
              <template slot-scope="scope">
                <span>{{ scope.row.onlineTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="订阅结束时间">
              <template slot-scope="scope">
                <span>{{ scope.row.onlineTime }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div class="table-operator">
                  <el-dropdown split-button size="medium">
                    <router-link
                      :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/tenant/'+scope.row.id}"
                      class="link"
                    >查看</router-link>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>
                        <el-button
                          type="text"
                          size="small"
                          @click="dialogFormVisibleoutline=true"
                        >停止</el-button>
                        <el-button type="text" size="small" @click="dialogFormVisibledelete=true">删除</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
            </div>-->
            <el-table-column label="操作" width="130" align="center">
              <template slot-scope="scope">
                <el-link type="primary" @click="dialogFormVisibleoutline=true" class="link">停止</el-link>
                <el-link class="link" type="danger" @click="dialogFormVisibledelete=true">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>
    <el-dialog title="警告信息" :visible.sync="dialogFormVisibleoutline">
      <el-form ref="form" :model="form">
        <el-form-item label="是否删除云资源：">
          <div>
            <div>
              <el-radio v-model="radiodeleteCS" label="1">是</el-radio>
              <el-radio v-model="radiodeleteCS" label="2">否</el-radio>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="是否删除云服务SKU：">
          <div>
            <el-radio v-model="radiodeleteSKU" label="1">是</el-radio>
            <el-radio v-model="radiodeleteSKU" label="2">否</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="是否删除订阅信息：">
          <div>
            <el-radio v-model="radiodeleteSM" label="1">是</el-radio>
            <el-radio v-model="radiodeleteSM" label="2">否</el-radio>
          </div>
        </el-form-item>
        <el-progress v-if="isDelete==true" :percentage="percentage"></el-progress>
        <h4 v-if="guanbi==true" style="color:red">停止成功，{{countA}}秒后关闭</h4>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDelete=true;increase()" size="small">执行</el-button>
        <el-button @click="dialogFormVisibleoutline = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="警告信息" :visible.sync="dialogFormVisibledelete">
      <el-form ref="form" :model="form">
        <el-form-item label="是否删除该服务："></el-form-item>
        <el-progress v-if="isDelete==true" :percentage="percentage"></el-progress>
        <h4 v-if="guanbi==true" style="color:red">删除成功，{{countA}}秒后关闭</h4>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDelete=true;increase()" size="small">执行</el-button>
        <el-button @click="dialogFormVisibledelete = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建云服务" :visible.sync="dialogFormVisible">
      <el-steps :active="active" finish-status="success">
        <el-step title="填写信息"></el-step>
        <el-step title="认证"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <div v-if="active==0">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.namespace"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="form.namespace"></el-input>
          </el-form-item>
          <el-form-item label="访问路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="是否私有">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="next()">下一步</el-button>
          <el-button type="primary" @click="dialogFormVisible = false;over()" size="small">创建</el-button>
          <el-button @click="dialogFormVisible = false;active=0" size="small">取 消</el-button>
        </div>
      </div>
      <div v-if="active==1">
        <el-form ref="form" :model="form">
          <el-form-item label="认证方式：">
            <div>
              <el-radio v-model="radioattestation" label="1">本地认证</el-radio>
              <el-radio v-model="radioattestation" label="2">远程认证</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="远程认证信息：">
            <div>
              信息1：XXX
              信息2：XXX
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="last()" size="small">上一步</el-button>
          <el-button type="primary" @click="dialogFormVisible = false;over()" size="small">创建</el-button>
          <el-button @click="dialogFormVisible = false;active=0" size="small">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Servelist } from "@/api/table";
import { requestParams, parseHash } from '@/utils/urlParam';
import Pagination from "@/components/pagination";
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
      list: [],
      listLoading: true,
      searchInput: "",
      expandRowKeys: [],
      search: { page: 1, rows: 10 }, // 搜索参数
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      metadata: undefined,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: "",
      radiodeleteCS: "",
      radiodeleteSKU: "",
      radiodeleteSM: "",
      customColor: "#409eff",
      category: "个人",
      numberSKU: 20,
      privatelyOwned: "YES",
      form: {
        name: "",
        namespace: "",
        onlineTime: "",
        expireTIme: "",
        url: "",
        value1: "",
        value2: ""
      }
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
    
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(Servelist, this.search);
        this.list = res.data.items;
        // console.log(res);
        this.metadata = res.metadata;
        this.listLoading = false;
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      let index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleClick(row) {
      console.log(row);
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },
    increase() {
      let count = setInterval(() => {
        this.percentage++;
        if (this.percentage == 100) {
          this.percentage = 0;
          this.isDelete = false;
          this.guanbi = true;
          clearInterval(count);
          this.close();
        }
      }, 100);
    },
    close() {
      let counta = setInterval(() => {
        this.countA--;
        if (this.countA == 0) {
          clearInterval(counta);
          this.guanbi = true;
          this.dialogFormVisibleoutline = false;
          this.dialogFormVisibledelete = fasle;
          this.countA = 5;
        }
      }, 1000);
    },
    online() {
      this.$confirm("此操作将上线该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "上线成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消上线"
          });
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    last() {
      if (this.active-- < 0) this.active = 0;
    },
    over() {
      this.active = 3;
      let o = setTimeout(() => {
        this.active = 0;
      }, 1000);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../rewrite.scss";
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
  width: 100%;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
