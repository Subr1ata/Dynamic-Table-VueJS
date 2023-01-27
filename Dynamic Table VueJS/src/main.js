import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import addNewForm from "./components/addNewForm.vue"
import view from "./components/viewInvoiceData.vue"

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const routes = [
    {path: '/', component: addNewForm},
    {path: '/view', component: view},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

const app = createApp(App)
app.use(router);
app.mount('#app')
