import Vue from "vue";
import Vuex from "vuex";
import quiz from "@/assets/questions.json";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: quiz.questions,
    graded: false,
    errors: [],
    correctAnswer: [],
    submittedQuestions: [],
    incompleteQuestions: [],
    quizLength: 0
  },
  mutations: {
    submitAnswers() {
      this.state.graded = true;
    },
    submitCorrectAnswer(state, payload) {
      this.state.correctAnswer.push(payload.data);
    },
    storeError(state, payload) {
      console.log(payload);
      this.state.errors.push(payload.error);
    },
    clearErrors() {
      this.state.errors = [];
    },
    resetGrade() {
      this.state.graded = false;
    },
    resetCorrectAnswer() {
      this.state.correctAnswer = [];
    },
    addIncompleteQuestion(state, payload) {
      this.state.incompleteQuestions.push(payload.data);
    },
    clearIncompleteQuestions() {
      this.state.incompleteQuestions = [];
    },
    setQuizLength(state, payload) {
      this.state.quizLength = payload.data;
    }
  },
  actions: {
    resetQuiz(context) {
      context.commit("clearErrors");
      context.commit("resetCorrectAnswer");
      context.commit("resetGrade");
      context.commit({
        type: "setQuizLength",
        data: 0
      });
      context.commit("clearIncompleteQuestions");
    },
    clearErrors(context) {
      context.commit("clearErrors");
      context.commit("clearIncompleteQuestions");
    }
  },
  modules: {}
});
