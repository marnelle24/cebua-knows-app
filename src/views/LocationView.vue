<script setup lang="ts">
</script>

<template>
  <div class="locationWrapper">
    <p class="location">Welcome to <span>{{ $route.params.location }}!</span></p>
    <br />
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
  </div>
</template>


<style scoped>
.location {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
}

.location span {
  font-style: italic;
}

.locationWrapper {
  padding: 1rem;
  border-radius: 8px;
  max-width: 100%;
}
</style>