<script setup lang="ts">

</script>

<template>
  <ul>
    <li>
      <i class="icon icon-vuejs"></i>
      <h3 class="heading">Vue.js</h3>
      <p class="details">A progressive JavaScript framework for building user interfaces.</p>
    </li>
    <li>
      <i class="icon icon-vite"></i>
      <h3 class="heading">Vite</h3>
      <p class="details">A fast build tool that provides a modern development experience.</p>
    </li>
    <li>
      <i class="icon icon-tailwindcss"></i>
      <h3 class="heading">Tailwind CSS</h3>
      <p class="details">A utility-first CSS framework for rapid UI development.</p>
    </li>
    <li>
      <i class="icon icon-typescript"></i>
      <h3 class="heading">TypeScript</h3>
      <p class="details">A typed superset of JavaScript that compiles to plain JavaScript.</p>
    </li>
  </ul>
</template>


<style scoped>
.heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: #fff;
}
</style>