<template>
  <div>
    <el-upload
      action=""
      :http-request="fnUploadRequest"
      :show-file-list="true"
      :limit=1
      :on-exceed="beyondFile"
      :on-success="handleVideoSuccess"
      :before-upload="beforeUploadVideo"
    >
      <span class="buttomStyle">上传视频</span>
    </el-upload>
  </div>
</template>

<script>
import oss from '../../labs/aliOss.js'
export default {
  methods: {
    async fnUploadRequest(option) {
      console.log(option);
      oss.ossUploadFile(option)
    },
    // 视频上传
    beforeUploadVideo(file) {
      //todo
    },
    // 视频上传成功后
    handleVideoSuccess(response, file, fileList) {
      //todo
    },
    // 视频添加多个视频文件事件
    beyondFile(files, fileList) {
      //todo
    }
  }
}
</script>

<style>
</style>
