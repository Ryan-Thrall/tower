<template>
  <div class="hero-image">
    <img src="../assets/img/unsplash_kcJsQ3PJrYU.png" alt="">

    <div class="text-holder">
      <p class="text-shadow">Get ahead of the scalpers.</p>
      <p class="text-shadow">Reserve your seat now with</p>
      <p class="text-shadow">real events for real people.</p>
    </div>

  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.hero-image {
  position: relative;
}

.text-holder {
  position: absolute;
  top: 4rem;
  left: 3rem;
  letter-spacing: 0.175em;
}

.text-shadow {
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
}
</style>