<template>
  <div class="app-container">
    <close-card :show-arrow="true" title="目录详情" icon="list">
      <div>
        <el-row style="margin-top:50px;">
          <el-col :span="20" :offset="2">
            <el-col :span="2">
              <div class="grid-content bg-purple">名称:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light" />容器名称
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">显示名:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">tomcat测试版本</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">描述:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">截止到2019年8月27日14:47:51容器运行正常</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">创建时间:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">2019-8-27 14:48:37</div>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="20" :offset="2">
            <el-col :span="2">
              <div class="grid-content bg-purple">关联对象:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light" />CloudServiceLink对象、ServiceCatalogLink对象
            </el-col>
          </el-col>
        </el-row>
      </div>
    </close-card>

    <close-card :show-arrow="true" title="关联对象列表" icon="list">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="显示名称">
                <span>{{ props.row.displayName }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="当前状态">
                <span>{{ props.row.status }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.gmtCreate }}</span>
              </el-form-item>
              <el-form-item label="最近修改时间">
                <span>{{ props.row.gmtModify  }}</span>
              </el-form-item>
              <el-form-item label="标签">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="id">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="当前状态" prop="status"></el-table-column>
        <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
      </el-table>
    </close-card>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { treedataList } from "@/utils/treedata";

import Pagination from "@/components/pagination";
import CloseCard from "@/components/CloseCard";

export default {
  components: {
    Pagination,
    CloseCard
  },

  data() {
    return {
      list: null,
      expandRowKeys: [],
      listLoading: true,
      testList: null,
      dialogVisible: false,
      formLabelWidth: "120px",
      searchInput: "",
      textarea: "",

      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData: [
        {
          id: "12987122",
          name: "测试容器",
          displayName: "Tomcat",
          description: "运行正常",
          status: "正常",
          gmtCreate: "2019年8月27日15:15:04",
          gmtModify : "2019年8月27日15:15:11",
          tags  : "标签"
        },
        {
          id: "12987123",
          name: "测试中间件",
          displayName: "kubernetes",
           description: "运行正常",
          status: "正常",
          gmtCreate: "2019年8月27日15:15:04",
          gmtModify : "2019年8月27日15:15:11",
          tags  : "标签"
        },
         {
          id: "12987122",
          name: "测试容器",
          displayName: "Tomcat",
            description: "运行正常",
          status: "正常",
          gmtCreate: "2019年8月27日15:15:04",
          gmtModify : "2019年8月27日15:15:11",
          tags  : "标签"
        },
        {
          id: "12987123",
          name: "测试中间件",
          displayName: "kubernetes",
          description: "运行正常",
          status: "正常",
          gmtCreate: "2019年8月27日15:15:04",
          gmtModify : "2019年8月27日15:15:11",
          tags  : "标签"
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      this.treeList = treedataList();
      this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
