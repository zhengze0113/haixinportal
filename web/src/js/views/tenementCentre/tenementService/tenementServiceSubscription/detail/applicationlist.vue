
<template>
  <div>
    <div class="right" >
      <el-select v-model="value" placeholder="环境过滤">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          style="width:30%;"
        ></el-option>
      </el-select>
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-search"
        v-model="searchInput"
        class="search-input"
      />
      <el-button-group >
        <el-button >
          <svg-icon icon-class="plus"/>新建
        </el-button>

        <el-button>
          <svg-icon icon-class="delete"/>删除
        </el-button>
      </el-button-group>
    </div>

    <el-table
      v-loading="listLoading" 
size="small"
      :data="testlist"
      element-loading-text="Loading"
      fit
      highlight-current-row
       @row-click="handleRowClick"
        row-key="id"
        :expand-row-keys="expandRowKeys"
    >
    <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="名称">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.display_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="应用名称">
        <template slot-scope="scope">
          <router-link
            :to="{path: '/tenementCentre/organizationUser/tenementOrganization/detail/'+scope.row.id}"
            class="link"
          >{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="容量" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问模式" align="center">
        <template slot-scope="scope">{{ scope.row.pageviews }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="scope">
          <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> -->
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
          <el-table-column fixed="right" label="操作" width="170">
          <template slot-scope="scope">
            <div class="table-operator">
              <el-button  type="text" size="small">
                <i class="el-icon-plus"/>
                新建
              </el-button>          
              <el-button type="text" size="small">
                <i class="el-icon-delete"/>
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>
    <pagination :tableChange="tableChange"/>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { testdataList } from "@/utils/testdata";
import Pagination from '@/components/pagination';


export default {
  components:{
    Pagination
  },
  data() {
    return {
      list: null,
      listLoading: true,
      testlist: null,
      input: "",
      searchInput:'',
       expandRowKeys: [],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  created() {
    this.fetchData();
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
  methods: {
    fetchData() {
      this.listLoading = true;
      this.testlist = testdataList();
      getList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    }
    ,
    tableChange(pagination){
      console.log(pagination)
    },
     handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      let index = this.expandRowKeys.indexOf(row.id)
      if(index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.icon-wrap{
  float: left;
  background: #00609c;
  border-radius: 40px;
  width: 60px;
  height: 60px;
  text-align: center;
  padding-top: 15px;
  margin-right: 10px;
  .icon{
    width: 30px;
    height: 30px;
  }
}
.txt-wrap{
  display: inline-block;
  margin-top:10px;
  .main-txt{
    font-weight: bold;
  }
  .sub-txt{
    margin-top: 8px;
  }
}

.search-input{
  width: 150px;
  margin:0 10px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
