<template>
  <div>
    <v-card class="quizHolder" color="white">
      <p>
        How many quotes by cartoon characters from a *wide variety of show can
        you identify?
      </p>
      <!-- the score handler will only be visible once the quiz has been graded -->
      <ScoreHandler />
      <div>
        <!-- the user selects how many questions will be in the quiz   -->
        <v-select v-model="selectedQuizLength" :items="quizLengthOptions" />
        <v-btn outlined @click="populateQuiz">Make Quiz</v-btn>
        <v-btn @click="resetQuiz" outlined>Reset Quiz</v-btn>
      </div>
    </v-card>
    <transition name="slideRight">
      <div v-if="quizLength > 0">
        <!-- the question list will only be rendered once the user has entered the number of questions they want in the quiz -->
        <Question
          v-for="(question, i) in questionNumbers"
          in
          v-bind:key="i"
          @questionAnswered="validateQuestion"
          v-bind:questionNumber="question"
          v-bind:quizItemNumber="i"
        />
      </div>
    </transition>
    <v-card class="quizHolder" color="white">
      <v-btn @click="submitAnswers" outlined>Submit</v-btn>
    </v-card>
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
      quizLengthOptions: [1, 5, 10, 15],
      submittedAnswers: [],
      questionNumbers: []
    };
  },
  computed: {
    //monitor for changes in the number of questions in the quiz as well as which questions are not yet answered
    quizLength: function() {
      return this.$store.state.quizLength;
    },
    incompleteQuestions: function() {
      return this.$store.state.incompleteQuestions;
    }
  },
  methods: {
    submitAnswers: function() {
      //confirms that all questions have had an answer entered and submits quiz for correction
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
    //validate that a particular question has been answered based on a even emitter in the question component
    validateQuestion: function(data) {
      if (!this.submittedAnswers.includes(data)) {
        this.submittedAnswers.push(data);
      }
    },
    validateAllQuestionsFilled: function() {
      //check the array of submitted answers to include all questions,  append unanswered questions to the vuex state object
      for (let i = 0; i < this.quizLength; i++) {
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
      //reset quiz regardless of completion statud
      this.selectedQuizLength = 0;
      this.submittedAnswers = [];
      this.questionNumbers = [];
      this.$store.dispatch("resetQuiz");
    },
    populateQuiz: function() {
      //take user input for desired number of questions.  When the number of questions is set above zero, a list of question components are rendered
      if (this.$store.state.quizLength === 0) {
        this.$store.commit({
          type: "setQuizLength",
          data: this.selectedQuizLength
        });
        //the list of possible questions is made by randomly picking numbers from the list of questions, duplicates are prevented by checking if the question list already contains the question
        let i = this.quizLength;
        while (i > 0) {
          let num = Math.floor(
            Math.random() * this.$store.state.questions.length
          );
          if (!this.questionNumbers.includes(num)) {
            this.questionNumbers.push(num);
            i = i - 1;
          }
        }
      }
    }
  }
};
</script>
<style scoped></style>
