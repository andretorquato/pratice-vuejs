export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    state.didAutoLogout = false;
  },
  logout(state) {
    state.userId = null;
    state.token = null;
  },
  setDidAutoLogout(state) {
    state.didAutoLogout = true;
  }
};
