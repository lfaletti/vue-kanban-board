<template>
  <div id="app">
    <div class="page-header">
      <h1>Kanban Board</h1>
      <p class="lead">An example of a Kanban board, written in Vue.js</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
  .page-header h1 {
    font-weight: 300;
  }
  .card {
    margin-bottom: 10px;
  }
  .card:last-child {
    margin-bottom: 25px;
  }
  .card-block {
    padding: 15px;
  }
</style>
