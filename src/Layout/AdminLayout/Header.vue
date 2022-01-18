<template>
  <div class="header">
    <MDBBtn color="dark" v-on:click="logout()">Logout</MDBBtn>
  </div>
</template>

<script>
  import { MDBBtn } from 'mdb-vue-ui-kit';

  export default {
    name: 'Header',
    components: {
      MDBBtn
    },
    methods: {
      /**
       * Remove Access Token from LocalStorage
       * Navigate to Login so that user can login again.
       */
      logout: function() {
        // remove access_token from localstorage
        localStorage.removeItem("access_token");
        // Navigate to Login
        this.$router.push('/');
      }
    }
  };
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0rem 1rem;
    height: 60px;
    background: white;
    width: 100%;
  }
</style>
