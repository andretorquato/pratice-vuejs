export default {
  async coaches(state){
		const response = await fetch(`${process.env.VUE_APP_FIREBASE_URL}/coaches.json`, {
			method: 'GET'
		});
		console.log(await response.json());
		return state.coaches
	},
	isCoach(_, getters, __, rootGetters){
		return !getters.coaches.some(coach => coach.id === rootGetters.userId);
	},
	hasCoaches(state){
		return state.coaches && state.coaches.length > 0
	}
}