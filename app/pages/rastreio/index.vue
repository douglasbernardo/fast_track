<script lang="ts" setup>
  import axios from 'axios';
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  const {mobile} = useDisplay()
  const trackCodes = ref()
  await axios.post('http://localhost:3030/track/meus-codigos',{
    user: localStorage.getItem('user')
  }).then((res)=>{
    trackCodes.value = res.data
  })

  const dialog = ref(false)
  const deleteCode = async (id: string) => {
    await axios.post('http://localhost:3030/track/delete', {
      idCode: id,
      user: localStorage.getItem('user')
    }).then((res)=>{
      if(res) window.location.reload()
    })
  }

  const isEditing = ref(false)
  const editCode = async (id: string) => {
    isEditing.value = true
    trackCodes.value = trackCodes.value.find((code: any) => code._id === id);
  }

  console.log(trackCodes.value)
  const saveEditedCode = async () => {

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
    tbody(v-if="trackCodes")
      tr(
        v-for="(code, index) in trackCodes"
        :key="index"
      )
        v-tooltip(:text="code._id")
          template(v-slot:activator="{ props }")
            v-btn(v-bind="props" icon="mdi-pencil" @click="editCode(code._id)" color="blue" variant="text")
        v-btn(icon="mdi-delete" @click="dialog=true" color="red" variant="text")
        v-dialog(
          v-model="dialog"
          width="400"
        )
          v-card
            v-card-text.bg-blue-grey-lighten-1 Deseja excluir esse código de rastreio?
            span.text-center.ma-2.text-warning Se excluido, o código não poderá ser recuperado!
            v-card-actions
              v-btn(color="primary" @click="dialog = false") Cancelar
              v-btn(color="primary" @click="deleteCode(code._id)") Excluir
        v-tooltip(text="Resultado do rastreio desse código")
          template(v-slot:activator="{ props }")
            v-btn(v-bind="props" color="orange" variant="text" icon="mdi-eye-settings")
        template(v-if="!isEditing")
          td {{ code.code }}
          td 
            p {{ code.description ? code.description : '.....' }}
        template(v-if="isEditing")
          td
            v-text-field(v-model="edit.code")
          td 
            v-textarea(v-model="edit.description" rows="1")
          td 
            v-btn(class="bg-orange" @click="saveEditedCode(edit._id)" variant="outlined") Editar
    p.text-center(v-else) Não Há códigos cadastrados no momento
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