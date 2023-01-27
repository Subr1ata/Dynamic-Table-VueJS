import { ref } from "vue";
import axios from 'axios'

export default function useUomNameAPI() {
    const url = "http://localhost:8000/api/uom"
    const uomData = ref([])
    const uomError = ref(null)
    // Get All PartyName Data
    const getAllUomNames = async () => {
        uomData.value = []
        uomError.value = null
        try {
            const res = await axios(url)
            uomData.value = res.data
        } catch (err) {
            uomError.value = err;
        }
    }

    return {
        uomData,
        uomError,
        getAllUomNames
    }
}