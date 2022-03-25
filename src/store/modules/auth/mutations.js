export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    state.tokenExpiration = payload.tokenExpiration;
  },
  logout(state) {
    state.userId = null;
    state.token = null;
    state.tokenExpiration = null;
  },
};
