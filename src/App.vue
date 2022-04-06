<template>
  <div id="app">
    <img alt="TimeTracker logo" src="./assets/base.png">
    <h1>Welcome to TimeTracker App</h1>
    <p>
      It's very simple to use, enjoy!
    </p>
    <MainComp />
  </div>
</template>

<script>
import MainComp from './components/Main.vue';

export default {
  // el: "#app", // elemento dom => https://vuejs.org/v2/api/#el -> WARN: option "el" can only be used during instance creation with the `new` keyword.
  name: 'App',
  components: {
    MainComp
  }
}
</script>

<style>

</style>
