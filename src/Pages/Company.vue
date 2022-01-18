<template>
  <div class="d-flex justify-content-end">
    <MDBBtn
      tag="a"
      color="primary"
      href="#!"
      style="background-color: rgb(85, 172, 238);"
      v-on:click="addCompany()"
      class="mb-3"
    >
      Add
    </MDBBtn>
  </div>
  <MDBTable hover striped border class="company_table">
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Logo</th>
        <th>Website</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody v-if="companies.length === 0">
      <tr>
        <td colspan="6">No Records</td>
      </tr>
    </tbody>
    <tbody v-if="companies.length !== 0">
      <tr v-for="(company, index) in companies" v-bind:key="index">
        <td>{{index + 1}}</td>
        <td>{{company.name}}</td>
        <td>{{company.email}}</td>
        <td>
          <img
            v-bind:src="getLogoPath(company.logo)"
            class="logo_img"
          />
        </td>
        <td>{{company.website}}</td>
        <td>
          <MDBBtn color="info" floating v-on:click="onEditCompany(index)">
            <MDBIcon icon="magic"></MDBIcon>
          </MDBBtn>
          <MDBBtn color="danger" floating v-on:click="onDeleteCompany(company.id)">
            <MDBIcon iconStyle="fab" icon="apple"></MDBIcon>
          </MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>
  <div class="d-flex justify-content-end">
    <Pagination
      v-model="pagination.page"
      :records="pagination.records"
      :per-page="10"
      @paginate="onPaginate"
    ></Pagination>
  </div>

  <!-- AddCompanyModal -->
  <AddCompanyModal
    :visible="addModalVisible"
    v-on:close="onAddCompanyModalClose()"
    v-on:added="onCompanyAdded()"
  ></AddCompanyModal>
  <!-- AddCompanyModal -->

  <!-- EditCompanyModal -->
  <EditCompanyModal
    :visible="editModalVisible"
    :company="editCompanyDetail"
    v-on:close="onEditCompanyModalClose()"
    v-on:updated="onCompanyUpdated()"
  ></EditCompanyModal>
  <!-- EditCompanyModal -->
</template>
<script>
  // import MDB Components
  import {
    MDBTable, MDBBtn, MDBIcon
  } from 'mdb-vue-ui-kit';

  // import Components
  import AddCompanyModal from '../Components/Company/addModal.vue';
  import EditCompanyModal from '../Components/Company/editModal.vue';
  import Pagination from "v-pagination-3";

  // import Service
  import ApiService from '../Services/ApiService';

  // import Constants
  import Constants from '../Config/Constants';

  export default {
    name: 'Company',
    components: {
      MDBTable, MDBBtn, MDBIcon,
      AddCompanyModal, EditCompanyModal, Pagination
    },
    data() {
      return {
        companies: [],
        pagination: {
          page: 1,
          records: 0
        },
        addModalVisible: false,
        editModalVisible: false,
        editCompanyDetail: null,
      }
    },
    mounted() {
      this.retrieveCompanyies()
    },
    methods: {
      /**
       * Retrive Companies Array by pagination
       */
      retrieveCompanyies() {
        ApiService
          .getAuthorizedRequest(Constants.API_URL + '/admin/company?page=' + this.pagination.page)
          .then(
            result => {
              this.pagination.records = result.data.companies.total;
              this.pagination.page = result.data.companies.current_page;
              this.companies = result.data.companies.data;
            }
          )
          .catch(error => console.log(error));
      },
      /**
       * Show Add Company Modal
       */
      addCompany() {
        this.addModalVisible = true;
      },
      /**
       * Close Add Company Modal
       */
      onAddCompanyModalClose() {
        this.addModalVisible = false;
      },
      /**
       * Callback function when pagination changed
       */
      onPaginate() {
        this.retrieveCompanyies();
      },
      /**
       * Refresh Company List because of adding new company
       */
      onCompanyAdded() {
        this.addModalVisible = false;
        this.pagination.page = 1;
        this.retrieveCompanyies();
      },
      /**
       * Get Logo Path that is located in Laravel Public Folder
       */
      getLogoPath(path) {
        console.log(path);
        return Constants.PUBLIC_URL + path;
      },
      /**
       * Show Edit Company Modal
       */
      onEditCompany(index) {
        this.editModalVisible = true;
        this.editCompanyDetail = this.companies[index];
      },
      /**
       * Close Edit Company Modal
       */
      onEditCompanyModalClose() {
        this.editModalVisible = false;
      },
      /**
       * Delete Company By Id
       */
      onDeleteCompany(id) {
        ApiService
          .deleteAuhorizedRequest(Constants.API_URL + '/admin/company/' + id)
          .then(
            () => 
            {
              this.pagination.page = 1;
              this.retrieveCompanyies();
            }
          );
      }
    },
  }
</script>

<style scoped>
  .logo_img {
    width: 70px;
    height: 70px;
    border-radius: 0.5rem;
  }
  .company_table thead tr th {
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
  }
  .company_table tbody tr td {
    text-align: center;
    vertical-align: middle;
  }
</style>