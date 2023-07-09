<script lang="ts" setup>
import axios from 'axios'
const track = reactive({
  code: '',
  description: ''
})
const errors = ref<Array<string>>([])
const passedConditional = ref<Array<boolean>>([])

const saveCode = async () => {
  //melhorar validação para o input do código de rastreio
  if(track.code.length > 13){
    errors.value.push('Código não pode ter mais de 13 caracteres');
  }else{
    passedConditional.value.push(true)
  }
  if(passedConditional.value.every((item)=>item===true) && !errors.value.length){
    await axios.post('http://localhost:3030/track/save',{
      trackCode: track.code,
      description: track.description,
      user: localStorage.getItem('user')
    })
    .then((res) => {
      console.log(res);
      if(res.data){
        navigateTo('/rastreio')
      }
    })
  }
}
</script>
<template lang="pug">
v-container
  v-sheet(width="300" class="mx-auto")
    v-alert.pa-2(v-for="error in errors" closable :text="error" type="error" variant="tonal")
    v-form.mt-2(@submit.prevent)
      v-text-field(
        v-model="track.code"
        :rules="rules"
        :counter="13"
        label="Código de rastreio"
      )
      v-textarea(
        name="input-7-1"
        variant="filled"
        label="Descrição(Opcional)"
        v-model="track.description"
        auto-grow
      )
      v-btn(type="submit" block class="mt-2 bg-orange" @click="saveCode()") Salvar Código
</template>

<style lang="sass">
.v-container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 70vh
</style>