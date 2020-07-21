<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left">
            <el-button
              size="small"
              icon="el-icon-plus"
              type="primary"
              @click="dialogFormVisible = true"
            >新建</el-button>
            <!-- <el-button
              :disabled="disabled"
              size="small"
              icon="el-icon-delete"
              @click="patchDeletedTP()"
            >批量删除</el-button> -->
            <!-- <el-input v-model="searchInput" size="mini" placeholder="请输入联系地址" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button> -->
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
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" />

            <el-table-column :show-overflow-tooltip="true" label="通信地址+邮编"align="center">
              <template
                slot-scope="scope"
              >{{ scope.row.country+scope.row.province+scope.row.city+scope.row.detailAddress }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="电话" align="center">
              <template slot-scope="scope">{{ scope.row.sex }}</template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" align="center" label="邮件">
              <template slot-scope="scope">
                <span>{{ scope.row.zipcode }}</span>
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" label="SNS账号" align="center">
              <template slot-scope="scope">{{ scope.row.position }}</template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <div class="table-operator">
                  <el-link type="primary" class="link" @click="editTP(scope.row)">编辑</el-link>
                  <el-link class="link" type="danger" @click="deleteTP(scope.row.id)">删除</el-link>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange" :metadata="metadata" />
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" title="新建">
      <el-row :gutter="20">
        <el-col :span="20" :offset="3">
          <div class="grid-content bg-purple">
            <el-form :inline="true" :model="addPostaddresses" class="demo-form-inline">
              <el-row>
                <el-col :span="17">
                  <el-form-item label="通讯地址">
                    <el-input
                      v-model="addPostaddresses.country"
                      placeholder="请输入国家"
                      style="width:150px;"
                      size="mini"/>
                    <el-input
                      v-model="addPostaddresses.province"
                      placeholder="请输入省份"
                      style="width:150px;"
                      size="mini"/>
                    <el-input
                      v-model="addPostaddresses.city"
                      placeholder="请输入城市"
                      style="width:150px;"
                      size="mini"/>
                      <!-- <el-select
                      v-model="addPostaddresses.country"
                      placeholder="国家"
                      style="width:76px;"
                      size="mini"
                    >
                      <el-option
                        v-for="item in country"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <el-select
                      v-model="addPostaddresses.province"
                      placeholder="省份"
                      style="width:76px;"
                      size="mini"
                    >
                      <el-option
                        v-for="item in province"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <el-select
                      v-model="addPostaddresses.city"
                      placeholder="城市"
                      style="width:76px;"
                      size="mini"
                    >
                      <el-option
                        v-for="item in city"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> -->
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-form-item label="邮编" style="padding-left:30px;">
                <el-input
                  style="width:230px;"
                  v-model="addPostaddresses.zipCode"
                  placeholder="请输入邮编"
                />
              </el-form-item>-->
              <!-- <el-form-item label="电话" style="padding-left:30px;">
                <el-input
                  style="width:230px;"
                  v-model="addPostaddresses.level"
                  placeholder="请输入电话"
                />
              </el-form-item>-->
              <el-row>
                <el-col>
                  <el-form-item label="邮件" style="padding-left:25px;">
                    <el-input
                      v-model="addPostaddresses.zipCode"
                      style="width:230px;"
                      placeholder="请输入邮件"
                      size="mini"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-form-item label="SNS账号">
                <el-input
                  style="width:230px;"
                  v-model="addPostaddresses.level"
                  placeholder="请输入SNS账号"
              />-->
              <!-- </el-form-item> -->
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="close()">取 消</el-button>
        <el-button size="small" type="primary" @click="addTP();close()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibleUpdate" title="编辑">
      <el-row :gutter="20">
        <el-col :span="20" :offset="3">
          <div class="grid-content bg-purple">
            <el-form :inline="true" :model="editPostaddressesUpdata" class="demo-form-inline">
              <el-form-item label="通讯地址">
                <el-input
                  v-model="editPostaddressesUpdata.country"
                  placeholder="请输入国家"
                  style="width:76px;"
                  size="mini"/>
                <el-input
                  v-model="editPostaddressesUpdata.province"
                  placeholder="请输入省份"
                  style="width:76px;"
                  size="mini"/>
                <el-input
                  v-model="editPostaddressesUpdata.city"
                  placeholder="请输入城市"
                  style="width:76px;"
                  size="mini"/>
                  <!-- <el-select

                >
                  <el-option
                    v-for="item in country"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /> -->
                  <!-- </el-select> -->
                  <!-- <el-select
                  v-model="editPostaddressesUpdata.province"
                  placeholder="请输入省份"
                  style="width:76px;"
                  size="mini"
                >
                  <el-option
                    v-for="item in province"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select
                  v-model="editPostaddressesUpdata.city"
                  placeholder="请输入城市"
                  style="width:76px;"
                  size="mini"
                >
                  <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select> -->
              </el-form-item>
              <!-- <el-form-item label="邮编" style="padding-left:25px;">
                <el-input
                  style="width:230px;"
                  v-model="editPostaddressesUpdata.zipcode"
                  placeholder="请输入邮编"
                  size="mini"
                />
              </el-form-item> -->
              <!-- <el-form-item label="电话" style="padding-left:30px;">
                <el-input
                  style="width:230px;"
                  v-model="addPostaddresses.level"
                  placeholder="请输入电话"
                />
              </el-form-item>-->
              <el-form-item label="邮件" style="padding-left:25px;">
                <el-input
                  v-model="editPostaddressesUpdata.zipcode"
                  style="width:230px;"
                  placeholder="请输入邮件"
                />
              </el-form-item>
              <!-- <el-form-item label="SNS账号">
                <el-input
                  style="width:230px;"
                  v-model="addPostaddresses.level"
                  placeholder="请输入SNS账号"
              />-->
              <!-- </el-form-item> -->
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel()">取 消</el-button>
        <el-button size="small" type="primary" @click="editTPInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTenantPostaddresses,
  addTenantPostaddresses,
  editTenantPostaddresses,
  deleteTenantPostaddresses,
  deleteTPs
} from '@/api/tenant';
import { requestParams, parseHash } from '@/utils/urlParam';
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
      disabled: true,
      list: [],
      listLoading: true,
      searchInput: '',
      update: false,
      add: false,
      dialogFormVisible: false,
      dialogFormVisibleUpdate: false,
      metadata: undefined,
      search: { page: 1, rows: 10 },
      patchDeleted: null,
      expandRowKeys: [],
      addPostaddresses: {
        city: '',
        country: '',
        detailAddress: '',
        province: '',
        tags: '',
        zipCode: 100086
      },
      editPostaddressesUpdata: {
        city: '',
        country: '',
        detailAddress: '',
        province: '',
        tags: '',
        zipCode: 100086
      },
      country: [
        {
          value: '中国',
          label: '中国'
        }
      ],
      province: [
        {
          value: '北京',
          label: '北京'
        }
      ],
      city: [
        {
          value: '东城区',
          label: '东城区'
        },
        {
          value: '朝阳区',
          label: '朝阳区'
        }
      ]
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getTenantPostaddresses(this.$route.params.id, this.search).then(
        response => {
          this.metadata = response.metadata;
          this.list = response.content.content;
          console.log(this.list);
          this.listLoading = false;
        }
      );
    }, // 新建联系地址
    addTP() {
      const data = JSON.parse(JSON.stringify(this.addPostaddresses));
      addTenantPostaddresses(this.$route.params.id, data).then(r => {
        console.log(data);
        if (r.code === 201) {
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
      });
    },
    // 编辑
    editTP(row) {
      console.log(row);
      this.editPostaddressesUpdata = row;
      this.dialogFormVisibleUpdate = true;
    },
    editTPInfo() {
      editTenantPostaddresses(
        this.editPostaddressesUpdata.id,
        this.editPostaddressesUpdata
      ).then(r => {
        if (r.code == 201) {
          this.fetchData();
          this.dialogFormVisibleUpdate = false;
          this.$notify({
            message: r.message,
            type: 'success'
          });
        } else {
          this.$notify({
            message: r.message,
            type: 'error'
          });
        }
      });
    },
    // 编辑页面取消按钮
    cancel() {
      this.fetchData();
      this.dialogFormVisibleUpdate = false;
    },
    // 删除方法
    deleteTP(id) {
      console.log(id);
      this.$confirm('此操作将永久删除该联系地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTenantPostaddresses(id).then(r => {
            if (r.code == 204) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: r.message
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: r.message
          });
        });
    },
    // 批量删除
    patchDeletedTP() {
      console.log(this.patchDeleted);
      const data1 = [];
      for (var i = 0; i < this.patchDeleted.length; i++) {
        console.log(this.patchDeleted[i].id);
        data1.push(this.patchDeleted[i].id);
      }
      console.log(data1);
      this.$confirm('此操作将永久删除联系地址, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteTPs(data1).then(r => {
            if (r.code == 204) {
              this.fetchData();
              this.$notify({
                type: 'success',
                message: r.message
              });
            } else {
              this.$notify({
                type: 'info',
                message: r.message
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
    tableChange({ page, rows }) {
      this.search.page = page;
      rows && (this.search.rows = rows);
      this.fetchData();
    },
    handleSelectionChange(rows) {
      this.patchDeleted = rows;
      if (this.patchDeleted.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    close() {
      this.addPostaddresses = {};
      this.$nextTick(() => {
        this.$refs[this.addPostaddresses].resetFields();
      });
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../rewrite.scss";
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

.search-input {
  width: 150px;
  margin: 0 10px;
}
// .link {
//   font-size: 12px;
//   display: inline-block;
//   margin: auto 7.5px;
// }
// .el-select-dropdown__item.hover {
//   background-color: #e9f1f8;
//   color: #259fd4;
// }
// .el-form-item__label{
//   font-size: 12px;
//   }
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
