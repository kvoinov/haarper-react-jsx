import Axios from "axios";

const contactAPI = {
  sendForm: async (data) =>
    await Axios.post(`https://haarper.pt/api/sendContact.php`, data),
};

export default contactAPI;
