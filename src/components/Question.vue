<template>
  <div
    style="margin: 10px; background-color: white; border-radius: 15px;"
    v-bind:class="{ correct: isCorrect, wrong: isWrong, empty: isIncomplete }"
  >
    <div class="questionForm">
      <p style=" text-align: left;">
        <span class="quizNumber"> {{ quizItemNumber + 1 }}. </span>
        {{ quote }}
      </p>
      <div class="quizChoices" v-for="(choice, i) in choices" v-bind:key="i">
        <div v-bind:id="choice + quizItemNumber">
          <input type="radio" v-bind:value="choice" v-model="radioValue" />
          <label style="margin-left: 8px;">{{ choice }}</label>
        </div>
      </div>
      <p
        class="youAreCorrect"
        data-aos="fade-left"
        data-aos-duration="500"
        v-if="isCorrect"
      >
        Correct
      </p>
      <p
        class="youAreWrong"
        data-aos="fade-left"
        data-aos-duration="500"
        v-if="isWrong"
      >
        Wrong
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    questionNumber: Number,
    quizItemNumber: Number
  },
  data() {
    return {
      answerName: "",
      questionQuote: "",
      radioValue: "",
      isWrong: false,
      isCorrect: false,
      quote: null,
      choices: [],
      isIncomplete: false,
      question: null
    };
  },
  methods: {
    getQuestion: function() {
      this.question = this.$store.state.questions[this.questionNumber];
    },
    setQuestion: function() {
      this.quote = this.question.quote;
      this.answerName = this.question.answer;
      this.choices = this.question.choices;
    },
    markIncomplete: function() {
      // this.isIncomplete = true;
      if (this.isIncomplete === false){
        this.isIncomplete = true;
      }
    }
  },
  mounted() {
    this.getQuestion();
    this.setQuestion();
  },
  computed: {
    graded: function() {
      //the status of quiz as graded as well as which questions are incomplete are monitored
      return this.$store.state.graded;
    },
    incompleteQuestions: function() {
      return this.$store.state.incompleteQuestions;
    }
  },
  watch: {
    radioValue: function() {
      ///upon a value being entered, an event is emitted to the parent component to mark the question as have an answer entered
      if (this.radioValue != "") {
        this.isIncomplete = false;
        this.$emit("questionAnswered", this.quizItemNumber);
      }
    },
    graded: function() {
      //When the value changes, the user has successfully filled in all available questions and the Question component is ready to grade the user's answer
      if (this.$store.state.graded === true) {
        if (this.answerName === this.radioValue) {
          this.isCorrect = true;
          this.$store.commit({
            //correct answers are sent to the vuex state object for noting the score
            type: "submitCorrectAnswer",
            data: this.quizItemNumber
          });
        } else {
          this.isWrong = true;
          //if an the user supplied answer was incorrect, the correct answer item receives a green border
          let id = this.answerName + this.quizItemNumber;
          document.getElementById(id).classList.add("wrongAnswer")
        }
      }
    },
    incompleteQuestions: function() {
      //the list of incomplete questions are monitored and a yellow box is added to a question when the user has tried to submit the quize for grading before supplying an answer
      if (this.incompleteQuestions.includes(this.quizItemNumber)) {
        this.markIncomplete();
      }
    },
  }
};
</script>
<style scoped>
.wrongAnswer{
  padding: 5px;
  border: 1px black solid;
  background-color: green;
  color: white;
  border-radius: 3px;
}

</style>
