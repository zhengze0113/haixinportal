<template>
  <div>
    <el-row
      style="padding:15px 22px;;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6;"
    >
      <div class="grid-content bg-purple">
        <div class="left">
          <span style="color:#0261A7;line-height: 30px;">规格详情</span>
        </div>
        <div class="right">
          <el-button type="primary" size="mini" icon="el-icon-back" @click="back">返回</el-button>
        </div>
      </div>
    </el-row>
    <el-row style="padding:15px 22px;;background:#fff;border-bottom: 1px solid rgb(230, 230, 230);">
      <el-col :span="3" style="padding: 8px 0px 0px 42px;">
         <img src="web/static/images/gailanPrice.png">
      </el-col>
      <el-col :span="21" style="margin-top:7px;">
        <el-row style="margin-bottom:20px;">
          <el-col :span="8">
            <el-col :span="6" class="title1">规格编码：</el-col>
            <el-col :span="16" class="detail">{{pricingFrom.code}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="6" class="title1">规格项名称：</el-col>
            <el-col :span="16" class="detail">{{pricingFrom.name}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="6" class="title1">关键字：</el-col>
            <el-col :span="16" class="detail">{{pricingFrom.keyword}}</el-col>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:20px;">
          <el-col :span="8">
            <el-col :span="5" class="title1">当前版本 ：</el-col>
            <el-col :span="16" class="detail" style="color:#0261A7">{{pricingFrom.version}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="5" class="title1">当前版本 ：</el-col>
            <el-col :span="16" class="detail" style="color:#0261A7">{{pricingFrom.unit}}</el-col>
          </el-col>
          <el-col :span="8">
            <el-col :span="5" class="title1">更新时间 ：</el-col>
            <el-col :span="16" class="detail">{{pricingFrom.gmtModify}}</el-col>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row style="padding:15px 22px;;background:#fff;">
      <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
        <el-tab-pane type="primary" label="基本信息" name="first">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-col :span="23" style="margin-bottom: 20px;">
                <span class="title">基本信息</span>
              </el-col>
              <el-form
                ref="pricingFrom"
                :model="pricingFrom"
                :rules="rules"
                label-width="120px"
                class="margin-top"
              >
                <el-col :span="10" :offset="1">
                  <el-form-item label="规格项编码:" prop="code">
                    <el-input
                      v-model="pricingFrom.code"
                      :disabled="true"
                      placeholder="syj.project.s3e5ciyr"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item
                    label="云资源:"
                    prop="resourceCode"
                    :rules="[{ required: true, message: '云资源不能为空' }]"
                  >
                    <el-select
                      v-model="pricingFrom.resourceCode"
                      :disabled="true"
                      placeholder="请选择云资源"
                      style="width:90%;"
                    >
                      <el-option
                        v-for="item in list"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-form-item
                    label="规格项名称:"
                    prop="attributeName"
                    :rules="[{ required: true, message: '规格项名称不能为空' }]"
                  >
                    <el-input
                      :disabled="true"
                      v-model="pricingFrom.attributeName"
                      placeholder="请输入规格项名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item
                    label="单位:"
                    prop="unit"
                    :rules="[{ required: true, message: '单位不能为空' }]"
                  >
                    <el-select
                      disabled
                      v-model="pricingFrom.unit"
                      style="width:90%"
                      size="mini"
                      placeholder="单位"
                    >
                      <el-option
                        v-for="item in units"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-form-item
                    label="关键字:"
                    prop="keyword"
                    :rules="[{ required: true, message: '关键字不能为空' }]"
                  >
                    <el-input
                      v-model="pricingFrom.keyword"
                      :disabled="true"
                      on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
                      placeholder="关键字必须英文小写"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="23" :offset="1">
                  <el-form-item label="备注:" prop="description" style="width:94%">
                    <el-input
                      :disabled="true"
                      v-model="pricingFrom.description"
                      type="textarea"
                      style="width:98%;"
                      placeholder="请输入描述文本（不超过50字）"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="23" style="margin-bottom: 20px;margin-top: 20px;">
                  <span class="title">基本信息</span>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-form-item label="单价:" prop="price">
                    <el-input v-model="pricingFrom.price" :disabled="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item
                    label="计费周期:"
                    prop="period"
                    :rules="[{ required: true, message: '计费周期不能为空' }]"
                  >
                    <el-select
                      v-model="pricingFrom.period"
                      disabled
                      size="mini"
                      placeholder="请选择计费周期"
                    >
                      <el-option
                        v-for="item in periods"
                        :key="item.key"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane type="primary" label="操作记录" name="second">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="table-wrap">
                  <el-table :data="list1" size="small">
                    <el-table-column :show-overflow-tooltip="true" label="时间" align="center">
                      <template slot-scope="scope">{{ scope.row.gmtCreate }}</template>
                    </el-table-column>
                    <el-table-column
                      :show-overflow-tooltip="true"
                      label="操作内容"
                      align="center"
                      width="300"
                    >
                      <template slot-scope="scope">{{ scope.row.content }}</template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" label="版本" align="center">
                      <template slot-scope="scope">{{ scope.row.version }}</template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" label="更新人" align="center">
                      <template slot-scope="scope">{{ scope.row.update }}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  getonePrices,
  queryByIdCloudServiceFun,
  getHistoryPrices,
  getResourcesList,
} from "@/api/serviceOperating";
export default {
  components: {
    Pagination,
  },
  filters: {},
  data() {
    return {
      activeName: "first",
      pricingFrom: {},
      list: [],
      list1: [],
      units: [
        {
          value: "Core",
          label: "Core",
        },
        {
          value: "GB",
          label: "GB",
        },
        {
          value: "GB",
          label: "GB",
        },
      ],
      periods: [
        {
          value: "DAY",
          label: "日",
        },
        {
          value: "MONTH",
          label: "月",
        },
        {
          value: "YEAR",
          label: "年",
        },
      ],
      disabled: false,
      rules: {
        code: [
          { required: true, message: "请输入服务编码", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入云活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        resources: [
          { required: true, message: "请选择云资源名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: "请选择类别", trigger: "blur" }],
        price: [{ required: true, message: "请选择类别", trigger: "blur" }],
        tags: [
          {
            required: true,
            message: "注：关键字必须英文小写",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入描述文本", trigger: "blur" },
        ],
      },
      inputa: true,
      rl: 128,
      rlmax: 136,
      isservice: 15,
      isservicemax: 18,
      dialogVisible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await requestParams(getonePrices, this.$route.params.id);
      console.log(res);
      this.pricingFrom = res.content;
      const res1 = await requestParams(getResourcesList, this.search);
      this.list = res1.content.content;
      // console.log(this.pricingFrom);
      const res2 = await requestParams(getHistoryPrices, this.$route.params.id);
      this.list1 = res2.content.content;
      console.log(this.list1);
    },
    back() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/capacityPricing",
      }); // 返回上一层
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../rewrite.scss";
.title1 {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
/deep/ .el-form-item__label {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.detail {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
/deep/.el-form-item__content {
  line-height: 42px;
  position: relative;
  font-size: 14px;
}
.title {
  border-left: 5px #0261a7 solid;
  line-height: 22px;
  margin-left: 2%;
  padding-left: 15px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
/depp/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px !important;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 45, 37, 1);
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
