export default {
  async auth(context, payload){
    const query = payload.query;
    const errorMessage = payload.errorMessage;
    const response = await fetch(`${process.env.VUE_APP_URL_AUTH_FIREBASE}/accounts:${query}?key=${process.env.VUE_APP_KEY_AUTH}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const data = await response.json();
    if (!response.ok){
      const error = new Error(data.message || errorMessage);
      throw error;
    } 
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
  login(context, payload) {
    context.dispatch('auth', {
      ...payload,
      query: 'signInWithPassword',
      errorMessage: 'Failed to login'
    });
  },
  signup(context, payload) {
    context.dispatch('auth', {
      ...payload,
      query: 'signUp',
      errorMessage: 'Failed to create new user'
    });
  },
  logout(context){
    context.commit('logout');
  },
  tryLogin(context){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if(!token || !userId){
      return;
    }
    context.commit('setUser', {
      token,
      userId,
    });
  }
};
