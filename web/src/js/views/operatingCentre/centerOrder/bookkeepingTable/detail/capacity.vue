<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-form ref="form" label-width="80px">
            <div class="grid-content bg-purple" style="margin-top:10px;">
              <el-card class="box-card">
                <div class="text item" style>
                  <el-row style="margin-top:20px;">
                    <el-col :span="24" :offset="2">
                      <el-col :span="4">
                        <div class="grid-content bg-purple">容量：</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">128</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">容量最大值：</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">200</div>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:20px;">
                    <el-col :span="24" :offset="2">
                      <el-col :span="4">
                        <div class="grid-content bg-purple">可售卖服务：</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">12</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">可售卖服务最大值：</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">15</div>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/pagination';
export default {
  components: {
    Pagination
  },
  filters: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
};
</script>
<style lang="scss">
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
