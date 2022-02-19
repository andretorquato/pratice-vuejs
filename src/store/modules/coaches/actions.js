export default {
	registerCoach(context, payload) {
		const body = {
			id: 'c3', 
			firstName: payload.firstName,
			lastName: payload.lastName,
			rate: payload.rate,
			areas: payload.areas,
		}
		context.commit('registerCoach', body);
	}
}