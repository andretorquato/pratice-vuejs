let timer;

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
    
    const expirationIn = +data.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expirationIn;
    
    setTimeout(() => {
      context.dispatch('autoLogout');
    }, expirationIn);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId
    });
  },
  login(context, payload) {
    clearTimeout(timer);
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    context.commit('logout');
  },
  tryLogin(context){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    const expireIn = +tokenExpiration - new Date().getTime();
    if(expireIn < 0){
      context.dispatch('logout');
      return;
    }

    setTimeout(() => {
      context.dispatch('autoLogout');
    }, expireIn);
    if(!token || !userId){
      return;
    }
    context.commit('setUser', {
      token,
      userId,
    });
  },
  autoLogout(context){
    context.commit('logout');
    context.commit('autoLogout');
  }
};
