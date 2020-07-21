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
import {
  getDocument,
  updatecloudproduct,
  editcloudproductimg
} from "@/api/serviceOperatingcms";
export default {
  props: {
    active: {
      type: Number,
      default: 3
    },
    object: {
      type: Object,
      default: {}
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
      docum: [], //文档资源,
      is_edit: true,
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
  mounted() {
    this.pricevalue = this.object.pricing_id;
    this.inductionvalue = this.object.introduction_id;
    this.problemvalue = this.object.problem_id;
    this.documvalue = this.object.document_id;

  },
  created() {
    this.initSelect();
  },
  methods: {
    initSelect() {
      const params = { documentType_name: "定价" };
      getDocument(params).then(r => {
        this.price = r;
      });
      const param = { documentType_name: "入门" };
      getDocument(param).then(re => {
        this.induction = re;
      });
      const para = { documentType_name: "常见问题" };
      getDocument(para).then(res => {
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
      const params = new FormData();
      params.append("pricing_id", this.pricevalue);
      params.append("document_id", this.documvalue);
      params.append("problem_id", this.problemvalue);
      params.append("introduction_id", this.inductionvalue);
      params.append("is_edit", this.is_edit);
      editcloudproductimg(this.object.id, params).then(r => {
        if (r.id != "") {
          this.$notify({
            type: "success",
            message: "修改完成"
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
