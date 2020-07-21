<template>
  <div class="el-transfer">
    <div class="first">
      <transfer-panel
        ref="leftPanel"
        v-bind="$props"
        :data="sourceData"
        :title="titles[0] || t('el.transfer.titles.0')"
        :default-checked="leftDefaultChecked"
        :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
        @checked-change="onSourceCheckedChange">
        <slot name="left-footer"/>
      </transfer-panel>
      <div class="el-transfer__buttons">
        <el-button
          :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
          :disabled="middleChecked.length === 0"
          type="primary"
          @click.native="addToLeftTest">
          <i class="el-icon-arrow-left"/>
          <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
        </el-button>
        <el-button
          :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
          :disabled="leftChecked.length === 0"
          type="primary"
          @click.native="addToMiddle">
          <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
          <i class="el-icon-arrow-right"/>
        </el-button>
      </div>
      <transfer-panel
        ref="rightPanel"
        v-bind="$props"
        :data="middleData"
        :title="titles[1] || t('el.transfer.titles.1')"
        :default-checked="middleDefaultChecked"
        :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
        @checked-change="onMiddleCheckedChange">
        <slot name="right-footer"/>
      </transfer-panel>
      <div class="el-transfer__buttons">
        <el-button
          :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
          :disabled="rightChecked.length === 0"
          type="primary"
          @click.native="addToMiddleTwo">
          <i class="el-icon-arrow-left"/>
          <span v-if="buttonTexts[2] !== undefined">{{ buttonTexts[2] }}</span>
        </el-button>
        <el-button
          :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
          :disabled="middleChecked.length === 0"
          type="primary"
          @click.native="addToRightTwo">
          <span v-if="buttonTexts[3] !== undefined">{{ buttonTexts[3] }}</span>
          <i class="el-icon-arrow-right"/>
        </el-button>
      </div>
      <transfer-panel
        ref="rightPanel"
        v-bind="$props"
        :data="targetData"
        :title="titles[2] || t('el.transfer.titles.1')"
        :default-checked="rightDefaultChecked"
        :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
        @checked-change="onTargetCheckedChange">
        <slot name="right-footer"/>
      </transfer-panel>
    </div>
    <!-- <div class="second">
      <div class="operation">
        <div class="el-transfer__buttons">
          <el-button
            :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
            :disabled="rightChecked.length === 0"
            type="primary"
            @click.native="addToLeft">
            <i class="el-icon-arrow-up"/>
            <span v-if="buttonTexts[2] !== undefined">{{ buttonTexts[2] }}</span>
          </el-button>
          <el-button
            :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
            :disabled="leftChecked.length === 0"
            type="primary"
            @click.native="addToRight">
            <span v-if="buttonTexts[3] !== undefined">{{ buttonTexts[3] }}</span>
            <i class="el-icon-arrow-down"/>
          </el-button>
        </div>
        <div class="el-transfer__buttons">
          <el-button
            :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
            :disabled="rightChecked.length === 0"
            type="primary"
            @click.native="addToMiddleTwo">
            <i class="el-icon-arrow-up"/>
            <span v-if="buttonTexts[2] !== undefined">{{ buttonTexts[2] }}</span>
          </el-button>
          <el-button
            :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
            :disabled="middleChecked.length === 0"
            type="primary"
            @click.native="addToRightTwo">
            <span v-if="buttonTexts[3] !== undefined">{{ buttonTexts[3] }}</span>
            <i class="el-icon-arrow-down"/>
          </el-button>
        </div>
      </div>
      <div class="second-operation-data">
        <transfer-panel
          ref="rightPanel"
          v-bind="$props"
          :data="targetData"
          :title="titles[2] || t('el.transfer.titles.1')"
          :default-checked="rightDefaultChecked"
          :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
          @checked-change="onTargetCheckedChange">
          <slot name="right-footer"/>
        </transfer-panel>
      </div>
    </div> -->
  </div>
</template>

<script>
import ElButton from 'element-ui/packages/button';
import Emitter from 'element-ui/src/mixins/emitter';
import Locale from 'element-ui/src/mixins/locale';
import TransferPanel from './transfer-panel.vue';
import Migrating from 'element-ui/src/mixins/migrating';

export default {
  name: 'ElTransfer',

  components: {
    TransferPanel,
    ElButton
  },

  mixins: [Emitter, Locale, Migrating],

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    buttonTexts: {
      type: Array,
      default() {
        return [];
      }
    },
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    middleDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    middleValue: {
      type: Array,
      default() {
        return [];
      }
    },
    format: {
      type: Object,
      default() {
        return {};
      }
    },
    filterable: Boolean,
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        };
      }
    },
    targetOrder: {
      type: String,
      default: 'original'
    }
  },

  data() {
    return {
      leftChecked: [],
      rightChecked: [],
      middleChecked: []
    };
  },

  computed: {
    dataObj() {
      const key = this.props.key;
      const dataObj = this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
      console.log(dataObj);
      return dataObj;
      // return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
    },

    sourceData() {
      const sourceData = this.data.filter(item => this.value.indexOf(item[this.props.key]) === -1);
      return sourceData.filter(item => this.middleValue.indexOf(item[this.props.key]) === -1);
    },

    middleData() {
      return this.data.filter(item => this.middleValue.indexOf(item[this.props.key]) > -1);
    },

    targetData() {
      console.log(this.targetOrder);
      if (this.targetOrder === 'original') {
        return this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1);
      } else {
        return this.value.reduce((arr, cur) => {
          const val = this.dataObj[cur];
          if (val) {
            arr.push(val);
          }
          return arr;
        }, []);
      }
    },

    hasButtonTexts() {
      return this.buttonTexts.length === 2;
    }
  },

  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', val);
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      };
    },

    onSourceCheckedChange(val, movedKeys) {
      this.leftChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('left-check-change', val, movedKeys);
    },

    onMiddleCheckedChange(val, movedKeys) {
      this.middleChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('middle-check-change', val, movedKeys);
    },

    onTargetCheckedChange(val, movedKeys) {
      this.rightChecked = val;
      if (movedKeys === undefined) return;
      this.$emit('right-check-change', val, movedKeys);
    },

    addToLeft() {
      const currentValue = this.value.slice();
      this.rightChecked.forEach(item => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'left', this.rightChecked);
    },

    addToLeftTest() {
      const currentValue = this.middleValue.slice();
      this.middleChecked.forEach(item => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.$emit('middleValueChange', currentValue);
      this.$emit('change', currentValue, 'left', this.rightChecked);
    },

    addToRight() {
      let currentValue = this.value.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach(item => {
        const itemKey = item[key];
        if (
          this.leftChecked.indexOf(itemKey) > -1 &&
                        this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      currentValue = this.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved);
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    addToMiddle() {
      let currentValue = this.middleValue.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach(item => {
        const itemKey = item[key];
        if (
          this.leftChecked.indexOf(itemKey) > -1 &&
                        this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      currentValue = this.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved);
      this.$emit('middleValueChange', currentValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    addToRightTwo() {
      console.log(this.leftChecked);
      let currentValue = this.value.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach(item => {
        const itemKey = item[key];
        if (
          this.middleChecked.indexOf(itemKey) > -1 &&
                        this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      const middleValue = this.middleValue.slice();
      this.middleChecked.forEach(item => {
        const index = middleValue.indexOf(item);
        if (index > -1) {
          middleValue.splice(index, 1);
        }
      });
      currentValue = this.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved);
      this.$emit('input', currentValue);
      this.$emit('middleValueChange', middleValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    addToMiddleTwo() {
      let currentValue = this.middleValue.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach(item => {
        const itemKey = item[key];
        if (
          this.rightChecked.indexOf(itemKey) > -1 &&
                        this.middleValue.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      const rightValue = this.value.slice();
      this.rightChecked.forEach(item => {
        const index = rightValue.indexOf(item);
        if (index > -1) {
          rightValue.splice(index, 1);
        }
      });
      currentValue = this.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved);
      this.$emit('input', rightValue);
      this.$emit('middleValueChange', currentValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    clearQuery(which) {
      if (which === 'left') {
        this.$refs.leftPanel.query = '';
      } else if (which === 'right') {
        this.$refs.rightPanel.query = '';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .second {
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .operation {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .el-transfer__buttons {
        display: flex;
        flex-direction: row;
        .el-transfer__button {
          margin: 10px;
          span {
            display: flex;
            flex-direction: column;
            writing-mode:vertical-lr;
            .el-icon-arrow-up {
              padding-bottom: 5px;
            }
            .el-icon-arrow-down {
              padding-top:5px;
            }
          }
        }
      }
    }
  }
  .el-transfer__button {
    border-radius: 5px;
  }
  .second .second-operation-data {
    display: flex;
    justify-content: center;
  }

  /deep/ .el-transfer__buttons{
    padding:0 1%;
  }
  /deep/ .el-transfer-panel{
    width:25%;
  }
</style>
