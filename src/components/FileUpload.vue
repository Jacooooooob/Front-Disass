<template>
  <div class="card file-upload">
    <h2>Upload File</h2>
    <input type="file" @change="handleFileUpload" ref="fileInput" hidden />
    <div class="drop-zone" @click="triggerFileInput" @drop.prevent="handleDrop" @dragover.prevent>
      Drop your binary file here or click to upload.
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.$emit('file-uploaded', file);
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      this.$emit('file-uploaded', file);
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
</style>
