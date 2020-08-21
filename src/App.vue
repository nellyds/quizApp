<template>
  <v-app>
    <v-app>
      <v-app-bar app clipped-left color="rgba(255,73,23,1)">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <span style="color: white; font-size: 1.2em;">Quiz App</span>
        <v-spacer></v-spacer>
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
  },

  data: () => ({
    //
  })
};
</script>
