<template>
  <MDBModal
    id="exampleModal"
    tabindex="-1"
    labelledby="exampleModalLabel"
    v-model="exampleModal"
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel">Edit Company</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <FileUpload class="mb-3" @imageSelected="setSelectedLogo" :logo="logo"></FileUpload>
      <MDBInput label="Name" class="mb-3" v-model="name"/>
      <MDBInput label="Email" class="mb-3" v-model="email"/>
      <MDBInput label="Website" class="mb-3" v-model="website"/>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" v-on:click="setHidden()">Close</MDBBtn>
      <MDBBtn color="primary" v-on:click="editCompany()">Save</MDBBtn>
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
    name: 'EditCompanyModal',
    props: [ 'visible', 'company' ],
    components: {
      MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput,
      FileUpload
    },
    data() {
      return {
        company_id: "",
        name: "",
        email: "",
        logo: "",
        website: "",
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
      company: function(newVal) {
        this.company_id = newVal.id;
        this.name = newVal.name;
        this.email = newVal.email;
        this.logo = newVal.logo;
        this.website = newVal.website;
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
        this.$emit('close', false);
      },
      /**
       * Set Logo Image File from FileUpload Component
       */
      setSelectedLogo(value) {
        this.logo = value;
      },
      /**
       * Save company details and close modal
       */
      editCompany() {
        let formdata = new FormData();
        formdata.append('_method', 'PATCH');
        formdata.append('name', this.name);
        formdata.append('email', this.email);
        formdata.append('logo', this.logo);
        formdata.append('website', this.website);

        ApiService
          .postMultiPartAuthorizedRequest(Constants.API_URL + '/admin/company/' + this.company_id, formdata)
          .then(
            () => {
              this.$emit('updated');
            }
          )
          .catch(error => console.log(error));
      }
    }
  }
</script>