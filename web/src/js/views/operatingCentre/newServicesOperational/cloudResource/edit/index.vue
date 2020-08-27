<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="color:#0261a7">
        <span>新建云资源</span>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-back"
          class="right"
          @click="dialogVisible()"
        >返回</el-button>
      </div>
      <el-row>
        <el-col :span="23">
          <span class="title">基本信息</span>
        </el-col>
        <el-col>
          <el-form
            ref="cloudServiceFrom"
            :model="cloudServiceFrom"
            :rules="cloudServiceFrom"
            label-width="100px"
            label-position="rigth"
            class="margin-top"
          >
            <el-col :span="20" :offset="1">
              <el-form-item
                prop="name"
                :rules="[
                        { required: true, message: '集群名称不能为空' },
                           { max: 253, message: '长度最多253个字符', trigger: 'blur' },
                        {
                          pattern: /^[\u0391-\uFFE5_a-z0-9\.]+[\u0391-\uFFE5a-z0-9]$/,
                          message:
                            '名称由中文、小写字母、数字、横线(-)和点(.)组成,且必须以中文、字母或数字结尾',
                          trigger: 'blur'
                        }
                      ]"
              >
                <span slot="label" class="labelText">集群名称：</span>
                <el-input v-model="cloudServiceFrom.name" placeholder="请输入集群名称" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="platform" :rules="[{ required: true, message: '集群类型不能为空' }]">
                <span slot="label" class="labelText">集群类型：</span>
                <el-select v-model="cloudServiceFrom.platform" placeholder="请选择集群类型">
                  <el-option
                    v-for="item in platforms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item
                prop="keyword"
                :rules="[
                    { required: true, message: '关键字不能为空' },
                    { max: 10, message: '长度最多10个字符', trigger: 'blur' },
                    {
                      pattern: /^[a-z0-9]*$/,
                      message:
                        '包括小写字母、数字,最长支持10个字符',
                      trigger: 'blur'
                    }
                  ]"
              >
                <span slot="label" class="labelText">关键字：</span>
                <el-input v-model="cloudServiceFrom.keyword" placeholder="请输入关键字" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item
                prop="masterIp"
                :rules="[
                 { max: 100, message: '长度最多100个字符', trigger: 'blur' },
                    {
                      pattern: /^([a-zA-Z\d][a-zA-Z\d-_]+\.)+[a-zA-Z\d-_][^ ]*$/,
                      message:
                        '只能由字母,数字,中划线组成,中划线不能在开头或末尾,至少包含两个字符串,单个字符串不超过63个字符,字符串间以点分割,且总长度不超过100个字符。',
                      trigger: 'blur'
                    }
                  ]"
              >
                <span slot="label" class="labelText">域名：</span>
                <el-input
                  v-model="cloudServiceFrom.masterIp"
                  placeholder="只能由字母,数字,中划线组成,中划线不能在开头或末尾,至少包含两个字符串,单个字符串不超过63个字符,字符串间以点分割,且总长度不超过100个字符。"
                />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item
                prop="port"
                :rules="[
                     {
                      pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/g,
                      message: '范围需为（80～65535）',
                      trigger: 'blur'
                    }
                  ]"
              >
                <span slot="label" class="labelText">端口：</span>
                <el-input type="number" v-model="cloudServiceFrom.port" placeholder="请输入端口" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="proxy">
                <span slot="label" class="labelText">协议类型：</span>
                <el-select
                  v-model="cloudServiceFrom.proxy"
                  placeholder="请选择协议类型"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="token">
                <span slot="label" class="labelText">验证信息：</span>
                <el-input v-model="cloudServiceFrom.token"  placeholder="请输入验证信息" />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item
                prop="monitorAddress"
                :rules="[
                      {
                        pattern: /^[\/]{1}([a-zA-Z0-9]|[-_*./]|[\/]){1,49}$/,
                        message:
                          '须以斜杠(/)开头,组成元素只能是大小写字母、数字、点(.)、中划线(-)、下划线(_)和斜杠(/),不能出现连续斜杠(//),且不能以点(.)结尾,如/api/web',
                        trigger: 'blur'
                      }
                    
                    
                    ]"
              >
                <span slot="label" class="labelText">监控地址：</span>
                <el-input
                  v-model="cloudServiceFrom.monitorAddress"
                  placeholder="须以斜杠(/)开头,组成元素只能是大小写字母、数字、点(.)、中划线(-)、下划线(_)和斜杠(/),不能出现连续斜杠(//),且不能以点(.)结尾,如/api/web"
                />
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="description" style="width:100%">
                <span slot="label" class="labelText">描述：</span>
                <el-input
                  v-model="cloudServiceFrom.description"
                  type="textarea"
                />
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="20" style="margin-top:20px;">
          <el-button size="small" @click="dialogVisible">返回</el-button>
          <el-button size="small" type="primary" @click="submitForm('cloudServiceFrom')">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  getCloudResourceInfo,
  editCloudResourceInfo,
} from "@/api/serviceOperating";

export default {
  filters: {},
  data() {
    return {
      fileList: [],
      options: [
        {
          value: "HTTP",
          label: "HTTP",
        },
        {
          value: "HTTPS",
          label: "HTTPS",
        },
        {
          value: "WEBSOCKET",
          label: "WEBSOCKET",
        },
      ],
      platforms: [
        {
          value: "1",
          label: "OpenShift",
        },
        {
          value: "2",
          label: "Kubernetes",
        },
      ],
      cloudServiceFrom: {
        description: "",
        expireTime: "",
        icon: "",
        isPublic: true,
        isSubSupported: true,
        menderId: 0,
        name: "",
        namespace: "",
        onlineTime: "",
        orgId: 0,
        ownerId: 0,
        status: "",
        keyword: "",
        tenantId: 0,
        url: "",
        version: "",
      },
      formCloud: false,
      formEntry: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.listLoading = true;
      console.log(this.searchInput);
      const res = await requestParams(
        getCloudResourceInfo,
        this.$route.params.id
      );
      this.cloudServiceFrom = res.content;
      this.metadata = res.metadata;
      this.listLoading = false;
    },
    dialogVisible() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/cloudResource",
      });
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createCloudService();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    createCloudService() {
      console.log(this.cloudServiceFrom);
      editCloudResourceInfo(this.$route.params.id, this.cloudServiceFrom).then(
        (r) => {
          if (r.code == 201) {
            this.$notify({
              message: r.message,
              type: "success",
            });
            this.dialogVisible();
          } else {
            this.$notify({
              message: r.message,
              type: "warning",
            });
          }
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "../../../rewrite.scss";
/deep/ .el-select {
  width: 100%;
}
.labelText {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.margin-top {
  margin-top: 20px;
}
.title {
  border-left: 5px #0261a7 solid;
  line-height: 22px;
  margin-left: 2%;
  padding-left: 15px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.tishiText {
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 45, 37, 1);
}
/deep/.el-input__inner {
  height: 34px;
}
/deep/.el-form-item__content {
  line-height: 42px;
  position: relative;
  font-size: 14px;
}
/deep/.el-input--mini {
  font-size: 14px;
}
</style>
