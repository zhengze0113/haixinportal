<template>
  <div v-loading="loading">
    <!--基本信息-->
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="产品名称"
        prop="name"
        :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
      >
        <el-input v-model="ruleForm.name" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item
        label="产品logo"
        prop="fileList1"
        :rules="[
          { required: true, message: '请添加产品logo', trigger: 'blur' }
        ]"
      >
        <el-upload
          ref="upload_1"
          :class="{ hide_1: hideUpload_1 }"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview_1"
          :on-remove="handleRemove_1"
          :on-change="con_1"
          :limit="1"
          :data="fileUpload"
          style="display:inline-block"
          action="#"
          list-type="picture-card"
          name="logo"
        >
          <i class="el-icon-plus">
            <div slot="tip" class="el-upload__tip imagesFont">
              只能上传jpg/png文件，且不超过3MB
            </div>
          </i>
        </el-upload>
        <div class="imgMessage">(提示：建议产品logo 100*100px)</div>
        <el-dialog :visible.sync="dialogVisible_1">
          <img :src="dialogImageUrl_1" width="100%" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item
        label="产品背景图"
        prop="fileList2"
        :rules="[
          { required: true, message: '请添加产品背景图', trigger: 'blur' }
        ]"
      >
        <el-upload
          ref="upload_2"
          :class="{ hide_2: hideUpload_2 }"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview_2"
          :on-remove="handleRemove_2"
          :on-change="con_2"
          :limit="1"
          style="display:inline-block"
          action="#"
          list-type="picture-card"
          name="icon"
        >
          <i class="el-icon-plus">
            <div slot="tip" class="el-upload__tip imagesFont">
              只能上传jpg/png文件，且不超过3MB
            </div>
          </i>
        </el-upload>
        <div class="imgMessage">(提示：建议产品logo 1920*620px)</div>

        <el-dialog :visible.sync="dialogVisible_2">
          <img :src="dialogImageUrl_2" width="100%" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item
        label="产品图"
        prop="fileList3"
        :rules="[{ required: true, message: '请添加产品图', trigger: 'blur' }]"
      >
        <el-upload
          ref="upload_3"
          :class="{ hide_3: hideUpload_3 }"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview_3"
          :on-remove="handleRemove_3"
          :on-change="con_3"
          :limit="1"
          style="display:inline-block"
          action="#"
          list-type="picture-card"
          name="cover"
        >
          <i class="el-icon-plus">
            <div slot="tip" class="el-upload__tip imagesFont">
              只能上传jpg/png文件，且不超过3MB
            </div>
          </i>
        </el-upload>
        <div class="imgMessage">(提示：建议产品logo 480*480px)</div>

        <el-dialog :visible.sync="dialogVisible_3">
          <img :src="dialogImageUrl_3" width="100%" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item
        label="服务目录"
        prop="servicecatalog_id"
        :rules="[{ required: true, message: '请选择服务目录' }]"
      >
        <el-select
          v-model="ruleForm.servicecatalog_id"
          placeholder="请选择服务目录"
        >
          <el-option
            v-for="item in selectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="产品介绍"
        prop="productintroduction"
        :rules="[{ required: true, message: '请添加产品介绍' }]"
      >
        <el-input
          v-model="ruleForm.productintroduction"
          type="textarea"
          placeholder="请输入产品介绍"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="产品状态">
        <el-radio-group v-model="ruleForm.is_putaway">
          <el-radio :label="true">上架</el-radio>
          <el-radio :label="false">下架</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <el-row
      class="right"
      style="padding:50px;padding-top:0px;padding-right:70px;"
    >
      <el-button type="primary" @click="submitForm('ruleForm')"
        >下一步</el-button
      >
    </el-row>
  </div>
</template>
<script>
import {
  addaloudproduct,
  Servicecatalog,
  addcloudproduct
} from "@/api/serviceOperatingcms";
// eslint-disable-next-line no-unused-vars
import { requestParams, parseHash } from "@/utils/urlParam";
export default {
  props: {
    active: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      selectList: [],
      a: "",
      // rules: {
      //   name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
      //   productintroduction: [
      //     { required: true, message: '请输入产品介绍', trigger: 'blur' }
      //   ],
      //   servicecatalog_id: [
      //     { required: true, message: '请输入服务目录', trigger: 'change' }
      //   ]
      // },
      fileUpload: {},
      loading: false,
      dialogImageUrl_1: "",
      dialogVisible_1: false,
      hideUpload_1: false,
      dialogImageUrl_2: "",
      dialogVisible_2: false,

      hideUpload_2: false,
      dialogImageUrl_3: "",
      dialogVisible_3: false,
      hideUpload_3: false,
      ruleForm: {
        fileList1: "",
        fileList2: "",
        fileList3: "",
        name: "",
        productintroduction: "",
        is_edit: false,
        servicecatalog_id: "",
        is_putaway: false
      }
    };
  },
  mounted() {},
  created() {
    this.initSelect();
  },
  methods: {
    // 初始化下拉框
    initSelect() {
      const params = { parentId: 0 };
      Servicecatalog(params).then(r => {
        this.selectList = r;
      });
    },
    // 下一步
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          const params = new FormData();
          params.append("name", this.ruleForm.name);
          params.append(
            "productintroduction",
            this.ruleForm.productintroduction
          );
          params.append("is_edit", this.ruleForm.is_edit);
          params.append("servicecatalog_id", this.ruleForm.servicecatalog_id);
          params.append("is_putaway", this.ruleForm.is_putaway);
          if (this.$refs.upload_1.uploadFiles.length > 0) {
            params.append("logo", this.$refs.upload_1.uploadFiles[0].raw);
          }
          if (this.$refs.upload_2.uploadFiles.length > 0) {
            params.append("cover", this.$refs.upload_2.uploadFiles[0].raw);
          }
          if (this.$refs.upload_3.uploadFiles.length > 0) {
            params.append("icon", this.$refs.upload_3.uploadFiles[0].raw);
          }
          addcloudproduct(params).then(r => {
            if (r.id != "") {
              this.$emit("listenToChildEvent", this.active, r.id);
            }
          });
          this.loading = false;
        }
      });
    },
    // 添加成功返回res
    // uploadSuccess(response, file, fileList) {
    //   console.log(response);
    //   this.$refs["ruleForm"].resetFields();
    //   this.loading = false;
    // },
    // 删除第一张
    handleRemove_1(file, fileList) {
      this.hideUpload_1 = fileList.length >= 1;
      this.ruleForm.fileList1 = "";
    },
    handlePictureCardPreview_1(file) {
      this.dialogImageUrl_1 = file.url;
      this.dialogVisible_1 = true;
    },
    con_1(file, fileList) {
      if (fileList.length > 0) {
        this.ruleForm.fileList1 = "值";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload_1.uploadFiles = [];
      } else {
        this.hideUpload_1 = fileList.length >= 1;
      }
    },
    // 删除第二张
    handleRemove_2(file, fileList) {
      this.hideUpload_2 = fileList.length >= 1;
      this.ruleForm.fileList2= "";
    },
    handlePictureCardPreview_2(file) {
      this.dialogImageUrl_2 = file.url;
      this.dialogVisible_2 = true;
    },
    con_2(files, fileList) {
      if (fileList.length > 0) {
        this.ruleForm.fileList2 = "值";
      }
      const isLt3M = files.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传产品背景图大小不能超过 3MB!");
        this.$refs.upload_2.uploadFiles = [];
      } else {
        this.hideUpload_2 = fileList.length >= 1;
      }
    },
    // 删除第三张
    handleRemove_3(file, fileList) {
      this.hideUpload_3 = fileList.length >= 1;
      this.ruleForm.fileList3 = "";
    },
    handlePictureCardPreview_3(file) {
      this.dialogImageUrl_3 = file.url;
      this.dialogVisible_3 = true;
    },
    con_3(files, fileList) {
      if (fileList.length > 0) {
        this.ruleForm.fileList3 = "值";
      }
      const isLt3M = files.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传产品图大小不能超过 3MB!");
        this.$refs.upload_3.uploadFiles = [];
      } else {
        this.hideUpload_3 = fileList.length >= 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-upload-dragger {
  width: 239px;
  height: 144px;
}
.imagesFont {
  padding-left: 15px;
  padding-right: 15px;
  line-height: 20px;
}
.imgMessage {
  color: red;
  display: inline-block;
  position: relative;
  bottom: -115px;
}
/deep/ .el-upload--picture-card {
  padding-top: 33px;
}
.hide_1 {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
.hide_2 {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
.hide_3 {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
</style>
