<template>
  <div class="app-container" style="padding: 0px; height: 100%;">
    <template>

      <login1/>
    </template>
  </div>
</template>
<script>
import login1 from './login1';
export default {
  components: {
    login1
  },
  data() {
    return {
      list: null,
      listLoading: true,
      activeName: 'first',
      dialogFormVisible: false,
      dialogFormVisibleadd: false,
      formLabelWidth: '120px',
      value8: 0,
      searchInput: ''
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
    open2() {
      this.$confirm('此操作将释放内存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '释放成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消释放'
          });
        });
    },
    tableChange(pagination) {
      console.log(pagination);
    }
  }
};
</script>
<style lang="scss" scoped>
.card-content {
  position: relative;
  .card-inner-desc {
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 23%;
    transform: translate(-50%, -50%);
    text-align: center;
    p {
      margin: 0;
    }
  }
  .card-outer-desc {
    position: absolute;
    display: inline-block;
    margin-left: 10px;
    top: 50%;
    transform: translateY(-50%);
    p {
      margin: 0;
      .scanned-flag {
        width: 14px;
        height: 14px;
        background: #00c072;
        display: inline-block;
      }
      .un {
        background: rgb(121, 123, 124);
      }
    }
  }
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
