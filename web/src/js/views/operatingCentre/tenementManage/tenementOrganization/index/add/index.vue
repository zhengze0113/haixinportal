<el-card>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="第1步：租户基本信息" name="1">
          <div class="top-line">
            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="18" :offset="1">
                <div class="grid-content bg-purple">
                  <el-form :model="tenant" label-width="100px" label-position="left">
                    <el-form-item :rules="{required: true, message: '请输入租户名', trigger: 'blur'}" label="租户名：" prop="name">
                      <el-input v-model="tenant.name" placeholder="请输入租户名" />
                    </el-form-item>
                    <el-form-item label="默认主页">
                      <el-input v-model="tenant.mainPage" placeholder="请设置默认主页" />
                    </el-form-item>
                    <el-form-item label="登录后主页">
                      <el-input v-model="tenant.logoutPage" placeholder="请设置登录后主页" />
                    </el-form-item>
                    <el-form-item label="页面主题">
                      <el-input v-model="tenant.pageTheme" placeholder="默认为theme" />
                    </el-form-item>
                    <el-form-item label="语言">
                      <el-input v-model="tenant.language" placeholder="默认为zh" />
                    </el-form-item>
                    <el-form-item label="标签">
                      <el-input v-model="tenant.tags" placeholder="请输入标签" />
                    </el-form-item>
                    <el-form-item label="描述">
                      <el-input
                        :rows="2"
                        v-model="tenant.description"

                        type="textarea"
                        placeholder="请输入描述信息"
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="第2步：租户联系地址" name="2">
          <div class="top-line">
            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="18" :offset="1">
                <div class="grid-content bg-purple">
                  <el-form :model="tenant" label-width="100px">
                    <el-form-item label="联系地址">
                      <el-select
                        v-model="tenant.postAddress.country"
                        placeholder="请选择国家"
                        style="width:76px;"
                      >
                        <el-option
                          v-for="item in country"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                      <el-select
                        v-model="tenant.postAddress.province"
                        placeholder="请选择省份"
                        style="width:76px;"
                      >
                        <el-option
                          v-for="item in province"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                      <el-select
                        v-model="tenant.postAddress.city"
                        placeholder="请选择城市"
                        style="width:76px;"
                      >
                        <el-option
                          v-for="item in city"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址">
                      <el-input
                        v-model="tenant.postAddress.detailAddress"

                        placeholder="例：**路**号"
                      />
                    </el-form-item>
                    <el-form-item label="邮编">
                      <el-input
                        v-model="tenant.postAddress.zipCode"

                        placeholder="请输入邮编"
                      />
                    </el-form-item>
                    <el-form-item label="标签">
                      <el-input v-model="tenant.postAddress.tags" placeholder="请输入标签" />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="第3步：管理员基本信息" name="3">
          <div class="top-line">
            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="18" :offset="1">
                <div class="grid-content bg-purple">
                  <el-form :model="tenant" label-width="100px">
                    <el-form-item label="用户名">
                      <el-input
                        v-model="tenant.tenantManager.userName"

                        placeholder="请输入用户名"
                      />
                    </el-form-item>
                    <el-form-item label="头像">
                      <el-upload
                        :show-file-list="false"
                        v-model="tenant.tenantManager.headPortrait"
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" >
                        <i v-else class="el-icon-plus avatar-uploader-icon"/>
                      </el-upload>
                    </el-form-item>
                    <el-form-item label="默认主页">
                      <el-input
                        v-model="tenant.tenantManager.mainPage"

                        placeholder="请设置默认主页"
                      />
                    </el-form-item>
                    <el-form-item label="登录后主页">
                      <el-input
                        v-model="tenant.tenantManager.logoutPage"

                        placeholder="请设置登录后主页"
                      />
                    </el-form-item>
                    <el-form-item label="页面主题">
                      <el-input
                        v-model="tenant.tenantManager.pageTheme"

                        placeholder="默认为theme"
                      />
                    </el-form-item>
                    <el-form-item label="语言">
                      <el-input
                        v-model="tenant.tenantManager.language"

                        placeholder="默认为zh"
                      />
                    </el-form-item>
                    <el-form-item label="标签">
                      <el-input
                        v-model="tenant.tenantManager.tags"

                        placeholder="请输入标签"
                      />
                    </el-form-item>
                    <el-form-item label="描述">
                      <el-input
                        :rows="2"
                        v-model="tenant.tenantManager.description"

                        type="textarea"
                        placeholder="请输入描述信息"
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="第4步：管理员联系地址" name="4">
          <div class="top-line">
            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="18" :offset="1">
                <div class="grid-content bg-purple">
                  <el-form :model="tenant" label-width="100px">
                    <el-form-item label="姓">
                      <el-input
                        v-model="tenant.tenantManager.userExtension.firstName"

                        placeholder
                      />
                    </el-form-item>
                    <el-form-item label="名">
                      <el-input
                        v-model="tenant.tenantManager.userExtension.lastName"

                        placeholder
                      />
                    </el-form-item>
                    <el-form-item label="详细地址">
                      <el-input
                        v-model="tenant.tenantManager.userExtension.address"

                        placeholder="例：****市****区***街**号码"
                      />
                    </el-form-item>
                    <el-form-item label="birthDay">
                      <el-date-picker
                        v-model="tenant.tenantManager.userExtension.birthDay"
                        type="date"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-radio v-model="tenant.tenantManager.userExtension.sex" label="男">男</el-radio>
                      <el-radio v-model="tenant.tenantManager.userExtension.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="证件类型">
                      <el-select
                        v-model="tenant.tenantManager.userExtension.credentialType"
                        placeholder="请选择证件类型"
                        style="width:76px;"
                      >
                        <el-option
                          v-for="item in credentialType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码">
                      <el-input
                        v-model="tenant.tenantManager.userExtension.credentialNumber"

                        placeholder
                      />
                    </el-form-item>
                    <el-form-item label="邮箱">
                      <el-input
                        v-model="tenant.tenantManager.userExtension.email"

                        placeholder
                      />
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input
                        v-model="tenant.tenantManager.userExtension.mobilePhone"

                        placeholder
                      />
                    </el-form-item>
                    <el-form-item label="职位">
                      <el-input
                        v-model="tenant.tenantManager.userExtension.position"

                        placeholder
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="第5步：管理员隐私信息" name="5">
          <div class="top-line">
            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="18" :offset="1">
                <div class="grid-content bg-purple">
                  <el-form :model="tenant" label-width="100px">
                    <el-form-item label="隐私数据">
                      <el-input
                        v-model="tenant.tenantManager.credential.credentialData"

                        placeholder="隐私数据"
                      />
                    </el-form-item>
                    <el-form-item label="类型">
                      <el-input
                        v-model="tenant.tenantManager.credential.type"

                        placeholder="密码（用户凭据）"
                      />
                    </el-form-item>
                    <el-form-item label="标签">
                      <el-input
                        v-model="tenant.tenantManager.credential.tags"

                        placeholder="请输入标签"
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="第6步：联系人基本信息" name="6">
          <div class="top-line">
            <el-row :gutter="20" style="margin-top:20px">
              <el-col :span="18" :offset="1">
                <div class="grid-content bg-purple">
                  <el-form :model="tenant" label-width="100px">
                    <el-form-item label="姓">
                      <el-input v-model="tenant.contact.firstName" placeholder />
                    </el-form-item>
                    <el-form-item label="名">
                      <el-input v-model="tenant.contact.lastName" placeholder />
                    </el-form-item>
                    <el-form-item label="性别">
                      <el-radio v-model="tenant.contact.sex" label="男">男</el-radio>
                      <el-radio v-model="tenant.contact.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="birthDay">
                      <el-date-picker
                        v-model="tenant.contact.birthDay"
                        type="date"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                    <el-form-item label="QQ">
                      <el-input v-model="tenant.contact.qq" placeholder />
                    </el-form-item>
                    <el-form-item label="微信">
                      <el-input v-model="tenant.contact.snsWeChat" placeholder />
                    </el-form-item>
                    <el-form-item label="微博">
                      <el-input v-model="tenant.contact.weibo" placeholder />
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model="tenant.contact.dialNumber" placeholder />
                    </el-form-item>
                    <el-form-item label="职位">
                      <el-input v-model="tenant.contact.position" placeholder />
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="right" style="margin:20px">
        <el-button size="small" type="primary" @click="addTenant()">创建</el-button>
        <el-button size="small" icon="el-icon-arrow-left" @click="comeback()">返回</el-button>
      </div>
    </el-card>
