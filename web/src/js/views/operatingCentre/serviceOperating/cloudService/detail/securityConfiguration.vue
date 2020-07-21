<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-form ref="form" label-width="80px">
            <el-form-item label="认证方式">
                <el-radio v-model="radio" label="本地认证"></el-radio>
                <el-radio v-model="radio" label="外部认证"></el-radio>
            </el-form-item>
            <div class="grid-content bg-purple" style="margin-top:10px;"
            v-if="radio=='外部认证'">
              <el-card class="box-card">
                <div class="text item" style>
                  <el-row :gutter="20">
                    <el-col :span="22" :offset="2">
                      <div class="grid-content bg-purple" style="font-size:16px;float:left;">外部认证信息</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:20px;">
                    <el-col :span="24" :offset="2">
                      <el-col :span="4">
                        <div class="grid-content bg-purple">时间:</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">2018.3.2</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">地点:</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">北京</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">性别:</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">男</div>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:20px;">
                    <el-col :span="24" :offset="2">
                      <el-col :span="4">
                        <div class="grid-content bg-purple">姓名:</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">XXX</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">性别:</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">男</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">性别:</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">男</div>
                      </el-col>
                    </el-col>
                  </el-row>
                   <el-row style="margin-top:20px;">
                      <el-col :span="24" :offset="2">
                        <el-col :span="4">
                          <div class="grid-content bg-purple">时间:</div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple-light">2018.3.2</div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple">地点:</div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple-light">北京</div>
                        </el-col>
                        <el-col :span="4">
                        <div class="grid-content bg-purple">性别:</div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">男</div>
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
import { Servelist } from "@/api/table";
import Pagination from "@/components/pagination";
export default {
  components: {
    Pagination
  },
  filters: {},
  data() {
    return {
      radio: ""
    };
  },
  created() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="scss">
.message {
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>