<template>
  <base-dialog :show="!!error" title="An error ocurred!" @close="closeError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filters @change-filters="updatedFilters"></coach-filters>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register"
          >Register as coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach of filteredCoaches"
          :key="coach.id"
          :areas="coach.areas"
          :firstName="coach.firstName"
          :id="coach.id"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
        ></coach-item>
      </ul>
      <p v-else>No coaches found</p>
    </base-card>
  </section>
</template>	

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilters from '../../components/coaches/CoachFilters.vue';

export default {
  components: {
    CoachItem,
    CoachFilters,
  },
  data() {
    return {
      isLoading: true,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        return (
          (this.activeFilters.frontend && coach.areas.includes('frontend')) ||
          (this.activeFilters.backend && coach.areas.includes('backend')) ||
          (this.activeFilters.career && coach.areas.includes('career'))
        );
      });
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    updatedFilters(filters) {
      this.activeFilters = filters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch(err) {
        this.error = err;
      }
      this.isLoading = false;
    },
    closeError() {
      this.error = null;
    }
  },
  created() {
    this.loadCoaches();
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>