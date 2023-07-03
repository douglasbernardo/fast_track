<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';

const show1 = ref(false)
const {mobile} = useDisplay()
</script>
<template lang="pug">
v-container
  v-card.pa-3(:width="mobile ? '100%' : '50%'")
    h2.d-flex.align-center Login
    v-form.mt-2
      v-text-field(
        label="Digite seu E-mail"
        variant="outlined"
        required
      )

      v-text-field(
        :type="show1 ? 'text' : 'password'"
        label="Digite sua senha"
        variant="outlined"
        @click:append-inner="show1 = !show1"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      )
      v-btn(class="bg-orange") Logar
      p.ma-2 Não é cadastrado? 
        NuxtLink(to="/cadastro") Cadastre-se
</template>
