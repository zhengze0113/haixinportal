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
                @click="addcms"
                >添加</el-button
              >
            </div>
          </el-col>
          <el-col :span="17" :offset="2">
            <el-row class="right">
              <el-col :span="8">
                <el-select
                  v-model="searchSelect"
                  placeholder="请选择类型"
                  style="width:100%;"
                  size="mini"
                  @change="changeQuery"
                >
                  <el-option
                    v-for="item in searchType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="15" :offset="1">
                <el-col :span="18">
                  <el-input
                    v-model="searchInput"
                    size="mini"
                    placeholder="请输入文档名称"
                    class="search-input"
                  />
                </el-col>
                <el-col :span="6">
                  <el-button
                    size="small"
                    icon="el-icon-search"
                    @click="searchData()"
                    >查询</el-button
                  >
                </el-col>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" style="padding:0">
            <el-row class="right">
              <el-button size="small" type="primary" @click="reset()"
                >重置</el-button
              >
            </el-row>
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
            <el-table-column prop="title" label="名称" align="center" />
            <el-table-column prop="typeName" label="类型名称" align="center" />
            <el-table-column label="标签" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="right">
                  <div
                    slot="content"
                    v-html="scope.row.message == null ? '' : scope.row.message"
                  />
                  <div
                    class="oneLine"
                    v-text="
                      ToBreak(
                        scope.row.message == null ? '' : scope.row.message
                      )
                    "
                  />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="图片"
              width="200"
              align="center"
              height="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.cover != null">
                  <img
                    :src="baseURL.DATAURL + scope.row.cover.url"
                    style="width:100%;height:80px;"
                    alt=""
                /></span>
              </template>
            </el-table-column>
            <el-table-column
              label="LOGO图片"
              width="200"
              align="center"
              height="100"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.logo.length > 0">
                  <img
                    :src="baseURL.DATAURL + scope.row.logo[0].url"
                    style="width:100%;height:80px;"
                    alt=""
                /></span>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="时间" align="center" />
            <!-- <el-table-column label="是否为最新" width="200" align="center">
              <template slot-scope="scope">
                {{ scope.row.labelName }}
              </template> -->
            <!-- </el-table-column> -->
            <el-table-column label="操作" width="200" align="center">
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

    <el-dialog :visible.sync="dialogFormVisible" title="新增" width="65%">
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
          label="类型"
          class="marginTop"
        >
          <el-col :span="24">
            <el-select
              v-model="form.recordID"
              placeholder="请选择类型"
              style="width:100%;"
            >
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="标签"
          prop="message"
          class="marginTop"
        >
          <el-col :span="24">
            <el-input
              v-model="form.message"
              placeholder="请输入标签"
              style="width:100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="图片"
          class="marginTop"
          prop="fileList"
          :rules="[{ required: true, message: '请添加图片', trigger: 'blur' }]"
        >
          <el-upload
            ref="upload_1"
            :class="{ hide_1: hideUpload_1 }"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview_1"
            :on-remove="handleRemove_1"
            :on-change="con_1"
            :file-list="fileList_1"
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
        <el-form-item
          :label-width="formLabelWidth"
          label="LOGO"
          class="marginTop"
        >
          <el-upload
            ref="upload_2"
            :file-list="fileList_2"
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
      <el-form ref="ref_form_update" :model="form_update">
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
          label="类型"
          prop="recordID"
          class="marginTop"
        >
          <el-col :span="24">
            <el-select
              v-model="form_update.recordID"
              placeholder="请选择类型"
              style="width:100%;"
            >
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="标签"
          prop="message"
          class="marginTop"
        >
          <el-col :span="24">
            <el-input
              v-model="form_update.message"
              placeholder="请输入标签"
              style="width:100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="图片"
          class="marginTop"
          prop="fileList"
          :rules="[{ required: true, message: '请添加图片', trigger: 'blur' }]"
        >
          <el-upload
            ref="upload_updata_1"
            :class="{ hide_1: hideUpload_1 }"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview_1"
            :on-remove="handleRemove_1"
            :on-change="con_3"
            :limit="1"
            :file-list="fileList_1"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_update = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('ref_form_update')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- <tinymce-editor
      v-model="msg"
      :disabled="disabled"
      @onClick="onClick"
      ref="editor"
    ></tinymce-editor> -->
  </div>
</template>

<script>
import TinymceEditor from "../../../../tinymce-editor";
import Pagination from "@/components/paginationCms";
import Ueditor from "@/components/ueditor";
import baseURL from "@/api/app.js";
import {
  addRecommendationarrays,
  getRecommendationarrays,
  getRecommendationarraysCount,
  getrecommendations,
  getrecommendationsType,
  editRecommendationarrays,
  delRecommendationarrays,
  deleteUploadImg
} from "@/api/serviceOperatingcms";
import {
  requestParams,
  parseHash,
  requestParamsNotUrl
} from "@/utils/urlParam";

export default {
  components: {
    Ueditor,
    Pagination,
    TinymceEditor
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
      file: [],
      msg: "Welcome to Use Tinymce Editor",
      disabled: false,
      listcms: [],
      baseURL: baseURL,
      search: { _start: 0, _limit: 10, _sort: "createdAt:DESC" },
      dialogFormVisible: false,
      dialogFormVisible_update: false,
      fileList_1: [],
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
        recordID: "",
        message: "",
        cover: "",
        logo: ""
      },
      form_update: {
        fileList: "",
        id: "",
        title: "",
        recordID: "",
        message: "",
        cover: "",
        logo: ""
      },
      formLabelWidth: "100px",
      searchInput: "",
      searchSelect: ""
      // rules: {
      //   title: [{ required: true, message: "请输入名称", trigger: "blur" }],
      //   documentType_id: [
      //     { required: true, message: "请选择类型", trigger: "change" }
      //   ],
      //   file: [{ validator: checkImg, trigger: "blur" }]
      // },
      // rules_update: {
      //   title: [{ required: true, message: "请输入名称", trigger: "blur" }],
      //   updata_file: [{ required: true, message: "请上传图片" }]
      // }
    };
  },
  created() {
    this.fetchData();
    this.getTypeList();
  },

  methods: {
    checkImg(rule, value, callback) {
      console.log(rule);
      console.log(value);
      console.log(callback);
      if (value) {
        if (res.content) {
          callback();
        } else {
          return callback(new Error("pvc名称已存在"));
        }
      }
    },
    addcms() {
      this.fileList_1 = [];
      this.fileList_2 = [];
      this.form.recordID = "";
      this.hideUpload_1 = this.fileList_1.length >= 1;
      this.hideUpload_2 = this.fileList_2.length >= 1;
      this.dialogFormVisible = true;
    },
    changeQuery() {
      this.searchData();
    },
    //鼠标单击的事件
    onClick(e, editor) {},
    handleRemove_1(file, fileList) {
      this.hideUpload_1 = fileList.length >= 1;
      this.form_update.fileList = "";
    },
    con_1(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileList = "123";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload_1.uploadFiles = [];
      } else {
        this.hideUpload_1 = fileList.length >= 1;
      }
    },
    con_3(file, fileList) {
      if (fileList.length > 0) {
        this.form_update.fileList = "123";
        console.log(this.form.fileList);
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
    },
    handlePictureCardPreview_2(file) {
      this.dialogImageUrl_2 = file.url;
      this.dialogVisible_2 = true;
    },
    con_2(file, fileList) {
      // const result =
      //   file.raw.type == "image/png" || file.raw.type == "image/jpeg";
      //   else if (!result) {
      //   this.$message.error("上传产品logo是能为jpg或者png");
      //   this.$refs.upload_1.uploadFiles = [];
      // }
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
      const params = this.searchFun();
      const res = await requestParams(getRecommendationarrays, this.search);
      const res1 = await requestParams(getRecommendationarraysCount, params);
      this.pageProcess(res1);

      for (let i = 0; i < res.length; i++) {
        if (res[i].recordID != 0) {
          const type = await requestParamsNotUrl(
            getrecommendationsType,
            res[i].recordID
          );
          res[i].typeName = type.type;
        }
      }
      this.listcms = res;
      this.listcms.forEach(function(item, index) {
        var n = 20;
        var str = "";
        for (var i = 0, l = item.message.length; i < l / n; i++) {
          var a = item.message.slice(n * i, n * (i + 1)) + "<br/>";
          str += a;
        }
        item.message = str;
      });
      console.log(this.listcms);
      this.listLoading = false;
    },
    // 获取类型列表
    async getTypeList() {
      const type = await requestParams(getrecommendations);
      for (let i = 0; i < type.length; i++) {
        var item = { value: type[i].id, label: type[i].title };
        this.type.push(item);
      }
      this.searchType = this.type;
      var a = { value: "", label: "全部" };
      this.searchType.unshift(a);
    },
    // 提交表单
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          var params = new FormData();
          params.append("title", this.form.title);
          params.append("recordID", this.form.recordID);
          params.append("message", this.form.message);
          if (this.$refs.upload_1.uploadFiles.length > 0) {
            params.append("cover", this.$refs.upload_1.uploadFiles[0].raw);
          }
          if (this.$refs.upload_2.uploadFiles.length > 0) {
            params.append("logo", this.$refs.upload_2.uploadFiles[0].raw);
          }
          addRecommendationarrays(params).then(r => {
           
            this.hintMessage(r, "新增");

          });
          this.loading = false;
          this.dialogFormVisible = false;
          this.$refs.ruleForm.resetFields()
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editFrom();
        } else {
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
          delRecommendationarrays(id).then(r => {
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
      console.log(row);
      this.fileList_1 = [];
      this.fileList_2 = [];
      this.form_update.title = row.title;
      this.form_update.recordID = row.recordID;
      this.form_update.message = row.message.replace(/<br\/>/g, "");
      this.form_update.id = row.id;
      this.form_update.cover = row.cover;
      this.form_update.logo = row.logo;
      const imageObject_1 = { name: "", url: "" };
      const imageObject_2 = { name: "", url: "" };
      if (row.cover != "" && row.cover != null) {
        imageObject_1.name = row.cover.name;
        imageObject_1.url = baseURL.DATAURL + row.cover.url;
        this.fileList_1.push(imageObject_1);
        this.form_update.fileList = "有值";
      }
      if (row.logo.length > 0) {
        imageObject_2.name = row.logo[0].name;
        imageObject_2.url = baseURL.DATAURL + row.logo[0].url;
        this.fileList_2.push(imageObject_2);
      }
      this.hideUpload_1 = this.fileList_1.length >= 1;
      this.hideUpload_2 = this.fileList_2.length >= 1;
      this.dialogFormVisible_update = true;
    },
    editFrom() {
      var params = new FormData();
      params.append("title", this.form_update.title);
      params.append("recordID", this.form_update.recordID);
      params.append("message", this.form_update.message.replace("<br/>",""));
      console.log(this.$refs.upload_updata_1);
      if (
        this.$refs.upload_updata_1.uploadFiles.length != 0 &&
        this.$refs.upload_updata_1.uploadFiles[0].status == "ready"
      ) {
        params.append("cover", this.$refs.upload_updata_1.uploadFiles[0].raw);
      }
      if (this.$refs.upload_updata_1.uploadFiles.length == 0) {
        params.append("cover", "");
      }
      if (
        this.$refs.upload_updata_2.uploadFiles.length != 0 &&
        this.$refs.upload_updata_2.uploadFiles[0].status == "ready"
      ) {
        params.append("logo", this.$refs.upload_updata_2.uploadFiles[0].raw);
      }
      if (this.$refs.upload_updata_2.uploadFiles.length == 0) {
        params.append("logo", "");
      }

      params.append("id", this.form_update.id);
      params.append("_id", this.form_update.id);
      params.append("__v", 0);
      editRecommendationarrays(this.form_update.id, params).then(r => {
        this.hintMessage(r, "修改");
      });
      this.dialogFormVisible_update = false;
    },
    deleteImg(id) {
      deleteUploadImg(id).then(r => {
        this.hintMessage(r, "修改");
      });
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
    // 筛选判断
    searchFun() {
      const params = {};
      if (this.searchInput.length != 0) {
        this.search.title_contains = this.searchInput;
        params.title_contains = this.searchInput;
      } else {
        delete this.search.name_contains;
        delete params.name_contains;
      }
      if (this.searchSelect.length != 0) {
        this.search.recordID = this.searchSelect;
        params.recordID = this.searchSelect;
      } else {
        delete this.search.recordID;
        delete params.recordID;
      }
      return params;
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
      this.search.title_contains = "";
      this.fetchData();
    },
    ToBreak(val) {
      if (val != null) {
        return val.replace(/<br\/>/g, "");
      }
      return "";
    }
  }
};
</script>
<style lang="scss">
.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
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
