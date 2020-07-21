<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
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
            <el-table-column label="时间" align="center" fixed="left">
              <template slot-scope="scope">

                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column label="操作内容" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.paramKey }}</span>
              </template>
            </el-table-column>

            <el-table-column label="版本" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tags }}</span>
              </template>
            </el-table-column>
            <el-table-column label="更新人" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.gmtCreate }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <pagination :tableChange="tableChange" /> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { Servelist } from "@/api/table";
// import Pagination from "@/components/pagination";
import { getResourcesSkuInfo, addSKUspace, getskuspecs, editskuspace, deleteskuspace } from '@/api/serviceOperating';
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
      list:
        {
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

      this.listLoading = false;
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
    margin-left:10px;
}

</style>
