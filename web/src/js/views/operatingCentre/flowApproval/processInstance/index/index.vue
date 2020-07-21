<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;margin-left: 0px; margin-right: 0px; ">
      <!-- <close-card :show-arrow="true" title="流程实例" icon="list">
        <div class="grid-content bg-purple"> -->
      <ProcessExample/>
      <!-- </div>
      </close-card> -->
    </el-row>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import Pagination from '@/components/pagination';
import ProcessTemplate from './components/processTemplate';
import ProcessExample from './components/processExample';

export default {
  components: {
    Pagination,
    ProcessTemplate,
    ProcessExample
  },
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
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      activeName: 'first'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
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
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>

<style scope lang="scss">
@import "../../../index.scss";
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
