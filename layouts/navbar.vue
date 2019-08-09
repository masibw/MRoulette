<template>
  <div>
    <div id="navbar">
      <h1>
        <nuxt-link to="/" class="link">MRoulette</nuxt-link>
      </h1>
    </div>
    <div>
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
#navbar {
  background-color: #333;
  height: 10vh;
  width: 100vw;
  color: #fff;
  h1 {
    .link {
      color: #fff;
    }
    padding: 0.5em;
  }
}
</style>