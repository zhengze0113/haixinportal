<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-collapse v-model="activeName" accordion @change="handleChange">
              <el-collapse-item title="步骤1：基本信息" name="1">
                <el-row :gutter="20">
                  <el-form :inline="true" :model="form" label-width="80px">
                    <el-row>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="服务目录" style="margin-bottom:2px;">
                            <el-cascader
                              :props="props"
                              :options="options"
                              :show-all-levels="false"
                              v-model="value"
                              style="width:139%"
                              @change="checkServiceCatalog(value)"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item v-if="isTest" label="所属资源">
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
                        <div class="grid-content bg-purple">
                          <el-form-item label="名称" style="margin-bottom:2px;">
                            <el-input v-model=" form.name" style="width:150%;" placeholder="名称" />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="编码">
                            <el-input v-model=" form.code" style="width:150%;" placeholder="编码" />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="图标" style="margin-bottom:2px;">
                            <el-input v-model=" form.icon" style="width:150%;" placeholder="图标" />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="标签">
                            <el-input v-model=" form.tags" style="width:150%;" placeholder="标签" />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="库存">
                            <el-input v-model="form.stock" style="width:150%;" placeholder="库存" />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="0">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="描述">
                            <el-input
                              v-model="form.description"
                              :rows="4"
                              style="width:162.5%;"
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
              <el-collapse-item title="步骤2：规格信息" name="2">
                <el-row>
                  <el-col :span="22" :offset="1">
                    <el-collapse v-if="reservedParamers.length>0" v-model="activeName1" accordion>
                      <el-collapse-item name="1" title="创建">
                        <el-row v-for="(item,i) in reservedParamers" :key="i">
                          <el-col :span="5">
                            <label
                              class="el-form-item__label"
                              style="font-size:14px;"
                            >{{ item.name }}</label>
                          </el-col>
                          <el-col :span="5" :offset="1">
                            <!-- <el-input :type="item.clazz" v-model="item.defaultValue"   size="small"/> -->
                            <el-input
                              v-if="item.clazz=='String'||item.clazz=='Number'"
                              :type="item.clazz"
                              v-model="item.defaultValue"
                              size="small"
                            />
                            <el-select
                              v-else-if="item.clazz=='Select'"
                              v-model="atest"
                              size="small"
                            >
                              <el-option
                                v-for="(ite,index) in arr"
                                :key="index"
                                :value="ite"
                                :label="ite"
                              />
                            </el-select>
                          </el-col>
                          <el-col :span="2" :offset="3">
                            <el-button
                              v-if="item.editable==true"
                              size="mini"
                              @click="item.editable=false"
                            >可编辑</el-button>
                            <el-button
                              v-if="item.editable==false"
                              size="mini"
                              @click="item.editable=true"
                            >不可编辑</el-button>
                          </el-col>
                          <el-col :span="5" :offset="0">
                            <!-- <createResouce
                              @getMessage="getM"
                              :madatePrice="madatePrice"
                              :priceall="priceall"
                            ></createResouce>-->
                            <createResouce :id="item.id" @getMessage="getM" />
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-if="reservedParamers.length==0" v-model="activeName1" accordion>
                      <el-collapse-item name="1" title="创建" />
                    </el-collapse>

                    <!-- 删除 -->
                    <el-collapse v-if="reserveddeletion.length>0" v-model="activeName1" accordion>
                      <el-collapse-item name="2" title="删除">
                        <el-row v-for="(item,i) in reserveddeletion" :key="i">
                          <el-col :span="5">
                            <label
                              class="el-form-item__label"
                              style="font-size:14px;"
                            >{{ item.name }}</label>
                          </el-col>
                          <el-col :span="5" :offset="1">
                            <el-input
                              v-if="item.clazz=='String'||item.clazz=='Number'"
                              :type="item.clazz"
                              v-model="item.defaultValue"
                              size="small"
                            />
                            <el-select
                              v-else-if="item.clazz=='Select'"
                              v-model="atest"
                              size="small"
                            >
                              <el-option
                                v-for="(ite,index) in arr"
                                :key="index"
                                :value="ite"
                                :label="ite"
                              />
                            </el-select>

                          </el-col>
                          <el-col :span="2" :offset="3">
                            <el-button
                              v-if="item.editable==true"
                              size="mini"
                              @click="item.editable=false"
                            >可编辑</el-button>
                            <el-button
                              v-if="item.editable==false"
                              size="mini"
                              @click="item.editable=true"
                            >不可编辑</el-button>
                          </el-col>
                          <el-col :span="5" :offset="0">
                            <createResouce :id="item.id" @getMessage="getM" />
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-if="reserveddeletion.length==0" v-model="activeName1" accordion>
                      <el-collapse-item name="2" title="删除" />
                    </el-collapse>
                    <!-- 变更 -->
                    <el-collapse
                      v-if="reservedmodification.length>0"
                      v-model="activeName1"
                      accordion
                    >
                      <el-collapse-item name="3" title="变更">
                        <el-row v-for="(item,i) in reservedmodification" :key="i">
                          <el-col :span="5">
                            <label
                              class="el-form-item__label"
                              style="font-size:14px;"
                            >{{ item.name }}</label>
                          </el-col>
                          <el-col :span="5" :offset="1">
                            <el-input
                              v-if="item.clazz=='String'||item.clazz=='Number'"
                              :type="item.clazz"
                              v-model="item.defaultValue"
                              size="small"
                            />
                            <el-select
                              v-else-if="item.clazz=='Select'"
                              v-model="atest"
                              size="small"
                            >
                              <el-option
                                v-for="(ite,index) in arr"
                                :key="index"
                                :value="ite"
                                :label="ite"
                              />
                            </el-select>
                          </el-col>
                          <el-col :span="2" :offset="3">
                            <el-button
                              v-if="item.editable==true"
                              size="mini"
                              @click="item.editable=false"
                            >可编辑</el-button>
                            <el-button
                              v-if="item.editable==false"
                              size="mini"
                              @click="item.editable=true"
                            >不可编辑</el-button>
                          </el-col>
                          <el-col :span="5" :offset="0">
                            <createResouce :id="item.id" @getMessage="getM" />
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                    <el-collapse
                      v-if="reservedmodification.length==0"
                      v-model="activeName1"
                      accordion
                    >
                      <el-collapse-item name="3" title="变更" />
                    </el-collapse>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="步骤3：计价信息" name="3">
                <el-row :gutter="20">
                  <el-form :inline="true" :model="form" label-width="80px">
                    <el-row>
                      <el-col :span="10" :offset="5">
                        <div class="grid-content bg-purple">
                          <el-form-item label="计价方式">
                            <!-- <el-radio v-model="form.price.chargeMode"   label="FIXED"> </el-radio>
                            <el-radio v-model="form.price.chargeMode"   label="FLEXABLE"></el-radio>-->

                            <input
                              :checked="disa"
                              v-model="form.price.chargeMode"
                              type="radio"
                              name="radio"
                              value="FIXED"
                              @click="disable=true"
                            >
                            固定计价
                            <input
                              v-model="form.price.chargeMode"
                              type="radio"
                              name="radio"
                              value="FLEXIBLE"
                              @click="disable=false"
                            >
                            灵活计价
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="5">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="金额">
                            <el-input
                              :disabled="disable"
                              v-model="sums"
                              style="width:100%;"
                              placeholder="金额"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10" :offset="5">
                        <div class="grid-content bg-purple-light">
                          <el-form-item label="计价周期">
                            <el-radio v-model=" form.price.chargePeriod" value="DAY" label="DAY">日</el-radio>
                            <el-radio
                              v-model=" form.price.chargePeriod"
                              value="MONTH"
                              label="MONTH"
                            >月</el-radio>
                            <el-radio v-model=" form.price.chargePeriod" value="YEAR" label="YEAR">年</el-radio>
                          </el-form-item>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-row>
              </el-collapse-item>
            </el-collapse>
            <el-row>
              <el-col :span="4" :offset="20" style="margin-top:20px;">
                <el-button size="small" @click="comeback()">返回</el-button>

                <el-button :loading="loading" size="small" type="primary" @click="createResources()">创建</el-button>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import myInput from './myinput';
import createResouce from './createResouce';
import SelectPage from '@/components/selectPage';
import {
  createdSKU,
  getResourcesList,
  getCloudResourceInfo,
  getPricesList,
  getcloudServiceCatalogList, // 服务目录
  getServiceSubdirectoryMessage // 子服务目录
} from '@/api/serviceOperating';
import { requestParams, parseHash } from '@/utils/urlParam';
import Pagination from '@/components/pagination';
const id = 0;
export default {
  components: {
    createResouce,
    SelectPage,
    Pagination,
    myInput
  },
  data() {
    return {
      atest: '',
      select: 'DAY',
      input3: '',
      disa: false,
      disable: true,
      aaa: '',
      bbb: 'text',
      options: [],
      selectedOptions: [],
      value: 0,
      radio: 0,
      props: {
        value: 'id',
        label: 'name',
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          if (level == 0) return;
          getServiceSubdirectoryMessage(node.data.id).then(r => {
            resolve(r.content.content);
          });
        }
      },
      metadata: undefined,
      expandRowKeys: [],
      listLoading: true,
      list: [],
      dialogFormVisible: false,
      is: false,
      isTest: false,
      activeName: '1',
      activeName1: '1',
      loading: false,
      cities: [],
      priceall: [],
      dd: [],
      aa: [],
      sums: 0,
      search: { page: 1, rows: 6 },
      metadataSelect: undefined,
      madatePrice: undefined,
      creation: 'creation',
      deletion: 'deletion',
      modification: 'modification',
      form: {
        catalogId: 0,
        code: '',
        description: '',
        icon: '',
        initStock: 0,
        name: '',
        orgId: 0,
        price: {
          chargeMode: 'FIXED',
          chargePeriod: 'DAY',
          price: 0,
          priceItems: [
            {
              id: 0,
              priceId: 0,
              skuId: 0,
              source: '',
              specId: 0
            }
          ]
        },
        resourceId: 0,
        serviceId: 0,
        specContent: '',
        specs: [
          {
            editable: true,
            name: '',
            paramKey: '',
            paramValue: '',
            skuId: 0,
            specId: 0,
            status: '',
            tags: ''
          }
        ],
        status: 'CREATED',
        stock: 0,
        tags: '',
        tenantId: 0,
        userId: 0
      },
      val: 0,
      reservedParamers: [],
      reserveddeletion: [],
      reservedmodification: [],
      arr: [],
      arrd: [],
      arrm: []
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
      const res = await requestParams(getResourcesList, this.search);
      const r = await requestParams(getcloudServiceCatalogList);
      this.metadataSelect = res.metadata;
      this.madatePrice = res.metadata;
      this.options = r.content.content;
      this.priceall = res.content.content;
      this.cities = res.content.content;
    },
    typeFun(val) {
      if (val == 'String') return 'text';
      if (val == 'Number') return 'number';
      if (val == 'Select') return;
    },
    // 获取服务目录的id
    checkServiceCatalog(value) {
      this.form.catalogId = value[value.length - 1];
      // console.log(this.form.catalogId);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.list);
      } else {
        getServiceSubdirectoryMessage(node.data.id).then(res => {
          return resolve(res.content.content);
        });
      }
    },
    getServiceId(val) {
      getCloudResourceInfo(val).then(res => {
        this.reservedParamers = [];
        console.log(res);
        var object = res.content.creation.parameters;
        for (var i = 0; i < object.length; i++) {
          if (!object[i].reserved) {
            this.reservedParamers.push(object[i]);
            // console.log(this.reservedParamers);
          }
        }
        for (var i = 0; i < this.reservedParamers.length; i++) {
          if (this.reservedParamers[i].clazz == 'Select') {
            this.arr = this.reservedParamers[i].defaultValue.split(',');
            this.atest = this.arr[0];
          }
        }
        console.log(this.arr);

        // 遍历云资源中的deletion的parameters
        this.reserveddeletion = [];
        var objectdeletionparamers = res.content.deletion.parameters;
        for (var i = 0; i < objectdeletionparamers.length; i++) {
          if (!objectdeletionparamers[i].reserved) {
            this.reserveddeletion.push(objectdeletionparamers[i]);
          }
        }
        for (var i = 0; i < this.reserveddeletion.length; i++) {
          if (this.reserveddeletion[i].clazz == 'Select') {
            this.arr = this.reserveddeletion[i].defaultValue.split(',');
            this.atest = this.arrd[0];
          }
        }
        // 遍历云资源中的modification的parameters
        this.reservedmodification = [];
        var objectmodificationparamers = res.content.modification.parameters;
        for (var i = 0; i < objectmodificationparamers.length; i++) {
          if (!objectmodificationparamers[i].reserved) {
            this.reservedmodification.push(objectmodificationparamers[i]);
          }
        }
        for (var i = 0; i < this.reservedmodification.length; i++) {
          if (this.reservedmodification[i].clazz == 'Select') {
            this.arr = this.reservedmodification[i].defaultValue.split(',');
            this.atest = this.arrm[0];
          }
        }
      });
      for (var i = 0; i < this.cities.length; i++) {
        if (this.cities[i].id == val) {
          this.form.serviceId = this.cities[i].service.id;
          break;
        }
      }
      this.form.resourceId = val;
    },
    selctPage(msg) {
      this.search.page = msg;
      this.initSelect();
    },
    handleRowClick(row, column, event) {
      if (event.target.nodeName.toLocaleLowerCase() != 'div') return;
      const index = this.expandRowKeys.indexOf(row.id);
      if (index == -1) {
        this.expandRowKeys.push(row.id);
      } else {
        this.expandRowKeys.splice(index, 1);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    getCreationVal(msg) {
      this.form.creation = msg;
    },
    getM(msg, fatherId, money) {
      this.val = msg;
      var creat = {
        id: 0,
        priceId: 0,
        skuId: 0,
        source: '',
        specId: 0,
        fatherId: 0
      };
      var moneyObject = {
        fatherId: 0,
        price: 0
      };
      // 遍历计价
      var resut = false;
      var inds = 0;
      console.log(this.dd);
      if (this.dd.length != 0) {
        for (var i = 0; i < this.dd.length; i++) {
          if (this.dd[i].fatherId == fatherId) {
            resut = true;
            inds = i;
          }
        }
      }
      if (resut) {
        this.dd.splice(inds, 1);
        creat.fatherId = fatherId;
        creat.specId = fatherId;
        creat.priceId = msg;
        this.dd.push(creat);
      } else {
        creat.fatherId = fatherId;
        creat.specId = fatherId;
        creat.priceId = msg;
        this.dd.push(creat);
      }
      if (this.dd.length == 0) {
        creat.fatherId = fatherId;
        creat.specId = fatherId;
        creat.priceId = msg;
        this.dd.push(creat);
      }

      // 遍历金额
      var result = false;
      var index = 0;
      if (this.aa.length != 0) {
        for (var i = 0; i < this.aa.length; i++) {
          if (this.aa[i].fatherId == fatherId) {
            result = true;
            index = i;
          }
        }
      }
      if (result) {
        this.aa.splice(index, 1);
        moneyObject.price = money;
        moneyObject.fatherId = fatherId;
        this.aa.push(moneyObject);
      } else {
        moneyObject.price = money;
        moneyObject.fatherId = fatherId;
        this.aa.push(moneyObject);
      }
      if (this.aa.length == 0) {
        moneyObject.fatherId = fatherId;
        moneyObject.price = money;
        this.aa.push(moneyObject);
      }
      this.sums = 0;
      for (var i = 0; i < this.aa.length; i++) {
        this.sums += this.aa[i].price;
      }
      console.log(this.sums);
    },
    handleChange(val) {
      if (val == 3) {
        console.log(this.aa);
      }
    },
    createResources() {
      var space = [];
      var sc = [];
      this.is = true;
      this.loading = true;
      var data = this.form;
      var _this = this;
      // 遍历creation中paramers中
      var sr = {
        id: 0,
        priceId: 0,
        skuId: 0,
        source: '',
        specId: 0
      };

      for (var i = 0; i < this.reservedParamers.length; i++) {
        // if (this.reservedParamers[i].clazz == "Select") {
        //   this.arr = this.reservedParamers[i].defaultValue.split(",");
        // }
        //     console.log(this.arr)
        var creatspaces = {
          editable: true,
          name: '',
          paramKey: '',
          paramValue: '',
          skuId: 0,
          specId: 0,
          status: '',
          tags: '',
          clazz: ''
        };
        creatspaces.name = this.reservedParamers[i].name;
        creatspaces.editable = this.reservedParamers[i].editable;
        creatspaces.paramKey = this.reservedParamers[i].paramKey;

        creatspaces.specId = this.reservedParamers[i].id;
        creatspaces.clazz = this.reservedParamers[i].clazz;
        creatspaces.paramValue = this.reservedParamers[i].defaultValue;
        space.push(creatspaces);
      }

      data.specs = space;

      // 遍历deletion中paramers中
      for (var i = 0; i < this.reserveddeletion.length; i++) {
        var creatspaces = {
          editable: true,
          name: '',
          paramKey: '',
          paramValue: '',
          skuId: 0,
          specId: 0,
          status: '',
          tags: '',
          clazz: ''
        };
        creatspaces.name = this.reserveddeletion[i].name;
        creatspaces.editable = this.reserveddeletion[i].editable;
        creatspaces.paramKey = this.reserveddeletion[i].paramKey;
        creatspaces.clazz = this.reserveddeletion[i].clazz;
        creatspaces.paramValue = this.reserveddeletion[i].defaultValue;
        creatspaces.specId = this.reserveddeletion[i].id;
        space.push(creatspaces);
      }
      data.specs = space;
      // this.reservedParamers.name=data.specs.name;
      // 遍历modification中paramers中
      for (var i = 0; i < this.reservedmodification.length; i++) {
        var creatspaces = {
          editable: true,
          name: '',
          paramKey: '',
          paramValue: '',
          skuId: 0,
          specId: 0,
          status: '',
          tags: '',
          clazz: ''
        };
        creatspaces.name = this.reservedmodification[i].name;
        creatspaces.editable = this.reservedmodification[i].editable;
        creatspaces.paramKey = this.reservedmodification[i].paramKey;
        creatspaces.paramValue = this.reservedmodification[i].defaultValue;
        creatspaces.paramValue = this.reservedmodification[i].defaultValue;
        creatspaces.specId = this.reservedmodification[i].id;
        space.push(creatspaces);
      }
      this.form.price.period = this.input3 + this.select;
      data.specs = space;
      data.price.price = this.sums;
      data.price.priceItems = this.dd;
      console.log(data);
      setTimeout(function() {
        createdSKU(data).then(r => {
          console.log(data);
          if (r.code == 201) {
            _this.$router.push({
              path: '/operatingCentre/serviceOperating', query: { tab: 'third' }});
            // _this.loading = false;
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
        });
      }, 1200);
    },
    comeback() {
      this.$router.push({
        path: '/operatingCentre/serviceOperating', query: { tab: 'third' }});
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
