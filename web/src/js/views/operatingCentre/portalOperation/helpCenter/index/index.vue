<template>
  <div>
    <el-row :gutter="20" class="primaryBackground">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple" style="padding:10px;">
          <el-col :span="3" style="padding:0">
            <div class="left" style="margin-right:27px;">
              <el-button
                size="small"
                icon="el-icon-plus"
                type="primary"
                @click="dialogFormVisible = true"
                >添加</el-button
              >
            </div>
          </el-col>

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
                <router-link
                  :to="{
                    path:
                      '/operatingCentre/portalOperation/helpCenter/detail/' +
                      scope.row.id
                  }"
                  class="link"
                  >{{ scope.row.title }}</router-link
                >
              </template>
            </el-table-column>

            <el-table-column
              label="LOGO图片"
              width="200"
              align="center"
              height="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.icon != null">
                  <img
                    :src="baseURL.DATAURL + scope.row.icon.url"
                    style="width:80px;height:80px;"
                    alt=""
                /></span>
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
        </div>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogFormVisible"
      title="添加帮助中心目录"
      width="65%"
    >
      <el-form ref="ruleForm" :model="form">
        <el-form-item
          :label-width="formLabelWidth"
          label="名称"
          prop="title"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-col :span="24">
            <el-input v-model="form.title" autocomplete="off" />
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
            :file-list="fileList_1"
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
            <i class="el-icon-plus"
              ><div slot="tip" class="el-upload__tip imagesFont">
                只能上传jpg/png文件，且不超过3MB
              </div></i
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogFormVisible_update"
      title="修改"
      width="65%"
    >
      <el-form ref="form_update" :model="form_update">
        <el-form-item
          :label-width="formLabelWidth"
          label="名称"
          prop="title"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-col :span="24">
            <el-input v-model="form_update.title" autocomplete="off" />
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
            ref="upload_updata_2"
            :class="{ hide_1: hideUpload_1 }"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview_2"
            :on-remove="handleRemove_1"
            :on-change="con_1"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_update = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('form_update')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/paginationCms";
import Ueditor from "@/components/ueditor";
import baseURL from "@/api/app.js";
import {
  getHelptitles,
  addHelptitles,
  editHelptitles,
  deleteHelptitles  
} from "@/api/serviceOperatingcms";
import {
  requestParams,
  parseHash,
  requestParamsNotUrl
} from "@/utils/urlParam";

export default {
  components: {
    Ueditor,
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      listcms: [],
      fileList_1: [],
      baseURL: baseURL,
      search: { _start: 0, _limit: 10, _sort: "createdAt:DESC" },
      dialogFormVisible: false,
      dialogFormVisible_update: false,
      fileList_2: [],
      type: [],
      searchType: [],
      metadata: { _start: 0, _limit: 10, totalElements: 0 },
      dialogImageUrl_1: "",
      dialogVisible_1: false,
      hideUpload_1: false,
      dialogImageUrl_2: "",
      dialogVisible_2: false,

      hideUpload_2: false,
      listLoading: false,
      form: {
        fileList: "",
        title: "",
        logo: ""
      },
      form_update: {
        fileList: "",
        id: "",
        title: "",
        logo: ""
      },
      formLabelWidth: "100px",
      searchInput: "",
      searchSelect: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRemove_1(file, fileList) {
      this.hideUpload_1 = fileList.length >= 1;
      this.form_update.fileList = "";
    },
    con_1(file, fileList) {
      if (fileList.length > 0) {
        this.form_update.fileList = "值";
      }

      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload_1.uploadFiles = [];
      } else {
        this.hideUpload_1 = fileList.length >= 1;
      }
    },
    handlePictureCardPreview_1(file) {
      this.dialogImageUrl_1 = file.url;
      this.dialogVisible_1 = true;
    },
    handleRemove_2(file, fileList) {
      this.hideUpload_2 = fileList.length >= 1;
      this.form.fileList = "";
    },
    handlePictureCardPreview_2(file) {
      this.dialogImageUrl_2 = file.url;
      this.dialogVisible_2 = true;
    },
    con_2(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileList = "值";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload_2.uploadFiles = [];
      } else {
        this.hideUpload_2 = fileList.length >= 1;
      }
    },
    // 初始化表格
    async fetchData() {
      this.listLoading = true;
      // 筛选的方法
      const res = await requestParams(getHelptitles, this.search);
      const res1 = await requestParams(getHelptitles);
      this.type = res1;
      this.listcms = res;
      this.pageProcess(res.length);
      console.log(this.listcms);
      this.listLoading = false;
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
    // 提交表单
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          console.log(this.form);
          var params = new FormData();
          params.append("title", this.form.title);
          params.append("helptypes", "[]");
          if (this.$refs.upload_2.uploadFiles.length > 0) {
            // console.log(this.$refs);
            params.append("icon", this.$refs.upload_2.uploadFiles[0].raw);
          }
          console.log(params);
          addHelptitles(params).then(r => {
            this.hintMessage(r, "新增");
            this.$refs[formName].resetFields();
          });
          this.loading = false;
          this.dialogFormVisible = false;
          this.fileList_1 = []
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
    // 删除
    deleteObject(id) {
      this.$confirm("此操作将永久删除该, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteHelptitles(id).then(r => {
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
    // 编辑模态框显示，填充数据
    editObjectShow(row) {
      this.fileList_2 = [];
      this.form_update.title = row.title;
      this.form_update.helptypes = row.helptypes;
      this.form_update.icon = row.icon;
      this.form_update.id = row._id;
      if (row.icon != null) {
        const imageObject = { name: "", url: "" };
        imageObject.name = row.icon.name;
        imageObject.url = baseURL.DATAURL + row.icon.url;
        this.fileList_2.push(imageObject);
        this.hideUpload_2 = this.fileList_2.length >= 1;
        this.form_update.fileList = "值";
      }

      this.dialogFormVisible_update = true;
      console.log(this.form_update);
    },
    editFrom() {
      var params = new FormData();
      console.log(this.$refs.upload_updata_2.uploadFiles);
      params.append("title", this.form_update.title);
      if (this.form_update.helptypes.length > 0) {
        console.log(this.form_update.helptypes);
        params.append("helptypes", JSON.stringify(this.form_update.helptypes));
      } else {
        params.append("helptypes", "[]");
      }
      if (
        this.$refs.upload_updata_2.uploadFiles.length > 0 &&
        this.$refs.upload_updata_2.uploadFiles[0].status == "ready"
      ) {
        // console.log(this.$refs);
        params.append("icon", this.$refs.upload_updata_2.uploadFiles[0].raw);
      }
      console.log(params);
      editHelptitles(this.form_update.id, params).then(r => {
        this.hintMessage(r, "修改");
      });
      this.dialogFormVisible_update = false;
    },
    getName(val) {
      let obj = {};
      obj = this.type.find(item => {
        return item.id == val;
      });
      let getName = "";
      getName = obj.name;
      return getName;
    },
    tableChange({ _start, _limit }) {
      this.search._start = _start;
      _limit && (this.search._limit = _limit);
      this.search._start = (_start - 1) * _limit;
      this.fetchData();
    },
    searchData() {
      this.fetchData();
    },

    // 对分页的对象进行加工
    pageProcess(res1) {
      this.metadata._start = this.search._start;
      this.metadata._limit = this.search._limit;
      this.metadata.totalElements = res1;
      if (this.search == 1) {
        this.metadata.number = 1;
      } else {
        this.metadata.number = this.metadata._start / this.metadata._limit + 1;
      }
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
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";
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
/deep/ .el-input {
  font-size: 12px;
}
.primaryBackground {
  background: #ffffff;
  margin: 0px 10px !important;
}
.el-form-item[data-v-2c47a19b][data-v-2c47a19b] {
  margin-bottom: 20px;
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
