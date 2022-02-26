export default {
	async registerCoach(context, payload) {
		const userId = context.rootGetters.userId;
		const body = {
			firstName: payload.firstName,
			lastName: payload.lastName,
			description: payload.description,
			hourlyRate: payload.rate,
			areas: payload.areas,
		}

		const response = await fetch(`${process.env.VUE_APP_FIREBASE_URL}/coaches/${userId}.json`, {
			method: 'PUT',
			body: JSON.stringify(body),
		});

		if(!response.ok){
			throw new Error("Error update data about user");
		}

		context.commit('registerCoach', {
			...body,
			id: userId
		});
	}
}