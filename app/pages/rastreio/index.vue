<script lang="ts" setup>
  import axios from 'axios';
  import { useDisplay } from 'vuetify/lib/framework.mjs';
  import { codeStore } from '../../store/codeStore';
  const {mobile} = useDisplay()
  const code = codeStore()
  const fetchData = () => {
    code.getMyCodes(localStorage.getItem('user'))
  }
  
  onMounted(() => fetchData())

  const deleteCode = async (id: string) => {
    await axios.post('http://localhost:3030/track/delete', {idCode: id,user: localStorage.getItem('user')})
    fetchData()
  }

  const editingRowIndex = ref(-1)
  const editCode = async (index: number) => {
    editingRowIndex.value = index
  }

  const errorsEditing = ref([])
  const saveEditedCode = async (id: string, value: object) => {
    await axios.patch('http://localhost:3030/track/editar-codigo', {idCode: id,user: localStorage.getItem('user'),values: value,})
    fetchData()
  }
  const dialogCode = ref(false)
  const isLoading = ref(false)
  const result = ref()
  const openDialogCode = async (code: string) => {
    dialogCode.value = true
    isLoading.value = true
    await axios.post('http://localhost:3030/track',{orderCode: code}).then((res)=>{
      if(res.data) 
        setTimeout(() => {
          isLoading.value = false
        }, 2500)
      result.value = res.data
    })
  }
</script>
<template lang="pug">
v-container.notMobile(v-if="!mobile")
  v-tooltip(text="Adicionar um novo código")
    template(v-slot:activator="{ props }")
      v-btn(v-bind="props" icon="mdi-plus-thick" @click="$router.push('/rastreio/adicionar-codigo')")
  v-alert(
    v-for="error in errorsEditing"
    closable
    title="Falha ao Editar"
    :text="error"
    type="error"
  )
  v-dialog(
    v-model="dialogCode"
    width="auto"
    parent="parent"
  )
    v-card
      v-card-text
        p(v-if="isLoading") Carregando Dados.....
        v-progress-linear(
          v-if="isLoading"
          indeterminate
          color="yellow-darken-2"
        )
        TrackTimeLine(v-if="!isLoading" :array="result")
      v-card-actions
        v-btn(color="primary" block @click="dialogCode = false") Fechar
  v-table.ma-2(theme="dark")
    thead
      tr
        th(class="text-left") Ações
        th(class="text-left") Código de rastreio
        th(class="text-left") Descrição
    tbody(v-if="code.codes")
      tr(
        v-for="(code, index) in code.codes"
        :key="index"
      )
        v-btn(v-if="editingRowIndex !== index" icon="mdi-pencil" @click="editCode(index)" color="blue" variant="text")
        v-btn(icon="mdi-delete" @click="deleteCode(code._id)" color="red" variant="text")
        td
          v-chip(v-if="editingRowIndex !== index" @click="openDialogCode(code.code)") {{ code.code }}
          v-text-field.ma-2(v-else style="width: 10rem" v-model="code.code")
        td 
          span(v-if="editingRowIndex !== index") {{ code.description ? code.description : '---' }}
          v-textarea.ma-2(v-else v-model="code.description" rows="1")
        td 
          v-btn.ma-2(v-if="editingRowIndex == index" color="warning" icon="mdi-check-bold" size="small" @click="saveEditedCode(code._id,{ code: code.code, description:code.description})")
          v-btn.ma-2(v-if="editingRowIndex == index" icon="mdi-close" color="red" size="small" @click="editCode(-1)")
    p.text-center(v-else) Não Há códigos cadastrados no momento
//- v-container.mobile(v-if="mobile")
//-   .cards
//-     .d-flex.align-center.flex-column
//-       v-tooltip(text="Adicionar um novo código")
//-         template(v-slot:activator="{ props }")
//-           v-btn(v-bind="props" icon="mdi-plus-thick" @click="$router.push('/rastreio/adicionar-codigo')")
//-       v-card.ma-2.pa-2(width='100%' variant="tonal" v-for="code in trackCodes")
//-         v-card-item
//-           v-card-title Código: {{ code.code }}
//-           v-card-subtitle {{ code.description }}
//-         v-card-text
//-           v-btn Resumo
//-           v-menu
//-             template(v-slot:activator='{ props }')
//-               v-btn(v-bind='props' icon="mdi-dots-horizontal" variant="text")
//-             v-list
//-               v-list-item(@click="" prepend-icon="mdi-pencil") Editar
//-               v-list-item(@click="" prepend-icon="mdi-delete") Excluir
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