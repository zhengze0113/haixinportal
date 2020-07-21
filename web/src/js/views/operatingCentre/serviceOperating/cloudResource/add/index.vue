<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-collapse v-model="activeName1" accordion>
              <el-collapse-item title="步骤1：基本配置" name="1">
                <el-row :gutter="20">
                  <el-form
                    :inline="true"
                    :model="formInline"
                    label-width="80px"
                  >
                    <el-row>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple">
                          <el-form-item label="名称">
                            <el-input
                              v-model="formInline.name"
                              style="width:150%;"
                              placeholder="名称"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col v-if="isTest" :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="所属服务">
                            <SelectPage
                              :cities="cities"
                              :metadata-select="metadataSelect"
                              width="140%"
                              @getServiceId="getServiceId"
                              @getCreation="selctPage"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="类别">
                            <el-input
                              v-model="formInline.category"
                              style="width:150%;"
                              placeholder="类别"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="图标">
                            <el-input
                              v-model="formInline.icon"
                              style="width:150%;"
                              placeholder="图标"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="编码">
                            <el-input
                              v-model="formInline.code"
                              style="width:150%;"
                              placeholder="编码"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="标签">
                            <el-input
                              v-model="formInline.tags"
                              style="width:150%;"
                              placeholder="标签"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="描述">
                            <el-input
                              v-model="formInline.description"
                              :rows="4"
                              style="width:400%;"
                              type="textarea"
                              placeholder="请输入内容"
                            />
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
                      <el-collapse-item name="1" title="创建">
                        <CreateFrom
                          :creation="creation"
                          :result="is"
                          @getCreation="getCreationVal"
                        />
                      </el-collapse-item>
                      <el-collapse-item title="删除" name="2">
                        <DeleteForm
                          :creation="deletion"
                          :result="is"
                          @getCreation="getDeleteVal"
                        />
                      </el-collapse-item>
                      <el-collapse-item title="变更" name="3">
                        <ModifiForm
                          :creation="modification"
                          :result="is"
                          @getCreation="getModifiVal"
                        />
                      </el-collapse-item>
                    </el-collapse>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
            <el-row>
              <el-col :span="4" :offset="20" style="margin-top:20px;">
                <el-button size="small" @click="back()">返回</el-button>
                <el-button
                  :loading="loading"
                  type="primary"
                  size="small"
                  @click="createCloudService()"
                >创建</el-button
                >
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CreateFrom from './CreateForm';
import DeleteForm from './DeleteForm';
import ModifiForm from './ModifiForm';
import SelectPage from '@/components/selectPage';
import {
  createdCloudResource,
  getCloudServiceList
} from '@/api/serviceOperating';
import { requestParams, parseHash } from '@/utils/urlParam';

export default {
  components: {
    CreateFrom,
    DeleteForm,
    ModifiForm,
    SelectPage
  },
  data() {
    return {
      is: false,
      loading: false,
      isShow: true,
      isTest: false,
      activeName: '1',
      activeName1: '1',
      cities: [],
      search: { page: 1, rows: 6 }, // 搜索参数
      metadataSelect: undefined,
      creation: 'creation',
      deletion: 'deletion',
      modification: 'modification',
      formInline: {
        category: '',
        code: '',
        name: '',
        orgId: 0,
        serviceId: 0,
        creatorId: 0,
        status: 'CREATED',
        tags: '',
        tenantId: 0,
        userId: 0,
        description: '',
        creation: {},
        deletion: {},
        // "execution":{},
        modification: {}
      }
    };
  },
  created() {
    this.initSelect();
    this.search = parseHash(this.search);
  },
  mounted() {
    this.isTest = true;
  },
  methods: {
    // 初始化下拉框
    async initSelect() {
      const res = await requestParams(getCloudServiceList, this.search);
      this.metadataSelect = res.metadata;
      this.cities = res.content.content;
    },
    getServiceId(val) {
      this.formInline.serviceId = val;
    },
    selctPage(msg) {
      this.search.page = msg;
      this.initSelect();
    },
    // 从子组件中哪区参数
    getCreationVal(msg) {
      this.formInline.creation = msg;
    },
    getDeleteVal(msg) {
      this.formInline.deletion = msg;
    },
    getModifiVal(msg) {
      this.formInline.modification = msg;
    },
    createCloudService() {
      this.is = true;
      this.loading = true;
      var data = this.formInline;
      var _this = this;
      console.log(this.formInline);
      console.log('创建');
      setTimeout(function() {
        createdCloudResource(data).then(r => {
          if (r.code == 201) {
            _this.loading = false;
            _this.$notify({
              type: 'success',
              message: r.message
            });
            _this.$router.push({
              path: '/operatingCentre/serviceOperating'
            });
          } else {
            _this.$notify({
              type: 'error',
              message: r.message
            });
          }
        });
      }, 1200);
    }
  }
};
</script>

<style lang="scss" scoped>
.fontStyle {
  font-size: 16px;
  font-weight: 500;
}

/*.selectJob*/
/*span{*/
/*width:120px;*/
/*overflow :hidden;*/
/*text-overflow :ellipsis;*/
/*white-space: nowrap;*/
/*}*/
.textStyle {
  padding-left: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: cornflowerblue;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
