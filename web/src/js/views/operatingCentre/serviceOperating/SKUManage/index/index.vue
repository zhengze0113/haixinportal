<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <close-card :show-arrow="true" title="SKU管理列表" icon="list">
            <div class="right">
              <el-input
                v-model="searchInput"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                class="search-input"
              />
              <el-button-group>
                <el-button type="primary" @click="dialogFormVisible = true">
                  <svg-icon icon-class="plus" />新建
                </el-button>
                <el-button>
                  <svg-icon icon-class="delete" />删除
                </el-button>
              </el-button-group>
            </div>
            <el-table
              v-loading="listLoading"
              :data="list"
              :expand-row-keys="expandRowKeys"
              size="small"
              element-loading-text="Loading"
              fit
              highlight-current-row
              row-key="id"
              @row-click="handleRowClick"
            >
              <el-table-column type="selection" width="55"/>
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
              <el-table-column label="名称">
                <template slot-scope="scope">
                  <router-link
                    :to="{path: '/operatingCentre/serviceOperating/SKUManage/detail/'+scope.row.id}"
                    class="link"
                  >{{ scope.row.name }}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="SKU编码" width="110" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.Code }}</span>
                </template>
              </el-table-column>
              <el-table-column class-name="status-col" label="计费周期" width="110" align="center">
                <template slot-scope="scope">{{ scope.row.Period }}</template>
              </el-table-column>
              <el-table-column class-name="status-col" label="价格" width="110" align="center">
                <template slot-scope="scope">{{ scope.row.Price }}</template>
              </el-table-column>
              <el-table-column class-name="status-col" label="计费模式" width="110" align="center">
                <template slot-scope="scope">
                  <el-tag type="success">{{ scope.row.Mode }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column class-name="status-col" label="规格概述" width="110" align="center">
                <template slot-scope="scope">{{ scope.row.Specs }}</template>
              </el-table-column>
              <el-table-column
                class-name="status-col"
                label="创建SKU对象URL"
                width="110"
                align="center"
              >
                <template slot-scope="scope">{{ scope.row.creationUrl }}</template>
              </el-table-column>
              <el-table-column align="center" prop="created_at" label="创建时间" width="200">
                <template slot-scope="scope">
                  
                  <span>{{ scope.row.gmtCreate }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                  <div class="table-operator">
                    <el-button type="text" size="small" @click="handleClick(scope.row)">
                      <i class="el-icon-view" />
                      查看
                    </el-button>
                    <el-button type="text" size="small">
                      <i class="el-icon-edit" />
                      编辑
                    </el-button>
                    <el-dropdown szie="small" class="operator-dropdown">
                      <span class="el-dropdown-link">
                        <el-button type="text" size="small">更多</el-button>
                        <i class="el-icon-arrow-down el-icon--right" />
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <i class="el-icon-delete" />
                          删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination :table-change="tableChange" />
          </close-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="SUK名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="计费周期">
          <el-input v-model="form.Period"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.Price"/>
        </el-form-item>
        <el-form-item label="计费模式">
          <el-select v-model="form.Mode" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="规格概述">
          <el-input v-model="form.Specs"/>
        </el-form-item>
        <el-form-item label="URL">
          <el-input v-model="form.creationUrl"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSKUlist } from '@/api/table';
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
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      form: {
        name: '',
        displayName: '',
        description: '',
        status: ''
      },
      options: [
        {
          value: '选项1',
          label: '预付费'
        },
        {
          value: '选项2',
          label: '后付费'
        }
      ]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    fetchData() {
      this.listLoading = true;
      getSKUlist(this.listQuery).then(response => {
        this.list = response.data.items;
        this.listLoading = false;
      });
    },
    tableChange(pagination) {
      this.fetchData();
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
