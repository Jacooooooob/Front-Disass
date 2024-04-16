import axios from 'axios';

<template>
  <div id="app" class="app-container">
    <h1>AI Disassembler</h1>
    <file-upload @file-uploaded="handleFileUpload"></file-upload>
    <disassembly-process :progress="progress" :log="log"></disassembly-process>
    <disassembly-results :fileUrl="resultFileUrl" :results="disassemblyResults"></disassembly-results>
  </div>
</template>

<script>
// import axios from "axios";
import FileUpload from './components/FileUpload.vue';
import DisassemblyProcess from './components/DisassemblyProcess.vue';
import DisassemblyResults from './components/DisassemblyResults.vue';

export default {
  components: {
    FileUpload,
    DisassemblyProcess,
    DisassemblyResults
  },
  data() {
    return {
      progress: 0,
      log: '',
      resultFileUrl: '',
      disassemblyResults: ''
    };
  },
  methods: {
    // 在这个方法中添加Axios请求
    handleFileUpload(file) {
      // 创建FormData对象并添加文件
      let formData = new FormData();
      formData.append('file', file);

      // Axios上传文件到后端，并监听进度
      axios.post('/api/disassemble', formData, {
        onUploadProgress: progressEvent => {
          this.progress = (progressEvent.loaded / progressEvent.total) * 100;
        }
      })
          .then(response => {
            // 处理成功响应，提取下载链接和结果预览
            this.resultFileUrl = response.data.downloadUrl;
            this.disassemblyResults = response.data.preview;
          })
          .catch(error => {
            // 处理错误情况
            console.error('Upload failed:', error);
          });
    }
  }
};
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
