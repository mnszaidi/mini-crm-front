<template>
  <MDBModal
    id="exampleModal"
    tabindex="-1"
    labelledby="exampleModalLabel"
    v-model="exampleModal"
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel">Add Employee</MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <MDBInput label="First Name" class="mb-3" v-model="first_name"/>
      <MDBInput label="Last Name" class="mb-3" v-model="last_name"/>
      <MultiSelect
        v-model="company"
        :options="companies"
        valueProp="id"
        label="name"
        placeholder="Company"
        class="mb-3 w-100 custom-select"
      ></MultiSelect>
      <MDBInput label="Email" class="mb-3" v-model="email"/>
      <MDBInput label="Phone" class="mb-3" v-model="phone"/>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" v-on:click="setHidden()">Close</MDBBtn>
      <MDBBtn color="primary" v-on:click="updateEmployee()">Save</MDBBtn>
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
import MultiSelect from '@vueform/multiselect';

// import Service
import ApiService from '../../Services/ApiService';

// import Constants
import Constants from '../../Config/Constants';

export default {
  name: 'EditEmployeeModal',
  props: ['visible', 'employee'],
  components: {
    MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput,
    MultiSelect
  },
  mounted() {
    this.retrieveAllCompanies()
  },
  setup(props) {
    const exampleModal = ref(props.visible);
    return {
      exampleModal
    }
  },
  data() {
    return {
      employee_id: "",
      first_name: "",
      last_name: "",
      company: "",
      email: "",
      phone: "",

      companies: []
    }
  },
  watch: {
    visible: function(newVal) {
      this.exampleModal = newVal;
    },
    exampleModal: function(newVal) {
      if (!newVal) this.$emit('close', false);
    },
    employee: function(newVal) {
      this.employee_id = newVal.id;
      this.first_name = newVal.first_name;
      this.last_name = newVal.last_name;
      this.company = newVal.company.id;
      this.email = newVal.email;
      this.phone = newVal.phone;
    },
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
     * Retrieve All Employees
     */
    retrieveAllCompanies: function() {
      ApiService
        .getAuthorizedRequest(Constants.API_URL + '/admin/company/all')
        .then(
          (result) => {
            this.companies = result.data.companies;
          }
        )
    },
    /**
     * Add Employee
     */
    updateEmployee() {
      const payload = {
        first_name: this.first_name,
        last_name: this.last_name,
        company: this.company,
        email: this.email,
        phone: this.phone
      };

      ApiService
        .patchAuthorizedRequest(Constants.API_URL + '/admin/employee/' + this.employee_id, payload)
        .then(
          () => {
            this.formatData();
            this.$emit('updated');
          }
        )
        .catch(error => console.log(error));
    },
    /**
     * Reset FormData
     */
    formatData() {
      this.first_name = "";
      this.last_name = "";
      this.company = "";
      this.email = "";
      this.phone = "";
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
  .custom-select .vue-input{
    padding: 0.33rem 0.75rem !important;
  }
  .custom-select .vue-input input {
    font-size: 1rem !important;
  }
</style>