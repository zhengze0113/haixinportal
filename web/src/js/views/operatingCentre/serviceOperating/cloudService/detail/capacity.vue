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
                        <div class="grid-content bg-purple" style="line-height:40px">容量：</div>
                      </el-col>
                      <el-col :span="2">
                        <div class="grid-content bg-purple">
                          <el-input v-model="rl" :disabled="inputa"/>
                        </div>
                      </el-col>
                      <el-col :span="4" style="margin-left:50px">
                        <div class="grid-content bg-purple" style="line-height:40px">容量最大值：</div>
                      </el-col>
                      <el-col :span="2">
                        <div class="grid-content bg-purple">
                          <el-input v-model="rlmax" :disabled="inputa"/>
                        </div>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:20px;">
                    <el-col :span="24" :offset="2">
                      <el-col :span="4">
                        <div class="grid-content bg-purple" style="line-height:40px">可售卖服务：</div>
                      </el-col>
                      <el-col :span="2">
                        <div class="grid-content bg-purple">
                          <el-input v-model="isservice" :disabled="inputa"/>
                        </div>
                      </el-col>
                      <el-col :span="4" style="margin-left:50px">
                        <div class="grid-content bg-purple" style="line-height:40px">可售卖服务最大值：</div>
                      </el-col>
                      <el-col :span="2">
                        <div class="grid-content bg-purple">
                          <el-input v-model="isservicemax" :disabled="inputa"/>
                        </div>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-button-group style="margin-top:10px">
                    <el-button v-if="inputa==true" type="primary" @click="inputa=false">修改</el-button>
                    <el-button v-if="inputa==false" type="primary" @click="inputa=true">保存</el-button>
                    <el-button @click="dialogVisible=true">添加</el-button>
                  </el-button-group>
                </div>
              </el-card>
            </div>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="30%">
      <div class="demo-input-suffix">
        <el-input placeholder="key" width="40%"/>
        <el-input placeholder="value" width="40%"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
    return {
      inputa: true,
      rl: 128,
      rlmax: 136,
      isservice: 15,
      isservicemax: 18,
      dialogVisible: false
    };
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
