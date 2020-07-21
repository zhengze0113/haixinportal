<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <el-form
          ref="cloudServiceFrom"
          :model="cloudServiceFrom"
          :rules="rules"
          label-width="120px"
          class="demo-cloudServiceFrom"
        >
          <el-col :span="10">
            <el-form-item label="服务编码:" class="head-title">
              <el-input
                v-model="cloudServiceFrom.code"
                :disabled="true"
                placeholder="syj.project.s3e5ciyr"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="云资源:" prop="resources">
              <el-select
                v-model="serviceName"
                :disabled="disabled"
                placeholder="请选择"
                style="width:90%;"
              >
                <el-option :value="serviceName"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="规格名称：" prop="name">
              <el-input v-model="cloudServiceFrom.name" placeholder="请输入云服务名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="云服务:" prop="category">
              <el-select v-model="resourcesName" :disabled="disabled" placeholder="请选择类别" style="width:90%;">
                <el-option :value="resourcesName"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="关键字:" prop="tags">
              <el-input
                v-model="cloudServiceFrom.tags"
                on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
                placeholder="关键字必须英文小写"
              />
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="定价项:" prop="description" style="width:94%">
              <el-col :span="24">
                <el-col :span="4" class="body-title">
                  CPU（Core）
                </el-col>
                <el-col :span="14" class="body-content">
                  <el-input-number v-model="num" :min="1" :max="10" size="small" label="描述文字" @change="handleChange"/>
                </el-col>
              </el-col>

              <el-col :span="24" style="margin-top:21px;">
                <el-col :span="4" class="body-title">
                  内存（GB）
                </el-col>
                <el-col :span="14" class="body-content">
                  <el-input-number v-model="num" :min="1" :max="10" size="small" label="描述文字" @change="handleChange"/>
                </el-col>
              </el-col>

              <el-col :span="24" style="margin-top:21px;">
                <el-col :span="4" class="body-title">
                  存储（GB）
                </el-col>
                <el-col :span="14" >
                  <template>
                    <el-select v-model="value" style="width:28%;margin-left:28px;" placeholder="50">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                    </el-select>
                  </template>
                </el-col>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="22" style="margin-bottom:18px;">
            <div class="right">
              <div style="position:relative;">
                <div >
                  <p style="font-size:12px;font-family:Microsoft YaHei;font-weight:400;color:rgba(102,102,102,1);">成本(元/月):</p>
                </div>
                <div style="position:absolute;top:-10px;left:68px;">
                  <p style="font-size:24px;font-family:Microsoft YaHei;font-weight:bold;color:rgba(2,97,167,1);">￥{{ price }}</p>
                </div>
              </div>
            </div>

          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  getResourcesSkuInfo, queryByIdCloudServiceFun, getCloudResourceInfo
} from '@/api/serviceOperating';
export default {
  components: {

  },
  filters: {},
  data() {
    return {
      price: 0,
      disabled: true,
      serviceName: '',
      resourcesName: '',
      options: [{
        value: '选项1',
        label: '50'
      }, {
        value: '选项2',
        label: '60'
      }, {
        value: '选项3',
        label: '100'
      }, {
        value: '选项4',
        label: '150'
      }, {
        value: '选项5',
        label: '200'
      }],
      value: '',
      num: 1,
      cloudServiceFrom: {},
      list: [],
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
        tags: [
          { required: true, message: '注：关键字必须英文小写', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述文本', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      // 获取单独sku信息
      const res = await requestParams(
        getResourcesSkuInfo,
        this.$route.params.id
      );
      this.cloudServiceFrom = res.content;
      this.price = res.content.price.price;
      console.log(this.cloudServiceFrom);
      // 获取云资源信息
      const re = await requestParams(
        queryByIdCloudServiceFun,
        this.cloudServiceFrom.serviceId
      );
      this.serviceName = re.content.name;
      // 获取云服务信息
      const r = await requestParams(
        getCloudResourceInfo,
        this.cloudServiceFrom.resourceId
      );
      this.resourcesName = r.content.name;
    },
    handleChange(value) {
      console.log(value);
    }
  }

};
</script>
<style lang="scss" scoped>
.body-content{
  padding-left: 39px !important;
}
/deep/[data-v-786956bb] .el-input-number {
   line-height:100%;
}
/deep/.el-form-item__label {
  font-size:12px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(104,104,104,1);
}
.body-title{
 font-size:12px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(102,102,102,1);
}
</style>
