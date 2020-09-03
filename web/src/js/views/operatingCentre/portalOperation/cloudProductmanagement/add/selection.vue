<template>
  <div>
    <el-row>
      <!-- <el-col class="title">入参定义</el-col> -->
      <el-col style="padding: 0 20px;">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="云资源" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.resourceCode" @change="changeResource">
                <el-option
                  v-for="item in resourcesOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="云服务" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.serviceCode" @change="changeService">
                <el-option
                  v-for="item in cloudServiceOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="SKU数量" align="center">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.skuNumber"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="云服务编码" align="center">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.serviceCode"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="参数组名称" align="center">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.parameName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="参数组编码" align="center">
            <template slot-scope="scope">
              <el-input disabled v-model="scope.row.parameCode"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row class="right" style="padding:50px;padding-top:0px;padding-right:70px;">
      <el-button type="primary" @click="nexttop()">上一步</el-button>
      <el-button type="primary" @click="nextbottom()">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
import {
  getResourcesList,
  getCloudServiceList,
  queryByIdCloudServiceSku,
  queryByIdCloudServiceParams,
  getSKUList,
  getParams,
} from "@/api/serviceOperating";
import { requestParams, parseHash } from "@/utils/urlParam";
import { editcloudproductimg } from "@/api/serviceOperatingcms";
export default {
  props: {
    active: {
      type: Number,
      default: 2,
    },
    active3: {
      type: Number,
      default: 4,
    },
    cloudproduct: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      resourcesOptions: [],
      cloudServiceOptions: [],
      list: [
        {
          resourceCode: "",
          serviceCode: "",
          skuNumber: 0,
          parameName: "",
          parameCode: "",
        },
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      console.log(this.active);
      const res = await requestParams(getResourcesList, this.search);
      this.resourcesOptions = res.content.content;
    },
    changeService(data) {
      let search = {
        page: 1,
        rows: 100,
        serviceCode: data,
      };
      getSKUList(search).then((r) => {
        this.list[0].skuNumber = r.content.content.length;
      });

      getParams(search).then((r) => {
        r.content.content.forEach((item) => {
          if (item.status == "PUBLISH") {
            this.list[0].parameName = item.name;
            this.list[0].parameCode = item.code;
          }
        });
      });
    },
    changeResource(code) {
      let search = { page: 1, rows: 100, resourceCode: code };
      getCloudServiceList(search).then((r) => {
        this.cloudServiceOptions = r.content.content;
      });
    },
    change() {
      //console.log("aaa");
    },
    nexttop() {
      this.$emit("listenToChildEvent", this.active);
    },
    nextbottom() {
      const params = new FormData();
      console.log(this.id);
      params.append("resourceCode", this.list[0].resourceCode);
      params.append("serviceCode", this.list[0].serviceCode);
      params.append("parameName", this.list[0].parameName);
      params.append("parameCode", this.list[0].parameCode);
      editcloudproductimg(this.id, params).then((r) => {
        if (r.id != "") {
          this.$emit("listenToChildEvent", this.active3);
        } else {
          this.$notify({
            type: "info",
            message: "修改失败",
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
</style>
