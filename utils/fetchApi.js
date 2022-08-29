import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com"

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'X-RapidAPI-Host': "bayut.p.rapidapi.com",
            'X-RapidAPI-Key': '764196f294msh4776893867596ebp1f0234jsn84316982ecc3',
        }
    })

    return data
}

