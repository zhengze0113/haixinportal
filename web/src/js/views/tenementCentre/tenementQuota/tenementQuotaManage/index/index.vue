<template>
  <div>
    <close-card :show-arrow="true" title="列表" icon="list">
      <template>

        <el-tabs ref="tab" v-model="activeName" type="card">
          <el-tab-pane label="个人配额" name="first" >
            <Role/>
          </el-tab-pane>
          <el-tab-pane label="机构配额" name="second">
            <Power/>
          </el-tab-pane>
        </el-tabs>
      </template>
      <Pagination :table-change="tableChange"/>
    </close-card>

    <el-dialog :visible.sync="dialogFormVisibleadd" title="创建存储">
      <el-form>
        <el-form-item :label-width="formLabelWidth" label="名称">
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="大小">
          <template>
            <div class="block" style="width:77%;display:inline-block;">
              <el-slider v-model="value8" show-input/>
            </div>
            <div style="display:inline-block">MB</div>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleadd = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisibleadd = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible" title="扩容">
      <el-form>
        <el-form-item :label-width="formLabelWidth" label="名称">
          <el-input style="width:77%"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="大小">
          <template>
            <div class="block" style="width:77%;display:inline-block;">
              <el-slider v-model="value8" show-input/>
            </div>
            <div style="display:inline-block">MB</div>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import Role from './components/role';
import Power from './components/power';
import Pagination from '@/components/pagination';

export default {
  components: {
    Role,
    Power,
    Pagination

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
@import "../../../rewrite.scss";
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
/deep/ .el-tabs__item{
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
