<script lang="ts" setup>
  import { useStorage } from '@vueuse/core';
  import axios from 'axios';
    const code = reactive({
      value: ''
    })
    const user = localStorage.getItem('token')
    const codeRules = [
      value => {
        if(value.length <= 13) return true
        return 'O codigo deve conter apenas 13 caracteres'
      }
    ]
  const trackResult = ref()
  const isLoading = ref(false)
  const trackOrder = async() => {
    useStorage('codeTrack',code.value)
    isLoading.value = true
    await axios.post('http://localhost:3030/track',{orderCode: code.value})
    .then((res) => {
      trackResult.value = res.data
      isLoading.value = false
    })
  }

  const codeSavedSnackBar = ref(false)
  const saveCodeTracking = async () => {
    await axios.post('http://localhost:3030/track/save',
    {
      trackCode: localStorage.getItem('codeTrack'),
      user: localStorage.getItem('user')
    })
    .then((res) => {
      if(!res) return
      codeSavedSnackBar.value = true
      console.log(res.data)
      localStorage.removeItem('codeTrack')
    })
  }
</script>
<template lang="pug">
v-container
  v-sheet(
    class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
    elevation="4"
    height="300"
    rounded
    max-width="800"
    width="100%"
  )
    div
      div(style="display: inline-block;")
        h2(class="text-h4 font-weight-black text-orange") Fast Track
      v-icon(class="ml-2 mt-n2" size="35") mdi-truck-fast

      div(class="text-h5 mt-4 font-weight-medium mb-2") Para o rastreamento digite o codigo!

      v-text-field(
        v-model="code.value"
        label="Exemplo: AD123456789BR" 
        :counter="13"
        :rules="codeRules"
        variant="solo"
      )
      v-btn(class="bg-orange" @click="trackOrder" append-icon="mdi-magnify" color="orange") Fazer o Rastreamento
      v-btn.ma-2(
        v-if="user && trackResult"
        class="bg-orange" 
        @click="saveCodeTracking" 
        append-icon="mdi-content-save-move" 
        color="orange"
      ) Salvar Código
      div(class="text-center ma-2")
        v-snackbar(
          location="end"
          color="success"
          position="absolute"
          variant="tonal"
          timeout="5000"
          v-model="codeSavedSnackBar"
        ) Código de rastreio foi salvo com sucesso
      v-progress-circular.ma-2(
        v-show="isLoading"
        indeterminate
        color="amber"
      )
    template(v-if="trackResult")
      div(style="margin-top: 4rem")
        TrackTimeLine(:array="trackResult")
</template>
<style lang="sass" scoped>
.v-container
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  width: 100vw
</style>