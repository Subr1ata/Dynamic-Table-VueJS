import { ref } from "vue";
import axios from 'axios'

export default function usePostAPI() {
    const url = "http://localhost:3000/post"
    const postValue = ref([])
    const postError = ref(null)
    // Get All PartyName Data
    const getAllPost = async () => {
        postValue.value = []
        postError.value = null
        try {
            const res = await axios(url, params)
            postValue.value = res.data
        } catch (err) {
            postError.value = err;
        }
    }

    return {
        postValue,
        postError,
        getAllPost
    }
}

