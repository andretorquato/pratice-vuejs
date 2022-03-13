export default {
  login() {},
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

    console.log(data);
    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
};
