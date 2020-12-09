<template>
  <div
    style="margin: 10px;"
    v-bind:class="{ correct: isCorrect, wrong: isWrong, empty: isIncomplete }"
  >
    <v-card color="white" :id="quizItemNumber" class="questionForm">
      <p style=" text-align: left;">
        <span style="font-weight: bold;">{{ quizItemNumber + 1 }}</span>
        {{ quote }}
      </p>
      <v-radio-group v-model="radioValue">
        <div
          v-for="(choice, i) in choices"
          v-bind:id="choice + quizItemNumber"
          :key="i"
        >
          <v-radio :label="choice" :value="choice"></v-radio>
        </div>
      </v-radio-group>
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
    </v-card>
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
      this.question = this.$store.state.people[this.questionNumber];
    },
    setQuestion: function() {
      this.quote = this.question.person;
      this.answerName = this.question.band;
    },
    markIncomplete: function() {
      this.isIncomplete = true;
    },
    getChoices: function() {
      let choices = [];
      let bands = this.$store.state.bands;
      while (choices.length < 4) {
        let num = Math.floor(
          Math.random() * bands.length);
        if (!choices.includes(bands[num])) {
          choices.push(bands[num]);
        }
      }
      if (!choices.includes(this.answerName)) choices.push(this.answerName);
      this.choices = choices;
    }
  },
  mounted() {
    this.getQuestion();
    this.setQuestion();
    this.getChoices();
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
          document.getElementById(this.answerName + this.quizItemNumber).style[
            "border"
          ] = "solid 2px green";
        }
      }
    },
    incompleteQuestions: function() {
      //the list of incomplete questions are monitored and a yellow box is added to a question when the user has tried to submit the quize for grading before supplying an answer
      if (this.incompleteQuestions.includes(this.quizItemNumber)) {
        this.markIncomplete();
      }
    }
  }
};
</script>
<style scoped></style>
