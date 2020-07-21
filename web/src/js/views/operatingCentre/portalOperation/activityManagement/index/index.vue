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
                >添加活动</el-button
              >
            </div>
          </el-col>
          <el-col :span="17" :offset="2">
            <el-row class="right">
              <el-col :span="8">
                <el-select
                  v-model="searchSelect"
                  placeholder="请选择活动类型"
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
            <el-table-column prop="name" label="活动名称" align="center" />
            <el-table-column prop="typeName" label="类型名称" align="center" />
            <el-table-column label="描述" align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" placement="right">
                  <div
                    slot="content"
                    v-html="
                      scope.row.description == null ? '' : scope.row.description
                    "
                  />
                  <div
                    class="oneLine"
                    v-text="
                      ToBreak(
                        scope.row.description == null
                          ? ''
                          : scope.row.description
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
                    :src="baseURL.DATAURL + scope.row.cover[0].url"
                    style="width:100%;height:80px;"
                    alt=""
                /></span>
              </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="时间" align="center" />
            <el-table-column label="是否为最新活动" width="200" align="center">
              <template slot-scope="scope">
                {{ scope.row.labelName }}
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

    <el-dialog :visible.sync="dialogFormVisible" title="新增活动" width="65%">
      <el-form ref="ruleForm" :model="form">
        <el-form-item
          :label-width="formLabelWidth"
          label="活动名称"
          prop="name"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-col :span="24">
            <el-input v-model="form.name" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="活动类型"
          prop="type"
          class="marginTop"
          :rules="[{ required: true, message: '请选择活动类型' }]"
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
        <el-form-item
          :label-width="formLabelWidth"
          label="活动描述"
          prop="description"
          class="marginTop"
        >
          <el-col :span="24">
            <el-input
              v-model="form.description"
              placeholder="请输入活动描述"
              style="width:100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="是否为最新活动"
          class="marginTop"
        >
          <el-col :span="24">
            <el-switch
              v-model="form.label"
              active-color="#13ce66"
              inactive-color="#ff4949"
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
            ref="upload"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList_1"
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
          label="活动内容"
          class="marginTop"
        >
          <el-col :span="24">
            <tinymce-editor
              ref="ueditor"
              :doc-conten="form.content"
              @change="addChange"
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
      title="修改活动"
      width="65%"
    >
      <el-form ref="ref_form_update" :model="form_update">
        <el-form-item
          :label-width="formLabelWidth"
          label="活动名称"
          prop="name"
          :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]"
        >
          <el-col :span="24">
            <el-input v-model="form_update.name" autocomplete="off" />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="活动类型"
          prop="type"
          class="marginTop"
          :rules="[{ required: true, message: '请选择活动类型' }]"
        >
          <el-col :span="24">
            <el-select
              v-model="form_update.type"
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
        <el-form-item
          :label-width="formLabelWidth"
          label="活动描述"
          prop="description"
          class="marginTop"
        >
          <el-col :span="24">
            <el-input
              v-model="form_update.description"
              placeholder="请输入活动描述"
              style="width:100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          label="是否为最新活动"
          class="marginTop"
        >
          <el-col :span="24">
            <el-switch
              v-model="form_update.label"
              active-color="#13ce66"
              inactive-color="#ff4949"
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
            ref="upload_updata"
            :class="{ hide: hideUpload }"
            :auto-upload="false"
            :on-preview="handlePictureCardPreview"
            :on-remove="uphandleRemove"
            :on-change="con_update"
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
          label="活动内容"
          class="marginTop"
        >
          <el-col :span="24">
            <tinymce-editor
              ref="ueditor_update"
              :content="form_update.content"
              @change="change"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_update = false">取 消</el-button>
        <el-button type="primary" @click="updateForm('ref_form_update')"
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
import TinymceEditor from "../../../../tinymce-editor";
import {
  addActive,
  getActive,
  getActiveCount,
  editActive,
  delActive
} from "@/api/serviceOperatingcms";
import { requestParams, parseHash } from "@/utils/urlParam";

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
      data: "",
      msg: "alskfjalkf",
      listcms: [],
      baseURL: baseURL,
      search: { _start: 0, _limit: 10, _sort: "createdAt:DESC" },
      dialogFormVisible: false,
      dialogFormVisible_update: false,
      fileList: [],
      type: [
        {
          value: 1,
          label: "活动事件"
        },
        {
          value: 2,
          label: "重要通知"
        },
        {
          value: 3,
          label: "产品公告"
        }
      ],
      searchType: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "活动事件"
        },
        {
          value: "2",
          label: "重要通知"
        },
        {
          value: "3",
          label: "产品公告"
        }
      ],
      fileList_1: [],
      metadata: { _start: 0, _limit: 10, totalElements: 0 },
      hideUpload: false,
      form: {
        fileList: "",
        name: "",
        type: "",
        content: "",
        description: "",
        cover: "",
        label: true
      },
      form_update: {
        fileList: "",
        id: "",
        name: "",
        type: "",
        content: "",
        description: "",
        cover: "",
        label: ""
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
    changeQuery() {
      this.searchData();
    },
    //  子组件更新的值
    change(type) {
      this.form_update.content = type;
    },
    addChange(type) {
      this.form.content = type;
    },
    //  子组件更新的值==结束

    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= 1;
      this.form.fileList = "";
    },
    uphandleRemove(file, fileList) {
      this.hideUpload = fileList.length >= 1;
      this.form_update.fileList = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl_1 = file.url;
      this.dialogVisible_1 = true;
    },
    con(file, fileList) {
      if (fileList.length > 0) {
        this.form.fileList = "值";
      } else {
        this.form.fileList = "";
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传产品logo大小不能超过 3MB!");
        this.$refs.upload.uploadFiles = [];
      } else {
        this.hideUpload = fileList.length >= 1;
      }
    },
    con_update(file, fileList) {
      if (fileList.length > 0) {
        this.form_update.fileList = "值";
      } else {
        this.form_update.fileList = "";
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
      const res = await requestParams(getActive, this.search);

      const res1 = await requestParams(getActiveCount, params);

      this.pageProcess(res1);
      this.listcms = res;

      this.listcms.forEach(function(item, index) {
        var n = 20;
        var str = "";
        for (var i = 0, l = item.description.length; i < l / n; i++) {
          var a = item.description.slice(n * i, n * (i + 1)) + "<br/>";
          str += a;
        }
        item.description = str;
      });
      for (let i = 0; i < this.listcms.length; i++) {
        if (this.listcms[i].type == 1) {
          this.listcms[i].typeName = "活动事件";
        } else if (this.listcms[i].type == 2) {
          this.listcms[i].typeName = "重要通知";
        } else if (this.listcms[i].type == 3) {
          this.listcms[i].typeName = "产品公告";
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
    async commitFrom() {
      this.form.content = this.$refs.ueditor.getDoContent();
      const res = await requestParams(addActive, this.form);
      this.hintMessage(res, "创建活动");
      this.dialogFormVisible = false;
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          var params = new FormData();

          params.append("name", this.form.name);
          params.append("type", this.form.type);
          params.append("content", this.$refs.ueditor.getDoContent());
          params.append("description", this.form.description);
          params.append("label", this.form.label);
          if (this.$refs.upload.uploadFiles.length > 0) {
            params.append("cover", this.$refs.upload.uploadFiles[0].raw);
          }
          addActive(params).then(r => {
            this.hintMessage(r, "新增");
            this.$refs[formName].resetFields();
          });
          this.loading = false;
          this.dialogFormVisible = false;
          this.$refs.ueditor.myValue = "";
          this.$refs.ueditor.getDoContent();
          this.fileList_1 = [];
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
          delActive(id).then(r => {
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
      this.fileList = [];
      this.form_update.name = row.name;
      this.form_update.type = row.type;
      this.form_update.content = row.content;
      this.form_update.id = row.id;
      this.form_update.description = row.description.replace(/<br\/>/g, "");;
      this.form_update.label = row.label ;
      this.form_update.cover = row.cover;
      const imageObject = { name: "", url: "" };
      if (row.cover.length > 0) {
        imageObject.name = row.cover[0].name;
        imageObject.url = baseURL.DATAURL + row.cover[0].url;
        this.fileList.push(imageObject);
        this.form_update.fileList = "值";
      }
      this.hideUpload = this.fileList.length >= 1;
      this.dialogFormVisible_update = true;
    },
    editFrom() {
      this.form_update.content = this.$refs.ueditor_update.getDoContent();
      if (
        this.$refs.upload_updata.uploadFiles.length > 0 &&
        this.$refs.upload_updata.uploadFiles[0].status == "ready"
      ) {
        this.form_update.cover = this.$refs.upload_updata.uploadFiles[0].raw;
      }
      var params = new FormData();
      params.append("name", this.form_update.name);
      params.append("type", this.form_update.type);
      params.append("content", this.form_update.content);
      params.append("description", this.form_update.description);
      params.append("label", this.form_update.label);

      if (
        this.$refs.upload_updata.uploadFiles.length != 0 &&
        this.$refs.upload_updata.uploadFiles[0].status == "ready"
      ) {
        params.append("cover", this.$refs.upload_updata.uploadFiles[0].raw);
      }
      params.append("id", this.form_update.id);
      params.append("_id", this.form_update.id);
      params.append("__v", 0);
      editActive(this.form_update.id, params).then(r => {
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
    // 筛选判断
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
        this.search.type = this.searchSelect;
        params.type = this.searchSelect;
      } else {
        delete this.search.type;
        delete params.type;
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
      this.search.name_contains = "";
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
