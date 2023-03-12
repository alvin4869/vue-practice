<template>
  <NavBar/>
  <div class="container-fluid">
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: { NavBar },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    const api = `${process.env.VUE_APP_API}api/user/check`
    this.axios.defaults.headers.common.Authorization = token
    this.axios.post(api).then(res => {
      if (!res.data.success) {
        this.$router.push('/login')
      }
    })
  }
}
</script>
