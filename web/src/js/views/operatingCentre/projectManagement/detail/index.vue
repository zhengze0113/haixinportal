<template>
  <div>
    <el-row
      style="padding:15px 22px;;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6;"
    >
      <div class="grid-content bg-purple">
        <div class="left">
          <span style="color:#0261A7;line-height: 30px;">详情</span>
        </div>
        <div class="right">
          <el-button
            type="primary"
            size="xx-small"
            icon="el-icon-back"
            @click="back"
          >返回</el-button
          >
        </div>
      </div>
    </el-row>
    <el-row
      style="padding:15px 22px;;background:#fff; border-bottom: 1px solid rgb(230, 230, 230);"
    >
      <el-col :span="24" style="margin-top:7px;font-size: 12px;">
        <el-col :span="8">
          <el-col :span="6">项目组名称：</el-col>
          <el-col :span="16">{{ info.projectName }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">归属组织：</el-col>
          <el-col :span="16">{{ info.deptName }}</el-col>
        </el-col>
      </el-col>
      <el-col :span="24" style="margin-top:7px;font-size: 12px;">
        <el-col :span="8">
          <el-col :span="6">创建时间：</el-col>
          <el-col :span="16">{{ info.gmtCreate }}</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">描述：</el-col>
          <el-col :span="16">{{ info.description }}</el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:15px 22px;;background:#fff;">
      <el-tabs
        ref="tab"
        v-model="activeName"
        type="card"
        style="background:#fff"
      >
        <el-tab-pane type="primary" label="人员管理" name="first">
          <el-row>
            <el-col :span="16">
              <div class="left">
                <el-button
                  type="primary"
                  size="small"
                  @click="addSpecification = true"
                >添加成员</el-button
                >
              </div>
            </el-col>
            <el-col :span="8">
              <el-col
                :span="5"
                style="line-height:32px"
                class="right"
              >项目名称:</el-col
              >
              <el-col :span="13">
                <el-input
                  size="mini"
                  class="right"
                  placeholder="请输入项目组名称进行查询"
                />
              </el-col>
              <el-col :span="6">
                <el-button
                  class="right"
                  size="small"
                  icon="el-icon-search"
                >查询</el-button
                >
              </el-col>
            </el-col>
            <el-col :span="24" style="margin-bottom:2px;">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table
                    :data="userListFrom"
                    :span-method="objectSpanMethod"
                    size="small"
                    element-loading-text="Loading"
                    fit
                    highlight-current-row
                    row-key="id"
                  >
                    <el-table-column
                      label="成员名称"
                      align="center"
                      show-overflow-tooltip
                      prop="name"
                    >
                      <!-- <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                      </template> -->
                    </el-table-column>
                    <el-table-column
                      label="角色"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.userRole }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="组织机构"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.deptName
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="性别"
                      align="center"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.userExtension.sex
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="联系方式" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.mobilePhone }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="加入项目时间" align="center">
                      <template slot-scope="scope">
                        <span>{{
                          scope.row.createTime
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button type="text" @click="deleteUser(scope.row.id)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane type="primary" label="资源空间" name="second">
          <el-row>
            <el-col :span="15">
              <div class="left">
                <el-button
                  type="primary"
                  size="small"
                  @click="addResourceSpace = true"
                >添加资源空间</el-button
                >
              </div>
            </el-col>
            <el-col :span="9">
              <el-col
                :span="6"
                style="line-height:32px"
                class="right"
              >资源空间名称:</el-col
              >
              <el-col :span="12">
                <el-input
                  size="mini"
                  class="right"
                  placeholder="请输入资源空间名称进行查询"
                />
              </el-col>
              <el-col :span="6">
                <el-button
                  class="right"
                  size="small"
                  icon="el-icon-search"
                >查询</el-button
                >
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table :data="list1" size="small">
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="资源空间名称"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.time
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="别名"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.content
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="规格"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.result
                      }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="描述"
                      align="center"
                    >
                      <template slot-scope="scope">{{
                        scope.row.result
                      }}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-dialog :visible.sync="addSpecification" title="添加成员" width="60%">
      <el-form
        :model="skuParameter"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div style="text-align: center">
          <start
            v-model="value"
            :middle-value="middleValue"
            :left-default-checked="leftDefaultChecked"
            :middle-default-checked="middleDefaultChecked"
            :right-default-checked="rightDefaultChecked"
            :titles="titles"
            :button-texts="buttonTexts"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :data="data"
            style="text-align: left; display: inline-block"
            filterable
            @middleValueChange="middleValueChange"
            @change="handleChange"
          >
            <span
              slot-scope="{ option }"
            >{{ option.label }}</span
            >
          </start>
        </div>

        <el-form-item
          style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
        >
          <el-button type="primary" @click="addUser();addSpecification = false">保存</el-button>
          <el-button @click="addSpecification = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="addResourceSpace"
      title="添加资源空间"
      width="60%"
    >
      <el-form
        :model="skuParameter"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <div class="table-wrap">
              <el-table :data="list1" size="small">
                <el-table-column type="selection"/>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="资源空间名称"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.time }}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="别名"
                  align="center"
                >
                  <template slot-scope="scope">{{
                    scope.row.content
                  }}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="规格"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.result }}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="描述"
                  align="center"
                >
                  <template slot-scope="scope">{{ scope.row.result }}</template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-form-item
          style="text-align:right;border-top:1px solid #d3d3d3;margin-top: 40px;padding-top: 10px;"
        >
          <el-button type="primary" >保存</el-button>
          <el-button @click="addResourceSpace = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getUser } from '@/api/user';
import { getProjectInfo, getProjectUser, addProjectUser, deleteProjectUser } from '@/api/projectManage';
import Start from '../components/test';
export default {
  components: {
    Pagination,
    start: Start
  },
  data() {
    return {
      info: {},
      search: { page: 1, rows: 10 },
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
      addSpecification: false,
      addResourceSpace: false,
      activeName: 'first',
      userListFrom: [],
      list: [],
      lists: {},
      list1: [
        {
          time: '20191122 10:45:30',
          content: '平台管理员（杨阳）发送了一条催办',
          result: '成功'
        },
        {
          time: '20191122 10:30:30',
          content: '员工（张三）发送了一条催办',
          result: '成功'
        },
        {
          time: '20191122 09:45:30',
          content: '租户管理员（汪明泉）正在审批中',
          result: '-'
        },
        {
          time: '20191122 09:45:23',
          content: '部门管理员（刘洋名）已审批',
          result: '通过'
        },
        {
          time: '20191122 09:05:35',
          content: '订单创建成功，提交至部门管理员审批',
          result: '成功'
        }
      ],
      rules: {
        name: [{ required: true, message: '请输入规格名称', trigger: 'blur' }]
      },
      skuParameter: {
        CPU: 0,
        code: '',
        memory: 0,
        storage: 0,
        keyword: '',
        catalogId: 0,
        code: '',
        description: '',
        icon: '',
        initStock: 0,
        name: '',
        orgId: 0,
        price: {},
        resourceId: '',
        serviceId: '',
        specContent: '',
        specs: [],
        status: '',
        stock: 0,
        tags: '',
        tenantId: 0,
        userId: 0
      },
      middleValue: [],
      rightValue: [],
      leftDefaultChecked: [2, 3],
      middleDefaultChecked: [5, 6],
      rightDefaultChecked: [1],
      titles: ['选择用户', '项目名称', '项目经理 '],
      buttonTexts: ['到左边', '到右边', '到上面', '到下面'],
      // value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      }, addList: []
    };
  },
  created() {
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    async fetchData() {
      this.userListFrom = [];
      const info = await requestParams(getProjectInfo, this.$route.params.id);
      this.info = info.content;
      const list = await requestParams(getProjectUser, this.$route.params.id);
      this.list = list.content.content;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].roleAndDept != null) {
          for (let j = 0; j < this.list[i].roleAndDept.length; j++) {
            const key = Object.keys(this.list[i].roleAndDept[j]);
            const value = Object.values(this.list[i].roleAndDept[j]);
            const data = this.list[i];
            if (key.length > 0) {
              for (let n = 0; n < key.length; n++) {
                data.userRole = key[n];
                data.deptName = value[n];
                this.userListFrom.push(data);
              }
            } else {
              data.userRole = '';
              data.deptName = '';
              this.userListFrom.push(data);
            }
          }
        }
      }
      console.log(this.userListFrom);
      const res = await requestParams(getUser, this.search);
      const userList = res.content.content;
      for (let j = 0; j < this.list.length; j++) {
        for (let i = 1; i < userList.length; i++) {
          if (this.list[j].id == userList[i].id) {
            userList.splice(i, 1);
          }
        }
      }
      for (let i = 1; i < userList.length; i++) {
        this.data.push({
          key: userList[i].id,
          label: userList[i].name
        });
      }
      // const res1 = await requestParams(getProject);
      // console.log(res1);
      // this.optionProject = res1.content.content;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    async initSelect() {},
    // 添加
    async addUser() {
      const data = [];
      for (let i = 0; i < this.addList.length; i++) {
        for (let j = 0; j < this.middleValue.length; j++) {
          if (this.addList[i] == this.middleValue[j]) {
            this.addList.splice(i, 1);
          }
          data.push({
            id: this.middleValue[j],
            type: ''
          });
        }
      }
      for (let i = 0; i < this.addList.length; i++) {
        data.push({
          id: this.addList[i],
          type: 'ROLE_MANAGER'
        });
      }
      console.log(data);
      // const res = await requestParams(addProjectUser, this.$route.params.id, data);
      addProjectUser(this.$route.params.id, data).then(r => {
        console.log(r);
      });
      // console.log(res);
      this.fetchData();
    },
    back() {
      this.$router.push({
        path: '/operatingCentre/projectManagement'
      }); // 返回上一层
    },
    handleChange(value, direction, movedKeys) {
      // console.log(value, direction, movedKeys);
      for (let i = 0; i < movedKeys.length; i++) {
        this.addList.push(movedKeys[i]);
      }
    },
    middleValueChange(value) {
      this.middleValue = value;
    },
    deleteUser(id) {
      const data = [];
      data.push(id);
      deleteProjectUser(this.$route.params.id, data).then(r => {
        console.log(r);
        this.fetchData();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../rewrite.scss";
.return {
  margin-top: 7px;
  margin-left: 7px;
  margin-bottom: 12px;
}
.row {
  margin-left: 7px;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
</style>
