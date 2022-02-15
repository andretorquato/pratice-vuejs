<template>
  <base-card>
    <span class="filter-option">
      <input type="checkbox" id="frontend" @change="setFilters" checked />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" @change="setFilters" checked />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" @change="setFilters" checked />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>


<script>
export default {
  emits: ['change-filters'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(event) {
      const idInput = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [idInput]: isActive,
      };
      this.filters = updatedFilters;      
      this.$emit('change-filters', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>