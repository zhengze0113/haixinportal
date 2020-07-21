<template>
  <div class="">
    <close-card title="订单详情" icon="list" :show-arrow="true">
      <div>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <div
              class="grid-content bg-purple"
            ></div>
          </el-col>
        </el-row>
        <el-row style="margin-top:50px;">
          <el-col :span="20" :offset="2">
            <el-col :span="2">
              <div class="grid-content bg-purple">类型:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light"></div>111
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">状态:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">正常</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">子机构:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">xx分公司</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">用户数:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">32</div>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="20" :offset="2">
          <el-col :span="2">
            <div class="grid-content bg-purple">验证方式:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light"></div>OAuth 认证
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">管理员:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">u01</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">联系电话:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">1871275027</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">电子邮件:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">kevintian126@126.com</div>
          </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <el-col :span="20" :offset="2">
          <el-col :span="2">
            <div class="grid-content bg-purple">创建者:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">test007</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">创建时间:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">2019-02-26 15:32:09</div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">最近配置:</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">2019-03-15 15:32:09</div>
          </el-col>
          </el-col>
        </el-row>
      </div>
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
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != "div") return;
      let index = this.expandRowKeys.indexOf(row.id);
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
    },
  }
};
</script>
  