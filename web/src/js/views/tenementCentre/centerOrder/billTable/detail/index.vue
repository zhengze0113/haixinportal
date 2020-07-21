<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-row :gutter="20">
              <el-col :span="15" style="width: 100%;border-left: 3px solid #333;">
                <div
                  class="grid-content bg-purple"
                  style="color:#333;float:left;font-size:14px;"
                >账单信息</div>
                <div style="float: right; margin-top: -12px;"/>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">出账时间:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">{{ object.gmtCreate }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">账单号:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">{{ object.code }}</div>
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">记账周期:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light"/>2年
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">金额:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light"/>{{ object.amount }}
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">单位:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light"/>￥
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">记账用户:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light"/>XXX
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">租户:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light"/>{{ object.tenantId }}
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">支付状态:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light"/>支付状态
                </el-col>
              </el-col>
            </el-row>
            <el-row class="details-left">
              <el-col :span="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">描述:</div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light"/>{{ object.description }}
                </el-col>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="19" style="padding-left:0;padding-right:0;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" style="background:#fff" type="card">
              <el-tab-pane label="记账记录" name="first">
                <AccountingRecords/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getList } from '@/api/table';
import Pagination from '@/components/pagination';
import CloseCard from '@/components/CloseCard';
import AccountingRecords from './accountingRecords';
import { getBillsInfo } from '@/api/ordersCenter';
export default {
  components: {
    Pagination,
    CloseCard,
    AccountingRecords
  },

  data() {
    return {
      list: null,
      expandRowKeys: [],
      listLoading: true,
      testList: null,
      dialogVisible: false,
      formLabelWidth: '120px',
      searchInput: '',
      textarea: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      batchDeletedObject: null,
      organizationObject: null,
      activeName: 'first',
      addRelationFrom: {
        operatingName: '',
        userName: ''
      },
      object: {

      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      getBillsInfo(this.$route.params.id).then(r => {
        this.object = r.content;
        console.log(r.content)
      });
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 选择机构 更新用户列表
    handleCurrentChange(val) {
      console.log(val);
      this.organizationObject = val;
    },
    // 将批量解除用户放到一个对象里
    handleSelectionChange(val) {
      this.batchDeletedObject = val;
    },
    // 单个解除用户
    handleClick(id) {
      console.log('解除关系用户的id=' + id);
    },
    // 批量解除用户
    batchDeleted() {
      if (
        this.batchDeletedObject == null ||
        this.batchDeletedObject.length == 0
      ) {
        this.$notify.error('请选择一个或多个用户进行解除');
        return;
      } else {
        this.$confirm('此操作将解除关系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log('获得解除对象');
            console.log(this.batchDeletedObject);
            this.$notify({
              type: 'success',
              message: '解除成功!'
            });
          })
          .catch(() => {
            this.$notify({
              type: 'info',
              message: '已取消解除'
            });
          });
      }
    },
    // 添加机构和用户的关系
    addRelation() {
      if (this.organizationObject == null) {
        this.$notify.error('请选择要建立关系的机构');
        return;
      } else {
        this.addRelationFrom.operatingName = this.organizationObject.name;
        this.dialogFormVisible = true;
      }
    },
    delItem() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../index.scss";
@import "../../../rewrite.scss";
.bg-purple {
  font-size: 12px;
}
.el-divider {
  background-color: #333;
}
.details-left {
  border-bottom: 1px solid #eceef5;
  padding: 8px 0;
}
.el-tabs--border-card > .el-tabs__header {
  border: 1px solid #e4e7ed;
}
.el-tabs--border-card {
  border: none;
}
/deep/.el-tabs__item{
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
