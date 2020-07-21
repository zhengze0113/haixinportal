<template>
  <div style="background:#fff;">
    <el-row style="background:#fff;padding:10px;">
      <el-row>
        <el-col
          :span="12"
          :style="{backgroundImage: 'url(' +'web/static/images/attribute/bg'+coverImgUrl+'.png '+ ')',color:coverfont}"
          class="step"
        >参数配置</el-col>
        <el-col
          :span="12"
          :style="{backgroundImage: 'url(' +'web/static/images/attribute/bg'+imgUrl+'.png '+ ')',color:font}"
          class="step"
        >入参定义</el-col>
      </el-row>
    </el-row>
    <el-row v-if="!showBtn">
      <el-row style="background:#fff;padding:30px 10px 0 50px;">
        <el-form
          ref="addList"
          :model="addList"
          :inline="true"
          :rules="rules"
          label-position="right"
          label-width="120px"
          class="demo-addList"
          style="border-bottom:1px dashed #bbb"
        >
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="参数编码：" prop="code">
                <el-input
                  v-model="addList.code"
                  :disabled="true"
                  placeholder="syj.project.s3e5ciyr"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: 2%;">
              <el-form-item label="云资源：" prop="resources">
                <el-select v-model="addList.resources" placeholder="请选择云资源">
                  <el-option v-for="item in list1" :key="item.id" :value="item.name"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item label="参数组名称：" prop="name">
                <el-input v-model="addList.name" placeholder="请输入参数组名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="margin-left: 2%;">
              <el-form-item label="云服务：" prop="service">
                <el-select v-model="addList.service" placeholder="请选择云服务">
                  <el-option v-for="item in list" :key="item.id" :value="item.unit"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-form-item label="关键字：" prop="tags">
            <el-input
              v-model="addList.tags"
              onkeyup="value=value.replace(/[^\a-\z]/g,'')"
              onpaste="value=value.replace(/[^\a-\z]/g,'')"
              oncontextmenu="value=value.replace(/[^\a-\z]/g,'')"
              placeholder="请输入关键字"
            />
          </el-form-item>
          <el-form-item label="认证方式：" prop="authentication">
            <el-input v-model="addList.authentication" placeholder="海油open ID"/>
          </el-form-item>

          <el-form-item label="Commit：" prop="description">
            <el-input v-model="addList.description" type="textarea" placeholder="请输入描述文本（不超过50字）"/>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="background:#fff;padding:30px 10px 0 50px;">
        <el-col class="title">请求基础定义</el-col>
        <el-col>
          <el-form :model="basic" :rules="basicrule" label-position="right" label-width="120px">
            <el-form-item label="请求类型" prop="request">
              <el-select v-model="basic.request" placeholder="请选择请求类型">
                <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="协议" prop="agreement">
              <el-select v-model="basic.agreement" placeholder="请选择协议">
                <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="请求Path" prop="path">
              <el-input v-model="basic.path" placeholder="请输入path"/>
            </el-form-item>
            <el-form-item label="HTTP METHOD" prop="HTTPMethod">
              <el-select v-model="basic.HTTPMethod" placeholder="请选择HTTP METHOD">
                <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="入参请求模式" prop="pattern">
              <el-select v-model="basic.pattern" placeholder="请选择入参请求模式">
                <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>-->
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-row>
    <!-- 参数定义 -->
    <el-row v-if="showBtn">
      <!-- <el-col class="title">入参定义</el-col> -->
      <el-col style="padding: 0 20px;">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="修改循序" align="center">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.top" @click="sortTop(scope.row);btn()">
                <i class="el-icon-top"/>
              </el-button>
              <el-button :disabled="scope.row.down" class="down" @click="sortDown(scope.row);btn()">
                <i class="el-icon-bottom"/>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="显示名称" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.showname"/>
            </template>
          </el-table-column>
          <el-table-column label="参数名" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"/>
            </template>
          </el-table-column>
          <el-table-column label="参数位置" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.attribute" @change="change()">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="类型" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type">
                <el-option
                  v-for="item in typeoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="必填" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.must"/>
            </template>
          </el-table-column>
          <el-table-column label="默认值" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.default"/>
            </template>
          </el-table-column>
          <el-table-column label="校检规则" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.rule"/>
            </template>
          </el-table-column>
          <el-table-column label="描述" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.description"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-link class="link" type="danger" @click="deleteList(scope.row)">移除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col>
        <el-col :span="2" class="addBtnCol">
          <el-button class="addBtn" @click="add()">
            <img src="web/static/images/attribute/jiahao.png" alt style="width:12%;" > 新增一条
          </el-button>
        </el-col>
      </el-col>
    </el-row>
    <el-row style="padding:20px 30px;">
      <el-button v-if="showBtn" class="showBtn" type="primary" @click="ok()">完成</el-button>
      <el-button class="showBtn" type="primary" @click="ok()">保存</el-button>
      <el-button v-if="!showBtn" class="showBtn" type="primary" @click="setpdown()">下一步</el-button>
      <el-button v-if="showBtn" class="showBtn" @click="setptop()">返回上一步</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          index: 1,
          showname: '1',
          name: '1',
          attribute: 'parameterpath',
          type: 'String',
          top: true,
          down: false,
          must: true,
          default: '',
          rule: '',
          description: ''
        },
        {
          index: 2,
          showname: '2',
          name: '2',
          attribute: 'parameterpath',
          type: 'String',
          must: true,
          top: false,
          down: true,
          default: '',
          rule: '',
          description: ''
        }
      ],
      list1: [],
      typevalue: null,
      value: null,
      coverImgUrl: '_active',
      coverfont: '#0261A7',
      font: '#000',
      imgUrl: '',
      arr: [],
      arr1: [],
      showBtn: false,
      options: [
        {
          value: 'parameterpath',
          label: 'parameterpath'
        },
        {
          value: 'head',
          label: 'head'
        },
        {
          value: 'query',
          label: 'query'
        }
      ],
      typeoptions: [
        {
          value: 'String',
          label: 'String'
        },
        {
          value: 'Int',
          label: 'Int'
        },
        {
          value: 'Long',
          label: 'Long'
        },
        {
          value: 'Float',
          label: 'Float'
        },
        {
          value: 'Double',
          label: 'Double'
        },
        {
          value: 'Boolean',
          label: 'Boolean'
        }
      ],
      rules: {
        resources: [
          { required: true, message: '请选择云资源名称', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [{ required: true, message: '请选择属性', trigger: 'blur' }],
        unit: [{ required: true, message: '请选择单位', trigger: 'blur' }],
        price: [{ required: true, message: '请输入资源单价', trigger: 'blur' }],
        tags: [
          { required: true, message: '注：关键字必须英文小写', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述文本', trigger: 'blur' }
        ],
        authentication: [
          { required: true, message: '请输入海油open ID', trigger: 'blur' }
        ],
        service: [{ required: true, message: '请选择云服务', trigger: 'blur' }],
        code: [{ required: true, message: '', trigger: 'blur' }]
      },
      basicrule: {
        request: [
          { required: true, message: '请选择请求类型', trigger: 'blur' }
        ],
        agreement: [{ required: true, message: '请选择协议', trigger: 'blur' }],
        path: [{ required: true, message: '请输入Path', trigger: 'blur' }],
        HTTPMethod: [
          { required: true, message: '请选择HTTP Method', trigger: 'blur' }
        ],
        pattern: [
          { required: true, message: '请选择入参请求模式', trigger: 'blur' }
        ]
      },
      addList: {
        code: '',
        name: '',
        period: 0,
        authentication: '',
        quota: 0,
        status: '',
        tags: '',
        service: '',
        resources: ''
        // usage: 0
      },
      basic: {
        request: 'cpu',
        agreement: 'HTTP',
        path: '',
        HTTPMethod: 'get',
        pattern: '入参映射'
      }
    };
  },
  mounted() {
    this.btn();
  },
  methods: {
    ok() {
      this.addList.basic = this.basic;
      this.addList.params = this.list;
      console.log(this.addList);
    },
    setpdown() {
      this.showBtn = true;
      this.imgUrl = '_active';
      this.coverImgUrl = '';
      this.coverfont = '#000';
      this.font = '#0261A7';
    },
    setptop() {
      this.showBtn = false;
      this.imgUrl = '';
      this.coverImgUrl = '_active';
      this.coverfont = '#0261A7';
      this.font = '#000';
    },
    deleteList(row) {
      // this.$confirm("此操作将永久移除该参数, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      //   center: true
      // }).then(() => {
      for (var i = 0; i < this.list.length; i++) {
        if (row.index == this.list[i].index) {
          this.list.splice(i, 1);
        }
      }
      //   this.$message({
      //     type: "success",
      //     message: "移除成功!"
      //   });
      // });
      this.btn();
    },
    btn() {
      // var path = [];
      // var head = [];
      // var query = [];
      // for (var i = 0; i < this.list.length; i++) {
      //   if (this.list[i].attribute == "parameterpath") {
      //     path.push(this.list[i]);
      //   } else if (this.list[i].attribute == "head") {
      //     head.push(this.list[i]);
      //   } else if (this.list[i].attribute == "query") {
      //     query.push(this.list[i]);
      //   }
      // }
      for (var i = 0; i < this.list.length; i++) {
        if (this.list.length == 1) {
          this.list[0].top = true;
          this.list[0].down = true;
        } else if (this.list.length > 1) {
          if (i == 0) {
            this.list[i].top = true;
            this.list[i].down = false;
          } else if (i == this.list.length - 1) {
            this.list[i].top = false;
            this.list[i].down = true;
          } else {
            this.list[i].top = false;
            this.list[i].down = false;
          }
        }
      }
      // for (var i = 0; i < this.list.length; i++) {
      //   if (i == 0) {
      //     //0
      //     if (path.length == 1) {
      //       //path 1
      //       this.list[i].top = true;
      //       this.list[i].down = true;
      //     } else {
      //       // path!=1
      //       this.list[i].top = true;
      //       this.list[i].down = false;
      //     }
      //   } else if (i == path.length - 1) {
      //     //
      //     if (path.length == 1) {
      //       this.list[i].top = true;
      //       this.list[i].down = true;
      //     } else {
      //       this.list[i].top = false;
      //       this.list[i].down = true;
      //     }
      //   } else if (i == path.length) {
      //     if (head.length == 1) {
      //       this.list[i].down = true;
      //       this.list[i].top = true;
      //     } else {
      //       this.list[i].top = true;
      //       this.list[i].down = false;
      //     }
      //   } else if (i == path.length + head.length - 1) {
      //     this.list[i].down = true;
      //     this.list[i].top = false;
      //   } else if (i == path.length + head.length) {
      //     if (query.length == 1) {
      //       this.list[i].top = true;
      //       this.list[i].down = true;
      //     } else {
      //       this.list[i].top = true;
      //       this.list[i].down = false;
      //     }
      //   } else if (i == this.list.length - 1) {
      //     if (query.length == 0) {
      //       this.list[i].down = true;
      //       this.list[i].top = true;
      //     } else {
      //       this.list[i].down = true;
      //       this.list[i].top = false;
      //     }
      //   } else {
      //     this.list[i].down = false;
      //     this.list[i].top = false;
      //   }
      // }
    },
    // 新增一条
    add() {
      var obj = {
        index: null,
        showname: '',
        name: '',
        attribute: 'parameterpath',
        type: 'String',
        top: false,
        down: false,
        must: true,
        default: '',
        rule: '',
        description: ''
      };
      obj.index = this.list.length + 1;
      this.list.push(obj);
      this.change();
    },
    sortTop(row) {
      for (var i = 0; i < this.list.length; i++) {
        if (row.index == this.list[i].index) {
          var item = this.list[i - 1];
          this.list.splice(i - 1, 2, row);
          this.list.splice(i, 0, item);
          return;
        }
      }
      this.btn();
    },
    sortDown(row) {
      for (var i = 0; i < this.list.length; i++) {
        if (row.index == this.list[i].index) {
          var item = this.list[i + 1];
          this.list.splice(i, 2, item);
          this.list.splice(i + 1, 0, row);
          return;
        }
      }
      this.btn();
    },
    change() {
      // this.arr=[];
      // this.arr1=[];
      // for (var i = 0; i < this.list.length; i++) {
      //   if (this.list[i].attribute == "head") {
      //     this.arr.push(this.list[i]);
      //     this.list.splice(i, 1);
      //     console.log(this.list)
      //   } else if (this.list[i].attribute == "query") {
      //     this.arr1.push(this.list[i]);
      //     this.list.splice(i, 1);
      //   }
      // }
      this.btn();
    },
    push1() {
      for (var j = 0; j < this.arr.length; j++) {
        this.list.push(this.arr[j]);
      }
      this.push();
    },
    push() {
      for (var n = 0; n < this.arr1.length; n++) {
        this.list.push(this.arr1[n]);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  font-size: 12px;
  display: inline-block;
  margin: auto 4.5px;
}
.addBtnCol{
margin-left:30px;
/deep/ .el-button:active{
   background:#fff;
 }
 /deep/ .el-button:focus, .el-button:hover{
   background:#fff;
 }

}
.addBtn {
  border: none;
  color: #0261a7;
  &:hover,&:focus {
    background: #fff !important;
  }
}
.showBtn {
  float: right;
  margin-left: 1%;
}
.step {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
/deep/ .el-form-item {
  width: 100%;
}
/deep/ .el-form-item__content {
  width: 75%;
  /deep/ .el-select {
    width: 100%;
  }
}
/deep/ .el-form-item__label {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
}
/deep/ .el-input__inner {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
/deep/ .el-table__header thead .cell {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.title {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 70px;
}
.top {
  background: #fff;
}
</style>
