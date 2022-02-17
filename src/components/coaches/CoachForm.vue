<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstName">First name</label>
      <input type="text" id="firstName" v-model.trim="firstName" />
    </div>
    <div class="form-control">
      <label for="lastName">Last name</label>
      <input type="text" id="lastName" v-model.trim="lastName" />
    </div>
    <div class="form-control">
      <label for="description">Last name</label>
      <textarea
        id="description"
        rows="10"
        v-model.trim="description"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="hourlyRate">Hourly Rate</label>
      <input type="number" id="hourlyRate" v-model.number="hourlyRate" />
    </div>
    <div class="form-control">
      <h2>Areas</h2>
      <div>
        <input type="checkbox" id="frontend" v-model="areas" />
        <label for="frontend">Front-end Developer</label>
      </div>
      <div>
        <input type="checkbox" id="backend" v-model="areas" />
        <label for="backend">Back-end Developer</label>
      </div>
      <div>
        <input type="checkbox" id="career" v-model="areas" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      hourlyRate: '',
      areas: [],
    };
  },
  methods: {
    submitForm() {
      const body = {
        first: this.firstName,
        last: this.lastName,
        desc: this.description,
        rate: this.hourlyRate,
        areas: this.areas,
      };
      console.log(body);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>