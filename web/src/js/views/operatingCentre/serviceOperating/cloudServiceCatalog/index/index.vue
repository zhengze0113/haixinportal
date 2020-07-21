<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-button
              :disabled="result"
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="createServiceCatalog()"
            >新建</el-button>
          </div>
          <div class="left" style="margin-top: 1%; width: 100%;border: 1px solid #ebeef5;">
            <el-tree
              :props="props"
              :load="loadNode"
              :data="list"
              lazy
              show-checkbox
              @node-click="handleNodeClick"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span stlye="display: inline-block;">
                  <el-link v-if="data.parentId == 0" type="primary" class="link" @click.stop="createdcloudServiceCatalog(data)">新建</el-link>
                  <el-link type="primary" class="link" @click.stop="updatecloudServiceCatalog(data)">编辑</el-link>
                  <el-link type="danger" class="link" @click.stop="deletedcloudServiceCatalog(data.id)">删除</el-link>
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" title="新建云服务目录">
      <el-row>
        <el-col>
          <div>
            <el-form ref="contents" :model="contents" label-width="80px">
              <el-form-item label="名称">
                <el-input v-model="contents.name"/>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="contents.description"/>
              </el-form-item>
              <el-form-item label="标签">
                <el-input v-model="contents.tags"/>
              </el-form-item>
              <el-form-item label="图标">
                <el-input v-model="contents.icon"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="float:right;margin-top:20px;">
              <el-button size="mini" type="primary" @click="dialogFormVisible = false">取 消</el-button>
              <el-button size="mini" type="primary" @click="createdcloudServiceCatalogs()" >确认</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="organizationShow" title="编辑云服务目录">
      <el-form ref="content" :model="content" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="content.name"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="content.description"/>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="content.tags"/>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="content.icon"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editServiceCatalog()" >确认</el-button>
        <el-button @click="organizationShow = false; active=0">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {
  getcloudServiceCatalogList,
  createdcloudServiceCatalog,
  deletedcloudServiceCatalog,
  getServiceSubdirectoryMessage, // 获取子目录
  updatecloudServiceCatalog // 编辑
} from '@/api/serviceOperating';

// import { Servelist } from "@/api/table";
import Pagination from '@/components/pagination';
export default {
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      props: {
        label: 'name',
        children: 'children',
        id: 'id'
      },
      count: 1,

      list1: [],
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      innerVisible: false,
      dialogFormVisible: false,
      organizationShow: false,
      percentage: 0,
      countA: 5,
      active: 0,
      guanbi: false,
      isDelete: false,
      radioattestation: '',
      radiodeleteCS: '',
      radiodeleteSKU: '',
      radiodeleteSM: '',
      customColor: '#409eff',
      category: '个人',
      numberSKU: 20,
      privatelyOwned: 'YES',
      result: false,
      contents: {
        tags: '',
        skuNumber: '',
        id: '',
        name: '',
        levelName: '',
        icon: '',
        parentId: 0,
        description: '',
        status: '',
        deleted: false,
        gmtCreate: '',
        gmtModify: '',
        links: [
          {
            rel: '',
            href: '',
            hreflang: null,
            media: null,
            title: null,
            type: null,
            deprecation: null
          }
        ]
      },
      content: {
        tags: '',
        skuNumber: '',
        id: '',
        name: '',
        icon: '',
        parentId: 0,
        description: '',
        status: '',
        deleted: false,
        gmtCreate: '',
        gmtModify: ''

      },
      form: {
        name: '',
        namespace: '',
        onlineTime: '',
        expireTIme: '',
        url: '',
        value1: '',
        value2: ''
      },
      isFather: false,
      sonObject: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleNodeClick(data, node) {
      if (node.level == 2) this.result = true;
      if (node.level == 1) this.result = false;
    },
    createServiceCatalog() {
      this.dialogFormVisible = true;
      this.isFather = true;
    },
    createdcloudServiceCatalog(data) {
      this.dialogFormVisible = true;
      this.sonObject = data;
      this.isFather = false;
    },
    loadNode(node, resolve) {
      //
      if (node.level === 0) {
        return resolve(this.list);
      } else {
        getServiceSubdirectoryMessage(node.data.id).then(res => {
          return resolve(res.content.content);
          console.log(res.content.content)
        });
      }
    },
    // 修改云服务目录
    editServiceCatalog() {
      var data = {
        'description': this.content.description,
        'icon': this.content.icon,
        'name': this.content.name,
        'status': this.content.status,
        'tags': this.content.tags
      };
      updatecloudServiceCatalog(this.content.id, data).then(r => {
        if (r.code == 200) {
          this.$notify({
            message: '修改成功',
            type: 'success'
          });
          this.organizationShow = false;
          this.fetchData();
        } else {
          this.$notify({
            message: '修改失败，请重试',
            type: 'warning'
          });
        }
      });
    },

    // 创建云服务目录
    createdcloudServiceCatalogs() {
      if (this.isFather) {
        this.contents.parentId = 0;
      } else {
        this.contents.parentId = this.sonObject.id;
      }
      createdcloudServiceCatalog(this.contents).then(r => {
        if (r.code == 200) {
          this.$notify({
            message: r.message,
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();

        } else {
          this.$notify({
            message: r.message,
            type: 'warning'
          });
        }
        this.isFather = false;
      });
    },

    // 获取选择父节点id，name
    confirmChoice(data) {
      this.innerVisible = false;
      console.log(data.id);
      this.contents.levelName = data.name;
      this.contents.parentId = data.id;
      cosole.log(data.id)
    },
    // 显示新建内部模态框
    innerVisiblea() {
      this.innerVisible = true;
    },
    // 编辑组织机构模态框显示
    updatecloudServiceCatalog(data) {
      this.content = data;
      this.organizationShow = true;
    },
    // //机构信息
    // particulars(data) {
    //   this.$router.push({
    //     path: '/operatingCentre/serviceOperating/cloudServiceCatalog/detail/'+data.id
    //   });
    // },
    onSubmit() {
      console.log('submit!');
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getcloudServiceCatalogList);
      console.log(res);
      // this.metadata = res.metadata;
      this.list = res.content.content;
      console.log(this.list);
      this.listLoading = false;
    },

    fetchData() {
      this.listLoading = true;
      getcloudServiceCatalogList(this.listQuery).then(response => {
        console.log(response);
        this.list = response.content.content;
        console.log(this.list);
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      this.fetchData();
    },
    // 删除云服务目录
    deletedcloudServiceCatalog(id) {
      // console.log(id);

      this.$confirm('此操作将永久删除该云服务目录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletedcloudServiceCatalog(id).then(r => {
          if (r.code == 200) {
            this.fetchData();
            this.$notify({
              type: 'success',
              message: '删除成功!'
            });
          }
        });
      })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
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
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    online() {
      this.$confirm('此操作将上线该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '上线成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消上线'
          });
        });
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    last() {
      if (this.active-- < 0) this.active = 0;
    }, over() {
      this.active = 3;
      const o = setTimeout(() => {
        this.active = 0;
      }, 1000);
    }
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
