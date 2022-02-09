<template>
  <section>FILTER</section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as coach</router-link>
    </div>
    <ul>
      <li v-for="coach of coaches" :key="coach.id">{{ coach.firstName }}</li>
    </ul>
  </section>
</template>	

<script>
export default {
  computed: {
    coaches() {
      console.log(this.$store.getters['coaches/coaches'])
      return this.$store.getters['coaches/coaches'];
    },
  },
};
</script>