<template>
  <div
    v-bind:class="{ correct: isCorrect, wrong: isWrong, empty: isIncomplete }"
  >
    <v-card :id="questionNumber" outlined class="questionForm">
      <p>
        <span style="font-weight: bold">{{ questionNumber + 1 }}</span>
        {{ questionQuote }}
      </p>
      <v-radio-group v-model="radioValue">
        <div v-for="(quote, i) in quotes" v-bind:id=quote.person  :key="i">
          <v-radio 
          :label="quote.person" 
          :value="quote.person"></v-radio>
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
        Incorrect
      </p>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    questionNumber: Number
  },
  data() {
    return {
      quotes: [],
      answerName: "",
      questionQuote: "",
      radioValue: "",
      isWrong: false,
      isCorrect: false,
      isIncomplete: false
    };
  },
  methods: {
    getQuotes: function() {
      let q = 5;
      while (q > 0) {
        let num = Math.floor(Math.random() * this.$store.state.quotes.length);
        if (!this.quotes.includes(this.$store.state.quotes[num])) {
          this.quotes.push(this.$store.state.quotes[num]);
          q = q - 1;
        }
      }
    },
    setQuestion: function() {
      let num = Math.floor(Math.random() * this.quotes.length);
      this.answerName = this.quotes[num].person;
      this.questionQuote = this.quotes[num].quote;
    },
    markIncomplete: function() {
      this.isIncomplete = true;
    }
  },
  mounted() {
    this.getQuotes();
    this.setQuestion();
  },
  computed: {
    graded: function() {
      return this.$store.state.graded;
    },
    incompleteQuestions: function() {
      return this.$store.state.incompleteQuestions;
    }
  },
  watch: {
    radioValue: function() {
      if (this.radioValue != "") {
        this.isIncomplete = false;
        this.$emit("questionAnswered", this.questionNumber);
      }
    },
    graded: function() {
      if (this.$store.state.graded === true) {
        if (this.answerName === this.radioValue) {
          this.isCorrect = true;
          this.$store.commit({
            type: "submitCorrectAnswer",
            data: this.questionNumber
          });
        } else {
          this.isWrong = true;
         document.getElementById(this.answerName).style["background-color"] = "green"
       }
      }
    },
    incompleteQuestions: function() {
      if (this.incompleteQuestions.includes(this.questionNumber)) {
        this.markIncomplete();
      }
    }
  }
};
</script>
<style scoped>
.youAreCorrect {
  font-weight: bold;
  color: green;
}
.youAreWrong {
  font-weight: bold;
  color: red;
}
.correctAnswer{
  border: solid 2px green;
  margin: 2px;
}
</style>
