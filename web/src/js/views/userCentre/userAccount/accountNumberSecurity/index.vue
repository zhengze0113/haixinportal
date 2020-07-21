<template>

  <div class="message-main">
    <close-card title="个人信息" icon="user">
      <div class="el-row">
        <div class="el-col-3 tr">头像：</div>
        <div class="el-col-10 ml-10">
          <img src="http://yanxuan.nosdn.127.net/a200c0ae5f1c2bb56baecc4c10f2a6ff.jpg" alt="">
        </div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">账号ID：</div>
        <div class="el-col-10 ml-10">{{ userInfo.id }}</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">用户名：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userName }}</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">性别：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userExtension.sex }}</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">真实姓名：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userExtension.lastName+userInfo.userExtension.firstName }}</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">出生日期：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userExtension.birthDay }}</div>
        <!-- <div class="el-col-10 ml-10">{{ userInfo.userExtension.birthDay!=''?(userInfo.userExtension.birthDay |formatTime('yyyy-MM-dd hh:mm:ss')):'' }}</div> -->
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">用户职位：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userExtension.position }}</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">邮件地址：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userExtension.email }}</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">手机号：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userExtension.mobilePhone }}</div>
      </div>
      <div class="el-row mt-20">
        <div class="el-col-3 tr">联系地址：</div>
        <div class="el-col-10 ml-10">{{ userInfo.userExtension.address }}</div>
      </div>

      <div class="operation">
        <!-- <el-button type="button" @click="dialogVisible = true">编辑</el-button> -->
        <!-- <el-button type="button" @click="dialogVisible = true">密码修改</el-button>
        <el-button type="button" @click="modifyEmail = true">邮箱修改</el-button>
        <el-button type="button" @click="modifyPhone = true">手机号修改</el-button>
        <el-button type="button" @click="open">注销账号</el-button> -->
        <!-- <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" title="密码修改" width="30%">
          <span>
            <el-input v-model="input" placeholder="请输入新的密码"/>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog> -->
        <!-- <el-dialog :visible.sync="modifyEmail" :before-close="handleClose" title="邮箱修改" width="30%">
          <span>
            <el-input v-model="newEmail" placeholder="请输入新的邮箱"/>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="modifyEmail = false">取 消</el-button>
            <el-button type="primary" @click="modifyEmail = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog :visible.sync="modifyPhone" :before-close="handleClose" title="手机号修改" width="30%">
          <span>
            <el-input v-model="newPhone" placeholder="请输入新的密码"/>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="modifyPhone = false">取 消</el-button>
            <el-button type="primary" @click="modifyPhone = false">确 定</el-button> -->
          </span>
        </el-dialog>
      </div>
    </close-card>
  </div>
</template>

<script>
import { userInfo } from '@/api/user';
import {
  getUserInfo
} from '@/utils/auth';
export default {
  components: {
  },
  filters: {
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
  data() {
    return {
      dialogVisible: false,
      modifyPhone: false,
      modifyEmail: false,
      input: '',
      newEmail: '',
      newPhone: '',
      user: null,
      userInfo: null
    };
  },
  created() {
    this.getUesrInfo();
  },
  methods: {
    async getUesrInfo() {
      this.user = JSON.parse(getUserInfo());
      await userInfo(this.user.uid).then(res => {
        this.userInfo = res.content;
        this.userInfo.userExtension.birthDay != '' ? (this.userInfo.userExtension.birthDay = this.$options.filters['formatTime'](this.userInfo.userExtension.birthDay, 'yyyy-MM-dd hh:mm:ss')) : (this.userInfo.userExtension.birthDay = '');
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    open() {
      this.$confirm('是否注销该账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$notify({
          type: 'success',
          message: '注销成功!'
        });
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消注销'
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.operation{
  padding:20px;
}
</style>
<style>
  .el-notification__content{
  line-height: 12px;
}
</style>

