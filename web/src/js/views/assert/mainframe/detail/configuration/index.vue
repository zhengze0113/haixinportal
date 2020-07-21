<template>
  <div>
    <div>
      <div>CPU个数</div>
      <div class="mt-8">
        <el-input-number
          v-model="num"
          :min="1"
          :max="10"
          controls-position="right"
          size="small"
        />
      </div>
    </div>

    <div class="mt-20">
      <div>内存大小</div>
      <div class="mt-8">
        <el-input-number
          v-model="num2"
          :min="1"
          :max="10"
          controls-position="right"
          size="small"
        />
      </div>
    </div>

    <div class="mt-20">
      <div>磁盘 <i class="el-icon-plus" @click="addDisk()"/></div>
      <div class="mt-8">
        <div v-for="(str, index) in diskList" :key="index" class="mt-8">
          <span>{{ index + 1 }}  {{ str }}</span>
          <i class="el-icon-close" @click="removeDisk(index)"/>
        </div>
      </div>
    </div>

    <div class="mt-20">
      <div>网卡 <i class="el-icon-plus" @click="addNetwork()"/></div>
      <div class="mt-8">
        <div v-for="(str, index) in networkList" :key="index" class="mt-8">
          <span>{{ index + 1 }}  {{ str }}</span>
          <i class="el-icon-close" @click="remove(index)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      num: 4,
      num2: 8,
      networkList: [
        'eth0  e1000 启用',
        'eth1  e1000 启用 '
      ],
      diskList: [
        'hd0 40gb',
        'hd1 40gb'
      ]
    };
  },
  created() {
  },
  methods: {
    remove(index) {
      this.networkList.splice(index, 1);
    },
    removeDisk(index) {
      this.diskList.splice(index, 1);
    },
    addDisk() {
      this.diskList.push(`hd${this.diskList.length + 1} 40gb`);
    },
    addNetwork() {
      this.networkList.push(`eth${this.networkList.length + 1}  e1000 启用`);
    }

  }
};
</script>
