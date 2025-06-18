<script setup lang="ts">

</script>

<template>
  <ul class="list-item">
    <li>
      <i class="icon icon-vuejs"></i>
      <h3 class="heading">Getting to know more about the town</h3>
      <p class="details">A progressive JavaScript framework for building user interfaces.</p>
    </li>
    <li>
      <i class="icon icon-vite"></i>
      <h3 class="heading">Discover popular & hidden destinations</h3>
      <p class="details">A fast build tool that provides a modern development experience.</p>
    </li>
    <li>
      <i class="icon icon-tailwindcss"></i>
      <h3 class="heading">Eat local food & Delicacies</h3>
      <p class="details">A utility-first CSS framework for rapid UI development.</p>
    </li>
    <li>
      <i class="icon icon-typescript"></i>
      <h3 class="heading">Eat with the local, live like a local</h3>
      <p class="details">A typed superset of JavaScript that compiles to plain JavaScript.</p>
    </li>
  </ul>
</template>


<style scoped>
.list-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  max-width: 100%;
}

ul.list-item li {
  padding: 10px 0;
}

.heading {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
}

.details {
  flex: 1;
  margin-left: 1rem;
}
</style>