import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/league';
class LeagueService {
    createLeague(ids) {
        return axios.post(API_URL +'/create', ids,  { headers: authHeader() });
    }
    deleteLeague() {
        return axios.delete(API_URL + '/delete', { headers: authHeader() });
    }
}
export default new LeagueService();