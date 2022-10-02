import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/league/';
class GameDayService {
    getGameDay(number) {
        return axios.get(API_URL + 'gameday/' + number, { headers: authHeader() });
    }
}
export default new GameDayService();