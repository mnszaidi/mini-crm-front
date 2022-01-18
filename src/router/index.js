import { createWebHistory, createRouter } from 'vue-router';
import Login from "../Layout/AuthLayout/Login.vue";
import Signup from "../Layout/AuthLayout/Signup.vue";
import Company from "../Pages/Company.vue";
import Employee from "../Pages/Employee.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {layout: 'AuthLayout'}
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {layout: 'AuthLayout'}
  },
  {
    path: '/company',
    name: 'Company',
    component: Company,
    meta: {layout: 'AdminLayout'}
  },
  {
    path: '/employee',
    name: 'Employee',
    component: Employee,
    meta: {layout: 'AdminLayout'}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;