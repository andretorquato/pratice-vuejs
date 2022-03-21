export default {
  async login(context, payload) {
    const response = await fetch(`${process.env.VUE_APP_URL_AUTH_FIREBASE}/accounts:signInWithPassword?key=${process.env.VUE_APP_KEY_AUTH}`, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const data = await response.json();
    if (!response.ok){
      const error = new Error(data.message || 'Failed to login');
      throw error;
    }    
    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      `${process.env.VUE_APP_URL_AUTH_FIREBASE}/accounts:signUp?key=${process.env.VUE_APP_KEY_AUTH}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      console.log(data);
      const error = new Error(
        (await data.message) || 'Failed to create new user'
      );
      throw error;
    }
    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
  logout(context){
    context.commit('logout');
  }
};
