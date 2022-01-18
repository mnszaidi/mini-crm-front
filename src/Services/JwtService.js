import VueJwtDecode from 'vue-jwt-decode';

class JwtService {
  constructor() { }

  getJwtDecoded() {
    const jwt = VueJwtDecode.decode(localStorage.getItem('access_token'));
    
    // Check if jwt is experied
    if (jwt.exp > Math.floor(Date.now() / 1000)) return true;
    return false;
  }
}

export default new JwtService();