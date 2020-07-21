<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <!-- <el-button size="small" icon="el-icon-plus" type="primary" @click="dialogFormVisible = true">
              新建
            </el-button>-->
            <el-input
              v-model="searchInput"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              class="search-input"
              size="mini"
            />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            :data="list4"
            :expand-row-keys="expandRowKeys"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
            row-key="id"
            @row-click="handleRowClick"
          >
            <el-table-column type="selection"/>
            <el-table-column label="参数名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}/{{ scope.row.paramKey }}</span>
              </template>
            </el-table-column>
            <el-table-column label="变量所属catalog" align="center">
              <template slot-scope="scope">
                <span>XXX目录</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.operation }}</span>
              </template>
            </el-table-column>
            <el-table-column label="取值范围" align="center">
              <template slot-scope="scope">
                <span>100/1</span>
              </template>
            </el-table-column>
            <el-table-column label="是否必须" align="center">
              <template slot-scope="scope">
                <span>是</span>
              </template>
            </el-table-column>
            <el-table-column label="是否可为空" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.required }}</span>
              </template>
            </el-table-column>
            <el-table-column label="用户是否可编辑" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.editable }}</span>
              </template>
            </el-table-column>
            <el-table-column label="默认值" align="center">
              <template slot-scope="scope">
                <span>123</span>
              </template>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" align="center" width="80">
              <template slot-scope="scope">
                <el-link class="link" type="primary" >编辑</el-link>
              </template>
            </el-table-column>-->
          </el-table>
          <pagination :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisibleoutline" title="警告信息">
      <el-form ref="form" :model="form">
        <el-form-item label="是否删除云资源：">
          <div>
            <div>
              <el-radio v-model="radiodeleteCS" label="1">是</el-radio>
              <el-radio v-model="radiodeleteCS" label="2">否</el-radio>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="是否删除云服务SKU：">
          <div>
            <el-radio v-model="radiodeleteSKU" label="1">是</el-radio>
            <el-radio v-model="radiodeleteSKU" label="2">否</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="是否删除订阅信息：">
          <div>
            <el-radio v-model="radiodeleteSM" label="1">是</el-radio>
            <el-radio v-model="radiodeleteSM" label="2">否</el-radio>
          </div>
        </el-form-item>
        <el-progress v-if="isDelete==true" :percentage="percentage"/>
        <h4 v-if="guanbi==true" style="color:red">下线成功，{{ countA }}秒后关闭</h4>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDelete=true;increase()">执行</el-button>
        <el-button @click="dialogFormVisibleoutline = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisibledelete" title="警告信息">
      <el-form ref="form" :model="form">
        <el-form-item label="是否删除该云资源："/>
        <el-progress v-if="isDelete==true" :percentage="percentage"/>
        <h4 v-if="guanbi==true" style="color:red">删除成功，{{ countA }}秒后关闭</h4>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDelete=true;increase()">执行</el-button>
        <el-button @click="dialogFormVisibledelete = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible" title="新建云资源">
      <el-steps :active="active" finish-status="success">
        <el-step title="填写信息"/>
        <el-step title="认证"/>
        <el-step title="完成"/>
      </el-steps>
      <div v-if="active==0">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.namespace"/>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="form.namespace"/>
          </el-form-item>
          <el-form-item label="访问路径">
            <el-input v-model="form.url"/>
          </el-form-item>
          <el-form-item label="是否私有">
            <el-input/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="next()">下一步</el-button>
          <el-button type="primary" @click="dialogFormVisible = false;over()">创建</el-button>
          <el-button @click="dialogFormVisible = false;active=0">取 消</el-button>
        </div>
      </div>
      <div v-if="active==1">
        <el-form ref="form" :model="form">
          <el-form-item label="认证方式：">
            <div>
              <el-radio v-model="radioattestation" label="1">本地认证</el-radio>
              <el-radio v-model="radioattestation" label="2">远程认证</el-radio>
            </div>
          </el-form-item>
          <el-form-item label="远程认证信息：">
            <div>
              信息1：XXX
              信息2：XXX
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="last()">上一步</el-button>
          <el-button type="primary" @click="dialogFormVisible = false;over()">创建</el-button>
          <el-button @click="dialogFormVisible = false;active=0">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { Servelist } from "@/api/table";
import { getCloudResourceInfo } from '@/api/serviceOperating';
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
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      parameters: {
        clazz: '',
        constraints: '',
        defaultValue: '',
        deleted: false,
        editable: false,
        gmtCreate: '',
        gmtModify: '',
        id: 0,
        length: 0,
        name: '',
        operationId: 0,
        paramKey: '',
        required: true,
        reserved: true,
        resourceId: 0,
        scope: '',
        status: '',
        tags: '',
        operation: ''
      },
      jiekou: {
        id: '',
        url: ''
      },
      listLoading: true,
      searchInput: '',
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
      radioattestation: '',
      radiodeleteCS: '',
      radiodeleteSKU: '',
      radiodeleteSM: '',
      customColor: '#409eff',
      category: '个人',
      numberSKU: 20,
      privatelyOwned: 'YES',
      form: {
        name: '',
        namespace: '',
        onlineTime: '',
        expireTIme: '',
        url: '',

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            },
            {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }
          ]
        },
        value1: '',
        value2: ''
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
    },
    // 获取云资源信息
    fetchData() {
      getCloudResourceInfo(this.$route.params.id).then(response => {
        var listc = response.content.creation.parameters;
        var listm = response.content.modification.parameters;
        var listd = response.content.deletion.parameters;
        for (var i = 0; listc.length > i; i++) {
          this.parameters = listc[i];
          this.parameters.operation = response.content.creation.operation;
          this.list1.push(this.parameters);
        }
        for (var i = 0; listm.length > i; i++) {
          this.parameters = listm[i];
          this.parameters.operation = response.content.modification.operation;
          this.list2.push(this.parameters);
        }
        for (var i = 0; listd.length > i; i++) {
          this.parameters = listd[i];
          this.parameters.operation = response.content.deletion.operation;
          this.list3.push(this.parameters);
        }
        this.list4 = this.list1.concat(this.list2).concat(this.list3);

        this.listLoading = false;
      });
    },
    // 遍历数组
    list54(item, key) {
      for (var key in item) {
        this.list54(list4[key], key + ':');
      }
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
    increase() {
      const count = setInterval(() => {
        this.percentage++;
        if (this.percentage == 100) {
          this.percentage = 0;
          this.isDelete = false;
          this.guanbi = true;
          clearInterval(count);
          this.close();
        }
      }, 100);
    },
    close() {
      const counta = setInterval(() => {
        this.countA--;
        if (this.countA == 0) {
          clearInterval(counta);
          this.guanbi = false;
          this.dialogFormVisibleoutline = false;
          this.dialogFormVisibledelete = fasle;
          this.countA = 5;
        }
      }, 1000);
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
    },
    over() {
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
  margin: 0 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
