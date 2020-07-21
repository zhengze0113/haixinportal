<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-collapse v-model="activeName1" accordion>
              <el-collapse-item title="步骤1：基本配置" name="1">
                <el-row :gutter="20">
                  <el-form :inline="true" :model="formInline" label-width="80px" >
                    <el-row>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple">
                          <el-form-item label="名称">
                            <el-input v-model="formInline.name" style="width:150%;" placeholder="名称"/>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col v-if="isTest" :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="所属服务">
                            <SelectPage :value="formInline.serviceId" :cities="cities" :metadata-select="metadataSelect" width="140%" @getServiceId="getServiceId" @getCreation="getCreation" />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="类别">
                            <el-input v-model="formInline.category" style="width:150%;" placeholder="类别"/>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="图标">
                            <el-input v-model="formInline.icon" style="width:150%;" placeholder="图标"/>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="编码">
                            <el-input v-model="formInline.code" style="width:150%;" placeholder="编码"/>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="标签">
                            <el-input v-model="formInline.tags" style="width:150%;" placeholder="标签"/>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="描述">
                            <el-input v-model="formInline.description" :rows="4" style="width:400%;" type="textarea" placeholder="请输入内容"/>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="步骤2：详细配置" name="2">
                <el-row>
                  <el-col :span="22" :offset="1">
                    <el-collapse v-model="activeName" accordion>
                      <el-collapse-item name="1">
                        <template slot="title">
                          创建
                          <el-link style="margin: 0 10px 0 auto" type="danger" @click.stop="deleteDist(formInline.creation == null? 0:formInline.creation.id )">
                            删除
                          </el-link>
                        </template>

                        <CreateFrom :father-from="formInline.creation" :creation="creation" :result="is" @getCreation="getCreationVal" />
                      </el-collapse-item>

                      <el-collapse-item title="删除" name="2">
                        <template slot="title">
                          删除
                          <el-link style="margin: 0 10px 0 auto" type="danger" @click.stop="deleteDist(formInline.deletion == null? 0: formInline.deletion.id)">
                            删除
                          </el-link>
                        </template>
                        <DeleteForm :father-from = "formInline.deletion" :creation="deletion" :result="is" @getCreation="getDeleteVal" />
                      </el-collapse-item>
                      <el-collapse-item title="变更" name="3">
                        <template slot="title">
                          变更
                          <el-link style="margin: 0 10px 0 auto" type="danger" @click.stop="deleteDist(formInline.modification == null? 0: formInline.modification.id)">
                            删除
                          </el-link>
                        </template>
                        <ModifiForm :father-from = "formInline.modification" :creation="modification" :result="is" @getCreation="getModifiVal" />
                      </el-collapse-item>
                    </el-collapse>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>

            <el-row>
              <el-col :span="4" :offset="20" style="margin-top:20px;" >
                <el-button size="small">返回</el-button>
                <el-button :loading="loading" @click="editCloudService()" size="small">编辑</el-button>
              </el-col>
            </el-row>

          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import { getCloudResourceInfo, getCloudServiceList, editCloudResourceInfo, deleteCloudResourceOperations } from '@/api/serviceOperating';
import SelectPage from '@/components/selectPage';
import { requestParams, parseHash } from '@/utils/urlParam';
import CreateFrom from './CreateForm';
import DeleteForm from './DeleteForm';
import ModifiForm from './ModifiForm';

export default {
  components: {
    SelectPage,
    CreateFrom,
    DeleteForm,
    ModifiForm
  },
  data() {
    return {
      metadataSelect: undefined,
      activeName1: 1,
      loading: false,
      creation: 'creation',
      deletion: 'deletion',
      modification: 'modification',
      cities: [],
      is: false,
      activeName: 1,
      isTest: false,
      search: { page: 1, rows: 6 }, // 搜索参数
      formInline: {
        'category': '',
        'code': '',
        'name': '',
        'orgId': 0,
        'serviceId': null,
        'creatorId': 0,
        'status': '',
        'tags': '',
        'tenantId': 0,
        'userId': 0,
        'description': '',
        'creation': { timeout: 0, protocol: 'HTTP', outputParams: 'string', outputType: 'JSON', template: '', parameters: [] },
        'deletion': {},
        'execution': {},
        'modification': {}
      }
    };
  },
  created() {
    this.getCloudResource();
    this.initSelect();
  },
  mounted() {

  },
  methods: {
    // 初始化下拉框
    async initSelect() {
      const res = await requestParams(getCloudServiceList, this.search);
      this.metadataSelect = res.metadata;
      this.cities = res.content.content;
    },
    async getCloudResource() {
      getCloudResourceInfo(this.$route.params.id).then(r => {
        this.formInline = r.content;
        this.isTest = true;
      });
    },
    getServiceId(val) {
      this.formInline.serviceId = val;
    },
    getCreation(msg) {
      this.search.page = msg;
      this.initSelect();
    },
    editCloudService() {
      this.is = true;
      this.loading = true;
      var data = this.formInline;
      var _this = this;
      setTimeout(function() {
        editCloudResourceInfo(_this.$route.params.id, data).then(r => {
          if (r.code == 201) {
            _this.$notify({
              type: 'success',
              message: r.message
            });
          } else {
            _this.$notify({
              type: 'error',
              message: r.message
            });
          }
          _this.loading = false;
        });
      }, 1000);
    },
    getCreationVal(msg) {
      this.formInline.creation = msg;
    },
    getDeleteVal(msg) {
      this.formInline.deletion = msg;
    },
    getModifiVal(msg) {
      this.formInline.modification = msg;
    },
    deleteDist(id) {
      if (id == 0) {
        this.$notify({
          type: 'success',
          message: '已删除'
        });
        return;
      }

      this.$confirm('此操作将永久删除该字典信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCloudResourceOperations(this.formInline.id, id).then(r => {
          if (r.code == 200) {
            this.$notify({
              type: 'success',
              message: r.message
            });
          } else {
            this.$notify({
              type: 'info',
              message: r.message
            });
          }
        });
      }).catch(() => {
        this.$notify({
          type: 'success',
          message: '已删除'
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .fontStyle{
    font-size:16px;
    font-weight: 500;
  }

  /*.selectJob*/
    /*span{*/
    /*width:120px;*/
    /*overflow :hidden;*/
    /*text-overflow :ellipsis;*/
    /*white-space: nowrap;*/
    /*}*/
   .textStyle{
    padding-left: 10px;
    font-size :14px;
    font-weight: bold;
    cursor :pointer;
    color :cornflowerblue;
  }

</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
