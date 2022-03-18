<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred!" @close="closeError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Loading..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model.trim="email" required />
        </div>
        <div class="form-control">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            required
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long).
        </p>
        <div class="form-control">
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button mode="outline" type="button" @click="switchModeButton">{{
            switchModeButtonCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode == 'login') return 'Login';
      else return 'Signup';
    },
    switchModeButtonCaption() {
      if (this.mode == 'login') return 'Signup instead';
      else return 'Login instead';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (this.validateForm()) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const authPayload = {
        email: this.email,
        password: this.password,
      }
      try {
        if (this.mode == 'login') {
          await this.$store.dispatch('login', authPayload)
        } else {
          await this.$store.dispatch('signup', authPayload);
        }
      } catch (err) {
        this.error = err.message || 'Failed to authenticate. Try again later.';
      }
      this.isLoading = false;
    },
    switchModeButton() {
      if (this.mode == 'login') this.mode = 'signup';
      else this.mode = 'login';
    },
    validateForm() {
      return (
        (this.email && !this.email.includes('@')) || this.password.length < 6
      );
    },
    closeError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>	