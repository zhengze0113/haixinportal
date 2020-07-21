<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="dialogFormVisible=true"
            >添加规格</el-button>
            <el-input v-model="searchInput" size="mini" placeholder="请输入内容" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            :data="li"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
          >
            <el-table-column label="名称" align="center" fixed="left">
              <template slot-scope="scope">
                <!--<router-link
                  :to="{path: '/operatingCentre/tenementManage/tenementOrganization/detail/user/'+scope.row.id}"
                  class="link"
                ></router-link>-->
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="参数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.paramKey }}</span>
              </template>
            </el-table-column>
            <el-table-column label="值" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.paramValue }}</template>
            </el-table-column>
            <el-table-column label="是否可编辑" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.editable }}</span>
              </template>
            </el-table-column>
            <el-table-column label="标签" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tags }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140" align="center">
              <template slot-scope="scope">
                <el-link class="link" type="primary" @click="editskus(scope.row)">编辑</el-link>
                <el-link class="link" type="danger" @click="deletedspace(scope.row)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <!-- <pagination :tableChange="tableChange" /> -->
        </div>
      </el-col>
    </el-row>
    <!--编辑-->
    <el-dialog :visible.sync="dialogFormVisibleUpdate" title="编辑">
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">
          <div class="grid-content bg-purple">
            <el-form
              :label-position="labelPosition"
              :model="formLabelAlignUpdate"
              label-width="100px"
            >
              <el-form-item label="名称">
                <el-input v-model="formLabelAlignUpdate.name" />
              </el-form-item>
              <el-form-item label="参数">
                <el-input v-model="formLabelAlignUpdate.paramKey" />
              </el-form-item>
              <el-form-item label="值">
                <el-input v-model="formLabelAlignUpdate.paramValue" />
              </el-form-item>
              <el-form-item label="标签">
                <el-input v-model="formLabelAlignUpdate.status" />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleUpdate = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisibleUpdate=false">确 定</el-button>
        <!-- <el-button type="primary" @click="editspace()" size="small">确 定</el-button> -->
      </div>
    </el-dialog>
    <!----添加--->
    <el-dialog :visible.sync="dialogFormVisible" title="添加">
      <el-row :gutter="20">
        <el-col :span="18" :offset="2">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" :model="list" label-width="100px">
              <el-form-item label="名称">
                <el-input v-model="list.name" placeholder="请输入名称" />
              </el-form-item>
              <el-form-item label="参数">
                <el-input v-model="list.paramKey" placeholder="请输入参数" />
              </el-form-item>
              <el-form-item label="值">
                <el-input v-model="list.paramValue" placeholder="请输入值" />
              </el-form-item>
              <el-form-item label="标签">
                <el-input v-model="list.status" placeholder="请输入标签" />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="add()">确 定</el-button>
        <!-- <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { Servelist } from "@/api/table";
// import Pagination from "@/components/pagination";
import {
  getResourcesSkuInfo,
  addSKUspace,
  getskuspecs,
  editskuspace,
  deleteskuspace
} from '@/api/serviceOperating';
import { requestParams, parseHash } from '@/utils/urlParam';
export default {
  // components: {
  //   Pagination
  // },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      dialogFormVisibleUpdate: false,
      labelPosition: 'right',
      li: [],
      list: {
        clazz: '',
        editable: true,
        name: '',
        paramKey: '',
        paramValue: '',
        skuId: 0,
        specId: 0,
        status: '',
        tags: ''
      },
      formLabelAlignUpdate: {
        editable: true,
        name: '',
        paramKey: '',
        paramValue: '',
        skuId: 0,
        specId: 0,
        status: '',
        tags: ''
      },
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: '',
      radiodeleteCS: '',
      radiodeleteSKU: '',
      radiodeleteSM: '',
      customColor: '#409eff',
      category: '个人',
      numberSKU: 20,
      privatelyOwned: 'YES',
      data: [],
      value: [1, 2, 3],
      listspace: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    async fetchData() {
      this.listLoading = true;
      // 获取单个sku信息
      const res = await requestParams(
        getResourcesSkuInfo,
        this.$route.params.id
      );
      // 获取规格信息
      const re = await requestParams(getskuspecs, res.content.id);
      this.li = re.content.content;
      for (var i = 0; i < this.li.length; i++) {
        if (this.li[i].editable == true) {
          this.li[i].editable = '可编辑';
        } else if (this.li[i].editable == false) {
          this.li[i].editable = '不可编辑';
        }
      }
      console.log(this.li);
      this.listLoading = false;
    },

    // 编辑规格信息模态框显示
    editskus(row) {
      this.formLabelAlignUpdate = row;
      this.dialogFormVisibleUpdate = true;
      console.log(this.formLabelAlignUpdate);
    },
    // 数据交互编辑规格
    editspace() {
      editskuspace(
        this.formLabelAlignUpdate.skuId,
        this.formLabelAlignUpdate.id,
        this.formLabelAlignUpdate
      ).then(r => {
        if (r.code == 200) {
          this.fetchData();
          this.dialogFormVisibleUpdate = false;
          this.$notify({
            message: r.message,
            type: 'success'
          });
        } else {
          this.$notify({
            message: r.message,
            type: 'error'
          });
        }
      });
    },
    // 添加
    add() {
      const data = this.list;
      addSKUspace(this.$route.params.id, data).then(res => {
        if (res.code === 200) {
          this.$notify({
            message: '新增成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();
        } else {
          this.$notify({
            message: '新增失败，请重试',
            type: 'warning'
          });
        }
      });
    },

    // 删除制定sku规格信息
    deletedspace(row) {
      this.formLabelAlignUpdate = row;
      this.$confirm('此操作将永久删除该SKU的规格信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteskuspace(
            this.formLabelAlignUpdate.skuId,
            this.formLabelAlignUpdate.id
          ).then(r => {
            if (r.code == 200) {
              this.fetchData();
              this.$emit('countFater');
              this.$notify({
                type: 'success',
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: r.message
          });
        });
    },
    tableChange(pagination) {
      this.fetchData();
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    }
    // roleUpdate(id) {
    //   const data = [];
    //   for (let i = 1; i <= 15; i++) {
    //     data.push({
    //       key: i,
    //       label: `角色 ${i}`
    //     });
    //   }
    //   this.data = data;
    //   console.log(id);
    //   this.dialogVisible = true;
    // },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../rewrite.scss";
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
  margin-right: 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
.search-input[data-v-7d4cba30] {
  width: 150px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
