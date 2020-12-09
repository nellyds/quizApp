<template>
  <div>
    <!-- component only visible when there have been caught errors -->
    <transition name="slideRight">
      <div v-if="errors.length > 0">
        <div v-for="(error, i) in errors" v-bind:key="i">
          <p>{{ error }}</p>
          <v-alert
            data-aos="fade-left"
            data-aos-duration="500"
            dense
            type="error"
            >{{ error }}
          </v-alert>
        </div>
        <v-btn @click="clear" outlined color="red"
          >Ok, I will do better next time
        </v-btn>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  methods: {
    //clears errors from vuex state object
    clear: function() {
      this.$store.dispatch({ type: "clearErrors" });
    }
  },
  computed: {
    errors: function() {
      return this.$store.state.errors;
    }
  }
};
</script>
<style scoped></style>
