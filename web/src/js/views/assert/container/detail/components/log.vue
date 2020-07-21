<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          容器：
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
      </el-col>
    </el-row>

    <el-row class="mt-20">
      <el-timeline v-if="logList.length">
        <el-timeline-item
          v-for="(activity, index) in logList"
          :key="index"
          :timestamp="activity.timestamp"
        >{{activity.content}}</el-timeline-item>
      </el-timeline>
    </el-row>
  </div>
</template>
<script>
export default {
    data(){
        return{
            options: [{
              value: '选项1',
              label: 'Tomcat'
            }, {
              value: '选项2',
              label: 'Spring boot'
            }, {
              value: '选项3',
              label: 'Spring MVC'
            }, {
              value: '选项4',
              label: 'Node'
            }, {
              value: '选项5',
              label: 'Golang'
            }],
            logList: [{
              content: '活动按期开始',
              timestamp: '2018-04-15'
            }, {
              content: '通过审核',
              timestamp: '2018-04-13'
            }, {
              content: '创建成功',
              timestamp: '2018-04-11'
            }],
            value: ''
        };
    }
}
</script>
