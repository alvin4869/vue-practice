<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/cart">用戶端範例</router-link>
    </div>
  </nav>
    <div class="container-fluid mt-3 position-relative">
      <ToastMessages></ToastMessages>
      <router-view/>
    </div>
</template>

<script>
import ToastMessages from '@/components/ToastMessages.vue'
import emitter from '@/methods/emitter'

export default {
  components: { ToastMessages },
  provide () {
    return {
      emitter
    }
  }
}
</script>

<style scoped>

</style>
