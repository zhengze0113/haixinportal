<template>
  <div class="app-container" style="padding-top:0px">
    <close-card title="服务简介" icon="list" :show-arrow="true">
      <div>
        <el-row :gutter="20">
          <el-col :span="20" :offset="2">
            <div
              class="grid-content bg-purple"
            >首先，他是一个全新的基于容器技术的分布式架构领先方案。Kubernetes(k8s) 是Google开源的容器集群管理系统（谷歌内部:Borg）。在Docker技术的基础上， 为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等一系列完整功能， 提高了大规模容器集群管理的便捷性。Kubernetes是一个完备的分布式系统支撑平台， 具有完备的集群管理能力，多扩多层次的安全防护和准入机制、多租户应用支撑能力、 透明的服务注册和发现机制、內建智能负载均衡器、强大的故障发现和自我修复能力、 服务滚动升级和在线扩容能力、可扩展的资源自动调度机制以及多粒度的资源配额管理能力。 同时Kubernetes提供完善的管理工具，涵盖了包括开发、部署测试、运维监控在内的各个环节。</div>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top:20px;">
          <el-col :span="22" :offset="2">
            <div class="grid-content bg-purple">
              <el-form
                label-position="left"
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
                label-width="70px"
              >
                <el-form-item label="类型">
                  <el-input v-model="formInline.user" placeholder="类型"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                  <el-input v-model="formInline.user" placeholder="状态"></el-input>
                </el-form-item>
                <el-form-item label="域名">
                  <el-input v-model="formInline.user" placeholder="域名"></el-input>
                </el-form-item>
                <el-form-item label="端口">
                  <el-input v-model="formInline.user" placeholder="端口"></el-input>
                </el-form-item>

                <el-form-item label="应用数">
                  <el-input v-model="formInline.user" placeholder="应用数"></el-input>
                </el-form-item>
                <!-- <br> -->
                <el-form-item label="主机数">
                  <el-input v-model="formInline.user" placeholder="主机数"></el-input>
                </el-form-item>
                <el-form-item label="Pod数">
                  <el-input v-model="formInline.user" placeholder="Pod数"></el-input>
                </el-form-item>
                <el-form-item label="管理员">
                  <el-input v-model="formInline.user" placeholder="管理员"></el-input>
                </el-form-item>
                <el-form-item label="创建者">
                  <el-input v-model="formInline.user" placeholder="创建者"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                  <el-input v-model="formInline.user" placeholder="创建时间"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="2">
            <div class="grid-content bg-purple">
              <el-button>
                <svg-icon icon-class="stop"/>配置
              </el-button>
              <el-button>
                <svg-icon icon-class="delete"/>删除
              </el-button>     
            </div>
          </el-col>
        </el-row>
      </div>
    </close-card>

   <close-card title="服务应用" icon="list" :show-arrow="true">
      <template>
        <el-tabs v-model="activeName" type="border-card" ref="tab">
          <el-tab-pane label="服务应用" name="first">
            <applictionList></applictionList>
          </el-tab-pane>
        </el-tabs>
      </template>
    </close-card>
  </div>
</template>

<script>
import CloseCard from "@/components/CloseCard";
import applictionList from "./applicationlist";

export default {
  components: {
    applictionList,
    CloseCard
  },
  data() {
    return {
      activeName: "first",
      options: [
        { label: "v1.0", value: "v1.0" },
        { label: "v2.0", value: "v2.0" }
      ],
      value: "",
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  created() {},
  methods: {}
};
</script>
