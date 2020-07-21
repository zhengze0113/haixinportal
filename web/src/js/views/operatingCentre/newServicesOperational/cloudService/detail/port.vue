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
            <el-form-item label="服务编码:">
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
                v-model="cloudServiceFrom.resources"
                placeholder="请选择云资源"
                style="width:90%;"
              >
                <el-option v-for="item in list" :key="item.service.name" :value="item.service.name"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="云产品名称:" prop="name">
              <el-input v-model="cloudServiceFrom.name" placeholder="请输入云产品名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="分类:" prop="category">
              <el-select v-model="cloudServiceFrom.category" placeholder="请选择类别" style="width:90%;">
                <el-option v-for="item in list" :key="item.category" :value="item.category"/>
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
            <el-form-item label="服务描述:" prop="description" style="width:94%">
              <el-input
                v-model="cloudServiceFrom.description"
                type="textarea"
                style="width:98%;"
                placeholder="请输入描述文本（不超过50字）"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Pagination from '@/components/pagination';
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  queryByIdCloudServiceFun
} from '@/api/serviceOperating';
export default {
  components: {
    Pagination
  },
  filters: {},
  data() {
    return {
      cloudServiceFrom: {},
      list: [],
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
      // const res = await requestParams(
      //   queryByIdCloudServiceFun,
      //   this.$route.params.id
      // );
      await queryByIdCloudServiceFun(this.$route.params.id).then(res => {
        this.cloudServiceFrom = res.content;
      });
    },
    onSubmit() {
      console.log('submit!');
    }
  }
};
</script>
<style lang="scss">
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
