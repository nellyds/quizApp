<template>
  <div>
    <p>How many cartoon character quotes can you identify?</p>
    <v-select v-model="selectedQuizLength" :items="questionNumbers" />
    <v-btn outlined @click="populateQuiz">Make Quiz</v-btn>
    <div v-if="quizLength > 0">
      <Question
        v-for="(question, i) in quizLength"
        in
        v-bind:key="i"
        @questionAnswered="validateQuestion"
        v-bind:questionNumber="i"
      />
    </div>
    <ScoreHandler />
    <v-btn @click="submitAnswers" outlined>Submit</v-btn>
    <v-btn @click="resetQuiz" outlined>Reset Quiz</v-btn>
    <ErrorHandler />
  </div>
</template>
<script>
import Question from "@/components/Question.vue";
import ErrorHandler from "@/components/ErrorHandler.vue";
import ScoreHandler from "@/components/ScoreHandler.vue";
export default {
  components: {
    Question,
    ErrorHandler,
    ScoreHandler
  },
  data() {
    return {
      selectedQuizLength: null,
      questionNumbers: [1, 5, 10, 15],
      submittedAnswers: []
    };
  },
  computed: {
    incompleteQuestions: function() {
      return this.$store.state.incompleteQuestions;
    },
    quizLength: function() {
      return this.$store.state.quizLength;
    }
  },
  methods: {
    submitAnswers: function() {
      if (!this.validateAllQuestionsFilled()) {
        this.$store.commit({
          type: "storeError",
          error: "Not all questions filled out"
        });
      } else {
        this.$store.commit({
          type: "submitAnswers"
        });
      }
    },
    validateQuestion: function(data) {
      if (!this.submittedAnswers.includes(data)) {
        this.submittedAnswers.push(data);
      }
    },
    validateAllQuestionsFilled: function() {
      for (let i = 0; i < this.testLength; i++) {
        if (!this.submittedAnswers.includes(i)) {
          this.$store.commit({
            type: "addIncompleteQuestion",
            data: i
          });
        }
      }
      return this.incompleteQuestions.length > 0 ? false : true;
    },
    resetQuiz: function() {
      this.testLength = 0;
      this.submittedAnswers = [];
      this.$store.dispatch("resetQuiz");
    },
    populateQuiz: function() {
      this.$store.commit({
        type: "setQuizLength",
        data: this.selectedQuizLength
      });
    }
  }
};
</script>
<style scoped></style>
