<template>
    <div>
      <el-row :gutter="20" style="margin-top:5px;margin-left: 0px; margin-right: 0px; " >
        <el-col :span="5">
          <div class="grid-content bg-purple" >
            <div style="width:100%;height:500px;background:white;">

            </div>
          </div>
        </el-col>

        <el-col :span="19" style="padding-left:0;padding-right:0;">
          <div class="grid-content bg-purple">
            <div style="width:100%;height:500px;background:white;">
            </div>
          </div>
        </el-col>

      </el-row>
    </div>
</template>

<script>
    export default {
        created(){

          console.log(this.$route.params.id);
        }
    }
</script>

<style scoped>

</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
