import jwtDecode from 'jwt-decode';
import store from '../../redux/store';

class AuthService {
  constructor() {
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.getUserSession = this.getUserSession.bind(this);
  }

  getUserSession() {
    const { getState } = store;
    const { app } = getState();
    return app.session;
  }

  isLoggedIn() {
    const token = this.getUserSession();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const sessionTimeExp = decoded.exp;
        return sessionTimeExp > new Date().getTime() / 1000;
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}

export default new AuthService();
