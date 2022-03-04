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
      const data = await response.json();
      const error = new Error(data.message || 'Error update data about user'); 
      throw error;
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
    const coaches = [];
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error load coaches');
    }
    for (let key in data) {
      coaches.push({
        ...data[key],
        id: key,
      });
    }
    context.commit('setCoaches', coaches);
  },
};
