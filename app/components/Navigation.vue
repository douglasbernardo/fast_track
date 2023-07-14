<script lang="ts" setup>
  const drawer = ref(false)
  const isLoggedIn = ref(false)
  const token = localStorage.getItem('token')
  onMounted(()=>{
    if(token){
      isLoggedIn.value = true
    }
  })
  watch(
    () => isLoggedIn.value,
    (newValue) => {
      isLoggedIn.value = newValue
    }
  )
  const logout = () => {
    isLoggedIn.value = false
    window.localStorage.clear()
    navigateTo('/')  
  }
</script>
<template lang="pug">
v-card(style="z-index: 2")
  v-app-bar(
    color="warning"
  )
    v-app-bar-nav-icon(variant="text" @click.stop="drawer = !drawer")

    v-toolbar-title Fast Track
    p {{isLoggedIn}}

    v-spacer

  v-navigation-drawer(
    v-model="drawer"
    location="left"
    temporary
  )
    v-list 
      v-list-item(title="DashBoard" prepend-icon="mdi-view-dashboard" @click="$router.push('/')")
      v-list-item(v-show="isLoggedIn" title="Códigos de rastreio" prepend-icon="mdi-numeric" @click="$router.push('/rastreio')")
      v-list-item(v-show="!isLoggedIn" title="Fazer login" prepend-icon="mdi-login" @click="$router.push('/login')")
      v-list-item(v-show="isLoggedIn" title="Sair" prepend-icon="mdi-logout" @click="logout()")
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Caprasimo&display=swap')

.v-toolbar-title
  font-family: 'Caprasimo', cursive
  font-size: 30px
</style>