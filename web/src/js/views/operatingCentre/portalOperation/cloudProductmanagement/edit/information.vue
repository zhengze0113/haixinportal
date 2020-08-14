<template>
  <div>
    <!--基本信息-->
    <el-form
      :model="ruleForm"
      ref="update_ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="产品名称"
        prop="name"
        :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
      >
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        label="产品logo"
        prop="fileList1"
        :rules="[
          { required: true, message: '请添加产品logo', trigger: 'blur' },
        ]"
      >
        <el-upload
          style="display:inline-block"
          :class="{ hide_1: hideUpload_1 }"
          action="#"
          ref="upload_1"
          list-type="picture-card"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview_1"
          :on-remove="handleRemove_1"
          :on-change="con_1"
          :limit="1"
          name="logo"
          :data="fileUpload"
          :file-list="fileList_1"
        >
          <i class="el-icon-plus">
            <div slot="tip" class="el-upload__tip imagesFont">
              只能上传jpg/png文件，且不超过3MB
            </div>
          </i>
        </el-upload>
        <div class="imgMessage">
          (提示：建议产品logo 100*100px)
        </div>
        <el-dialog :visible.sync="dialogVisible_1">
          <img width="100%" :src="dialogImageUrl_1" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item
        label="产品背景图"
        prop="fileList2"
        :rules="[
          { required: true, message: '请添加产品背景图', trigger: 'blur' },
        ]"
      >
        <el-upload
          style="display:inline-block"
          :class="{ hide_2: hideUpload_2 }"
          action="#"
          ref="upload_2"
          list-type="picture-card"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview_2"
          :on-remove="handleRemove_2"
          :on-change="con_2"
          :limit="1"
          name="cover"
          :file-list="fileList_2"
        >
          <i class="el-icon-plus">
            <div slot="tip" class="el-upload__tip imagesFont">
              只能上传jpg/png文件，且不超过3MB
            </div>
          </i>
        </el-upload>
        <div class="imgMessage">
          (提示：建议产品logo 1920*620px)
        </div>
        <el-dialog :visible.sync="dialogVisible_2">
          <img width="100%" :src="dialogImageUrl_2" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item
        label="产品图"
        prop="fileList3"
        :rules="[{ required: true, message: '请添加产品图', trigger: 'blur' }]"
      >
        <el-upload
          style="display:inline-block"
          :class="{ hide_3: hideUpload_3 }"
          action="#"
          ref="upload_3"
          list-type="picture-card"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview_3"
          :on-remove="handleRemove_3"
          :on-change="con_3"
          :limit="1"
          name="icon"
          :file-list="fileList_3"
        >
          <i class="el-icon-plus">
            <div slot="tip" class="el-upload__tip imagesFont">
              只能上传jpg/png文件，且不超过3MB
            </div>
          </i>
        </el-upload>
        <div class="imgMessage">
          (提示：建议产品logo 480*480px)
        </div>
        <el-dialog :visible.sync="dialogVisible_3">
          <img width="100%" :src="dialogImageUrl_3" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item label="服务目录" prop="servicecatalog_id">
        <el-select v-model="ruleForm.servicecatalog_id" placeholder="请选择">
          <el-option
            v-for="item in selectList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原服务目录id" prop="productId">
        <el-input placeholder="请输入原服务目录id" v-model="ruleForm.productId">
        </el-input>
      </el-form-item>
      <el-form-item label="产品介绍" prop="productintroduction">
        <el-input
          type="textarea"
          placeholder="请输入产品介绍"
          v-model="ruleForm.productintroduction"
          maxlength="200"
          show-word-limit
        >
        </el-input>
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
      <el-button type="primary" @click="submitForm('update_ruleForm')"
        >下一步</el-button
      >
    </el-row>
  </div>
</template>
<script>
import {
  editcloudproductInfo,
  Servicecatalog,
  editcloudproductimg,
} from "@/api/serviceOperatingcms";
import { requestParams, parseHash } from "@/utils/urlParam";
import baseURL from "@/api/app.js";
export default {
  props: {
    active: {
      type: Number,
      default: 2,
    },
    object: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      baseURL: baseURL,
      selectList: [],
      fileUpload: {},
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
        productId:"",
        productintroduction: "",
        is_edit: false,
        servicecatalog_id: "",
        is_putaway: false,
      },
      fileList_1: [],
      fileList_2: [],
      fileList_3: [],
    };
  },
  mounted() {
    // 初始化图片
    this.image();
    this.ruleForm = this.object;
  },
  created() {
    this.initSelect();
  },
  methods: {
    // 初始化图片
    image() {
      if (this.object.logo != null) {
        const imageObject = { name: "", url: "" };
        imageObject.name = this.object.logo.name;
        imageObject.url = baseURL.DATAURL + this.object.logo.url;
        this.fileList_1.push(imageObject);
        this.hideUpload_1 = true;
        this.object.fileList1 = "值";
      } else {
        this.object.fileList1 = "";
      }
      if (this.object.cover != null) {
        const imageObject = { name: "", url: "" };
        imageObject.name = this.object.cover.name;
        imageObject.url = baseURL.DATAURL + this.object.cover.url;
        this.fileList_2.push(imageObject);
        this.hideUpload_2 = true;
        this.object.fileList2 = "值";
      } else {
        this.object.fileList2 = "";
      }
      if (this.object.icon != null) {
        const imageObject = { name: "", url: "" };
        imageObject.name = this.object.icon.name;
        imageObject.url = baseURL.DATAURL + this.object.icon.url;
        this.fileList_3.push(imageObject);
        this.hideUpload_3 = true;
        this.object.fileList3 = "值";
      } else {
        this.object.fileList3 = "";
      }
    },
    // 初始化下拉框
    initSelect() {
      const params = { parentId: 0 };
      Servicecatalog(params).then((r) => {
        this.selectList = r;
      });
    },
    // 下一步
    submitForm() {
      const params = new FormData();
      params.append("name", this.ruleForm.name);
      params.append("_id", this.object._id);
      params.append("id", this.object.id);
      params.append("productintroduction", this.ruleForm.productintroduction);
      params.append("productId", this.ruleForm.productId);
      params.append("servicecatalog_id", this.ruleForm.servicecatalog_id);
      params.append("is_putaway", this.ruleForm.is_putaway);

      if (
        this.$refs.upload_1.uploadFiles.length != 0 &&
        this.$refs.upload_1.uploadFiles[0].status == "ready"
      ) {
        params.append("logo", this.$refs.upload_1.uploadFiles[0].raw);
      }

      if (
        this.$refs.upload_2.uploadFiles.length != 0 &&
        this.$refs.upload_2.uploadFiles[0].status == "ready"
      ) {
        params.append("cover", this.$refs.upload_2.uploadFiles[0].raw);
      }
      if (
        this.$refs.upload_3.uploadFiles.length != 0 &&
        this.$refs.upload_3.uploadFiles[0].status == "ready"
      ) {
        params.append("icon", this.$refs.upload_3.uploadFiles[0].raw);
      }

      this.$refs["update_ruleForm"].validate((valid) => {
        if (valid) {
          editcloudproductimg(this.object.id, params).then((r) => {
            if (r.id != "") {
              //修改成功
              this.$emit("listenToChildEvent", this.active);
            } else {
              this.$notify({
                type: "info",
                message: "修改失败",
              });
            }
          });
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
      this.object.fileList1 = "";
    },
    handlePictureCardPreview_1(file) {
      this.dialogImageUrl_1 = file.url;
      this.dialogVisible_1 = true;
    },
    con_1(file, fileList) {
      if (fileList.length > 0) {
        this.object.fileList1 = "值";
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
      this.object.fileList2 = "";
    },
    handlePictureCardPreview_2(file) {
      this.dialogImageUrl_2 = file.url;
      this.dialogVisible_2 = true;
    },
    con_2(files, fileList) {
      if (fileList.length > 0) {
        this.object.fileList2 = "值";
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
      this.object.fileList3 = "";
    },
    handlePictureCardPreview_3(file) {
      this.dialogImageUrl_3 = file.url;
      this.dialogVisible_3 = true;
    },
    con_3(files, fileList) {
      if (fileList.length > 0) {
        this.object.fileList3 = "值";
      }
      const isLt3M = files.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传产品图大小不能超过 3MB!");
        this.$refs.upload_3.uploadFiles = [];
      } else {
        this.hideUpload_3 = fileList.length >= 1;
      }
    },
  },
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
