<template>
  <div>
    <!--产品文章配置-->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="定价" prop="servicecatalog_id">
        <el-select v-model="pricevalue" placeholder="请选择">
          <el-option
            v-for="item in price"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入门" prop="servicecatalog_id">
        <el-select v-model="inductionvalue" placeholder="请选择">
          <el-option
            v-for="item in induction"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="常见问题" prop="servicecatalog_id">
        <el-select v-model="problemvalue" placeholder="请选择">
          <el-option
            v-for="item in problem"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文档与资源" prop="servicecatalog_id">
        <el-select v-model="documvalue" placeholder="请选择">
          <el-option
            v-for="item in docum"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row
      class="right"
      style="padding:50px;padding-top:0px;padding-right:70px;"
    >
      <el-button type="primary" @click="nexttop()">上一步</el-button>
      <el-button type="primary" @click="complete('ruleForm')"> 完成</el-button>
    </el-row>
  </div>
</template>
<script>
import { getDocument, updatecloudproduct } from "@/api/serviceOperatingcms";
export default {
  props: {
    active: {
      type: Number,
      default: 3
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      pricevalue: "",
      inductionvalue: "",
      problemvalue: "",
      documvalue: "",
      price: [], //定价
      induction: [], //入门
      problem: [], //常见问题
      docum: [], //文档资源
      ruleForm: {
        is_edit: true,
        pricing_id: "",
        introduction_id: "",
        document_id: "",
        problem_id: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      }
    };
  },
  mounted() {},
  created() {
    this.initSelect();
  },
  wactch: {
    id(value) {
      console.log("disizujian");
      console.log(value);
    }
  },
  methods: {
    initSelect() {
      const params = { documentType_name: "定价" };
      getDocument(params).then(r => {
        console.log(r);
        this.price = r;
      });

      const param = { documentType_name: "入门" };
      getDocument(param).then(re => {
        console.log(re);
        this.induction = re;
      });
      const para = { documentType_name: "常见问题" };
      getDocument(para).then(res => {
        console.log(res);
        this.problem = res;
      });
      const par = { documentType_name: "文档资源" };
      getDocument(par).then(resa => {
        this.docum = resa;
      });
    },
    nexttop() {
      this.$emit("listenToChildEvent", this.active);
    },

    complete() {
      console.log(this.id);
      this.ruleForm.id = this.id;
      this.ruleForm.pricing_id = this.pricevalue; //定价
      this.ruleForm.document_id = this.documvalue; //文档
      this.ruleForm.problem_id = this.problemvalue; //问题
      this.ruleForm.introduction_id = this.inductionvalue; //入门
      updatecloudproduct(this.ruleForm.id, this.ruleForm).then(r => {
        if (r.id != "") {
          this.$notify({
            type: "success",
            message: "添加完成"
          });
          this.$router.push({
            path: "/operatingCentre/portalOperation/cloudProductmanagement"
          });
        }
      });
    }
  }
};
</script>
