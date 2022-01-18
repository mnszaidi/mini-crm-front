<template>
  <div class="signup_panel p-absolute p-center">
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
          label="Name"
          class="mb-3"
          v-model="name"
        />
        <MDBInput
          label="Email"
          class="mb-3"
          v-model="email"
        />
        <MDBInput
          label="Password"
          class="mb-3"
          type="password"
          v-model="password"
        />
        <MDBInput
          label="Confirm Password"
          type="password"
          class="mb-3"
          v-model="confirm"
        />
        <div class="d-flex justify-content-around">
          <router-link to="/">
            <MDBBtn color="info">to Login</MDBBtn>
          </router-link>
          <MDBBtn
            color="primary"
            v-on:click="signup()"
          >Submit</MDBBtn>
        </div>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script>
  // import MDB components
  import { MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdb-vue-ui-kit';

  // import service
  import ApiService from '../../Services/ApiService';

  // import constants
  import Constants from "../../Config/Constants";
  
  export default {
    name: "Signup",
    components: {
      MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn
    },
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirm: "",
      }
    },
    methods: {
      signup: function() {
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        // Check if the payload is true : API Integration
        try {
          ApiService
            .postRequest(Constants.API_URL + "/auth/signup", payload)
            .then(result => {
              console.log(result);
              this.$router.push('/');
            });
        } catch(exception) {
          console.log(exception);
        }
      }
    }
  }
</script>

<style scoped>
  .signup_panel {
    width: 500px;
    height: 300px;
  }
  .img {
    width: 30%;
    padding: 1rem;
    text-align: center;
  }
</style>