<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="closeError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header><h1>Requests</h1></header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="!isLoading && hasRequests">
          <request-item
            v-for="request in requests"
            :key="request.id"
            :email="request.email"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-else>No requests received</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
  },
  computed: {
    requests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (err) {
        this.error = err.message || 'Loading requests failed';
      }
      this.isLoading = false;
    },
    closeError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>