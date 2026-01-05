import Axios from "axios";
import { format, parseISO } from "date-fns";

const eventAPI = {
  fetchAll: async () => {
    const response = await Axios.get(`${window.API_URL}/events/get.php`);

    const transformedData = response.data.map((event) => ({
      id: event.e_id,
      title: event.event_name,
      img: event.event_image,
      par: event.event_short_desc,
      description: event.event_long_desc,
      price: event.event_price,
      duration: event.event_duration,
      date: format(parseISO(event.event_date), "d MMMM yyyy 'at' HH:mm"),
      slug: event.e_slug,
    }));

    return transformedData;
  },

  fetchOne: async (slug) => {
    const response = await Axios.get(
      `${window.API_URL}/events/get.php?slug=${slug}`
    );

    console.log(slug);

    const event = response.data[0];

    const transformedEvent = {
      id: event.e_id,
      title: event.event_name,
      img: event.event_image,
      description: event.event_long_desc,
      price: event.event_price,
      duration: event.event_duration,
      date: format(parseISO(event.event_date), "d MMMM yyyy 'at' HH:mm"),
      slug: event.e_slug,
      short_desc: event.event_short_desc,
    };

    return transformedEvent;
  },

  registerEvent: async (data) =>
    await Axios.post(`${window.API_URL}/events/register.php`, data),
};

export default eventAPI;
