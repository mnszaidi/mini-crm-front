<template>
  <div class="d-flex justify-content-center">
    <div class="img_div shadow">
      <img
        v-bind:src="previewImage"
        alt="..."
        class="img"
        v-if="previewImage !== ''"
      />
      <span class="p-absolute p-center" v-if="previewImage === ''">
        Upload Image here
      </span>
      <input
        ref="fileInput"
        type = "file"
        class="file"
        @input="pickFile()"
      />
    </div>
  </div>
</template>

<script>
  // import Constant
  import Constants from '../../Config/Constants';

  export default {
    name: "FileUpload",
    props: ['logo'],
    data() {
      return {
        previewImage: this.logo ? Constants.PUBLIC_URL + this.logo : ""
      }
    },
    watch: {
      logo: function(newVal) {
        this.previewImage = Constants.PUBLIC_URL + newVal;
      }
    },
    methods: {
      pickFile: function(){
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('imageSelected', file[0])
        }
      }
    }
  }
</script>

<style scoped>
  .shadow {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .img_div {
    position: relative;
    width: 200px;
    height: 200px;
    background: #f1f1f1;
  }

  .img {
    width: 200px;
    height: 200px;
  }

  .file {
    position: absolute;
    left: 0; right: 0; top: 0; bottom: 0;
    width: 100%; height: 100%;
    opacity: 0;
  }
</style>