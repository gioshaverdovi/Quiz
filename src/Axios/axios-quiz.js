import axios from "axios";

export default axios.create({
    baseURL: 'https://myquiz-76b90-default-rtdb.europe-west1.firebasedatabase.app/'
})