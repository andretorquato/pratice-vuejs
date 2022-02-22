export default {
  addRequest(context, payload) {
    const request = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      email: payload.email,
      message: payload.message,
    };
    context.commit('addRequest', request);
  },
};
