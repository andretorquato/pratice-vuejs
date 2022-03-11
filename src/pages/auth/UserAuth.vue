<template>
  <base-card>
    <form @submit.prevent="signIn">
      <div class="form-control">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model.trim="email" required />
      </div>
      <div class="form-control">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model.trim="password" required />
      </div>
      <div class="form-control">
        <base-button>Login</base-button>
        <base-button mode="outline">Signup instead</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    };
  },
  methods: {
    signIn(){
      if(!this.email || this.email.includes('@')){
        this.formIsValid = false;
        return;
      }
    }
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