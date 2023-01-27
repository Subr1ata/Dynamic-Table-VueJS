import { ref } from "vue";
import axios from 'axios'

export default function usePartyNameAPI() {
    const url = "http://localhost:8000/api/party"
    const data = ref([])
    const error = ref(null)
    // Get All PartyName Data
    const getAllPartyNames = async () => {
        data.value = []
        error.value = null
        try {
            const res = await axios(url)
            data.value = res.data
        } catch (err) {
            error.value = err;
        }
    }

    return {
        data,
        error,
        getAllPartyNames
    }
}