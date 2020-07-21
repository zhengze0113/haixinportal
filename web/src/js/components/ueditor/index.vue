<template>
  <div class="fatherCom">
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="handleEditorBlur($event)"
      @focus="handleEditorFocus($event)"
      @change="handleEditorChange($event)"
    />
    <el-upload
      :action="serverUrl"
      :data="fileUpload"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
      class="avatar-uploader"
      name="files"
    />
  </div>
</template>

<script>
import baseURL from '@/api/app.js';
export default {
  props: {
    docContent: {
      type: String,
      default: ''
    },
    heightNumber: {
      type: String,
      default: 100
    }
  },
  data() {
    return {
      fileUpload: {
        // 附件上传
      },

      content: '',
      serverUrl: baseURL.DATAURL + '/upload',
      editorOption: {
        placeholder: '',
        theme: 'snow',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ['link', 'image', 'video'],
              ['clean']
            ], // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector('.avatar-uploader input').click();
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      }
    };
  },
  watch: {
    docContent(val) {
      if (val.length > 0) {
        this.content = val;
      }
    }
  },
  created() {},
  mounted() {
    document.getElementsByClassName('quill-editor')[0].style.height =
      this.heightNumber + 'px';
    document.getElementsByClassName('fatherCom')[0].style.height =
      parseInt(this.heightNumber) + 60 + 'px';
    // this.$ref.father.style.height = this.heightNumber+ 60 + 'px';
    if (this.docContent.length > 0) {
      this.content = this.docContent;
    }
  },
  methods: {
    handleEditorBlur() {},
    handleEditorFocus() {},
    handleEditorChange() {},
    beforeUpload(file) {
      this.fileUpload.files = file;
      // 显示loading动画
    },
    uploadSuccess(res, file) {
      // 首先获取富文本编辑器的实例
      const quill = this.$refs.myQuillEditor.quill;
      // 上传成功所执行
      console.log(res[0]);
      if (res[0].id != '') {
        // 获取光标所在位置
        const length = quill.getSelection().index;
        // 插入图片res为服务器返回的数据
        const result = res[0].url.replace('localhost', '');
        quill.insertEmbed(length, 'image', result);
        // 光标移动至文本末端
        quill.setSelection(length + 1);
      } else {
        this.$message.error('图片插入失败');
      }
    },
    uploadError() {
      this.$message.error('图片插入失败');
    },
    getDoContent() {
      return this.content;
    }
  }
};
</script>

<style lang="scss" scoped></style>
