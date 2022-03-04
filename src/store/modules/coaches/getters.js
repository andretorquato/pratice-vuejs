export default {
  coaches(state){
		return state.coaches;
	},
	isCoach(_, getters, __, rootGetters){
		return getters.coaches.some(coach => coach.id === rootGetters.userId);
	},
	hasCoaches(state){
		return state.coaches && state.coaches.length > 0;
	},
	shouldFetch(state){
		const now = new Date().getTime();
		const lastFetch = state.lastFetch;
		const diff = now - lastFetch;
		return diff / 1000 > 20;
	}
}