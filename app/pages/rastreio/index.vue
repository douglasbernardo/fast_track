<script lang="ts" setup>
  import axios from 'axios';
import { useDisplay } from 'vuetify/lib/framework.mjs';
  const {mobile} = useDisplay()
  const trackCodes = ref()
  await axios.post('http://localhost:3030/track/meus-codigos',{
    user: localStorage.getItem('user')
  }).then((res)=>{
    console.log(res.data)
    trackCodes.value = res.data
  })

  const show = ref(false)
  const showId = () => {
    show.value = !show.value
  }
  const teste = () => {
    console.log("teste")
  }
</script>
<template lang="pug">
v-container.notMobile(v-if="!mobile")
  v-tooltip(text="Adicionar um novo código")
    template(v-slot:activator="{ props }")
      v-btn(v-bind="props" icon="mdi-plus-thick" @click="$router.push('/rastreio/adicionar-codigo')")
  v-table(theme="dark")
    thead
      tr
        th(class="text-left") Ações
        th(class="text-left") Código de rastreio
        th(class="text-left") Descrição
    tbody
      tr(
        v-for="code in trackCodes"
        :key="code.id"
      )
        v-btn(icon="mdi-pencil" color="blue" variant="text")
        v-btn(icon="mdi-delete" color="red" variant="text")
        v-btn(icon="mdi-information" color="orange" variant="text")
        td {{ code.code }}
        td {{ code.description }}
v-container.mobile(v-if="mobile")
  .cards
    .d-flex.align-center.flex-column
      v-tooltip(text="Adicionar um novo código")
        template(v-slot:activator="{ props }")
          v-btn(v-bind="props" icon="mdi-plus-thick" @click="$router.push('/rastreio/adicionar-codigo')")
      v-card.ma-2.pa-2(width='100%' variant="tonal" v-for="code in trackCodes")
        v-card-item
          v-card-title Código: {{ code.code }}
          v-card-subtitle {{ code.description }}
        v-card-text
          v-btn Resumo
          v-menu
            template(v-slot:activator='{ props }')
              v-btn(v-bind='props' icon="mdi-dots-horizontal" variant="text")
            v-list
              v-list-item(@click="" prepend-icon="mdi-pencil") Editar
              v-list-item(@click="" prepend-icon="mdi-delete") Excluir
</template>

<style lang="sass">
.notMobile
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 70vh
.mobile
  display: flex
  justify-content: center
  align-items: center
  width: 100%
.cards
  position: relative
  align-content: center
</style>