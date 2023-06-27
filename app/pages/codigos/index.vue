<script lang="ts" setup>
    const desserts= [
      {
        name: '1',
        code: "PC123456789BR",
        description:"Esse é um produto dos correios, seria uma caixinha de som"
      },
      {
        name: '2',
        code: "PC123456789BR",
        description:"Esse é um produto dos correios, seria uma caixinha de som"
      },
      {
        name: '3',
        code: "PC123456789BR",
        description:"Esse é um produto dos correios, seria uma caixinha de som"
      },
      {
        name: '4',
        code: "PC123456789BR",
        description:"Esse é um produto dos correios, seria uma caixinha de som"
      },
    ]
</script>
<template lang="pug">
v-container
  v-table(theme="dark")
    thead
      tr
        th(class="text-left") ID
        th(class="text-left") Código de rastreio
        th(class="text-left") Descrição
    tbody
      tr(
        v-for="item in desserts"
        :key="item.name"
      )
        td {{ item.name }}
        td {{ item.code }}
        td {{ item.description }}
        v-btn.ma-2.pa-2(variant="outlined") Resumo
</template>

<style lang="sass">
.v-container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 100vh
</style>