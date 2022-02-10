<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as coach</router-link>
    </div>
    <ul>
      <coach-item
        v-for="coach of coaches"
        :key="coach.id"
        :areas="coach.areas"
        :firstName="coach.firstName"
        :id="coach.id"
        :lastName="coach.lastName"
        :rate="coach.hourlyRate"
      ></coach-item>
    </ul>
  </section>
</template>	

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem,
  },
  computed: {
    coaches() {
      return this.$store.getters['coaches/coaches'];
    },
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