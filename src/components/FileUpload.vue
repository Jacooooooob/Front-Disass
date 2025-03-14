<template>
  <div class="card file-upload">
    <h2>Upload File</h2>
    <input type="file" @change="handleFileUpload" ref="fileInput" hidden />
    <div class="drop-zone" @click="triggerFileInput" @drop.prevent="handleDrop" @dragover.prevent>
      Drop your binary file here or click to upload.
    </div>
    <!-- Display upload progress or upload status information -->
    <div v-if="isUploading" class="uploading-info">
      Uploading... {{ uploadProgress }}%
    </div>
    <div v-else-if="uploadStatus" class="upload-status">
      {{ uploadStatus }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isUploading: false,
      uploadProgress: 0,
      uploadStatus: ''
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadFile(file);
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.uploadFile(file);
      }
    },
    uploadFile(file) {
      this.isUploading = true;
      this.uploadProgress = 0;
      this.uploadStatus = '';

      const formData = new FormData();
      formData.append('file', file);

      // Use axios to upload the file and monitor the upload progress
      axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      })
          .then(response => {
            this.uploadStatus = 'Upload successful.';
            this.isUploading = false;
            // Emit event, may need to pass server response or file info to parent component
            this.$emit('file-uploaded', response.data);
          })
          .catch(error => {
            this.uploadStatus = 'Upload failed.';
            this.isUploading = false;
            console.error('There was an error uploading the file', error);
          });
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  text-align: center;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 1.5rem;
  color: #1a73e8;
  margin-bottom: 1rem;
  font-weight: 500;
}

.drop-zone {
  border: 2px dashed #d3d3d3;
  border-radius: 5px;
  padding: 30px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.drop-zone:hover {
  border-color: #1a73e8;
}

.uploading-info, .upload-status {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.uploading-info {
  color: #017CFF;
}

.upload-status {
  color: #28a745;
  /* Or if the upload failed, you can set it to red */
  /* color: #dc3545; */
}
</style>
