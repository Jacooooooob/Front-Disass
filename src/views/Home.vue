<template>
  <div class="home">
    <!-- File Upload Section -->
    <file-upload @file-uploaded="startDisassembly" />

    <!-- Disassembly Process Display Section -->
    <disassembly-process v-if="isDisassembling" :progress="progress" :log="disassemblyLog" />

    <!-- Disassembly Results Display Section -->
    <disassembly-results v-if="disassemblyComplete" :resultFileUrl="resultFileUrl" :results="disassemblyResults" />
  </div>
</template>

<script>
import axios from 'axios';
import FileUpload from '@/components/FileUpload.vue';
import DisassemblyResults from '@/components/DisassemblyResults.vue';

export default {
  components: {
    FileUpload,
    DisassemblyResults
  },
  data() {
    return {
      isDisassembling: false,
      disassemblyComplete: false,
      progress: 0,
      disassemblyLog: '',
      resultFileUrl: '',
      disassemblyResults: ''
    };
  },
  methods: {
    startDisassembly(file) {
      this.isDisassembling = true;
      this.disassemblyComplete = false;
      this.progress = 0;
      this.disassemblyLog = 'Starting disassembly...';

      const formData = new FormData();
      formData.append('file', file);

      axios.post('/api/disassemble', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          this.progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          this.disassemblyLog = `Disassembly in progress: ${this.progress}%`;
        }
      })
          .then(response => {
            // Assuming the API response contains a URL to download the results
            // and the textual results for preview
            this.resultFileUrl = response.data.downloadUrl;
            this.disassemblyResults = response.data.preview;
            this.disassemblyLog += '\nDisassembly complete!';
            this.isDisassembling = false;
            this.disassemblyComplete = true;
          })
          .catch(error => {
            this.disassemblyLog += `\nAn error occurred: ${error.message}`;
            this.isDisassembling = false;
          });
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 50px auto;
}
</style>
