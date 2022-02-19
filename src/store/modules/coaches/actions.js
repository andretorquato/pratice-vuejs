export default {
	registerCoach(context, payload) {
		const body = {
			id: context.rootGetters.userId, 
			firstName: payload.firstName,
			lastName: payload.lastName,
			hourlyRate: payload.rate,
			areas: payload.areas,
		}
		context.commit('registerCoach', body);
	}
}