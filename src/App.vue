<template>
  <v-app>
    <v-app>
      <v-app-bar app clipped-left color="rgba(124,24,18)">
        <span
          style="color: white; font-weight: bolder; font-size: 1.1em; text-align: left;"
          >Quiz App</span
        >
      </v-app-bar>
      <v-main class="pageView">
        <QuizHolder />
      </v-main>
    </v-app>
  </v-app>
</template>

<script>
import QuizHolder from "@/components/QuizHolder.vue";
export default {
  name: "App",
  components: {
    QuizHolder
  }
};
</script>
