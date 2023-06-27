<script lang="ts" setup>
    const drawer = ref(false)
    const user = ref(false)
</script>
<template lang="pug">
v-card(style="z-index:1")
  v-layout

    v-app-bar(
      color="warning"
      prominent
    )
      v-app-bar-nav-icon(variant="text" @click.stop="drawer = !drawer")

      v-toolbar-title Fast Track

      v-spacer

    v-navigation-drawer(
      v-model="drawer"
      location="left"
      temporary
    )
      v-list 
        v-list-item(title="DashBoard" prepend-icon="mdi-view-dashboard" @click="$router.push('/')")
        v-list-item(v-show="user" title="Códigos de rastreio" prepend-icon="mdi-numeric" @click="")
        v-list-item(v-show="!user" title="Fazer login" prepend-icon="mdi-login" @click="$router.push('/login')")
        v-list-item(v-show="user" title="Sair" prepend-icon="mdi-logout" @click="")
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Caprasimo&display=swap')

.v-toolbar-title
  font-family: 'Caprasimo', cursive
  font-size: 30px

</style>