<template>
  <div class="login_panel p-absolute p-center">
    <MDBCard>
      <div>
        <img
          src="../../assets/logo.png"
          alt="..."
          class="img"
        />
      </div>
      <MDBCardBody>
        <MDBCardTitle>Login</MDBCardTitle>
        <MDBInput
          label="Email"
          class="mb-3"
          v-model="email"
        />
        <MDBInput
          label="Password"
          type="password"
          class="mb-3"
          v-model="password"
        />
        <div class="d-flex justify-content-around">
          <router-link to="/signup">
            <MDBBtn color="info">
              Signup
            </MDBBtn>
          </router-link>
          <MDBBtn
            color="primary"
            type
            v-on:click="onLogin()"
          >
            Login
          </MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script>
  // import MDB Components
  import { MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from "mdb-vue-ui-kit";

  // import service
  import ApiService from '../../Services/ApiService';

  // import constants
  import Constants from "../../Config/Constants";

  export default {
    name: 'Login',
    components: {
      MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn
    },
    data() {
      return {
        email: "",
        password: "",
      }
    },
    methods: {
      /**
       * Check if the email and password are validated
       */
      onLogin: function() {
        const payload = {
          email: this.email,
          password: this.password
        }

        // Check if the payload is true : API Integration
        ApiService
          .postRequest(Constants.API_URL + "/auth/login", payload)
          .then(result => {
            localStorage.setItem("access_token", result.data.access_token);
            this.$router.push('/company');
          });
      }
    }
  }
</script>

<style scoped>
  .login_panel {
    width: 500px;
    height: 300px;
  }
  .img {
    width: 30%;
    padding: 1rem;
    text-align: center;
  }
</style>