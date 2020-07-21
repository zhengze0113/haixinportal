<template>
  <div class="app-container">
    <el-row :gutter="10" style="margin-top: -20px; margin-bottom: -20px">
      <el-col :span="8">

        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="hardDisk" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">云硬盘（20块）</div>
            <div class="sub-txt">
              <span>
                <svg-icon icon-class="interspace"/>空间(300G)
              </span>
              <span>
                <svg-icon icon-class="already_use"/>已用(180G)
              </span>
              <span>
                <svg-icon icon-class="not_use"/>可用(120G)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
      <el-col :span="8">
        <!-- <el-card class="box-card">
          <div>Kubernet PVC（5）</div>
          <div style="margin-top: 8px">
            <span>总空间(250G)</span>
            <span>已使用(250G)</span>
            <span>可分配(0)</span>
          </div>
        </el-card>-->
        <!-- <PieChart></PieChart> -->
        <!-- <el-row :gutter="10">
            <pieChart2></pieChart2>
        </el-row>-->
        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="all" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">Kubernet PVC（5）</div>
            <div class="sub-txt">
              <span>
                <svg-icon icon-class="interspace"/>空间(300G)
              </span>
              <span>
                <svg-icon icon-class="already_use"/>已用(250G)
              </span>
              <span>
                <svg-icon icon-class="not_use"/>未用(50G)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
      <el-col :span="8">
        <!-- <el-card class="box-card">
          <div>Kubernetes PV（1）</div>
          <div style="margin-top: 8px">
            <span>总空间(250G)</span>
            <span>已使用(250G)</span>
            <span>可分配(250G)</span>
          </div>
        </el-card>-->
        <close-card>
          <div class="icon-wrap">
            <svg-icon icon-class="all" class="icon"/>
          </div>
          <div class="txt-wrap">
            <div class="main-txt">Kubernet PV（5）</div>
            <div class="sub-txt">
              <span>
                <svg-icon icon-class="interspace"/>空间(300G)
              </span>
              <span>
                <svg-icon icon-class="already_use"/>已用(250G)
              </span>
              <span>
                <svg-icon icon-class="not_use"/>未用(50G)
              </span>
            </div>
          </div>
        </close-card>
      </el-col>
    </el-row>

    <!-- <el-card class="box-card mt-20">
      <div slot="header" class="clearfix">
        <span>容量统计</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card">
            <bar-chart/>
          </el-card>
        </el-col>
      </el-row>
    </el-card> -->

    <close-card title="容量统计" icon="statistics">
      <el-row :gutter="20">
        <el-col :span="24">
          <close-card>
            <bar-chart/>
          </close-card>
        </el-col>
      </el-row>
    </close-card>

    <close-card :show-arrow="true" title="储存列表" icon="list">
      <template>
        <el-tabs v-model="activeName" type="border-card">
          <div class="right">
            <el-button-group>
              <el-button @click="dialogFormVisibleadd = true">
                <svg-icon icon-class="plus"/>
                新建
              </el-button>
              <el-button @click="dialogFormVisible = true">
                <svg-icon icon-class="dilatation"/>
                扩容
              </el-button>
              <el-button>
                <svg-icon icon-class="shrink"/>
                缩容
              </el-button>
              <el-button @click="open2">
                <svg-icon icon-class="release"/>
                释放
              </el-button>
            </el-button-group>
          </div>
          <el-tab-pane label="云硬盘" name="first">
            <Yun/>
          </el-tab-pane>
          <el-tab-pane label="Kubernetes PVC" name="second">
            <Pvc/>
          </el-tab-pane>
          <el-tab-pane label="Kubernetes PV" name="third">
            <Pv/>
          </el-tab-pane>
        </el-tabs>
      </template>
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
        <el-form-item :label-width="formLabelWidth" label="格式">
          <el-select value placeholder="请选择格式" style="width:77%">
            <el-option label="云盘" value="yun"/>
            <el-option label="Pvc" value="pvc"/>
            <el-option label="Pv" value="pv"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleadd = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisibleadd = false">确 定</el-button>
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
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table';
import BarChart from './components/chart';
import Yun from './components/yun';
import Pvc from './components/pvc';
import Pv from './components/pv';
import PieChart from './components/piechart';
import pieChart2 from './components/piechart2';
import CloseCard from '@/components/CloseCard';

export default {
  components: {
    BarChart,
    Yun,
    Pvc,
    Pv,
    PieChart,
    pieChart2,
    CloseCard
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
      list: null,
      listLoading: true,
      activeName: 'first',
      dialogFormVisible: false,
      dialogFormVisibleadd: false,
      formLabelWidth: '120px',
      value8: 0
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
    }
  }
};
</script>
<style lang="scss" scoped>
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

.search-input {
  width: 150px;
  margin:0 10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>

