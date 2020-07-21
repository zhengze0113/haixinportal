<template>
  <div>
    <el-form :inline="true" :model="form" class="demo-form-inline" size="mini">
      <el-row>
        <el-col :span="8" :offset="2">
          <div class="grid-content bg-purple">
            <el-form-item label="超时时长">
              <el-input-number v-model="form.timeout" :step="100" size="medium"/>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <el-form-item label="协议类型">
              <el-radio-group v-model="form.protocol" size="medium">
                <el-radio border label="HTTP"/>
                <el-radio border label="XXXX"/>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" :offset="2">
          <div class="grid-content bg-purple">
            <el-form-item label="返回参数">
              <el-input v-model="form.outputParams" type="textarea" size="medium" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="grid-content bg-purple">
            <el-form-item label="返回类型">
              <el-select v-model="form.outputType" >
                <el-option label="JSON" value="JSON"/>
                <el-option label="XML" value="XNL"/>
              </el-select>
            </el-form-item>
          </div>
        </el-col>

        <el-col :offset="2">
          <label class="el-form-item__label">资源模板</label>
        </el-col>
        <el-col :span="10" :offset="2">
          <JsonEditor
            :options="{
              confirmText: '确认',
              cancelText: '返回',
            }"
            :obj-data="jsonData"
            v-model="jsonData"/>
        </el-col>
        <el-col :span="6" :offset="2">
          <json-view :json="jsonData" :closed="false" style="background: #f8f8f8;"/>
        </el-col>
      </el-row>

      <el-row>

        <el-col :span="10">
          <div style="float:left;" class="fontStyle">参数列表</div>
        </el-col>
        <el-col :span="20" :offset="2">
          <el-collapse v-model="paramActive" accordion>

            <el-collapse-item v-for="(item,i) in form.parameters" :key="i" :title="item.paramKey" :name="i">

              <el-form ref="form" :model="paramForm" size="mini">

                <el-row>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="Key">
                      <el-input v-model="form.parameters[i].paramKey" disabled="disabled"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="名称">
                      <el-input v-model="form.parameters[i].name"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="长度">
                      <el-input v-model="form.parameters[i].length"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="是否内置">
                      <el-radio v-model="form.parameters[i].reserved" :label="true">是</el-radio>
                      <el-radio v-model="form.parameters[i].reserved" :label="false">否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="是否编辑">
                      <el-radio v-model="form.parameters[i].editable" :label="true">是</el-radio>
                      <el-radio v-model="form.parameters[i].editable" :label="false">否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="是否必填">
                      <el-radio v-model="form.parameters[i].required" :label="true">是</el-radio>
                      <el-radio v-model="form.parameters[i].required" :label="false">否</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="默认">
                      <el-input v-model="form.parameters[i].defaultValue"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="约束">
                      <el-input v-model="form.parameters[i].constraints"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="范围">
                      <el-input v-model="form.parameters[i].scope"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" :offset="1">
                    <el-form-item label="类型">
                      <el-select v-model="form.parameters[i].clazz" style="width:92%;">
                        <el-option label="String" value="String"/>
                        <el-option label="Number" value="Number"/>
                        <el-option label="Array" value="Array"/>
                        <el-option label="Float" value="Float"/>
                        <el-option label="Select" value="Select"/>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="15" :offset="1">
                    <el-form-item label="标签">
                      <el-input v-model="form.parameters[i].tags" type="textarea"/>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-collapse-item>

          </el-collapse>
        </el-col>

      </el-row>

    </el-form>
  </div>
</template>
<script>
import { jsonView } from 'jsonview-vue';

export default {
  components: {
    jsonView
  },
  props: ['creation', 'result'],
  data() {
    return {
      form: {
        protocol: 'HTTP',
        timeout: 1000,
        parameters: [],
        template: '',
        tags: '',
        outputParams: 'string',
        outputType: 'JSON'
      },
      paramActive: '00',
      jsonData: {
        url: '${http.url}',
        method: '${http.method}',
        accept: '${http.accept}',
        contentType: '${http.contentType}',
        headers: '${http.headers}',
        body: {
          name: '${ecs.name}',
          cpus: '${ecs.cpus}',
          memory: '${ecs.memory}',
          disks: '${ecs.disks}',
          tags: '${ecs.tags}'
        }
      },

      paramForm: {
        name: 'http.url'
      },
      jsonValue: []
    };
  },
  watch: {
    'result': function() {
      if (this.result) {
        this.form.template = JSON.stringify(this.jsonData);
        this.$emit('getCreation', this.form);
      }
    },
    'jsonData': function() {
      this.test(this.jsonData);
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {

    test(data) {
      this.jsonValue = [];
      this.form.parameters = [];
      for (const key in data) {
        if (typeof (data[key]) === 'string') {
          this.jsonValue.push(data[key]);
          if (/^\$\{.*\}$/.test(data[key])) {
            this.form.parameters.push({
              paramKey: data[key].substr(2, data[key].length - 3),
              clazz: 'String',
              name: '',
              length: 0,
              reserved: true,
              editable: true,
              required: true,
              constraints: '',
              scope: '',
              defaultValue: '',
              tags: '',
              status: '',
              resourceId: 0,
              operationId: 0
            });
          }
        }
        if (typeof (data[key]) === 'object') {
          for (const key1 in data[key]) {
            if (typeof (data[key][key1]) === 'string') {
              this.jsonValue.push(data[key][key1]);
              if (/^\$\{.*\}$/.test(data[key][key1])) {
                this.form.parameters.push({
                  paramKey: data[key][key1].substr(2, data[key][key1].length - 3),
                  clazz: 'String',
                  name: '',
                  length: 0,
                  reserved: true,
                  editable: true,
                  required: true,
                  constraints: '',
                  scope: '',
                  defaultValue: '',
                  tags: '',
                  status: '',
                  resourceId: 0,
                  operationId: 0
                });
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
  .fontStyle {
    font-size: 16px;
    font-weight: 500;
  }

</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>
