<template>
    <el-row :gutter="20">
        <el-col :span="20" :offset="2"><div class="grid-content bg-purple" :style="divStyle"></div></el-col>
    </el-row>
</template>

<script>
export default {
    data(){
        return {
            divStyle :{height:'400px',background:'#73A7DC'}
        }
    }


}
</script>
