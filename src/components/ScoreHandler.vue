<template>
  <div>
    <div v-if="graded">
      <!-- score is only displayed after the quiz has been graded -->
      <p data-aos="fade-left" data-aos-duration="500">
        You got {{ correctAnswer }} / {{ quizLength }} correct.
      </p>
      <p
        data-aos="fade-left"
        data-aos-duration="700"
        style="font-weight: bold"
        v-bind:class="{ perfectScore: perfect, hasMistakes: !perfect }"
      >
        {{ score }} %
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    //the score is derived from the number of questions in the quiz and the number of correct answers
    correctAnswer: function() {
      return this.$store.state.correctAnswer.length;
    },
    quizLength: function() {
      return this.$store.state.quizLength;
    },
    score: function() {
      return Math.round((this.correctAnswer / this.quizLength) * 100);
    },
    graded: function() {
      return this.$store.state.graded;
    },
    perfect: function() {
      if (this.score === 100) {
        return true;
      } else return false;
    }
  }
};
</script>
<style scoped>
p {
  text-align: center;
}
.perfectScore {
  color: green;
}
.hasMistakes {
  color: red;
}
</style>
