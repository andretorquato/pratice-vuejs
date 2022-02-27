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
      `${process.env.VUE_APP_FIREBASE_URL}/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error('Error update data about user');
    }

    context.commit('registerCoach', {
      ...body,
      id: userId,
    });
  },
  async loadCoaches(context) {
    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/coaches.json`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Error load data about coaches');
    }

    const coaches = [];
    const data = await response.json();

    for (let key in data) {
      coaches.push({
        ...data[key],
        id: key,
      });
    }
    console.log(coaches);
    context.commit('setCoaches', coaches);
  },
};
