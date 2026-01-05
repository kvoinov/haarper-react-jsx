import Axios from "axios";

const contactAPI = {
  sendForm: async (data) =>
    await Axios.post(`${window.API_URL}/sendContact.php`, data),
};

export default contactAPI;
