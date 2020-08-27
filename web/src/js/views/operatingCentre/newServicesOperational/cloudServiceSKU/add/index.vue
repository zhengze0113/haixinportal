<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="color:#0261a7">
        <span>新建SKU</span>
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
        <el-form
          ref="cloudSkuFrom"
          :model="cloudSkuFrom"
          :rules="cloudSkuFrom"
          label-width="120px"
          label-position="rigth"
          class="margin-top"
        >
          <el-row style="padding-top: 20px;">
            <el-col :span="12">
              <el-col :span="23" :offset="1">
                <el-form-item prop="code">
                  <span slot="label" class="labelText">规格编码：</span>
                  <el-col :span="23">
                    <el-input disabled v-model="cloudSkuFrom.code" placeholder="系统自动生成"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="23" :offset="1">
                <el-form-item
                  prop="name"
                  :rules="[
                        { required: true, message: '规格名称不能为空' },
                      ]"
                >
                  <span slot="label" class="labelText">规格名称：</span>
                  <el-col :span="23">
                    <el-input v-model="cloudSkuFrom.name" placeholder="请输入关键字" />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="23" :offset="1">
                <el-form-item
                  prop="keyword"
                  :rules="[
                        { required: true, message: '关键字不能为空' },
                      ]"
                >
                  <span slot="label" class="labelText">关键字：</span>
                  <el-col :span="23">
                    <el-input
                      onkeyup="value=value.replace(/[^\a-\z]/g,'')"
                      onpaste="value=value.replace(/[^\a-\z]/g,'')"
                      oncontextmenu="value=value.replace(/[^\a-\z]/g,'')"
                      v-model="cloudSkuFrom.keyword"
                      placeholder="请输入描述信息"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="23" :offset="1">
                <el-form-item
                  prop="resourceCode"
                  :rules="[
                        { required: true, message: '云资源不能为空' },
                      ]"
                >
                  <span slot="label" class="labelText">云资源：</span>
                  <el-col :span="23">
                    <el-select
                      v-model="cloudSkuFrom.resourceCode"
                      @change="resourcePrice"
                      size="mini"
                      placeholder="全部"
                    >
                      <el-option
                        v-for="item in list1"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="23" :offset="1">
                <el-form-item
                  prop="serviceCode"
                  :rules="[
                        { required: true, message: '云服务不能为空' },
                      ]"
                >
                  <span slot="label" class="labelText">云服务：</span>
                  <el-col :span="23">
                    <el-select v-model="cloudSkuFrom.serviceCode" size="mini" placeholder="请选择云服务">
                      <el-option
                        v-for="item in list"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      />
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="23">
              <span class="title">资源配置</span>
            </el-col>
            <el-col :span="12" style="padding-top: 20px;">
              <el-col :span="23" :offset="1">
                <el-form-item prop="masterIp" style="margin-bottom:0px">
                  <span slot="label" class="labelText">CPU（Core）：</span>
                  <el-col :span="23">
                    <el-input-number
                      @input="updatePrice"
                      width="100%"
                      controls-position="right"
                      :min="1"
                      :max="10"
                      v-model="cloudSkuFrom.cpuCores"
                      placeholder="请输入CPU（Core）"
                    />
                  </el-col>
                </el-form-item>
                <el-col :span="19" :offset="5" style="line-height: 20px;">
                  <span class="tishi">CPU单价：1 Core = {{cpuPrice}} 元/月</span>
                </el-col>
              </el-col>
              <el-col :span="23" :offset="1">
                <el-form-item prop="root" style="margin-bottom:0px">
                  <span slot="label" class="labelText">内存（GB）：</span>
                  <el-col :span="23">
                    <el-input-number
                      @input="updatePrice"
                      controls-position="right"
                      :min="1"
                      :max="100"
                      v-model="cloudSkuFrom.memory"
                      placeholder="请输入内存（GB）"
                    />
                  </el-col>
                </el-form-item>
                <el-col :span="19" :offset="5" style="line-height: 20px;">
                  <span class="tishi"> 内存单价：1 GB = {{memoryPrice}} 元/月</span>
                </el-col>
              </el-col>
              <el-col :span="23" :offset="1">
                <el-form-item prop="port" style="margin-bottom:0px">
                  <span slot="label" class="labelText">存储（GB）：</span>
                  <el-col :span="23">
                    <el-input-number
                      @input="updatePrice"
                      controls-position="right"
                      :min="1"
                      :max="1000"
                      v-model="cloudSkuFrom.storage"
                      placeholder="请输入存储（GB）"
                    />
                  </el-col>
                </el-form-item>
                <el-col :span="19" :offset="5" style="line-height: 20px;">
                  <span class="tishi">存储单价：1 GB = {{storagePrice}} 元/月</span>
                </el-col>
              </el-col>
              <el-col :span="23" :offset="1">
                <el-form-item prop="protocol">
                  <span slot="label" class="labelText">成本价（元）：</span>
                  <el-col :span="23">
                    <el-input
                      disabled
                      controls-position="right"
                      v-model="cloudSkuFrom.costPrice"
                      placeholder="请输入成本价（元）"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="23" :offset="1">
                <el-form-item prop="host">
                  <span slot="label" class="labelText">售价（元）：</span>
                  <el-col :span="23">
                    <el-input-number
                      controls-position="right"
                      :min="1"
                      :max="1000"
                      v-model="cloudSkuFrom.price"
                      placeholder="请输入售价（元）"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12" style="padding-top: 20px;">
              <el-col :span="23">
                <el-form-item prop="masterIp">
                  <span slot="label" class="labelText">是否生效</span>
                  <el-tooltip :content="'是否生效: ' + value1" placement="top">
                    <el-switch
                      @change="invalid1"
                      v-model="value1"
                      active-color="#0261a7"
                      active-value="是"
                      inactive-value="否"
                    ></el-switch>
                  </el-tooltip>
                </el-form-item>
              </el-col>

              <el-col :span="23">
                <el-form-item prop="masterIp">
                  <span slot="label" class="labelText">是否生效</span>
                  <el-tooltip :content="'是否生效: ' + value2" placement="top">
                    <el-switch
                      @change="invalid2"
                      v-model="value2"
                      active-color="#0261a7"
                      active-value="是"
                      inactive-value="否"
                    ></el-switch>
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item prop="masterIp">
                  <span slot="label" class="labelText">是否生效</span>
                  <el-tooltip :content="'是否生效: ' + value3" placement="top">
                    <el-switch
                      @change="invalid3"
                      v-model="value3"
                      active-color="#0261a7"
                      active-value="是"
                      inactive-value="否"
                    ></el-switch>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="20" style="margin-top:20px;">
          <el-button size="small" @click="dialogVisible">返回</el-button>
          <el-button size="small" type="primary" @click="submitForm('cloudSkuFrom')">确定</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { requestParams, parseHash } from "@/utils/urlParam";
import {
  createdCloudResource,
  getCloudServiceList,
  getResourcesList,
  createdSKU,
  getPricesList,
} from "@/api/serviceOperating";

export default {
  filters: {},
  data() {
    return {
      list: [],
      list1: [],
      value1: "是",
      value2: "是",
      value3: "是",
      fileList: [],
      cloudSkuFrom: {
        name: "",
        keyword: "",
        code: "",
        serviceCode: "",
        resourceCode: "",
        costPrice: 0,
        price: 0,
        cpuCores: 1,
        memory: 1,
        storage: 1,
        chargePeriod: "MONTH",
      },
      cpuPrice: 0,
      memoryPrice: 0,
      storagePrice: 0,
      formCloud: false,
      formEntry: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    invalid1(data) {
      if (data == "是") {
        this.cloudSkuFrom.costPrice +=
          this.cpuPrice * this.cloudSkuFrom.cpuCores;
      } else {
        this.cloudSkuFrom.costPrice -=
          this.cpuPrice * this.cloudSkuFrom.cpuCores;
      }
    },
    invalid2(data) {
      if (data == "是") {
        this.cloudSkuFrom.costPrice +=
          this.memoryPrice * this.cloudSkuFrom.memory;
      } else {
        this.cloudSkuFrom.costPrice -=
          this.memoryPrice * this.cloudSkuFrom.memory;
      }
    },
    invalid3(data) {
      if (data == "是") {
        this.cloudSkuFrom.costPrice +=
          this.storagePrice * this.cloudSkuFrom.storage;
      } else {
        this.cloudSkuFrom.costPrice -=
          this.storagePrice * this.cloudSkuFrom.storage;
      }
    },
    updatePrice() {
      this.priceCalculation();
    },
    resourcePrice(data) {
      console.log(data);
      let params = {
        resourceCode: data,
      };
      getPricesList(params).then((r) => {
        let data = r.content.content;
        data.forEach((item, index) => {
          switch (item.attributeName) {
            case "CPU":
              this.cpuPrice = item.price;
              break;
            case "MEMORY":
              this.memoryPrice = item.price;
              break;
            case "STORAGE":
              this.storagePrice = item.price;
              break;
          }
        });

        this.priceCalculation();
      });
    },
    priceCalculation() {
      this.cloudSkuFrom.costPrice =
        this.cpuPrice * this.cloudSkuFrom.cpuCores +
        this.memoryPrice * this.cloudSkuFrom.memory +
        this.storagePrice * this.cloudSkuFrom.storage;
    },
    dialogVisible() {
      this.$router.push({
        path: "/operatingCentre/newServicesOperational/cloudServiceSKU",
      });
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    async fetchData() {
      this.listLoading = true;
      const res = await requestParams(getCloudServiceList, this.search);
      this.list = res.content.content;
      const res1 = await requestParams(getResourcesList, this.search);
      this.list1 = res1.content.content;
      this.metadataSelect = res1.metadata;
      console.log(this.list);
      console.log(this.list1);
      this.metadata = res.metadata;

      this.listLoading = false;
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
    submitForm1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formCloud = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formEntry = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    createCloudService() {
      this.cloudSkuFrom.cpuCores += "C";
      this.cloudSkuFrom.memory += "GB";
      this.cloudSkuFrom.storage += "GB";
      console.log(this.cloudSkuFrom);

      createdSKU(this.cloudSkuFrom).then((r) => {
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
      });
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
/deep/.el-input-number {
  width: 100%;
}
.tishi {
  font-size: 10px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 45, 37, 1);
}
</style>
