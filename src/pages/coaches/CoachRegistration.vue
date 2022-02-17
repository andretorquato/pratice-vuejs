<template>
  <base-card>
    <h2>Register now new coach!</h2>
    <coach-form></coach-form>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
};
</script>