<template>
  <v-app>
    <v-app>
      <v-app-bar app clipped-left color="rgba(255,73,23,1)">
        <v-spacer />
        <span style="color: white; font-weight: bolder; font-size: 1.8em;"
          >Quiz App</span
        >
        <v-spacer />
      </v-app-bar>
      <v-main class="pageView">
        <QuizHolder />
      </v-main>
    </v-app>
    <v-footer class="footer">
      <p>* it might only be rap-metal bands</p>
    </v-footer>
  </v-app>
</template>

<script>
import QuizHolder from "@/components/QuizHolder.vue";
export default {
  name: "App",
  components: {
    QuizHolder
  },
  mounted(){
    this.$store.dispatch("getBands")
  }
};
</script>
