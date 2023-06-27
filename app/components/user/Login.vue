<script lang="ts" setup>
const show1 = ref(false)
</script>
<template lang="pug">
v-card.pa-3(width="100%")
  h2.d-flex.align-center Login
  v-form.mt-2
    v-text-field(
      label="Digite seu E-mail"
      required
    )

    v-text-field(
      :type="show1 ? 'text' : 'password'"
      label="Digite sua senha"
      @click:append-inner="show1 = !show1"
      :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
    )
    v-btn(class="bg-orange") Logar
    p.ma-2 Ainda não é cadastrado? 
      NuxtLink(to="/cadastro") Cadastre-se
</template>
