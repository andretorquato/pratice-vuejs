export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const body = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };

    const response = await fetch(
      `${process.env.VUE_APP_API_FIREBASE_URLVUE_APP_API_DATABASEcoaches}/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(response.message || 'Error update data about user');
    }

    context.commit('registerCoach', {
      ...body,
      id: userId,
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      `${process.env.VUE_APP_API_DATABASE}/coaches.json`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText || 'Error load coaches');
    }

    const coaches = [];
    const data = await response.json();

    for (let key in data) {
      coaches.push({
        ...data[key],
        id: key,
      });
    }
    context.commit('setCoaches', coaches);
  },
};
