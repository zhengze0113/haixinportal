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
    <el-row style="padding:15px 22px;;background:#fff;">
      <el-col :span="24" style="margin-top:7px;">
        <el-col :span="8">
          <el-col :span="6" class="title">规格编码：</el-col>
          <el-col :span="16" class="detail">project.base.abcd1234</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5" class="title">当前版本 ：</el-col>
          <el-col :span="16" class="detail" style="color:#0261A7">V1.4</el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5" class="title">更新时间 ：</el-col>
          <el-col :span="16" class="detail">20191122 16:40:50</el-col>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:15px 22px;;background:#fff;">
      <el-tabs ref="tab" v-model="activeName" type="card" style="background:#fff">
        <el-tab-pane type="primary" label="基本信息" name="first">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form
                ref="pricingFrom"
                :model="pricingFrom"
                :rules="rules"
                label-width="120px"
                class="demo-pricingFrom"
              >
                <el-col :span="10">
                  <el-form-item label="属性编码:">
                    <el-input
                      v-model="pricingFrom.code"
                      :disabled="true"
                      placeholder="syj.project.s3e5ciyr"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="云资源:" prop="resources">
                    <el-select
                      v-model="pricingFrom.resources"
                      :disabled="true"
                      placeholder="请选择云资源"
                      style="width:90%;"
                    >
                      <el-option
                        v-for="item in list"
                        :key="item.service.name"
                        :value="item.service.name"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="属性名称:" prop="name">
                    <el-input :disabled="true" v-model="pricingFrom.name" placeholder="请输入云服务名称"/>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                  <el-form-item label="云服务:" prop="category">
                    <el-select
                      v-model="pricingFrom.category"
                      :disabled="true"
                      placeholder="请选择类别"
                      style="width:90%;"
                    >
                      <el-option v-for="item in list" :key="item.category" :value="item.category"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item label="资源单价:" prop="price" style="width:75%">
                    <el-input v-model="pricingFrom.price" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="23">
                  <el-form-item label="关键字:" prop="tags" style="width:92.5%">
                    <el-input
                      v-model="pricingFrom.tags"
                      :disabled="true"
                      on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
                      placeholder="关键字必须英文小写"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="23">
                  <el-form-item label="服务描述:" prop="description" style="width:94%">
                    <el-input
                      :disabled="true"
                      v-model="pricingFrom.description"
                      type="textarea"
                      style="width:98%;"
                      placeholder="请输入描述文本（不超过50字）"
                    />
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
                      <template slot-scope="scope">{{ scope.row.time }}</template>
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
                      <template slot-scope="scope">{{ scope.row.result }}</template>
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
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import { getonePrices, queryByIdCloudServiceFun } from '@/api/serviceOperating';
export default {
  components: {
    Pagination
  },
  filters: {},
  data() {
    return {
      activeName: 'first',
      pricingFrom: {},
      list: [],
      list1: [

      ],
      disabled: false,
      rules: {
        code: [
          { required: true, message: '请输入服务编码', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: '请输入云活动名称', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        resources: [
          { required: true, message: '请选择云资源名称', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: '请选择类别', trigger: 'blur' }],
        price: [{ required: true, message: '请选择类别', trigger: 'blur' }],
        tags: [
          { required: true, message: '注：关键字必须英文小写', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述文本', trigger: 'blur' }
        ]
      },
      inputa: true,
      rl: 128,
      rlmax: 136,
      isservice: 15,
      isservicemax: 18,
      dialogVisible: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await requestParams(getonePrices, this.$route.params.id);
      // console.log(res);
      this.pricingFrom = res.content;
      // console.log(this.pricingFrom);
    },
    back() {
      this.$router.push({
        path: '/operatingCentre/newServicesOperational/capacityPricing'
      }); // 返回上一层
    },
    onSubmit() {
      console.log('submit!');
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../rewrite.scss";
.title {
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
  font-size: 12px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
