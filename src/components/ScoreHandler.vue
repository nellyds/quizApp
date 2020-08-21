<template>
  <div>
    <p v-if="correctAnswer != null">
      You got {{ correctAnswer }} / {{ quizLength }} correct.
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    correctAnswer: function() {
      return this.$store.state.correctAnswer.legnth;
    },
    quizLength: function() {
      return this.$store.state.quizLength;
    }
  }
};
</script>
<style scoped></style>
