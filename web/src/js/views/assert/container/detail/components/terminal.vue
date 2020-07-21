<template>
<div>

<el-row :gutter="20">
  <el-col :span="12" :offset="1">
    <div class="grid-content bg-purple">
        容器：
          <template>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </template>
    </div>
    </el-col>
</el-row>

<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark" style="background:rgb(211, 220, 230);height:300px;margin-top:40px;"></div></el-col>
</el-row>






</div>
</template>
<script>
export default {
    data(){
        return{
            options: [{
          value: '选项1',
          label: '测试容器001'
        }, {
          value: '选项2',
          label: '测试容器002'
        }, {
          value: '选项3',
          label: '测试容器003'
        }, {
          value: '选项4',
          label: '测试容器004'
        }, {
          value: '选项5',
          label: '测试容器005'
        }],
        value: ''

        };
    }
}
</script>
