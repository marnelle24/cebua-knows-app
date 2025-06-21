<script setup lang="ts">
import { RouterView } from 'vue-router'
// import { RouterLink } from 'vue-router'
import HeaderDisplay from './components/HeaderDisplay.vue'
import MapDisplay from './components/MapDisplay.vue'
</script>

<template>
  <!-- <div class="headerContainer"> -->
  <main>
    <HeaderDisplay msg="Everything you need to know about Cebu" />
    <div id="mainContainer" class="contentWrapper">
      <RouterView />
    </div>
  </main>

  <MapDisplay />

</template>

<style scoped>
.contentWrapper {
  display: flex;
  margin-top: 20px;
  gap: 25px;
  flex-direction: column;
  width: 100%;
  min-height: 200px;
}

/* hide the contentWrapper element if the viewport is mobille device  */
@media screen and (max-width: 600px) {
  .contentWrapper {
    flex-direction: row;
    gap: 50px;
  }

}

/* Foursquare API = fsq3BNY+jld0H+BnSFdbwlYh8Lbzb3VOtZv+Jz+5JuKSTvU= */
</style>