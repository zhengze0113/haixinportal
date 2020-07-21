<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <div class="grid-content bg-purple">
            <div class="right">
              <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="searchInput"
                class="search-input"
              />
        
            </div>
            <el-table
              v-loading="listLoading"
              size="small"
              :data="list"
              element-loading-text="Loading"
              fit
              highlight-current-row
              @row-click="handleRowClick"
              row-key="id"
              :expand-row-keys="expandRowKeys"
            >
              <el-table-column type="selection" ></el-table-column>
              <el-table-column label="名称"  align="center" fixed="left">
                <template slot-scope="scope">
                  <router-link
                    :to="{path: '/operatingCentre/flowApproval/detail/template/'+scope.row.id}"
                    class="link"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>

              <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.status }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建人" align="center">
                <template slot-scope="scope">{{ scope.row.defaultName }}</template>
              </el-table-column>
              <el-table-column label="描述" width="80" align="center">
                <template slot-scope="scope">
                  <span>{{category }}</span>
                </template>
              </el-table-column>
              <el-table-column label="创建时间"  align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.onlineTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="最后修改"  align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.onlineTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作"  align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small"  >编辑</el-button>
                  <el-button type="text" size="small"  >终止</el-button>
                  <el-button type="text" size="small"  >删除</el-button>

                </template>
              </el-table-column>
            </el-table>
            <pagination :tableChange="tableChange" />
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import Pagination from "@/components/pagination";
  import { Servelist } from "@/api/table";

  export default {
    components: {
      Pagination
    },
    data() {
      return {
        list: [],
        listLoading: true,
        searchInput: "",
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
      };
    },
    created() {
      this.fetchData();
    },
    methods:{
        onSubmit() {
          console.log("submit!");
        },
        fetchData() {
          this.listLoading = true;
          Servelist(this.listQuery).then(response => {
            this.list = response.data.items;
            this.listLoading = false;
          });
        },
        tableChange(pagination) {
          this.fetchData();
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
    }
  }
</script>

