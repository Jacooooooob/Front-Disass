<template>
  <div class="card disassembly-process">
    <h2>Disassembly Progress</h2>
    <progress max="100" :value="progress"></progress>
    <textarea :value="log" readonly></textarea>
  </div>
</template>

<script>
export default {
  props: {
    progress: Number,
    log: String
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

/* 由于使用了scoped，h2的样式需要在这里重复 */
h2 {
  font-size: 1.5rem;
  color: #1a73e8;
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;
}

textarea {
  width: 97%;
  height: 150px;
  margin-top: 10px;
  padding: 10px;
  display: block; /* 块级元素会填满容器的宽度 */

}
</style>
