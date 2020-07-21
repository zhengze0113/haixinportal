<template>
  <div class="tinymce">
    <editor v-model="myValue" :init="init" class="tinymce" />
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import { addUploadImg } from "@/api/serviceOperatingcms";

export default {
  name: "Tinymce",
  components: { Editor },
  props: ["content"],
  data() {
    return {
      init: {
        selector: ".tinymce",
        language_url: "web/static/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "web/static/tinymce/skins/lightgray",
        height: 300,
        plugins:
          "link lists image code table colorpicker textcolor wordcount contextmenu",
        toolbar:
          "undo redo | fontselect |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat",

        branding: false,
        font_formats:
          "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          this.handleImgUpload(blobInfo, success, failure);
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        }
      },
      myValue: this.content
    };
  },
  watch: {
    docContent(val) {
      if (val.length > 0) {
        // this.content = val;
        this.$emit("change", val);
      }
    },
    myValue(newValue) {
      this.$emit("upchange", this.newValue);
      // this.myValue = newValue
    },
     content(newValue) {
      this.myValue = newValue
    }
  },
  mounted() {
    this.myValue=this.content
    tinymce.init({});
  },
  
  methods: {
    getDoContent() {
      return this.myValue;
    },
    handleImgUpload(blobInfo, success, failure) {
      const formdata = new FormData();
      formdata.set("files", blobInfo.blob());

      const img = "data:image/jpeg;base64," + blobInfo.base64();
      addUploadImg(formdata)
        .then(res => {
          success(res[0].url);
        })
        .catch(res => {
          failure("error");
        });
    },
  }
};
</script>
