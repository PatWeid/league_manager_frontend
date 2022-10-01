import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/user/';
class TeamService {
    getTeam(id) {
        return axios.get(API_URL + id + '/team', { headers: authHeader() });
    }
    createTeam(id, team) {
        return axios.post(API_URL + id + '/team', team, { headers: authHeader() });
    }
    deleteTeam(id) {
        console.log('delete');
        return axios.delete(API_URL + id + '/team', { headers: authHeader() });
    }
    updateTeam(id, team) {
        return axios.put(API_URL + id + '/team', team, { headers: authHeader() });
    }
}
export default new TeamService();