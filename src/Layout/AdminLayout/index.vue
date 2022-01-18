<template>
  <div class="d-flex">
    <Sidebar></Sidebar>
    <div class="d-flex right-panel">
      <Header></Header>
      <div class="main-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

export default {
  name: 'AdminLayout',
  components: {
    Header,
    Sidebar
  }
}
</script>

<style scoped>
  .right-panel {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }

  .main-container {
    padding: 2rem 1rem 1rem 1rem;
    flex-grow: 1;
    height: calc(100vh - 60px);
    overflow: auto;
  }
</style>