<template>
  <div>
    <el-row :gutter="20" style="margin-top:5px;">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="text item">
              <RoleInfo :role="role" />
              <el-divider/>
              <RoleTenement v-if="TenantInfo" :tenant="tenant"/>
              <el-divider/>
              <RoleOrganization v-if="organ" :organization="organization"/>
              <!--<el-divider></el-divider>
              <RoleUserGroup></RoleUserGroup>-->
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18" style="padding-left:0;padding-right:0;">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-tabs ref="tab" v-model="activeName" style="background:#fff">
              <el-tab-pane label="角色用户" name="first">
                <RoleUser/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  
</template>
<script>
import { getList } from '@/api/table';
import Pagination from '@/components/pagination';
import RoleUser from './components/roleUserTab';
import RoleInfo from './components/roleInfo';
import RoleTenement from './components/roleTenement';
import RoleUserGroup from './components/roleUserGroup';
import RoleOrganization from './components/roleOrganization';
import { getUser } from '@/api/user';
import { getTenantInfo } from '@/api/tenant';
import { getByIdOrganizations } from '@/api/organizations';
import {
  getRole
} from '@/api/role';
export default {
  components: {
    Pagination,
    RoleUser,
    RoleInfo,
    RoleTenement,
    RoleOrganization,
    RoleUserGroup
  },
  data() {
    return {
      list: null,
      activeName: 'first',
      tenant: null,
      organization: null,
      TenantInfo: false,
      organ: false,
      role: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    fetchData() {
      // 查询当前角色信息
      getRole(this.$route.params.id).then(res => {
        this.role = res.content;
        if (this.role.tenantID != null) {
          // 查询当前角色的租户信息
          getTenantInfo(this.role.tenantID).then(res => {
            this.tenant = res.content;
            this.TenantInfo = true;
          });
        }
        if (this.role.organizationID != null) {
          // 查询当前角色的组织机构信息
          getByIdOrganizations(this.role.organizationID).then(res => {
            this.organization = res.content;
          });
        }
      });
      // this.treeList = userdataList();
      // this.listLoading = false;
    },
    tableChange(pagination) {
      console.log(pagination);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    // 选择机构 更新用户列表
    handleCurrentChange(val) {
      console.log(val);
      this.organizationObject = val;
    },
    // 将批量解除用户放到一个对象里
    handleSelectionChange(val) {
      this.batchDeletedObject = val;
    },
    // 单个解除用户
    handleClick(id) {
      console.log('解除关系用户的id=' + id);
    },
    // 批量解除用户
    batchDeleted() {
      if (
        this.batchDeletedObject == null ||
        this.batchDeletedObject.length == 0
      ) {
        this.$notify.error('请选择一个或多个用户进行解除');
        return;
      } else {
        this.$confirm('此操作将解除关系, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            console.log('获得解除对象');
            console.log(this.batchDeletedObject);
            this.$notify({
              type: 'success',
              message: '解除成功!'
            });
          })
          .catch(() => {
            this.$notify({
              type: 'info',
              message: '已取消解除'
            });
          });
      }
    },
    // 添加机构和用户的关系
    addRelation() {
      if (this.organizationObject == null) {
        this.$notify.error('请选择要建立关系的机构');
        return;
      } else {
        this.addRelationFrom.operatingName = this.organizationObject.name;
        this.dialogFormVisible = true;
      }
    },
    delItem() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  }
};
</script>
