export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
  },
  logout(state) {
    state.userId = null;
    state.token = null;
    state.didAutoLogout = false;
  },
  autoLogout(state) {
    state.didAutoLogout = true;
  }
};
