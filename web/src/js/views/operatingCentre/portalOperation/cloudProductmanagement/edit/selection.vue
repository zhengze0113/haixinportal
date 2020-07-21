<template>
  <div>
    <el-row>
      <!-- <el-col class="title">入参定义</el-col> -->
      <el-col style="padding: 0 20px;">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="云资源" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.attribute" @change="change()">
                <el-option
                  v-for="item in resourcesOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="云服务" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.description" @change="change()">
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
              <!-- <el-input v-model="scope.row.showname"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column label="云服务编码" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="参数组名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.default"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="参数组编码" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.rule"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-link class="link" type="danger" @click="deleteList(scope.row)"
                >移除</el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <el-col :span="2" class="addBtnCol">
          <el-button @click="add()" class="addBtn">
            <img
              src="web/static/images/attribute/jiahao.png"
              alt
              style="width:12%;"
            />
            新增一条
          </el-button>
        </el-col>
      </el-col>
    </el-row>

    <el-row
      class="right"
      style="padding:50px;padding-top:0px;padding-right:70px;"
    >
      <el-button type="primary" @click="nexttop()">上一步</el-button>
      <el-button type="primary" @click="nextbottom()">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
import { getResourcesList, getCloudServiceList } from "@/api/serviceOperating";
import { requestParams, parseHash } from "@/utils/urlParam";
export default {
  props: {
    active: {
      type: Number,
      default: 2
    },
    active3: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      list: [
        {
          index: 1,
          showname: "1",
          name: "1",
          attribute: "",
          type: "",
          top: true,
          down: false,
          must: true,
          default: "",
          rule: "",
          description: ""
        },
        {
          index: 2,
          showname: "2",
          name: "2",
          attribute: "",
          type: "",
          must: true,
          top: false,
          down: true,
          default: "",
          rule: "",
          description: ""
        }
      ],
      search: { page: 1, rows: 100 }, // 搜索参数
      resourcesOptions: [],
      cloudServiceOptions: []
    };
  },
  mounted() {},
  created() {
    // this.search = parseHash(this.search);
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const res = await requestParams(getResourcesList, this.search);
      this.resourcesOptions = res.content.content;
      const res1 = await requestParams(getCloudServiceList, this.search);
      this.cloudServiceOptions = res1.content.content;
    },
    //新增一条
    add() {
      var obj = {
        index: null,
        showname: "",
        name: "",
        attribute: "",
        type: "",
        top: false,
        down: false,
        must: true,
        default: "",
        rule: "",
        description: ""
      };
      obj.index = this.list.length + 1;
      this.list.push(obj);
      this.change();
    },
    change() {
      //console.log("aaa");
    },
    nexttop() {
      this.$emit("listenToChildEvent", this.active);
    },
    nextbottom() {
      this.$emit("listenToChildEvent", this.active3);
    }
  }
};
</script>
