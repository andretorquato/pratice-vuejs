<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.valid }">
      <label for="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.value"
        @blur="clearValidity('firstName')"
      />
    </div>
    <div class="form-control" :class="{ invalid: !lastName.valid }">
      <label for="lastName">Last name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.value"
        @blur="clearValidity('lastName')"
      />
    </div>
    <div class="form-control" :class="{ invalid: !description.valid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="10"
        v-model.trim="description.value"
        @blur="clearValidity('description')"
      ></textarea>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.valid }">
      <label for="hourlyRate">Hourly Rate</label>
      <input
        type="number"
        id="hourlyRate"
        v-model.number="hourlyRate.value"
        @blur="clearValidity('hourlyRate')"
      />
    </div>
    <div class="form-control" :class="{ invalid: !areas.valid }">
      <h2>Areas</h2>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @click="clearValidity('areas')"
        />
        <label for="frontend">Front-end Developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.value"
          @click="clearValidity('areas')"
        />
        <label for="backend">Back-end Developer</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.value"
          @click="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <p v-if="!formIsValid">Please check fields</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: {
        value: '',
        valid: true,
      },
      lastName: {
        value: '',
        valid: true,
      },
      description: {
        value: '',
        valid: true,
      },
      hourlyRate: {
        value: null,
        valid: true,
      },
      areas: {
        value: [],
        valid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].valid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (!this.firstName.value) {
        this.firstName.valid = false;
        this.formIsValid = false;
      }

      if (!this.lastName.value) {
        this.lastName.valid = false;
        this.formIsValid = false;
      }

      if (!this.description.value) {
        this.description.valid = false;
        this.formIsValid = false;
      }

      if (!this.hourlyRate.value || this.hourlyRate.value <= 0) {
        this.hourlyRate.valid = false;
        this.formIsValid = false;
      }

      if (!this.areas.value.length) {
        this.areas.valid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const body = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        rate: this.hourlyRate.value,
        areas: this.areas.value,
      };
      this.$emit('save-data', body);
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
