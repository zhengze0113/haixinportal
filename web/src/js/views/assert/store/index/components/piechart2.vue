<template>
    <div>
         <el-col :span="8">
              <div class="grid-content bg-purple">
                <div style="text-align:center;">
                  <img style="width:100px;height:100px;" src="web/static/images/test_image_redis/yun.jpg">
                </div>
                <div style="text-align:center;">
                  <span>云硬盘(20块)</span>
                </div>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <div class="card-content">
                  <el-progress type="circle" :percentage="50" status="text" :width="100"></el-progress>
                  <div class="card-inner-desc">
                    <p>300G</p>
                    <p>总数</p>
                  </div>
                  <div class="card-outer-desc">
                    <p>
                      <span class="scanned-flag"></span>
                      <span>已使用(180G)</span>
                    </p>
                    <p>
                      <span class="scanned-flag un"></span>
                      <span>未使用(120G)</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
    </div>
</template>

<script>
export default {
    
}
</script>



<style lang="scss" scoped>
   
    .card-content{
        position: relative;
        .card-inner-desc{
            position: absolute;
            display: inline-block;
            top: 50%;
            left: 23%;
            transform: translate(-50%, -50%);
            text-align: center;
            p{
                margin: 0;
            }
        }
        .card-outer-desc{
            position: absolute;
            display: inline-block;
            margin-left: 10px;
            top: 50%;
            transform: translateY(-50%);
            p{
                margin:0;
                .scanned-flag{
                    width: 14px;
                    height: 14px;
                    background: #00a0ff;
                    display: inline-block;
                }
                .un{
                    background: #E9EBED;
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