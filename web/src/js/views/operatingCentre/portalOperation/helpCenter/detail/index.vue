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
            <router-link
              :to="{
                path:
                  '/operatingCentre/portalOperation/helpCenter/particulars/' +
                  scope.row.id
              }"
              class="link"
              >{{ scope.row.type }}</router-link
            >
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
      title="修改目录"
      width="30%"
    >
      <el-form ref="form_update" :model="form_update" :rules="rules_update">
        <el-form-item
          :label-width="formLabelWidth"
          label="目录名称"
          prop="name"
        >
          <el-col :span="24">
            <el-input v-model="form_update.type" autocomplete="off" />
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
    <el-dialog
      :visible.sync="dialogFormVisible_create"
      title="新增目录"
      width="30%"
    >
      <el-form ref="form_create" :model="form_create" :rules="rules_create">
        <el-form-item
          :label-width="formLabelWidth"
          label="目录名称"
          prop="name"
        >
          <el-col :span="24">
            <el-input v-model="form_create.type" autocomplete="off" />
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_create = false">取 消</el-button>
        <el-button type="primary" @click="createForm('form_create')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/pagination";
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  getHelptitlesSecondFloor,
  updateHelptyes,
  deleteHelptype,
  creatHelptyes
} from "@/api/serviceOperatingcms";
export default {
  components: {
    Pagination
  },
  data() {
    return {
      search: { _start: 0, _limit: 10 },
      listLoading: false,
      helptyesId: "",
      formLabelWidth: "100px",
      dialogFormVisible_update: false,
      dialogFormVisible_create: false,
      listcms: [],
      metadata: { _start: 0, _limit: 10, totalElements: 0 },
      form_update: {
        type: "",
        createdAt: "",
        updatedAt: "",
        id: "",
        helptitle: ""
      },
      form_create: {
        type: "",
        helptitle: {},
        helparticles: []
      },
      helptitleObj: {},

      rules: {
        type: [{ required: true, message: "请输入目录名称", trigger: "blur" }]
      },
      rules_update: {
        type: [{ required: true, message: "请输入目录名称", trigger: "blur" }]
      },
      rules_create: {
        type: [{ required: true, message: "请输入目录名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.fetchData();
    this.search = parseHash(this.search);
  },
  methods: {
    async fetchData() {
      console.log(this.$route.params.id);
      const res = await requestParams(
        getHelptitlesSecondFloor,
        this.$route.params.id,
        this.search
      );
      this.pageProcess(res.helptypes.length);
      console.log(res.helptypes);
      this.listcms = res.helptypes;
      this.helptitleObj = res;
    },
    //修改
    editObjectShow(row) {
      console.log(row);
      this.form_update = row;
      this.dialogFormVisible_update = true;
    },
    // 删除改目录
    deleteObject(id) {
      this.$confirm("此操作将永久删除该目录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteHelptype(id).then(r => {
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
    // 修改
    updateForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form_update);
          updateHelptyes(this.form_update.id, this.form_update).then(r => {
            this.hintMessage(r, "修改");
            this.dialogFormVisible_update = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增
    createForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form_create.helptitle = this.helptitleObj;
          console.log(this.form_create);
          creatHelptyes(this.form_create).then(r => {
            console.log(r);
            this.hintMessage(r, "新增");
            this.dialogFormVisible_create = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    back() {
      this.$router.push({
        path: "/operatingCentre/portalOperation/helpCenter"
      }); // 返回上一层
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    middleValueChange(value) {
      this.middleValue = value;
    },
    tableChange({ _start, _limit }) {
      this.search._start = _start;
      _limit && (this.search._limit = _limit);
      this.search._start = (_start - 1) * _limit;
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../rewrite.scss";
.return {
  margin-top: 7px;
  margin-left: 7px;
  margin-bottom: 12px;
}
.row {
  margin-left: 7px;
}
.title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
/deep/ .el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}
</style>
