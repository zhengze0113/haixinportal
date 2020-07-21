<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="19" :offset="2">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" label-width="80px" :model="organization">
              <el-form-item label="名称">
                <el-input size="small" v-model="organization.name" placeholder="请输入名称" />
              </el-form-item>
              <el-form-item label="标签">
                <el-input size="small" v-model="organization.tags" placeholder="请填写标签" />
              </el-form-item>
              <el-form-item label="租户信息">
                <el-input size="small" v-model="organization.type" placeholder="请填写标签" />
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input
                  size="small"
                  :rows="2"
                  v-model="organization.description"
                  type="textarea"
                  placeholder="请输入描述信息"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible">返 回</el-button>
        <el-button size="small" type="primary" @click="createRole()">确 定</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { editRoles, deleteRoles } from "@/api/role";

export default {
  data() {
    return {
      disabled: true,
      formRole: {
        description: "",
        name: "",
        tags: "",
        type: ""
      },
      labelPosition: "right",
      list: [],
      listLoading: false,
      searchInput: "",
      updateRole: false,
      organization: {
        description: "",
        name: "",
        tags: "",
        type: ""
      },
      roleId: [],
      metadata: undefined,
      search: { page: 1, rows: 10 } // 搜索参数
    };
  },
  created() {
    this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    dialogFormVisible() {
      this.$router.push({
        path:
          "/operatingCentre/tenementManage/tenementOrganization/detail/organization/components/tenantRole"
      });
    },

    //创建角色
    createRole() {
      const data = JSON.parse(JSON.stringify(this.organization));
      console.log(data);
      console.log(this.$route.params.id);
      createByIdOrganizationsRole(this.$route.params.id, data).then(res => {
        console.log("创建组织爱机构" + res);
        if (res.code == 201) {
          this.$notify({
            message: "新增成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.$router.push({
            path:
              "/operatingCentre/tenementManage/tenementOrganization/detail/organization/components/tenantRole"
          });
        } else {
          this.$notify({
            message: "新增失败，请重试",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>