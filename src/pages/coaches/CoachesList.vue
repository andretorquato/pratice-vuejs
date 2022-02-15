<template>
  <section>
    <coach-filters @change-filters="updatedFilters" ></coach-filters>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as coach</base-button>
      </div>
      <ul>
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
    </base-card>
  </section>
</template>	

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilters from '../../components/coaches/CoachFilters.vue';

export default {
  components: {
    CoachItem,
    CoachFilters
  },
  data(){
    return {
      activeFilters: {
        frontend: true,
        backend: true, 
        career: true,
      },
    }
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      return coaches.filter(coach => {
        return this.filters.frontend && coach.areas.includes('frontend') ||
          this.filters.backend && coach.areas.includes('backend') ||
          this.filters.career && coach.areas.includes('career')
      });
    },
  },
  methods:{
    updatedFilters(filters) {
      this.activeFilters = filters;
    },
  }
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