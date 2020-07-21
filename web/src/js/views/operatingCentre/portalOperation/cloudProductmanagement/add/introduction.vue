<template>
  <div>
    <!--详细介绍-->

    <el-form
      :model="form_update"
      :rules="rules"
      ref="ruleForm_update"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="产品详细信息："
        prop="content"
        :label-width="formLabelWidth"
        class="marginTop"
      >
        <el-col :span="24">
 
          <tinymce-editor
              :content="form_update.content"
              ref="ueditor"
              @change="upchange"
            />
        </el-col>
      </el-form-item>
    </el-form>
    <el-row
      class="right"
      style="padding:50px;padding-top:0px;padding-right:70px;"
    >
      <el-col :span="24">
        <el-button type="primary" @click="nexttop()">上一步</el-button>
        <el-button type="primary" @click="nextbottom('ruleForm_update')"
          >下一步</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Ueditor from "@/components/ueditor";
import { updatecloudproduct } from "@/api/serviceOperatingcms";
import TinymceEditor from "../../../../tinymce-editor";
export default {
  props: {
    active: {
      type: Number,
      default: 1
    },
    active3: {
      type: Number,
      default: 3
    },
    cloudproductid: {
      type: String,
      default: ""
    }
    //  cloudsid:{
    //    type:String,
    //    default:""
    //  }
  },
  components: {
    Ueditor,
    TinymceEditor
  },
  data() {
    return {
      cloudsid: "",
      cloudList: [],
      formLabelWidth: "120px",
      form_update: {
        id: "",
        content: ""
      },
      ruleForm: {
        name: "",
        region: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  mounted() {},
  created() {},
  methods: {
        //  子组件更新的值
    upchange(type) {
      this.form_update.content = type;
    },
    nexttop() {
      this.$emit("listenToChildEvent", this.active);
    },
    nextbottom() {
      // this.active = 3;
      console.log(this.cloudproductid);
      this.form_update.content = this.$refs.ueditor.getDoContent();
      this.form_update.id = this.cloudproductid;

      this.cloudsid = this.cloudproductid;
      console.log(this.cloudsid);
      updatecloudproduct(this.form_update.id, this.form_update).then(r => {
        this.$emit("listenToChildEvent", this.active3);

        this.$emit("listenTo", this.cloudsid);
        console.log("aaa", r);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-form-item__label {
  width: 110px;
}
/deep/.el-form-item__content {
  width: 85%;
}
</style>
