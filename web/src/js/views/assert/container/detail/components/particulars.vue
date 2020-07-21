<template>
  <div>

    <el-alert
      title="eyondmesh-mysql"
      description="测试 mysql的说明，以及配置，和使用方法"
      type="success"
      :closable="false">
    </el-alert>

    <el-row style="margin-top:20px;">
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="名称：">
              <span>3306/TCP</span>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple">
              <el-form-item label="镜像：">
                <span>mysql:5.17.4</span>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple">
              <el-form-item label="挂载卷：">
                <span>/home/webedit</span>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple">
              <el-form-item label="活性探针：">
                <span>最小256MB硬盘</span>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple">
              <el-form-item label="准备探针：">
                <span>最小256MB硬盘</span>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple">
              <el-form-item label="资源限制：">
                <span>最小256MB硬盘.</span>
              </el-form-item>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="grid-content bg-purple">
              <el-form-item label="资源请求：">
                <span>最小256MB硬盘.</span>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input21: "",
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  }
};
</script>
