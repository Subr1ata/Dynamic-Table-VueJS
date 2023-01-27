<template>
  <div class="container" style="height: auto !important;">
    <div id="app" style="height: auto !important;">
      <main id="app" role="main" class="mt-4" style="height: auto !important;">
        <div class="row">
          <div class="col-md-2 mb-2">
              <button type='button' class="btn btn-info" @click="addNewRow">
                  <i class="fas fa-plus-circle"></i>
                  Add New
              </button>
          </div>
          <div class="col-md-2 mb-2">
              <button type='button' class="btn btn-danger" @click="addNewRow">
                  <i class="fas fa-times"></i>
                  Cancel
              </button>
          </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col text-right">Sr.No</th>
                                <th scope="col text-right">Invoice No</th>
                                <th scope="col text-right">Invoice Date</th>
                                <th scope="col text-right">Party Name</th>
                                <th scope="col text-right">Invoice Value</th>
                                <th scope="col text-right">User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in invoiceData" :key="index">
                                <td>
                                    {{ data.Sr_No }}
                                </td>
                                <td>
                                    {{ data.Invoice_No }}
                                </td>
                                <td>
                                    {{ data.Invoice_Date }}
                                </td>
                                <td>
                                    {{ data.PartyName }}
                                </td>
                                <td>
                                    {{ data.Invoice_Value }}
                                </td>
                                <td>
                                    {{data.User_Name}}
                                </td>
                            </tr>
                            <tr v-show="invoiceData.length === 0">
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
            <!-- <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">Total Amount</label>
                <div class="col-sm-2">
                    <input disabled class="form-control text-right" type="number" v-model="invoice_subtotal" id="inputPassword">
                </div>
            </div> -->
        </div>
      </main>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted } from 'vue';
import usegetInvoiceAPI from '../composables/getInvoiceData';
import { useRouter, useRoute } from 'vue-router'
const { invoiceData, invoiceError, getAllInvoiceData } = usegetInvoiceAPI();

const router = useRouter()
const route = useRoute()

function addNewRow(){
    router.push('/');
}

onMounted(getAllInvoiceData);
console.log(invoiceData);
</script>
  
<style>
  .col-md-2 {
    flex: 0 0 auto;
    width: 10.666667%;
}
</style>