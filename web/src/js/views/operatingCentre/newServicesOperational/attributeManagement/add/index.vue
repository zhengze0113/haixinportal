<template>
  <div style="background:#fff;">
    <el-row style="background:#fff;padding:10px;margin: 0px 20% 0 20%;">
      <el-steps :active="active" finish-status="success">
        <el-step title="参数配置"></el-step>
        <el-step title="入参定义"></el-step>
      </el-steps>
    </el-row>
    <el-row v-if="!showBtn">
      <el-form
        ref="addList"
        :model="addList"
        :inline="true"
        :rules="addList"
        label-position="right"
        label-width="120px"
        class="demo-addList"
        style="border-bottom:1px dashed #bbb"
      >
        <el-row style="background:#fff;padding:30px 10px 0 50px;">
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="参数编码：" prop="code">
                <el-input v-model="addList.code" :disabled="true" placeholder="系统自动生成" />
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: 2%;">
              <el-form-item
                label="云资源："
                prop="resourceCode"
                :rules="[{ required: true, message: '云资源不能为空' }]"
              >
                <el-select v-model="addList.resourceCode" placeholder="请选择云资源">
                  <el-option
                    v-for="item in list1"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item
                label="参数组名称："
                prop="name"
                :rules="[{ required: true, message: '参数组名称不能为空' }]"
              >
                <el-input v-model="addList.name" placeholder="请输入参数组名称" />
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: 2%;">
              <el-form-item
                label="云服务："
                prop="serviceCode"
                :rules="[{ required: true, message: '云服务不能为空' }]"
              >
                <el-select v-model="addList.serviceCode" placeholder="请选择云服务">
                  <el-option
                    v-for="item in list2"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-form-item
            label="关键字："
            :rules="[{ required: true, message: '关键字不能为空' }]"
            prop="keyword"
          >
            <el-input
              v-model="addList.keyword"
              onkeyup="value=value.replace(/[^\a-\z]/g,'')"
              onpaste="value=value.replace(/[^\a-\z]/g,'')"
              oncontextmenu="value=value.replace(/[^\a-\z]/g,'')"
              placeholder="请输入关键字"
            />
          </el-form-item>
          <el-form-item
            label="认证方式："
            prop="autMethod"
            :rules="[{ required: true, message: '认证方式不能为空' }]"
          >
            <el-select v-model="addList.autMethod" placeholder="请选择认证方式">
              <el-option
                v-for="item in autMethods"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="描述：" prop="description">
            <el-input v-model="addList.description" type="textarea" placeholder="请输入描述文本（不超过50字）" />
          </el-form-item>
        </el-row>
        <el-row style="background:#fff;padding:30px 10px 0 50px;">
          <el-col class="title">请求基础定义</el-col>
          <el-col>
            <el-form-item
              label="请求类型"
              prop="requestType"
              :rules="[{ required: true, message: '请求类型不能为空' }]"
            >
              <el-select v-model="addList.requestType" placeholder="请选择请求类型">
                <el-option
                  v-for="item in requestTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="协议"
              prop="protocol"
              :rules="[{ required: true, message: '协议不能为空' }]"
            >
              <el-select v-model="addList.protocol" placeholder="请选择协议">
                <el-option
                  v-for="item in protocols"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="请求Path"
              prop="requestPath"
              :rules="[{ required: true, message: '请求Path不能为空' }]"
            >
              <el-input v-model="addList.requestPath" placeholder="请输入path" />
            </el-form-item>
            <el-form-item
              label="HTTP METHOD"
              prop="httpMethod"
              :rules="[{ required: true, message: 'HTTP METHOD不能为空' }]"
            >
              <el-select v-model="addList.httpMethod" placeholder="请选择HTTP METHOD">
                <el-option
                  v-for="item in httpMethods"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="入参请求模式"
              prop="paramModel"
              :rules="[{ required: true, message: '入参请求模式不能为空' }]"
            >
              <el-select v-model="addList.paramModel" placeholder="请选择入参请求模式">
                <el-option
                  v-for="item in paramModels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <!-- 参数定义 -->
    <el-row v-if="showBtn">
      <!-- <el-col class="title">入参定义</el-col> -->
      <el-col style="padding: 0 20px;">
        <el-form ref="list" :model="list" label-position="right">
          <el-table :data="list.cloudParametersPar" style="width: 100%">
            <el-table-column label="显示名称" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'cloudParametersPar.' +scope.$index + '.paramName'"
                  :rules="[
                            { required: true, message: '请输入显示名称' }
                          ]"
                >
                  <el-input v-model="scope.row.paramName" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参数名" align="center">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'cloudParametersPar.' +scope.$index + '.name'"
                  :rules="[
                            { required: true, message: '请输入参数名' }
                          ]"
                >
                  <el-input v-model="scope.row.name" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="参数位置" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <el-select v-model="scope.row.paramPosition">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="类型" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <el-select v-model="scope.row.type">
                    <el-option
                      v-for="item in typeoptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="必填" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <el-checkbox v-model="scope.row.isRequired" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="默认值" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.defaultValue" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="校检规则" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.checkRule" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.description" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <el-link class="link" type="danger" @click="deleteList(scope.row)">移除</el-link>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-col>
      <el-col>
        <el-col :span="2" class="addBtnCol">
          <el-button class="addBtn" @click="add()">
            <img src="web/static/images/attribute/jiahao.png" alt style="width:12%;" /> 新增一条
          </el-button>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:20px 30px;">
      <el-button v-if="showBtn" class="showBtn" type="primary" @click="ok('list')">保存</el-button>
      <el-button v-if="!showBtn" class="showBtn" @click="cancel()">取消</el-button>
      <el-button v-if="!showBtn" class="showBtn" type="primary" @click="setpdown('addList')">下一步</el-button>
      <el-button v-if="showBtn" class="showBtn" @click="setptop()">返回上一步</el-button>
    </el-row>
  </div>
</template>
<script>
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  addParams, // 创建
  editParams, // 编辑
  getParams, // 获取总
  deleteParams, // 删除
  getCloudServiceList,
  getResourcesList,
} from "@/api/serviceOperating";
export default {
  data() {
    return {
      active: 0,
      list: {
        cloudParametersPar: [
          {
            name: "",
            paramName: "",
            paramPosition: "",
            type: "",
            isRequired: true,
            defaultValue: "",
            checkRule: "",
            description: "",
          },
        ],
      },
      list1: [],
      list2: [],
      value: null,
      showBtn: false,
      autMethods: [
        {
          value: "海油OpenID",
          label: "海油OpenID",
        },
        {
          value: "无认证",
          label: "无认证",
        },
        {
          value: "平台ID",
          label: "平台ID",
        },
      ],
      requestTypes: [
        {
          value: "普通请求",
          label: "普通请求",
        },
        {
          value: "注册请求(双向通行)",
          label: "注册请求(双向通行)",
        },
        {
          value: "注销请求(双向通行)",
          label: "注销请求(双向通行)",
        },
        {
          value: "下行通知请求(双向通行)",
          label: "下行通知请求(双向通行)",
        },
      ],
      protocols: [
        {
          value: "HTTP",
          label: "HTTP",
        },
        {
          value: "HTTPS",
          label: "HTTPS",
        },
        {
          value: "WEBSOCKET",
          label: "WEBSOCKET",
        },
      ],
      httpMethods: [
        {
          value: "get",
          label: "get",
        },
        {
          value: "post",
          label: "post",
        },
        {
          value: "patch",
          label: "patch",
        },
        {
          value: "put",
          label: "put",
        },
        {
          value: "head",
          label: "head",
        },
        {
          value: "delete",
          label: "delete",
        },
        {
          value: "options",
          label: "options",
        },
        {
          value: "any",
          label: "any",
        },
      ],
      paramModels: [
        {
          value: "入参映射",
          label: "入参映射",
        },
        {
          value: "入参透传",
          label: "入参透传",
        },
      ],
      options: [
        {
          value: "parameterpath",
          label: "parameterpath",
        },
        {
          value: "head",
          label: "head",
        },
        {
          value: "query",
          label: "query",
        },
      ],
      typeoptions: [
        {
          value: "String",
          label: "String",
        },
        {
          value: "Int",
          label: "Int",
        },
        {
          value: "Long",
          label: "Long",
        },
        {
          value: "Float",
          label: "Float",
        },
        {
          value: "Double",
          label: "Double",
        },
        {
          value: "Boolean",
          label: "Boolean",
        },
      ],
      addList: {
        code: "",
        resourceCode: "",
        name: "",
        serviceCode: "",
        keyword: "",
        autMethod: "",
        description: "",
        requestType: "",
        protocol: "",
        requestPath: "",
        httpMethod: "",
        paramModel: "",
      },
    };
  },
  mounted() {},
  created() {
    this.fetchData();
  },
  methods: {
    cancel() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/attributemanagement",
      });
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getCloudServiceList, this.search);
      this.list2 = res.content.content;
      const res1 = await requestParams(getResourcesList, this.search);
      this.list1 = res1.content.content;
      this.metadataSelect = res1.metadata;
      this.metadata = res.metadata;

      this.listLoading = false;
    },
    ok(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.showBtn = true;
          this.active = 0;
          this.addList.cloudParametersPar = this.list.cloudParametersPar;
          console.log(this.addList);
          addParams(this.addList).then((res) => {
            console.log(res);
            if (res.code == 201) {
              this.$notify({
                message: res.message,
                type: "success",
              });
              this.cancel();
            } else {
              this.$notify({
                message: res.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setpdown(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.showBtn = true;
          if (this.active++ > 2) this.active = 0;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    setptop() {
      this.showBtn = false;
      this.active = 0;
    },
    deleteList(row) {
      for (var i = 0; i < this.list.cloudParametersPar.length; i++) {
        if (row.index == this.list.cloudParametersPar[i].index) {
          this.list.cloudParametersPar.splice(i, 1);
        }
      }
    },
    // 新增一条
    add() {
      var obj = {
        name: "",
        paramName: "",
        paramPosition: "",
        type: "",
        isRequired: false,
        defaultValue: "",
        checkRule: "",
        description: "",
      };
      obj.index = this.list.cloudParametersPar.length + 1;
      this.list.cloudParametersPar.push(obj);
    },
  },
};
</script>
<style lang="scss" scoped>
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
.addBtnCol {
  margin-left: 30px;
  /deep/ .el-button:active {
    background: #fff;
  }
  /deep/ .el-button:focus,
  .el-button:hover {
    background: #fff;
  }
}
.addBtn {
  border: none;
  color: #0261a7;
  &:hover,
  &:focus {
    background: #fff !important;
  }
}
.showBtn {
  float: right;
  margin-left: 1%;
}
.step {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
/deep/ .el-form-item {
  width: 100%;
}
/deep/ .el-form-item__content {
  width: 75%;
  /deep/ .el-select {
    width: 100%;
  }
}
/deep/ .el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
/deep/ .el-input__inner {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
/deep/ .el-table__header thead .cell {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}
.top {
  background: #fff;
}
/deep/.el-table__row /deep/.el-form-item__content {
  width: 100%;
}
</style>
