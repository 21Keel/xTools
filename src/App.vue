<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    // token 检查
    const localToken = localStorage.getItem('token')
    if (localToken) {
      this.$store.commit('setToken', localToken)
    } else {
      this.$router.push('/login')
    }
  },
  methods: {},
}
</script>

<style></style>
