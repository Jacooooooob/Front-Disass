<template>
  <div class="card combined-results">
    <h2>Disassembly Results</h2>
    <!-- Download Button -->
    <a :href="fileUrl" download="disassembly.txt" class="download-btn">
      Download Results
    </a>
    <!-- Progress Bar -->
    <progress max="100" :value="progress"></progress>
    <!-- Streamed Output Text Area -->
    <textarea :value="results" readonly></textarea>
  </div>
</template>

<script>
export default {
  props: {
    fileUrl: {
      type: String,
      default: ''
    },
    results: {
      type: String,
      default: ''
    },
    progress: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

h2 {
  font-size: 1.5rem;
  color: #1a73e8;
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;
}

.download-btn {
  display: inline-block;
  text-decoration: none;
  background-color: #1a73e8;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: #0c5cc7;
}

textarea {
  width: 97.3%;
  height: 150px; /* Or adjust the height as needed */
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  resize: vertical; /* Allow users to adjust the size of the text area */
  font-family: monospace;
  background-color: #f8f8f8;
}
</style>
