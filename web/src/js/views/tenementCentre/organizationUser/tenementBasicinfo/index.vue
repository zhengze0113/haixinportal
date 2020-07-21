<template>
  <div class="app-container" style="padding-top:0px">
    <close-card title="租户基本信息" icon="list" :show-arrow="true">
      <div>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <div class="message-main">
    <close-card title="基本信息" icon="user">
      <div class="el-row">
        <div class="el-col-3 tr">名称：</div>
        <div class="el-col-10 ml-10">
          string
        </div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">ID：</div>
        <div class="el-col-10 ml-10">unsigned long</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">类型：</div>
        <div class="el-col-10 ml-10">租户</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">所在国家：</div>
        <div class="el-col-10 ml-10">中国</div>
      </div>
       <div class="el-row mt-20">
        <div class="el-col-3 tr">省份（州）：</div>
        <div class="el-col-10 ml-10">北京</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">城市：</div>
        <div class="el-col-10 ml-10">北京</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">链接：</div>
        <div class="el-col-10 ml-10">对象服务入口</div>
        <div class="el-col-10 ml-10">当前对象url入口</div>
      </div>
    </close-card>
  </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:50px;">
          <el-col :span="20" :offset="2">
            <el-col :span="2">
              <div class="grid-content bg-purple">编号:</div>
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
              <div class="grid-content bg-purple">所属机构:</div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple-light">xx分公司</div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple">用户数: </div>
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
        <div class="left" style="margin:20px;">
          <el-button-group>
            <el-button @click="editor">
              <svg-icon icon-class="allocation"/>编辑
            </el-button>
            </el-button-group>
          <el-button-group>
            <el-button @click="delItem">
              <svg-icon icon-class="delete"/>删除
            </el-button>
          </el-button-group>
        </div>
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

      data2: [
        {
          id: 1,
          label: "测试一级 1",
          children: [
            {
              id: 4,
              label: "测试二级 1-1",
              children: [
                {
                  id: 9,
                  label: "测试三级 1-1-1"
                },
                {
                  id: 10,
                  label: "测试三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "测试一级 2",
          children: [
            {
              id: 5,
              label: "测试二级 2-1"
            },
            {
              id: 6,
              label: "测试二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "测试一级 3",
          children: [
            {
              id: 7,
              label: "测试二级 3-1"
            },
            {
              id: 8,
              label: "测试二级 3-2"
            }
          ]
        }
      ],
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
    delItem() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$notify({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除"
          });
        });
    },editor() {
        this.$alert('字段信息', '编辑', {
          confirmButtonText: '确定',
          callback: action => {
            this.$notify({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
  }
};
</script>
  