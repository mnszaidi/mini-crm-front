<template>
  <MDBModal
    id="exampleModal"
    tabindex="-1"
    labelledby="exampleModalLabel"
    v-model="exampleModal"
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel">Add Company</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <FileUpload class="mb-3" @imageSelected="setSelectedLogo"></FileUpload>
      <MDBInput label="Name" class="mb-3" v-model="name"/>
      <MDBInput label="Email" class="mb-3" v-model="email"/>
      <MDBInput label="Website" class="mb-3" v-model="website"/>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" v-on:click="setHidden()">Close</MDBBtn>
      <MDBBtn color="primary" v-on:click="addCompany()">Save</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
  // import MDB Components
  import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBInput
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';

  // import Custom Components
  import FileUpload from '../Common/FileUpload.vue';

  // import Service
  import ApiService from '../../Services/ApiService';
  // import Constants
  import Constants from '../../Config/Constants';

  export default {
    name: 'AddComanyModal',
    props: [ 'visible' ],
    components: {
      MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput,
      FileUpload
    },
    data() {
      return {
        name: "",
        email: "",
        website: "",
        logo: {}
      }
    },
    setup(props) {
      const exampleModal = ref(props.visible);
      return {
        exampleModal
      }
    },
    watch: {
      visible: function(newVal) {
        this.exampleModal = newVal;
      },
      exampleModal: function(newVal) {
        if (!newVal) this.$emit('close', false);
      }
    },
    methods: {
      /**
       * Hide Add Company Modal
       */
      setHidden: function() {
        this.formatData();
        this.$emit('close', false);
      },
      /**
       * Set Logo Image File from FileUpload Component
       */
      setSelectedLogo: function(value) {
        this.logo = value;
      },
      /**
       * Save company details and close modal
       */
      addCompany: function() {
        let formdata = new FormData();
        formdata.append('name', this.name);
        formdata.append('email', this.email);
        formdata.append('logo', this.logo);
        formdata.append('website', this.website);

        ApiService
          .postAuthorizedRequest(Constants.API_URL + '/admin/company', formdata)
          .then(
            () => {
              this.$emit('added');
            }
          )
          .catch(error => console.log(error));
      },
      /**
       * Reset Company Model
       */
      formData: function() {
        this.name = "";
        this.email = "";
        this.logo = "";
        this.website = "";
      }
    }
  }
</script>