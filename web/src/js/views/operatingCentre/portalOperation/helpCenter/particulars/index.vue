<template>
  <div>
    <el-row
      style="padding:15px 22px;;background:#fff;margin-top:10px;border-bottom:1px solid #e6e6e6;"
    >
      <div class="grid-content bg-purple">
        <div class="left">
          <el-button
            size="small"
            icon="el-icon-plus"
            type="primary"
            @click="dialogFormVisible_create = true"
            >添加</el-button
          >
        </div>
        <div class="right">
          <el-button
            type="primary"
            size="xx-small"
            icon="el-icon-back"
            @click="back"
            >返回</el-button
          >
        </div>
      </div>

      <el-table
        v-loading="listLoading"
        :data="listcms"
        style="width: 100%"
        row-key="id"
        size="small"
        element-loading-text="Loading"
        fit
        highlight-current-row
      >
        <el-table-column label="目录名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="是否为热门文档" align="center">
          <template slot-scope="scope">
            {{ scope.row.isHotDocument ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="时间" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link
              type="primary"
              class="link"
              @click="editObjectShow(scope.row)"
              >编辑</el-link
            >
            <el-link
              type="danger"
              class="link"
              @click="deleteObject(scope.row.id)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination :metadata="metadata" :table-change="tableChange" />
    </el-row>

    <el-row style="padding:15px 22px;;background:#fff;"> </el-row>
    <el-dialog
      :visible.sync="dialogFormVisible_update"
      title="修改文档"
      width="65%"
    >
      <el-form ref="form" :model="form_update">
        <el-form-item
          :label-width="formLabelWidth"
          label="目录名称"
          prop="title"
          :rules="[
            { required: true, message: '请添加目录名称', trigger: 'blur' }
          ]"
        >
          <el-col :span="24">
            <el-input v-model="form_update.title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否为热门文档">
          <el-col :span="24">
            <el-switch
              v-model="form_update.isHotDocument"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="热门文档名称">
          <el-col :span="24">
            <el-input v-model="form_update.parentTitle" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="LOGO"
          class="marginTop"
        >
          <el-upload
            ref="upload_updata_2"
            :class="{ hide_2: hideUpload_2 }"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview_2"
            :on-remove="handleRemove_2"
            :on-change="con_2"
            :limit="1"
            :file-list="fileList_2"
            style="display:inline-block"
            action="#"
            list-type="picture-card"
            name="icon"
          >
            <i class="el-icon-plus"
              ><div slot="tip" class="el-upload__tip imagesFont">
                只能上传jpg/png文件，且不超过3MB
              </div></i
            >
          </el-upload>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="文档内容"
          class="marginTop"
          prop="content"
        >
          <el-col :span="24">
            <tinymce-editor
              :content="form_update.content"
              ref="ueditor_update"
              @change="upchange"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_update = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormVisible_create"
      title="添加帮助中心目录"
      width="65%"
    >
      <el-form ref="ref_form_create" :model="form_create">
        <el-form-item
          :label-width="formLabelWidth"
          label="目录名称"
          prop="title"
          :rules="[
            { required: true, message: '请输入目录名称', trigger: 'blur' }
          ]"
        >
          <el-col :span="24">
            <el-input v-model="form_create.title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否为热门文档">
          <el-col :span="24">
            <el-switch
              v-model="isHotDocument"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="热门文档名称">
          <el-col :span="24">
            <el-input v-model="form_create.parentTitle" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="LOGO"
          class="marginTop"
          prop="fileList"
          :rules="[{ required: true, message: '请添加图片', trigger: 'blur' }]"
        >
          <el-upload
            ref="upload_2"
            :class="{ hide_2: hideUpload_2 }"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview_2"
            :on-remove="handleRemove_1"
            :on-change="con_1"
            :limit="1"
            style="display:inline-block"
            action="#"
            list-type="picture-card"
            name="cover"
          >
            <i class="el-icon-plus"
              ><div slot="tip" class="el-upload__tip imagesFont">
                只能上传jpg/png文件，且不超过3MB
              </div></i
            >
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述">
          <el-col :span="24">
            <el-input
              type="textarea"
              v-model="form_create.description"
              autocomplete="off"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="文档内容"
          class="marginTop"
          prop="content"
        >
          <el-col :span="24">
            <tinymce-editor
              :content="form_create.content"
              ref="ueditor_update"
              @change="change"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_create = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ref_form_create')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import Ueditor from "@/components/ueditor";
import baseURL from "@/api/app.js";
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  getHelptitlesThreeLayers,
  getHelptitlesThreeLayersParticulars,
  createHelparticle,
  createHelpcontent,
  updateHelptitlesThreeLayersParticulars,
  updateHelpcontent,
  dateleHelptitlesThreeLayersParticulars
} from "@/api/serviceOperatingcms";
import TinymceEditor from "../../../../tinymce-editor";
export default {
  components: {
    Pagination,
    Ueditor,
    TinymceEditor
  },
  data() {
    return {
      search: { _start: 0, _limit: 10 },
      listLoading: false,
      dialogFormVisible_create: false,
      listcms: [],
      metadata: { _start: 0, _limit: 10, totalElements: 0 },
      dialogFormVisible_update: false,
      hideUpload_2: false,
      form_update: {
        fileList: "",
        id: "",
        description: "",
        title: "",
        isHotDocument: false,
        helptype: {},
        helpcontents: [],
        cover: null,
        parentTitle: "",
        content: ""
      },
      fileList_2: [],
      isHotDocument: false,
      form_create: {
        fileList: "",
        description: "",
        title: "",
        isHotDocument: false,
        helptype: {},
        helpcontents: [],
        cover: null,
        parentTitle: "",
        content: ""
      },
      helpcontent: {
        helparticle: "",
        title: "",
        type: "",
        content: "",
        __v: 0,
        title: "",
        _id: ""
      },
      helptitleId: "",
      helptype: {},
      formLabelWidth: "100px"
      // rules: {
      //   title: [{ required: true, message: "请输入名称", trigger: "blur" }],
      //   content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      // },
      // rules_update: {
      //   title: [{ required: true, message: "请输入名称", trigger: "blur" }],
      //   content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      // }
    };
  },
  created() {
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    //  子组件更新的值
    change(type) {
      this.form_create.content = type;
    },
    //  子组件更新的值
    upchange(type) {
      this.form_update.content = type;
    },
    // 编辑活动模态框显示，填充数据
    async editObjectShow(row) {
      this.form_update = row;
      this.fileList_2 = [];
      this.form_update.title = row.title;
      this.form_update.description = row.description;
      this.form_update.isHotDocument =row.isHotDocument;
      this.form_update.parentTitle =
        row.parentTitle == undefined ? "" : row.parentTitle;
      this.form_update.cover = row.cover;

      if (row.cover != null) {
        const imageObject = { name: "", url: "" };
        imageObject.name = row.cover.name;
        imageObject.url = baseURL.DATAURL + row.cover.url;
        this.fileList_2.push(imageObject);
        this.hideUpload_2 = this.fileList_2.length >= 1;
      }
      console.log(this.form_update);
      const res = await requestParams(
        getHelptitlesThreeLayersParticulars,
        row.id
      );
      this.form_update.content = res.helpcontents[0].content;
      // awit getHelptitlesThreeLayersParticulars(row.id).then(r => {
      //   this.form_update.content = r.helpcontents[0].content;
      //   console.log(this.form_update);
      // });

      this.dialogFormVisible_update = true;
    },

    async fetchData() {
      const res = await requestParams(
        getHelptitlesThreeLayers,
        this.$route.params.id,
        this.search
      );
      this.pageProcess(res.helparticles.length);
      this.helptitleId = res.helptitle.id;
      this.listcms = res.helparticles;
      this.helptype = res;
    },
    // 新建目录
    submitForm(formName) {
      this.$refs["ref_form_create"].validate(valid => {
        if (valid) {
          this.loading = true;
          // this.form_create.isHotDocument = this.isHotDocument;
          // this.form_create.cover = this.$refs.upload_2.uploadFiles[0].raw;
          // this.form_create.helptype = this.helptype;
          var params = new FormData();
          params.append("title", this.form_create.title);
          params.append("isHotDocument", this.isHotDocument);
          params.append("parentTitle", this.form_create.parentTitle);
          params.append("description", this.form_create.description);
          params.append("helpcontents", "[]");
          params.append("helptype", JSON.stringify(this.helptype));

          if (this.$refs.upload_2.uploadFiles.length > 0) {
            params.append("cover", this.$refs.upload_2.uploadFiles[0].raw);
          }
          createHelparticle(params).then(r => {
            this.helpcontent.helparticle = r.id;
            this.helpcontent.title = this.form_create.title;
            this.helpcontent.content = this.$refs.ueditor_update.getDoContent();
            createHelpcontent(this.helpcontent).then(r => {});
            this.hintMessage(r, "新增");
          });
          this.dialogFormVisible_create = false;
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editFrom();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改
    editFrom() {
      var params = new FormData();
      params.append("title", this.form_update.title);
      params.append("isHotDocument", this.form_update.isHotDocument);
      // params.append("content", this.$refs.ueditor_update.getDoContent());
      params.append("parentTitle", this.form_update.parentTitle);
      params.append("helptype", this.$route.params.id);
      params.append("helcoverptype", this.form_update.cover);

      params.append("id", this.form_update.id);
      params.append("_id", this.form_update.id);
      params.append("__v", 0);
      updateHelptitlesThreeLayersParticulars(this.form_update.id, params).then(
        r => {
          var paramsObj = new FormData();
          paramsObj.append("helparticle", r.id);
          paramsObj.append("title", this.form_update.title);
          paramsObj.append("content", this.$refs.ueditor_update.getDoContent());
          paramsObj.append("id", r.helpcontents[0].id);
          paramsObj.append("_id", r.helpcontents[0].id);
          updateHelpcontent(r.helpcontents[0].id, paramsObj).then(res => {
            this.hintMessage(res, "修改");
          });
        }
      );
      this.dialogFormVisible_update = false;
    },
    // 删除目录
    deleteObject(id) {
      this.$confirm("此操作将永久删除该帮助文档, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          dateleHelptitlesThreeLayersParticulars(id).then(r => {
            this.hintMessage(r, "删除");
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "取消删除"
          });
        });
    },
    back() {
      this.$router.push({
        path:
          "/operatingCentre/portalOperation/helpCenter/detail/" +
          this.helptitleId
      }); // 返回上一层
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    middleValueChange(value) {
      this.middleValue = value;
    },
    handlePictureCardPreview_2(file) {
      this.dialogImageUrl_2 = file.url;
      this.dialogVisible_2 = true;
    },
    handleRemove_2(file, fileList) {
      this.hideUpload_2 = fileList.length >= 1;
      this.form_update.fileList = "";
    },
    con_2(file, fileList) {
      if (fileList.length > 0) {
        this.form_update.fileList = "值";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload_2.uploadFiles = [];
      } else {
        this.hideUpload_2 = fileList.length >= 1;
      }
    },
    handleRemove_1(file, fileList) {
      this.hideUpload_1 = fileList.length >= 1;
      this.form_create.fileList = "";
    },
    con_1(file, fileList) {
      if (fileList.length > 0) {
        this.form_create.fileList = "值";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload_1uploadFiles = [];
      } else {
        this.hideUpload_1 = fileList.length >= 1;
      }
    },
    // 对分页的对象进行加工
    pageProcess(res) {
      this.metadata._start = this.search._start;
      this.metadata._limit = this.search._limit;
      this.metadata.totalElements = res;
      if (this.search == 1) {
        this.metadata.number = 1;
      } else {
        this.metadata.number = this.metadata._start / this.metadata._limit + 1;
      }
    },
    searchFun() {
      const params = {};
      if (this.searchInput.length != 0) {
        this.search.name_contains = this.searchInput;
        params.name_contains = this.searchInput;
      } else {
        delete this.search.name_contains;
        delete params.name_contains;
      }
      if (this.searchSelect.length != 0) {
        this.search.id = this.searchSelect;
        params.id = this.searchSelect;
      } else {
        delete this.search.id;
        delete params.id;
      }
      return params;
    },
    tableChange({ _start, _limit }) {
      this.search._start = _start;
      _limit && (this.search._limit = _limit);
      this.search._start = (_start - 1) * _limit;
      this.fetchData();
    },
    // 提示语句
    hintMessage(r, info) {
      if (r.id != "") {
        this.$notify({
          type: "success",
          message: info + "成功"
        });
        this.fetchData();
      } else {
        this.$notify({
          type: "error",
          message: info + "失败"
        });
      }
      this.fetchData();
    },
    // 重置
    reset() {
      this.searchSelect = "";
      this.searchInput = "";
      this.search.name_contains = "";
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../rewrite.scss";
.imagesFont {
  padding-left: 15px;
  padding-right: 15px;
  line-height: 20px;
}
@media screen and (max-width: 1024px) {
  /deep/ .el-select[data-v-2c47a19b] {
    width: 430px !important;
  }
}
/deep/.el-upload-dragger {
  width: 239px;
  height: 144px;
}
/deep/ .el-upload--picture-card {
  padding-top: 33px;
}
.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
/deep/ .el-input {
  font-size: 12px;
}
.primaryBackground {
  background: #ffffff;
  margin: 0px 10px !important;
}
.el-form-item {
  margin-bottom: 20px !important;
}
/deep/.el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
}
.el-textarea__inner {
  width: 93%;
}
.strong {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}

.icon-wrap {
  float: left;
  background: #00609e;
  border-radius: 40px;
  width: 60px;
  height: 60px;
  text-align: center;
  padding-top: 15px;
  margin-right: 10px;
  .icon {
    width: 30px;
    height: 30px;
  }
}
.txt-wrap {
  display: inline-block;
  margin-top: 10px;
  .main-txt {
    font-weight: bold;
  }
  .sub-txt {
    margin-top: 8px;
  }
}
.el-select {
  width: 200px;
  height: 32px;
}
.el-option {
  width: 100%;
}

.search-input {
  width: 150px;
  //margin: 0 10px;
}
.marginTop {
  margin-top: 20px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
