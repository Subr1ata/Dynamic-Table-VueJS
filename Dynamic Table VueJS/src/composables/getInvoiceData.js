import { ref } from "vue";
import axios from 'axios'

export default function usegetInvoiceAPI() {
    const url = "http://localhost:3000/get"
    const invoiceData = ref([])
    const invoiceError = ref(null)
    // Get All PartyName Data
    const getAllInvoiceData = async () => {
        invoiceData.value = []
        invoiceError.value = null
        try {
            const res = await axios(url)
            invoiceData.value = res.data
        } catch (err) {
            invoiceError.value = err;
        }
    }

    return {
        invoiceData,
        invoiceError,
        getAllInvoiceData
    }
}