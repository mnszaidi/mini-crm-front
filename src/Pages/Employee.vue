<template>
  <div class="d-flex justify-content-end">
    <MDBBtn
      tag="a"
      color="primary"
      href="#!"
      style="background-color: rgb(85, 172, 238);"
      v-on:click="addEmployee()"
      class="mb-3"
    >
      Add
    </MDBBtn>
  </div>
  <MDBTable hover striped border class="employee_table">
    <thead>
      <tr>
        <th>No</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Company</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody v-if="employees.length === 0">
      <tr>
        <td colspan="7">No Records</td>
      </tr>
    </tbody>
    <tbody v-if="employees.length !== 0">
      <tr v-for="(employee, index) in employees" v-bind:key="index">
        <td>{{index + 1}}</td>
        <td>{{employee.first_name}}</td>
        <td>{{employee.last_name}}</td>
        <td>{{employee.companies ? employee.companies.name : ''}}</td>
        <td>{{employee.email}}</td>
        <td>{{employee.phone}}</td>
        <td>
          <MDBBtn color="info" floating v-on:click="onEditEmployee(index)">
            <MDBIcon icon="magic"></MDBIcon>
          </MDBBtn>
          <MDBBtn color="danger" floating v-on:click="onDeleteEmployee(employee.id)">
            <MDBIcon iconStyle="fab" icon="apple"></MDBIcon>
          </MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>

  <!-- Employee Pagination -->
  <div class="d-flex justify-content-end">
    <Pagination
      v-model="pagination.page"
      :records="pagination.records"
      :per-page="10"
      @paginate="onPaginate"
    ></Pagination>
  </div>
  <!-- Employee Pagination -->

  <!-- Add Employe Modal -->
  <AddEmployeeModal
    :visible="addModalVisible"
    v-on:close="onAddEmployeeModalClose()"
    v-on:added="onEmployeeAdded()"
  ></AddEmployeeModal>
  <!-- Add Employee Modal -->

  <!-- Edit Employee Modal -->
  <EditEmployeeModal
    :visible="editModalVisible"
    :employee="editEmployeeDetail"
    v-on:close="onEditEmployeeModalClose()"
    v-on:updated="onEmployeeUpdated()"
  ></EditEmployeeModal>
  <!-- Edit Employee Modal -->
</template>

<script>
import { MDBBtn, MDBTable, MDBIcon } from 'mdb-vue-ui-kit';
import Pagination from 'v-pagination-3';

// import custom component
import AddEmployeeModal from '../Components/Employee/addModal.vue';
import EditEmployeeModal from '../Components/Employee/editModal.vue';

// import Service
import ApiService from '../Services/ApiService';

// import Constants
import Constants from '../Config/Constants';

export default {
  name: 'Employee',
  components: {
    MDBBtn, MDBTable, MDBIcon,
    Pagination, AddEmployeeModal, EditEmployeeModal
  },
  mounted() {
    this.retrieveEmployees();
  },
  data() {
    return {
      employees: [],
      pagination: {
        page: 1,
        records: 0
      },
      addModalVisible: false,
      editModalVisible: false,
      editEmployeeDetail: null,
    }
  },
  methods: {
    /**
     * Retrieve Employees By Pagination
     */
    retrieveEmployees() {
      ApiService
        .getAuthorizedRequest(Constants.API_URL + '/admin/employee?page=' + this.pagination.page)
        .then(
          result => {
            this.pagination.records = result.data.employees.total;
            this.pagination.page = result.data.employees.current_page;
            this.employees = result.data.employees.data;
          }
        )
        .catch(error => console.log(error));
    },
    /**
     * Show Add Employee Modal
     */
    addEmployee() {
      this.addModalVisible = true;
    },
    /**
     * Close Add Employee Modal
     */
    onAddEmployeeModalClose() {
      this.addModalVisible = false;
    },
    /**
     * Refresh Employee List because of adding new employee
     */
    onCompanyAdded() {
      this.addModalVisible = false;
      this.pagination.page = 1;
      // this.retrieveCompanyies();
    },
    /**
     * Retrieve Employees by pagination
     */
    onPaginate() {
      this.retrieveEmployees();
    },
    /**
     * Edit Employee by index
     */
    onEditEmployee(index) {
      this.editModalVisible = true;
      this.editEmployeeDetail = this.employees[index];
    },
    /**
     * Delete Employee by id
     */
    onDeleteEmployee(id) {
      ApiService
        .deleteAuhorizedRequest(Constants.API_URL + '/admin/employee/' + id)
        .then(
          () => 
          {
            this.pagination.page = 1;
            this.retrieveEmployees();
          }
        );
    },
    /**
     * Confirm after employee add finish.
     * Retrieve Employee list by pagination.
     * Reset current page to 1
     */
    onEmployeeAdded() {
      this.addModalVisible = false;
      this.pagination.page = 1;
      this.retrieveEmployees();
    },
    /**
     * Set Edit Modal Hidden
     */
    onEditEmployeeModalClose() {
      this.editModalVisible = false;
    },
    /**
     * 
     */
    onEmployeeUpdated() {
      this.pagination.page = 1;
      this.editModalVisible = false;
      this.retrieveEmployees();
    }
  }
}

</script>

<style scoped>
  .logo_img {
    width: 70px;
    height: 70px;
    border-radius: 0.5rem;
  }
  .employee_table thead tr th {
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
  }
  .employee_table tbody tr td {
    text-align: center;
    vertical-align: middle;
  }
</style>