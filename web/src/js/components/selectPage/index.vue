<template>
   <div>
     <el-select :style="{'width': width}"  v-model="value1" placeholder="请选择"  @change="chooseMedicine(value1)" >
     <el-option
       v-for="item in cities"
       :key="item.id"
       :label="item.name"
       :value="item.id"
        >
     <span style="float: left">{{ item.name }}</span>
     </el-option>
       <div style="text-align: center">
         <span v-show="top"  @click="topPage"   class="textStyle"  :class="[metadataSelect === undefined || metadataSelect.number == 1?'disableStyle':'']" >上一页</span>
         <span v-show="next" @click="nextPage"  class="textStyle"  :class="[metadataSelect === undefined   || ( metadataSelect !== undefined && metadataSelect.number == metadataSelect.totalPages) ?'disableStyle':'']">下一页</span>
         <span style="float: right;font-size:12px;margin-top:1%;margin-right:3%;">共{{ metadataSelect === undefined ? '' : metadataSelect.totalElements }}条</span>
       </div>
     </el-select>
   </div>
</template>

<script>
export default {
  props: {
    cities: {
      type: [Array,String]
    },
    value: {
      default: () => (null)
    },
    metadataSelect: {
      type: Object
    },
    width:{
      type:String
    }

  },
  data(){
    return{
      top: true,
      next: true,
      page: 1,
      value1 : this.value
    }
  },
  created(){

  },
  watch: {

  },
  methods: {

    topPage(){
      if(this.page == 1 || this.page == 0){
        return;
      }
      this.page = this.page - 1;
      this.$emit('getCreation', this.page);
      this.value1 = "";
    },
    nextPage(){
      if(this.page == this.metadataSelect.totalPages ){
        return;
      }
      this.page = this.page + 1;
      this.$emit('getCreation', this.page);
      this.value1 = "";
    },
    chooseMedicine(val){
      this.$emit('getServiceId', val);

    }
  }

};
</script>


<style lang="scss" scoped>
  .textStyle{
    padding-left: 10px;
    font-size :14px;
    font-weight: bold;
    cursor :pointer;
    color :cornflowerblue;
  }
  .disableStyle{
    padding-left: 10px;
    font-size :14px;
    font-weight: bold;
    cursor : pointer;
    color :white;
  }
</style>
