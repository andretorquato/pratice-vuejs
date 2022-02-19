<template>
  <base-card>
    <h2>Register now new coach!</h2>
    <coach-form @save-data="saveData"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
  emits: ['save-data'],
  methods: {
  saveData(body){
    this.$store.dispatch('coaches/registerCoach', body);
    this.$router.replace('/coaches');
  }
  }
};
</script>