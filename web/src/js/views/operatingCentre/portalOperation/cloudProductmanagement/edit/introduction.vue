<template>
  <div>
    <!--详细介绍-->

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="产品详细信息："
        prop="name"
        :label-width="formLabelWidth"
        class="marginTop"
      >
        <el-col :span="24" >
          <tinymce-editor
              :content="object.content"
              ref="ueditor"
              @change="change"
            ></tinymce-editor>
        </el-col>
      </el-form-item>
    </el-form>
    <el-row
      class="right"
      style="padding:50px;padding-top:0px;padding-right:70px;"
    >
      <el-col :span="24">
        <el-button type="primary" @click="nexttop()">上一步</el-button>
        <el-button type="primary" @click="nextbottom()">下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Ueditor from "@/components/ueditor";
import { editcloudproductimg } from "@/api/serviceOperatingcms";
import TinymceEditor from "../../../../tinymce-editor";
export default {
  props: {
    object: {
      type: Object,
      default: {}
    },
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
  },
  components: {
    Ueditor,
    TinymceEditor
  },
  data() {
    return {
      formLabelWidth: "120px",
      form_update: {
        name: "",
        documentType_id: "",
        content: "",
        documentType_name: ""
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
  mounted() {
    console.log(this.object); 
  },
  methods: {
    //  子组件更新的值
    change(type) {
      this.object.content = type;
    },
    nexttop() {
      this.$emit("listenToChildEvent", this.active);
    },
    nextbottom() {
      const params = new FormData();
      params.append("content", this.$refs.ueditor.getDoContent());
      console.log(params)
      editcloudproductimg(this.object.id, params).then(r => {
        if (r.id != "") {
          const active_3 = 3;
          this.$emit("listenToChildEvent", active_3);
        }
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
