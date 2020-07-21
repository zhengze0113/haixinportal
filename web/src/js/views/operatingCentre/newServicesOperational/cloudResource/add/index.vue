<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="color:#0261a7">
        <span>新建云资源</span>
        <el-button type="primary" size="mini" icon="el-icon-back" class="right" @click="dialogVisible()">返回</el-button>
      </div>
      <el-row>
        <el-col :span="23">
          <span class="title">基本信息</span>
        </el-col>
        <el-col>
          <el-form ref="cloudServiceFrom" :model="cloudServiceFrom" :rules="rules" label-width="100px" label-position="left" class="margin-top">
            <el-col :span="20" :offset="1">
              <el-form-item prop="name">
                <span slot="label" class="labelText">名称：</span>
                <el-col :span="22">
                  <el-input v-model="cloudServiceFrom.name" placeholder="请输入名称"/>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item>
                <span slot="label" class="labelText">关键字:</span>
                <el-col :span="22">
                  <el-input v-model="cloudServiceFrom.tags" placeholder="请输入关键字"/>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="description">
                <span slot="label" class="labelText">描述:</span>
                <el-col :span="22">
                  <el-input v-model="cloudServiceFrom.description" placeholder="请输入描述信息"/>
                </el-col>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-col :span="23">
          <span class="title">资源配置</span>
        </el-col>
        <el-col>
          <el-form ref="entry" :model="entry" :rules="entryRules" label-width="100px" label-position="left" class="margin-top">
            <el-col :span="20" :offset="1">
              <el-form-item prop="domain">
                <span slot="label" class="labelText">域名：</span>
                <el-col :span="22">
                  <el-input v-model="entry.domain" placeholder="请输入域名"/>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="root">
                <span slot="label" class="labelText">路径：</span>
                <el-col :span="22">
                  <el-input v-model="entry.root" placeholder="请输入路径"/>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="port">
                <span slot="label" class="labelText">端口：</span>
                <el-col :span="22">
                  <el-input v-model="entry.port" placeholder="请输入端口"/>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="protocol">
                <span slot="label" class="labelText">协议类型：</span>
                <el-col :span="22">
                  <el-select v-model="entry.protocol" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"/>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item prop="host">
                <span slot="label" class="labelText">主机地址：</span>
                <el-col :span="22">
                  <el-input v-model="entry.host" placeholder="请输入主机地址"/>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="1">
              <el-form-item>
                <span slot="label" class="labelText">证书：</span>
                <el-col :span="22">
                  <el-input v-model="entry.isAuthRequired" style="width:90%" placeholder="请选择证书"/>
                  <el-upload
                    :on-change="handleChange"
                    :file-list="fileList"
                    style="display:inline-block"
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/">
                    <el-button size="small" type="primary" style="margin-left:15px"><i class="el-icon-upload el-icon--right"/>选择文件</el-button>
                  </el-upload>

                </el-col>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="20" style="margin-top:20px;">
          <el-button size="small" @click="dialogVisible">返回</el-button>
          <el-button size="small" type="primary" @click="submitForm('cloudServiceFrom','entry')">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { requestParams, parseHash } from '@/utils/urlParam';
import {
  createdCloudResource
} from '@/api/serviceOperating';

export default {
  filters: {
  },
  data() {
    return {
      fileList: [],
      options: [{
        value: 'HTTP',
        label: 'HTTP'
      }],
      entry: {
        apiVersion: '',
        domain: '',
        host: '',
        isAuthRequired: '',
        port: '',
        protocol: '',
        root: '',
        serviceId: 0
      },
      cloudServiceFrom: {
        description: '',
        entry: {
        },
        expireTime: '',
        icon: '',
        isPublic: true,
        isSubSupported: true,
        menderId: 0,
        name: '',
        namespace: '',
        onlineTime: '',
        orgId: 0,
        ownerId: 0,
        status: '',
        tags: '',
        tenantId: 0,
        url: '',
        version: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入云资源名称', trigger: 'blur' },
          { max: 253, message: '长度最多253个字符', trigger: 'blur' },
          { pattern:
                /^[\u0391-\uFFE5a-z0-9][\u0391-\uFFE5_a-z0-9\.]+[\u0391-\uFFE5a-z0-9]$/, message: '名称由中文、小写字母、数字、横线(-)和点(.)组成,且必须以中文、字母或数字开头结尾', trigger: 'change' }
        ],
        tags: [
          { required: true, message: '请输入关键字', trigger: 'blur' },
          { max: 10, message: '长度最多10个字符', trigger: 'blur' },
          { pattern:
                /^[\u0391-\uFFE5a-z0-9][\u0391-\uFFE5_a-z0-9\.]+[\u0391-\uFFE5a-z0-9]$/, message: '关键字由小写字母、数字组成', trigger: 'change' }
        ],
        description: [
          { pattern:
                /^[\u0391-\uFFE5a-z0-9@"\p{P}"]+$/, message: '名称由中文、小写字母、数字和中文标点符号组成', trigger: 'change' }
        ]
      },
      entryRules: {
        domain: [
          { pattern:
                /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/, message: '只能由字母,数字,中划线组成,中划线不能在开头或末尾,至少包含两个字符串,单个字符串不超过63个字符,字符串间以点分割', trigger: 'change' }, { max: 100, message: '长度最多100个字符', trigger: 'blur' }
        ],
        root: [
          { pattern:
                /^\/[/0-9A-Za-z-\.]+[/0-9A-Za-z-]$/, message: '名称由中文、小写字母、数字和中文标点符号组成', trigger: 'change' }
        ]
      },
      formCloud: false,
      formEntry: false
    };
  },
  created() {

  },
  methods: {
    dialogVisible() {
      this.$router.push({
        path: '/operatingCentre/newServicesOperational/cloudResource'
      });
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    submitForm(cloudServiceFrom, entry) {
      this.submitForm1(cloudServiceFrom);
      this.submitForm2(entry);
      if (this.formCloud && this.formEntry) {
        this.createCloudService();
      } else {
        console.log('error submit!!');
        return false;
      }
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formCloud = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formEntry = true;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    createCloudService() {
      this.cloudServiceFrom.entry = this.entry;
      createdCloudResource(this.cloudServiceFrom).then(r => {
        if (r.code == 201) {
          this.$notify({
            message: r.message,
            type: 'success'
          });
          this.dialogVisible();
        } else {
          this.$notify({
            message: r.message,
            type: 'warning'
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "../../../rewrite.scss";
/deep/ .el-select{
  width: 100%;
}
.labelText{
  color:#666666;
  font-size: 14px;
}
.margin-top{
  margin-top: 20px;
}
.title {
  border-left: 5px #0261A7 solid;
  font-size: 14px;
  font-weight: 900;
  line-height: 22px;
  margin-left: 2%;
  padding-left: 15px;
}
</style>
