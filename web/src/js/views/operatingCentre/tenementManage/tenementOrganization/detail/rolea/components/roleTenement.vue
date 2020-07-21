<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :span="15"
        style="width: 100%;border-left: 3px solid #333;padding-left: 7px"
      >
        <div
          class="grid-content bg-purple"
          style="color:#303133;float:left;font-size:14px;"
        >
          <b>租户信息</b>
        </div>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24" class="name-top">
        <el-col :span="8">
          <div class="grid-content bg-purple">名称:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ tenant.name }}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">类型:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ tenant.type }}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">标签:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ tenant.tags }}
        </div></el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">描述信息:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{ tenant.description }}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">创建时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ tenant.createTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
        </el-col>
      </el-col>
    </el-row>
    <el-row class="details-left">
      <el-col :span="24">
        <el-col :span="8">
          <div class="grid-content bg-purple">修改时间:</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ tenant.lastModifiedTime | formatTime('yyyy-MM-dd hh:mm:ss') }}</div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    },
    formatTime: function(date, fmt) {
      var date = new Date(date);
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      }
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var str = o[k] + '';
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
          );
        }
      }
      return fmt;
    }
  },
  props: {
    tenant: {
      type: Object,
      default: () => ({

      })
    }
  },
  data() {
    return {

    };
  },
  watch: {},
  mounted() {},
  created() {
    console.log('租户' + this.tenant);
  },
  methods: {}
};
</script>
<style scoped>
.bg-purple {
  font-size: 12px;
  color: #000;
  width: 85px;
  font-weight: 400;
}
.bg-purple-light {
  color: #303133;
  font-size: 12px;
}
.el-divider {
  background-color: #333;
}
.details-left {
  border-bottom: 1px solid #eceef5;
  padding: 8px 0;
}
.name-top {
  padding-top: 10px;
}
</style>
<style>
.el-notification__content {
  line-height: 12px;
}
</style>
