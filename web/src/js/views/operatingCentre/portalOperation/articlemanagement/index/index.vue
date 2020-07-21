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
                >添加文章</el-button
              >
            </div>
          </el-col>
          <el-col :span="17" :offset="2">
            <el-row class="right">
              <el-col :span="8">
                <el-select
                  v-model="searchSelect"
                  placeholder="请选择文章类型"
                  style="width:100%;"
                  size="mini"
                  @change="changeQuery"
                >
                  <el-option
                    v-for="item in type"
                    :key="item.id"
                    :label="item.type"
                    :value="item.id"
                  ></el-option>
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
            :data="listcms"
            style="width: 100%"
            row-key="id"
            v-loading="listLoading"
            size="small"
            element-loading-text="Loading"
            fit
            highlight-current-row
          >
            <el-table-column
              prop="name"
              label="文章名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="documentType_name"
              label="类型名称"
              align="center"
            ></el-table-column>
        
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

    <el-dialog :visible.sync="dialogFormVisible" title="新增文章" width="65%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="文章名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-col :span="24">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="文章类型"
          :label-width="formLabelWidth"
          prop="documentType_id"
          class="marginTop"
        >
          <el-col :span="24">
            <el-select
              v-model="form.documentType_id"
              placeholder="请选择文章类型"
              style="width:100%;"
            >
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          label="文章内容"
          :label-width="formLabelWidth"
          class="marginTop"
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
      title="修改文章"
      width="65%"
    >
      <el-form :model="form_update" :rules="rules_update" ref="ruleForm_update">
        <el-form-item
          label="文章名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-col :span="24">
            <el-input v-model="form_update.name" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item
          label="文章类型"
          :label-width="formLabelWidth"
          prop="documentType_id"
          class="marginTop"
        >
          <el-col :span="24">
            <el-select
              v-model="form_update.documentType_id"
              placeholder="请选择文章类型"
              style="width:100%;"
            >
              <el-option
                v-for="item in type"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item
          label="文章内容"
          :label-width="formLabelWidth"
          class="marginTop"
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
        <el-button type="primary" @click="updateForm('ruleForm_update')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/paginationCms";
import Ueditor from "@/components/ueditor";
import {
  selectdocumenttypes,
  addDocument,
  getDocument,
  getDocumentCount,
  deleteDocument,
  editDocument
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
      search: { _start: 0, _limit: 10 ,_sort:"createdAt:DESC"},
      dialogFormVisible: false,
      dialogFormVisible_update: false,
      type: [],
      metadata: { _start: 0, _limit: 10, totalElements: 0 },
      form: {
        name: "",
        documentType_id: "",
        content: "",
        documentType_name: ""
      },
      form_update: {
        name: "",
        documentType_id: "",
        content: "",
        documentType_name: ""
      },
      formLabelWidth: "100px",
      searchInput: "",
      searchSelect: "",
      rules: {
        name: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
        documentType_id: [
          { required: true, message: "请选择文章类型", trigger: "change" }
        ]
      },
      rules_update: {
        name: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
        documentType_id: [
          { required: true, message: "请选择文章类型", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getTypeData();
    this.fetchData();
  },
  methods: {

    //  子组件更新的值
    change(type) {
      this.form.content = type;
      this.form_update.content = type;
    },
    //  子组件更新的值
    upchange(type) {
      this.form_update.content = type;
      console.log(this.form_update.content)
    },
    changeQuery() {
      this.searchData();
    },
    // 初始化表格
    async fetchData() {
      this.listLoading = true;
      // 筛选的方法
      const params = this.searchFun();
      const res = await requestParams(getDocument, this.search);
      const res1 = await requestParams(getDocumentCount, params);
      this.pageProcess(res1);
      this.listcms = res;
      this.listLoading = false;
    },
    //提交表单
    async commitFrom() {
      this.form.content = this.$refs.ueditor.getDoContent();
      this.form.documentType_name = this.getName(this.form.documentType_id);
      const res = await requestParams(addDocument, this.form);
      this.hintMessage(res, "创建文章");
      this.dialogFormVisible = false;
      this.$refs["ruleForm"].resetFields();
      this.form.content = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.commitFrom();
        } else {
          console.log("error submit!!");
          return false;
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
    // 获得类型数据
    async getTypeData() {
      const res = await requestParams(selectdocumenttypes);
      console.log(res);
      this.type = res;
    },
    // 删除文章
    deleteObject(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDocument(id).then(r => {
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
    // 编辑文章模态框显示，填充数据
    editObjectShow(row) {
      this.upchange(row.content);
      //  this.form.content = this.$refs.ueditor_update.getDoContent();
      this.form_update.content = "";
      this.form_update.name = row.name;
      this.form_update.documentType_id = row.documentType_id;
      this.form_update.content = row.content;
      this.form_update.id = row.id;
      
      this.dialogFormVisible_update = true;
     
    },
    showMsgFromChild(data) {
      this.active = data;
    },
    editFrom() {
      this.form_update.content = this.$refs.ueditor_update.getDoContent();

      this.form_update.documentType_name = this.getName(
        this.form_update.documentType_id
      );
      editDocument(this.form_update.id, this.form_update).then(r => {
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
        this.search.documentType_id = this.searchSelect;
        params.documentType_id = this.searchSelect;
      } else {
        delete this.search.documentType_id;
        delete params.documentType_id;
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
