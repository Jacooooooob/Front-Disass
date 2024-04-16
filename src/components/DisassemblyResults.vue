<template>
  <div class="card disassembly-results">
    <h2>Results</h2>
    <a :href="fileUrl" download="disassembly.txt" class="download-btn">Download Results</a>
    <textarea :value="results" readonly></textarea>
  </div>
</template>

<script>
export default {
  props: {
    fileUrl: String,
    results: String
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

/* 由于使用了scoped，h2和.download-btn的样式需要在这里重复 */
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
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: #0c5cc7;
}

textarea {
  width: 97%;
  height: 300px;
  margin-top: 10px;
}
</style>
