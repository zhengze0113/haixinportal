<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <close-card :show-arrow="true" title="配额设置" icon="list">
            <el-tree
              :data="data"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
              show-checkbox
              node-key="id"/>

            <div class="grid-content bg-purple" style="float: right;width: 50%;">
              <div class="block">
                <span class="demonstration">CUP配额</span>
                <el-slider
                  v-model="value1"
                  :step="1"
                  :max="16"/>
              </div>
              <div class="block">
                <span class="demonstration">可使用内存</span>
                <el-slider
                  v-model="value2"
                  :step="2"
                  :max="32"/>
              </div>
              <div slot="footer" class="dialog-footer" style="float: right">
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </div>
          </close-card>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      value2: 0,
      data: [{
        id: 1,
        label: '组织机构1',
        children: [{
          id: 4,
          label: '租户甲'
        }, {
          id: 4,
          label: '租户乙'
        }, {
          id: 4,
          label: '租户丙'
        }, {
          id: 4,
          label: '租户丁'
        }
        ]
      }, {
        id: 2,
        label: '组织机构2',
        children: [{
          id: 5,
          label: '租户甲乙'
        }, {
          id: 6,
          label: '租户丙丁'
        }]
      }, {
        id: 3,
        label: '组织机构3',
        children: [{
          id: 7,
          label: '租户甲丁'
        }, {
          id: 8,
          label: '租户丙乙'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.el-tree{
  float: left;
  width: 50%;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
