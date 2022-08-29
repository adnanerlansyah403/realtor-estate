import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com"

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Host': "bayut.p.rapidapi.com",
            'X-RapidAPI-Key': '8cf0c0d59emshe7d36cf5066a5a4p177024jsn79d0cda3ac83',
        }
    })

    return data
}

