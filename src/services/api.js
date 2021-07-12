import axios from "axios";
import { Pixabay } from "../constants/Pixabay";

axios.defaults.baseURL = Pixabay.BASE_URL;

export class Api {
  static async getImages(searchQuery, page) {
    const params = `?q=${searchQuery}&page=${page}&key=${Pixabay.KEY}&image_type=photo&orientation=horizontal&per_page=12
        `;
    const { data } = await axios.get(params);

    return data.hits;
  }
}
