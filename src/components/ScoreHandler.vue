<template>
  <div>
    <p>{{ correctAnswer }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    correctAnswer: function() {
      return this.$store.state.correctAnswer;
    }
  }
};
</script>
<style scoped></style>
