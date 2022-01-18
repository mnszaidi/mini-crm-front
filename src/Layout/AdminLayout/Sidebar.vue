<template>
  <div class="sidenav">
    <div class="logo">
      <span>MINI CRM</span>
    </div>
    <div class="side-content">
      <span
        class="nav-button"
        v-bind:class="selected === 'company' ? 'nav-button-selected' : ''"
        v-on:click="setSelected('company')"
      >
        Company
      </span>
      <span
        class="nav-button"
        v-bind:class="selected === 'employee' ? 'nav-button-selected' : ''"
        v-on:click="setSelected('employee')"
      >
        Employee
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      selected: this.$route.name.toLowerCase()
    }
  },
  methods: {
    setSelected(value) {
      this.selected = value;
      this.$router.push('/' + value);
    }
  }
}
</script>

<style scoped>
  .sidenav {
    width: 300px;
    height: 100vh;
    background: rgb(45, 44, 44);
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .logo {
    height: 60px;
    color: white;
    font-size: 2rem;
    -webkit-text-stroke-width: thick;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.05);
  }
  
  .logo span {
    position: relative;
    top: 4px;
  }

  .side-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .side-content .nav-button {
    color: white;
    padding: 0.7rem 1rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    transition: all .3s;
    font-weight: bold;
  }

  .side-content .nav-button:hover {
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all .3s;
  }

  .side-content .nav-button-selected {
    background: #39c0ed;
    color: #333;
    font-weight: bold;
    -webkit-text-stroke-width: medium;
  }
</style>