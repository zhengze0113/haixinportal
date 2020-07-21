<template>
  <div>
    <el-row :gutter="20" class="primaryBackground">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="padding:10px;">
          <el-col :span="3" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button
                :disabled="result"
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="addSpecification=true"
              >添加分类</el-button>
            </div>
          </el-col>
          <el-col :span="7" :offset="12">
            <el-row class="right">
              <el-col :span="6" style="line-height:32px">关键字：</el-col>
              <el-col :span="18">
                <el-col :span="18">
                  <el-input
                    v-model="searchInput"
                    size="mini"
                    placeholder="请输入服务编码"
                    class="search-input"
                  />
                </el-col>
                <el-col :span="6">
                  <el-button size="small" icon="el-icon-search">查询</el-button>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" style="padding:0">
            <el-row class="right">
              <el-button size="small" type="primary">重置</el-button>
            </el-row>
          </el-col>
          <el-table
            :data="listcms"
            style="width: 100%"
            row-key="id"
            border
            lazy
            :load="load"
            :tree-props="{children: 'child', hasChildren: 'id'}"
          >
            <el-table-column prop="name" label="分类名称" ></el-table-column>
             <el-table-column prop="createDat" label="创建时间" ></el-table-column>
            <el-table-column prop="description" label="说明"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
               <template slot-scope="scope">
                  <el-link type="primary" class="link" >编辑</el-link>
                  <el-link type="danger" class="link" >删除</el-link>
              </template>
            </el-table-column>
           
          </el-table>

          <!-- <pagination :metadata="metadata" :table-change="tableChange" /> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { requestParams, parseHash } from "@/utils/urlParam";
import Pagination from "@/components/pagination";
import {
 Servicecatalog,deleteServicecatalog,addServicecatalog,updateServicecatalog
} from '@/api/serviceOperatingcms';

export default {
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
       result: false,
      searchInput: "",
      value: "",
      listchild:[],
      search: {
        page: 1,
        rows: 10
      },
      list:[],
      list1:[],
      listcms:[],
      selectRow: null,
      metadata: undefined,
      metadataSelect: undefined,
      disabled: "true",
      listLoading: true,
       content: {
        tags: '',
        id: '',
        name: '',
        parentId: 0,
        description: '',

      },
      seach:{parentId:0}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
       async fetchData() {
      this.listLoading = true;
      const res = await requestParams(Servicecatalog,0);
      console.log(12233)
      this.list = res;
      for(var i=0;i<this.list.length;i++){
          var child={
             tags:this.list[i].tags,
              id: this.list[i].id,
              name:this.list[i].name,
              sort:this.list[i].sort,
              parentId:this.list[i].parentId,
              description: this.list[i].description,
             
              children:[]
          };    
          this.seach.parentId=this.list[i].id;
          const res1=await requestParams(
            Servicecatalog,
            this.seach.parentId
          );
          this.list1=res1;
          for(var j=0;j<this.list1.length;j++){
              var childs={
                tags:this.list1[j].tags,
                id: this.list1[j].id,
                name:this.list1[j].name,
                sort:this.list1[j].sort,
                parentId:this.list1[j].parentId,
                description: this.list1[j].description
              }
              child.children.push(childs);
          }
            this.listcms.push(child)
            //console.log(this.listcms);
      }
         console.log(this.listcms)

         this.listLoading = false;
    },
     handleNodeClick(data, node) {
      if (node.level == 2) this.result = true;
      if (node.level == 1) this.result = false;
    },

    load(tree, treeNode, resolve) {
            console.log(tree)
            console.log(treeNode)
            console.log(resolve)
            resolve(
               tree.children
            )
          
           },
    selctPage(msg) {
      this.search.page = msg;
      this.initSelect();
    },
    //分页
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    
    handleSelectionChange(val) {
      this.selectRow = val;
      if (val.length > 0) this.disabled = false;
      else {
        this.disabled = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";
@media screen and (max-width: 1024px) {
  /deep/ .el-select[data-v-2c47a19b] {
    width: 430px !important;
  }
}
/deep/ .el-input {
  font-size: 12px;
}
.primaryBackground {
  background: #ffffff;
  margin: 0px 10px !important;
}
.el-form-item[data-v-2c47a19b][data-v-2c47a19b] {
  margin-bottom: 20px;
}
/deep/.el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.el-textarea__inner {
  width: 93%;
}
.strong {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}

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
  width: 200px;
  height: 32px;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  //margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
