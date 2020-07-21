<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <div class="left" style="margin-right:27px;">
            <el-input v-model="searchInput" size="mini" placeholder="请输入内容" class="search-input" />
            <el-button size="small" icon="el-icon-search">搜索</el-button>
          </div>
          <!--<el-button-group>
              <el-button type="primary" @click="dialogFormVisible = true" size="small">
                <svg-icon icon-class="plus" />新建
              </el-button>
            </el-button-group>-->

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
            <el-table-column type="selection" width="30"/>
            <el-table-column label="模板名称" align="center" fixed="left">
              <template slot-scope="scope">
                <!--<router-link
                  :to="{path: '/operatingCentre/flowApproval/detail/example/'+scope.row.id}"
                  class="link"
                ></router-link>-->  {{ scope.row.name }}
              </template>
            </el-table-column>

            <el-table-column label="模板类型" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">{{ scope.row.defaultName }}</template>
            </el-table-column>

            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.onlineTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建人" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.defaultName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="editTemplate()">编辑</el-button>
                <el-button type="text" size="small" >删除</el-button>
                <el-button type="text" size="small" >禁用</el-button>
                <el-button type="text" size="small" @click="dialogFormVisibleReporting = true">报表生成</el-button>
                <el-button type="text" size="small" @click="dialogTableVisibleTable = true">历史报表</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :table-change="tableChange" />
        </div>
      </el-col>
    </el-row>

    <!-- 编辑 -->
    <el-dialog :visible.sync="dialogFormVisible" title="模板编辑">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="模板名称">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="模板内容编辑区">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 报表生成 -->
    <el-dialog :visible.sync="dialogFormVisibleReporting" title="模板编辑">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="报表模板">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="生成方式">
          <el-select v-model="form.type" placeholder="请选择生成方式">
            <el-option label="单次" value="one"/>
            <el-option label="周期" value="for"/>
          </el-select>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="单次时间范围">
          <el-date-picker
            v-model="value1"
            :default-time="['12:00:00']"
            style="width:55%;"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
          <el-date-picker
            v-model="value1"
            style="width:40%;"
            type="datetime"
            placeholder="选择生成时间"/>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="周期时间配置">

          <el-input v-model="input" placeholder="周期" style="width:27%;"/>

          <el-date-picker
            v-model="value1"
            style="width:40%;"
            type="datetime"
            placeholder="选择生成时间"/>
          <el-input v-model="input" placeholder="循环次数" style="width:27%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisibleReporting = false">取 消</el-button>
        <el-button type="primary" size="small" @click="dialogFormVisibleReporting = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogTableVisibleTable" title="历史报表">
      <el-table :data="gridData">
        <el-table-column property="date" label="编号" />
        <el-table-column property="date" label="生成时间" />
        <el-table-column property="name" label="模板名称" />
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">下载</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/pagination';
import { Servelist } from '@/api/table';

export default {
  components: {
    Pagination
  },
  data() {
    return {
      list: [],
      listLoading: true,
      searchInput: '',
      expandRowKeys: [],
      dialogFormVisible: false,
      dialogFormVisibleReporting: false,
      dialogTableVisibleTable: false,
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
      form: { name: '', type: 'one' },
      formLabelWidth: '120px',
      value1: '',
      input: '',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
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
      Servelist(this.listQuery).then(response => {
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
    },
    editTemplate() {
      this.dialogFormVisible = true;
    }
  }
};
</script>
<style scoped>
  .search-input {
  width: 150px;
  margin:0 10px;
}
</style>

