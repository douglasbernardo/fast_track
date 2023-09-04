<script lang="ts" setup>
  import { useStore } from '../store/authStore';
  const drawer = ref(false)
  const store = useStore()
</script>
<template lang="pug">
v-card(style="z-index: 2")
  v-app-bar(
    color="warning"
  )
    v-app-bar-nav-icon(variant="text" @click.stop="drawer = !drawer")

    v-toolbar-title Fast Track
    h4(v-show="store?.token") Bem-Vindo(a) {{ store.userName }}

    v-spacer

  v-navigation-drawer(
    v-model="drawer"
    location="left"
    temporary
  )
    v-list
      v-list-item(v-show="store.token" :title="store.userName" prepend-icon="mdi-account")
      v-divider
      v-list-item(title="DashBoard" prepend-icon="mdi-view-dashboard" @click="$router.push('/')")
      v-list-item(v-show="store.token" title="Códigos de rastreio" prepend-icon="mdi-numeric" @click="$router.push('/rastreio')")
      v-list-item(v-show="!store.token" title="Fazer login" prepend-icon="mdi-login" @click="$router.push('/login')")
      v-list-item(v-show="store.token" title="Sair" prepend-icon="mdi-logout" @click="store.logout()")
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Caprasimo&display=swap')

.v-toolbar-title
  font-family: 'Caprasimo', cursive
  font-size: 30px
</style>