<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <el-form
          ref="cloudServiceFrom"
          :model="cloudServiceFrom"
          :rules="cloudServiceFrom"
          label-width="120px"
          class="demo-cloudServiceFrom"
        >
          <el-col :span="20">
            <el-form-item label="服务编码:">
              <el-input
                v-model="cloudServiceFrom.code"
                :disabled="true"
                placeholder="syj.project.s3e5ciyr"
              />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="云资源:" prop="resourceCode">
              <el-select
                disabled
                v-model="cloudServiceFrom.resourceCode"
                placeholder="请选择云资源"
                style="width:100%;"
              >
                <el-option
                  v-for="item in list1"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="云产品名称:" prop="name">
              <el-input v-model="cloudServiceFrom.name" disabled placeholder="请输入云产品名称" />
            </el-form-item>
          </el-col>

          <el-col :span="20">
            <el-form-item label="关键字:" prop="keyword">
              <el-input
                disabled
                v-model="cloudServiceFrom.keyword"
                on-keypress="return (/[a-z]/.test(String.fromCharCode(event.keyCode)))"
                placeholder="关键字必须英文小写"
              />
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="服务描述:" prop="description" style="width:94%">
              <el-input
                disabled
                v-model="cloudServiceFrom.description"
                type="textarea"
                style="width:100%;"
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
import Pagination from "@/components/pagination";
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  queryByIdCloudServiceFun,
  getResourcesList,
} from "@/api/serviceOperating";
export default {
  components: {
    Pagination,
  },
  filters: {},
  data() {
    return {
      cloudServiceFrom: {},
      list: [],
      disabled: false,
      list1: [],
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
      const res1 = await requestParams(getResourcesList, this.search);
      this.list1 = res1.content.content;
      await queryByIdCloudServiceFun(this.$route.params.id).then((res) => {
        console.log(res);
        this.cloudServiceFrom = res.content;
      });
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
<style lang="scss">
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
