<script lang="ts" setup>
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const mobile = useDisplay()
  provide('isMobile',mobile.mobile.value)
</script>
<template lang="pug">
VitePwaManifest
NuxtLayout
  NuxtPage
</template>
