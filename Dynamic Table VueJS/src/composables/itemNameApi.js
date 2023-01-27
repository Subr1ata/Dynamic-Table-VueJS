import { ref } from "vue";
import axios from 'axios'

export default function useItemNameAPI() {
    const url = "http://localhost:8000/api/item"
    const values = ref([])
    const err = ref(null)
    // Get All PartyName Data
    const getAllItemNames = async () => {
        values.value = []
        err.value = null
        try {
            const res = await axios(url)
            values.value = res.data
        } catch (err) {
            err.value = err;
        }
    }

    return {
        values,
        err,
        getAllItemNames
    }
}