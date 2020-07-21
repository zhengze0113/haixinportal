<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
                <el-button  size="mini" @click="dialogFormVisible = true;check()" >计价</el-button>
          </div>
          </div>
      </el-col>
    </el-row>
    <el-dialog title="计价" :visible.sync="dialogFormVisible">
      <el-table
            ref="singleTable"
            v-loading="listLoading"
            size="small"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            @row-click="handleRowClick"
            row-key="id"
            :expand-row-keys="expandRowKeys"
            @selection-change="handleSelectionChange"
          >
          <el-table-column label="" width="30">
            <template slot-scope="scope">
               
              <el-radio 
              :label=" scope.row.id" 
              @change.native="test(scope.row)"
              v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>

            <el-table-column label="定价资源名"  align="center" width="120">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="状态"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格"  align="center">
              <template slot-scope="scope" >
                <span >{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column label="资源容量"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.quota }}</span>
              </template>
            </el-table-column>
            <el-table-column label="计费周期"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.period }}</span>
              </template>
            </el-table-column>
            <el-table-column label="单位"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.unit }}</span>
              </template>
            </el-table-column>

            <el-table-column label="描述"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.tags }}</span>
              </template>
            </el-table-column>

            <el-table-column label="资源使用量"  align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.usage }}</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination :metadata="metadata" :table-change="tableChange" />
         <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="capacityAffirm()">确认</el-button>
          <el-button  size="small" @click="dialogFormVisible = false;">取 消</el-button>
        </div>
    </el-dialog>


  </div>
</template>

<script>
import Pagination from "@/components/pagination";
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  getonePrices,
  getPricesList,createdSKU
} from "@/api/serviceOperating";

export default {

  props:['id','form'],

  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      radio:0,
      // form:this.form,
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleattestation: false,
      dialogFormVisibleoutline: false,
      dialogFormVisibledelete: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: "",
      radiodeleteCS: "",
      radiodeleteSKU: "",
      radiodeleteSM: "",
      customColor: "#409eff",
      category: "个人",
      numberSKU: 20,
      privatelyOwned: "YES",
      batchDeleted : null,
      metadata: undefined,
      search: { page: 1, rows: 10 }, // 搜索参数
      prices:[],
      rowObject:null,
      pricingFrom:{
        name: "",
        period: 0,
        price: 0,
        quota: 0,
        status: "",
        tags: "",
        unit: "",
        //usage: 0
      }
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
 
     
  },
   watch:{
   

  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    test(row){
      this.rowObject = row;
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getPricesList, this.search);
      this.metadata = res.metadata;
      this.list = res.content.content;
      this.listLoading = false;
     
        
    },
    async check(){
       for(var i=0;i<this.form.price.priceItems.length;i++){   
          if(this.form.price.priceItems[i].specId==this.id){
            const r = await requestParams(getonePrices,this.form.price.priceItems[i].priceId);
            this.radio=r.content.id;
          }
      }
    },
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      let index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleClick(row) {
      console.log(row);
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },
    increase() {
      let count = setInterval(() => {
        this.percentage++;
        if (this.percentage == 100) {
          this.percentage = 0;
          this.isDelete = false;
          this.guanbi = true;
          clearInterval(count);
          this.close();
        }
      }, 100);
    },
    close() {
      let counta = setInterval(() => {
        this.countA--;
        if (this.countA == 0) {
          clearInterval(counta);
          this.guanbi = false;
          this.dialogFormVisibleoutline = false;
          this.dialogFormVisibledelete = fasle;
          this.countA = 5;
        }
      }, 1000);
    },
    online() {
      this.$confirm("此操作将上线该服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "上线成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消上线"
          });
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    last() {
      if (this.active-- < 0) this.active = 0;
    },
    over() {
      this.active = 3;
      let o = setTimeout(() => {
        this.active = 0;
      }, 1000);
    },
    handleSelectionChange(row){

       if(row.length==0){
        
       }else if(row.length>1){

         row.shift();
        console.log(row)
          
       }    
      
    },
    
    capacityAffirm(){   
      this.$emit('getMessage',this.radio,this.id,this.rowObject.price);//主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
       
      this.dialogFormVisible = false;


      }
       
    //创建容量定价
    //createdPricing(){ alert("aaa")
      // createdPrices(this.pricingFrom).then(r => {
      //  
      //     this.$notify({
      //       type: "success",
      //       message: r.message
      //     });
      //   }else{
      //     this.$notify({
      //       type: "error",
      //       message: r.message
      //     });
      //   }
      // })
    //},
   
  }
};
</script>


<style lang="scss" scoped>
@import "../../../rewrite.scss";
.icon-wrap {
  float: left;
  background: #00609e;
  border-radius: 40px;
  width: 60px;
  height: 60px;
  text-align: center;
  padding-top: 15px;
  margin-right: 10px;
  .icon {
    width: 30px;
    height: 30px;
  }
}
.txt-wrap {
  display: inline-block;
  margin-top: 10px;
  .main-txt {
    font-weight: bold;
  }
  .sub-txt {
    margin-top: 8px;
  }
}
.el-select {
  width: 100%;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  margin:0 10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
/* .el-checkbox__input.is-checked .el-checkbox__inner +.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: black;
    border-color: red;
} */
</style>
