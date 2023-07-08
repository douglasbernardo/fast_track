<script lang="ts" setup>
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const {mobile} = useDisplay()
  const desserts= [
    {
      id: '1',
      code: "PC123456789BR",
      description:"Esse é um produto dos correios, seria uma caixinha de som"
    },
    {
      id: '2',
      code: "PC123456789BR",
      description:"Esse é um produto dos correios, seria uma caixinha de som"
    },
    {
      id: '3',
      code: "PC123456789BR",
      description:"Esse é um produto dos correios, seria uma caixinha de som"
    },
    {
      id: '4',
      code: "PC123456789BR",
      description:"Esse é um produto dos correios, seria uma caixinha de som"
    },
  ]
  const teste = () => {
    console.log("teste")
  }
</script>
<template lang="pug">
v-container.notMobile(v-if="!mobile")
  v-tooltip(text="Adicionar um novo código")
    template(v-slot:activator="{ props }")
      v-btn(v-bind="props" icon="mdi-plus-thick")
  v-table(theme="dark")
    thead
      tr
        th(class="text-left") Ações
        th(class="text-left") ID
        th(class="text-left") Código de rastreio
        th(class="text-left") Descrição
    tbody
      tr(
        v-for="item in desserts"
        :key="item.name"
      )
        v-btn(icon="mdi-pencil" color="blue" variant="text")
        v-btn(icon="mdi-delete" color="red" variant="text")
        td {{ item.id }}
        td {{ item.code }}
        td {{ item.description }}
        v-btn.ma-2.pa-2(variant="outlined") Resumo
v-container.mobile(v-if="mobile")
  .cards
    .d-flex.align-center.flex-column
      v-tooltip(text="Adicionar um novo código")
        template(v-slot:activator="{ props }")
          v-btn(v-bind="props" icon="mdi-plus-thick")
      v-card.ma-2.pa-2(width='100%' variant="tonal" v-for="item in desserts")
        v-card-item
          p ID: {{ item.id }}
          v-card-title Código: {{ item.code }}
          v-card-subtitle {{ item.description }}
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