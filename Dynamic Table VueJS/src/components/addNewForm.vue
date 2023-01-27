<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios';
import usePartyNameAPI from '../composables/partyNameApi.js';
import useItemNameAPI from '../composables/itemNameApi.js';
import useUomNameAPI from '../composables/uomNameApi.js';

const { data, error, getAllPartyNames } = usePartyNameAPI();
const { values, err, getAllItemNames } = useItemNameAPI();
const { uomData, uomError, getAllUomNames } = useUomNameAPI();

let invoice_products = reactive([{
    product_name: '',
    units: '',
    product_price: '',
    product_qty: '',
    line_total: 0
}])

const emit = defineEmits(['inFocus', 'submit'])

const router = useRouter()
const route = useRoute()

let invoice_subtotal = 0;
let invoice_tax = 5;
let invoice_total = 0;
let selectedCity = "";
let dropdownItem = ref();
let totalamt = null;
let date = ref();


function calculateTotal() {
    var subtotal, total;
    subtotal = invoice_products.reduce(function (sum, product) {
        var lineTotal = parseFloat(product.line_total);
        if (!isNaN(lineTotal) && lineTotal!=undefined) {
            return sum + lineTotal;
        }
    }, 0);

    if(subtotal != undefined){
        invoice_subtotal = subtotal.toFixed(2);
    }


    total = (subtotal * (invoice_tax / 100)) + subtotal;
    total = parseFloat(total);
    if (!isNaN(total)) {
        invoice_total = total.toFixed(2);
    } else {
        invoice_total = '0.00';
    }

}

function calculateLineTotal(invoice_product) {
    var total = parseFloat(invoice_product.product_price) * parseFloat(invoice_product.product_qty);
    if (!isNaN(total)) {
        invoice_product.line_total = total.toFixed(2);
    }

    calculateTotal();
}

function addNewRow() {
    invoice_products.push({
        product_name: '',
        units: '',
        product_price: '',
        product_qty: '',
        line_total: 0
    });
}

function deleteRow(index, invoice_product) {
    var idx = invoice_products.indexOf(invoice_product);
    if (idx > -1) {
        invoice_products.splice(idx, 1);
    }
    calculateTotal();
}

const hit = () => {
    let len = invoice_products.length;
    let data = JSON.stringify(invoice_products[len-1])
    let newData = JSON.parse(data);
    if(newData.units && newData.product_name && newData.product_price && newData.product_qty){
        calculateLineTotal(invoice_products[len-1]);
    }
}

function cancel(){
    invoice_products = reactive([{
        product_name: '',
        units: '',
        product_price: '',
        product_qty: '',
        line_total: 0
    }])

    window.location.reload();

    invoice_subtotal = 0;
}
let id = 0;
let invoiceNo = 0;
let invoiceDate = "";
let User_Name = 1;

function saveInvoice(){
    let productName = invoice_products[invoice_products.length - 1].product_name;
    invoice_subtotal = parseInt(invoice_subtotal);
    
    let obj = {
        "Sr_No": id,
        "Invoice_No": invoiceNo,
        "Invoice_Date": invoiceDate,
        "PartyName": productName,
        "Invoice_Value": invoice_subtotal,
        "User_Name": 1
    }

    router.push('/view');
    axios.post("http://localhost:3000/post", obj);
}

onMounted(getAllPartyNames);
onMounted(getAllItemNames);
onMounted(getAllUomNames);
</script>

<template>
  <div class="container" style="height: auto !important;">
    <div id="app" style="height: auto !important;">
      <main id="app" role="main" class="mt-4" style="height: auto !important;">
        <form @submit.prevent="saveInvoice">
            <h5>Invoice</h5>
            <div class="row">
                <div class="col">
                    <label for="party">Party</label>
                    <select v-model="dropdownItem" class="form-select" id="party">
                        <option placeholder="---select-party---" v-for="(item, index) in data" :key="index">{{ item.PARTY_NAME }}</option>
                    </select>
                </div>
                <div class="col">
                    <label for="lastname2">Invoice No</label>
                    <input class="form-control" v-model="invoiceNo" type="text">
                </div>
                <div class="col">
                    <label for="lastname2">Invoice Date</label>
                    <input class="form-control" v-model="invoiceDate" type="datetime-local">
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Sr No.</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Units</th>
                                    <th scope="col text-right">Quantity</th>
                                    <th scope="col text-right">Rate</th>
                                    <th scope="col text-right">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(invoice_product, k) in invoice_products" :key="k">
                                    <td scope="row" class="trashIconContainer">
                                        <button class="delete" @click="deleteRow(k, invoice_product)">
                                          <i class="far fa-trash-alt"></i>
                                        </button>
                                    </td>
                                    <td class="count">
                                    </td>
                                    <td>
                                        <select v-model="invoice_product.product_name" class="form-select" id="productname">
                                            <option placeholder="---select-party---" v-for="(item, index) in values" :key="index">{{ item.ITEM_NAME }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select v-model="invoice_product.units" class="form-select" id="uomname">
                                            <option placeholder="---select-party---" v-for="(item, index) in uomData" :key="index">{{ item.UOM_NAME }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input class="form-control text-right" type="number" v-on:keydown.enter.prevent="hit" @keyup="hit" min="0" step=".01" v-model="invoice_product.product_qty" @change="calculateLineTotal(invoice_product)"
                                        />
                                    </td>
                                    <td>
                                        <input class="form-control text-right" type="number" v-on:keydown.enter.prevent="hit" @keyup="hit" min="0" step=".01" v-model="invoice_product.product_price" @change="calculateLineTotal(invoice_product)"
                                        />
                                    </td>
                                    <td>
                                        <input disabled class="form-control text-right" type="number" v-on:keydown.enter.prevent="hit" @keyup="hit" min="0" step=".01" v-model="invoice_product.line_total" />
                                    </td>
                                </tr>
                                <tr v-show="invoice_products.length === 0">
                                    <td colspan="6">
                                        <p class="text-center alert-danger p-2">
                                            No products added/available.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="col-md-12 mb-2">
                    <button type='button' class="btn btn-info" @click="addNewRow">
                        <i class="fas fa-plus-circle"></i>
                        Add
                    </button>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Total Amount</label>
                    <div class="col-sm-2">
                        <input disabled class="form-control text-right" type="number" v-model="invoice_subtotal" id="inputPassword">
                    </div>
                </div>
                <div class="col-md-10 mb-2 text-center">
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-success mr-1" style="margin-right:10px;" @click="saveInvoice" type="button"><i class="fa fa-paper-plane" aria-hidden="true"></i>Submit</button>
                        <button class="btn btn-primary close" @click="cancel" type="button" aria-label="Close"><i class="fa fa-times mr-1" aria-hidden="true"></i>Cancel</button>
                    </div>
                </div>
            </div>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.svg-inline--fa{
    margin-right: 5px;
}

table {
  counter-reset: section;
}
.count:before {
  counter-increment: section;
  content: counter(section);
}

.submit_btn[data-v-7a7a37b1] {
    font-size: 1.2rem;
    height: 60px;
    margin-top: -98px;
    padding: 12px;
}

button.delete {
  background: transparent;
  border: transparent;
  color: red;
  padding-left: 0px;
}

body{
    font-family: 'Raleway', sans-serif;
    font-size: 16px;
    font-weight: 300;
    padding: 0px;
}
.main-title{
    font-weight: 500;
}
.trashIconContainer {
    vertical-align: middle !important;
    padding-top: 10px;
    text-align: center;
}

.trashIconContainer i {
    color: #e74c3c;
}

.btn-success, .panel-success {
    background-color: #27c24c !important;
    border-color: #27c24c !important;
    color: #fff !important;
}
.submit_btn {
    min-width: 10px;
    max-width: 100px;
    font-size: 1.2rem;
    height: 60px;
    margin-top: 20px;
    padding: 20px;
}
.submit_btn i{
    padding-right:10px;
}

@media (min-width: 768px) {
    .invoice-save-bottom {
        min-width: 400px;
    }
    .right-ads{
        float:left;
    }
    .left-ads{
        float:right;
    }
}
</style>
