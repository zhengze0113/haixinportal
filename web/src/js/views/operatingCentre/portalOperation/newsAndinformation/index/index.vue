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
                >添加新闻</el-button
              >
            </div>
          </el-col>
          <el-col :span="17" :offset="2">
            <el-row class="right">
              <el-col :span="8">
                <el-select
                  v-model="searchSelect"
                  placeholder="请选择新闻类型"
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
            <el-table-column prop="title" label="新闻名称" align="center" />
            <el-table-column prop="typeName" label="类型名称" align="center" />
            <el-table-column
              prop="author"
              label="作者"
              align="center"
              show-overflow-tooltip
            />

            <el-table-column
              label="图片"
              width="200"
              align="center"
              height="100"
            >
              <template slot-scope="scope">
                <img
                  :src="baseURL.DATAURL + scope.row.cover.url"
                  style="width:100%;height:80px;"
                  alt=""
                />
              </template>
            </el-table-column>
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

    <el-dialog :visible.sync="dialogFormVisible" title="新增新闻" width="65%">
      <el-form ref="ruleForm" :model="form">
        <el-form-item
          :label-width="formLabelWidth"
          label="新闻名称"
          prop="title"
          :rules="[
            { required: true, message: '请添加新闻名称', trigger: 'blur' }
          ]"
        >
          <el-col :span="24">
            <el-input v-model="form.title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="活动类型"
          prop="type"
          class="marginTop"
          :rules="[{ required: true, message: '请添加活动类型' }]"
        >
          <el-col :span="24">
            <el-select
              v-model="form.type"
              placeholder="请选择活动类型"
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
        <el-form-item :label-width="formLabelWidth" label="作者" prop="name">
          <el-col :span="24">
            <el-input v-model="form.author" autocomplete="off" />
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
            ref="upload"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList_1"
            :on-remove="handleRemove"
            :on-change="con"
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
          label="新闻内容"
          class="marginTop"
          prop="content"
        >
          <el-col :span="24">
            <tinymce-editor
              :content="form.content"
              ref="ueditor"
              @change="change"
            />
          </el-col>
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
      title="修改新闻"
      width="65%"
    >
      <el-form ref="form_update" :model="form_update">
        <el-form-item
          :label-width="formLabelWidth"
          label="新闻名称"
          prop="title"
          :rules="[
            { required: true, message: '请添加新闻名称', trigger: 'blur' }
          ]"
        >
          <el-col :span="24">
            <el-input v-model="form_update.title" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="新闻类型"
          prop="type"
          class="marginTop"
          :rules="[{ required: true, message: '请添加新闻类型' }]"
        >
          <el-col :span="24">
            <el-select
              v-model="form_update.type"
              placeholder="请选择新闻类型"
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
          label="作者"
          prop="author"
          class="marginTop"
        >
          <el-col :span="24">
            <el-input
              v-model="form_update.author"
              placeholder="请输入新闻作者"
              style="width:100%;"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          :label-width="formLabelWidth"
          label="图片"
          class="marginTop"
          prop="fileList1"
          :rules="[{ required: true, message: '请添加图片', trigger: 'blur' }]"
        >
          <el-upload
            ref="upload_updata"
            :class="{ hide: hideUpload }"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove1"
            :on-change="con1"
            :limit="1"
            :file-list="fileList"
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
          label="新闻内容"
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
  getNews, // 获取新闻列表
  addNews, // 增加新闻
  getNewsCount, // 新闻数量
  editNews, // 编辑新闻
  delNews // 删除新闻
} from "@/api/serviceOperatingcms";
import { requestParams, parseHash } from "@/utils/urlParam";
import TinymceEditor from "../../../../tinymce-editor";
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
      listcms: [],
      fileList_1:[],
      baseURL: baseURL,
      search: { _start: 0, _limit: 10, _sort: "createdAt:DESC" },
      dialogFormVisible: false,
      dialogFormVisible_update: false,
      fileList: [],
      type: [
        {
          value: "1",
          label: "活动"
        },
        {
          value: "2",
          label: "通知"
        },
        {
          value: "3",
          label: "公告"
        }
      ],
      searchType: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "活动"
        },
        {
          value: "2",
          label: "通知"
        },
        {
          value: "3",
          label: "公告"
        }
      ],
      metadata: { _start: 0, _limit: 10, totalElements: 0 },
      hideUpload: false,
      form: {
        fileList: "",
        author: "",
        title: "",
        type: "",
        content: "",
        cover: ""
      },
      form_update: {
        fileList1: "",
        id: "",
        title: "",
        type: "",
        content: "",
        cover: "",
        author: ""
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
    //  子组件更新的值
    change(type) {
      this.form.content = type;
    },
    //  子组件更新的值
    upchange(type) {
      this.form_update.content = type;
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= 1;
      this.form.fileList = "";
    },
    handleRemove1(file, fileList) {
      this.hideUpload = fileList.length >= 1;
      this.form_update.fileList1 = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl_1 = file.url;
      this.dialogVisible_1 = true;
    },
    con(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileList = "值";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload.uploadFiles = [];
      } else {
        this.hideUpload = fileList.length >= 1;
      }
    },
    con1(file, fileList) {
      if (fileList.length > 0) {
        this.form_update.fileList1 = "值";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload.uploadFiles = [];
      } else {
        this.hideUpload = fileList.length >= 1;
      }
    },
    // 初始化表格
    async fetchData() {
      this.listLoading = true;
      // 筛选的方法
      const params = this.searchFun();
      console.log(params);
      console.log(this.search);
      const res = await requestParams(getNews, this.search);
      console.log(res);
      const res1 = await requestParams(getNewsCount, params);
      console.log(res1);
      this.pageProcess(res1);
      this.listcms = res;
      console.log(this.pageProcess(res1));
      for (let i = 0; i < this.listcms.length; i++) {
        if (this.listcms[i].type == "1") {
          this.listcms[i].typeName = "活动";
        } else if (this.listcms[i].type == "2") {
          this.listcms[i].typeName = "通知";
        } else if (this.listcms[i].type == "3") {
          this.listcms[i].typeName = "公告";
        }
        if (this.listcms[i].label == true) {
          this.listcms[i].labelName = "是";
        } else {
          this.listcms[i].labelName = "否";
        }
      }
      this.listLoading = false;
    },
    // 提交表单
    async commitFrom(formName) {
      this.loading = true;
      var params = new FormData();
      params.append("title", this.form.title);
      params.append("type", this.form.type);
      params.append("author", this.form.author);
      params.append("content", this.$refs.ueditor.getDoContent());
      if (this.$refs.upload.uploadFiles.length > 0) {
        params.append("cover", this.$refs.upload.uploadFiles[0].raw);
      }
      const res = await requestParams(addNews, params);
      this.hintMessage(res, "创建新闻");
      this.loading = false;
      this.dialogFormVisible = false;
      this.$refs.ueditor.myValue = "";
      this.$refs.ueditor.getDoContent();
      this.form.author = "";
      this.$refs[formName].resetFields();
      this.fileList_1 = [];
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.commitFrom(formName);
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
    // 删除活动
    deleteObject(id) {
      this.$confirm("此操作将永久删除该活动, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delNews(id).then(r => {
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
    // 编辑活动模态框显示，填充数据
    editObjectShow(row) {
      console.log(row);
      this.fileList = [];
      this.form_update.title = row.title;
      this.form_update.type = row.type;
      this.form_update.content = row.content;
      this.form_update.id = row.id;
      this.form_update.author = row.author;
      this.form_update.cover = row.cover;
      const imageObject = { name: "", url: "" };
      imageObject.name = row.cover.name;
      imageObject.url = baseURL.DATAURL + row.cover.url;
      this.fileList.push(imageObject);
      this.hideUpload = this.fileList.length >= 1;
      if (this.fileList.length > 0) {
        this.form_update.fileList1 = "值";
      }
      this.dialogFormVisible_update = true;
    },

    editFrom() {
      var params = new FormData();
      params.append("title", this.form_update.title);
      params.append("type", this.form_update.type);
      params.append("content", this.$refs.ueditor_update.getDoContent());
      params.append("author", this.form_update.author);
      if (
        this.$refs.upload_updata.uploadFiles.length > 0 &&
        this.$refs.upload_updata.uploadFiles[0].status == "ready"
      ) {
        this.form_update.cover = this.$refs.upload_updata.uploadFiles.raw;
      }
      params.append("id", this.form_update.id);
      params.append("_id", this.form_update.id);
      params.append("__v", 0);
      editNews(this.form_update.id, params).then(r => {
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
    changeQuery() {
      this.searchData();
    },
    // 筛选判断
    searchFun() {
      const params = {};
      if (this.searchInput.length != 0) {
        this.search.title_contains = this.searchInput;
        params.title_contains = this.searchInput;
      } else {
        delete this.search.title_contains;
        delete params.title_contains;
      }

      if (this.searchSelect.length != 0) {
        console.log(this.searchSelect);
        this.search.type = this.searchSelect;
        params.type = this.searchSelect;
        console.log(this.search.type);
        console.log(params.type);
      } else {
        delete this.search.typeName;
        delete params.typeName;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../rewrite.scss";
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
