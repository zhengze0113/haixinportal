<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-row>
            <el-col :span="24" style="margin-top:20px;">
              <el-tabs v-if="!listLoading" v-model="activeName">
                <el-tab-pane label="创建" name="first"><portDetial :arr="list1.creation" /></el-tab-pane>
                <el-tab-pane label="删除" name="second"><portDetial :arr="list1.deletion"/></el-tab-pane>
                <el-tab-pane label="变更" name="third"><portDetial :arr="list1.modification"/></el-tab-pane>
                <el-tab-pane label="执行" name="fourth"><portDetial :arr="list1.execution"/></el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getCloudResourceInfo } from '@/api/serviceOperating';
import Pagination from '@/components/pagination';
import portDetial from './portDetail/portDetail';
export default {
  components: {
    Pagination,
    portDetial
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
      list1: [],
      list2: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      activeName: 'first'
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取云资源信息
    fetchData() {
      getCloudResourceInfo(this.$route.params.id).then(response => {
        this.list1 = response.content;
        console.log(this.list1);
        // this.jsonzhuanlist(JSON.parse(response.content.creation.template), '', 'creation');
        // this.jsonzhuanlist(JSON.parse(response.content.modification.template), '', 'modification');
        // this.jsonzhuanlist(JSON.parse(response.content.deletion.template), '', 'deletion');
        this.listLoading = false;
        // 转化成一个list
      });
    },
    jsonzhuanlist(json, str, type) {
      // 三个json的key全部拿到
      for (var key in json) {
        if (typeof json[key] === 'object') {
          this.jsonzhuanlist(json[key], key + '.');
        } else {
          var forjiekou = {
            url: '', type: ''
          };
          forjiekou.url = str + key;
          forjiekou.type = type;
          this.list2.push(forjiekou);
        }
      }
    },

    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
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
  margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
