export default {
  async addRequest(context, payload) {
    const request = {
      email: payload.email,
      message: payload.message,
    };
    const response = await fetch(`${process.env.VUE_APP_API_DATABASE}/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || 'Something went wrong! Please try again later.'
      );
    }
    response.id = data.name;
    response.coachId = payload.coachId;
    context.commit('addRequest', request);
  },
  async fetchRequests(context) {
    const requests = [];
    const coachId = context.rootGetters.userId;
    const response = await fetch(`${process.env.VUE_APP_API_DATABASE}/requests/${coachId}.json`,
      { method: 'GET' });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong! Please try again later.');
    }
    for (const key in data) {
      const request = data[key];
      request.id = key;
      request.coachId = coachId;
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
