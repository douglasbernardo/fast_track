<script lang="ts" setup>
import axios from 'axios';

const snackbar = ref(false)
const user = reactive({
  name: '',
  email: '',
  password: ''
})
const nameRules = [
  value => {
    if(value) return true
    return 'O campo deve ser preenchido'
  }
]
const emailRules = [
  value => {
    if(value) return true
    return 'O campo deve ser preenchido'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true
    return 'Seu E-mail não é válido.'
  }
]
const passwordRules = [
  value => {
    if(value) return true
    return 'O campo deve ser preenchido'
  },
  value => {
    if (value.length >= 6) return true
    return 'Senha deve conter mais de 6 caracteres.'
  }
]
const userIsValid = ref(true)
const signUp = async () => {
  const objUser = {
    name: user.name,
    email: user.email,
    password: user.password
  }

  if(!user){
    userIsValid.value = false
  }else{
    await axios.post('http://localhost:3030/user/cadastro',objUser).then((res)=>{
      console.log(res)
      res.status !== 201 ? snackbar.value : snackbar.value = true 
    })
  }
}
</script>
<template lang="pug">
v-card.pa-3(width="100%")
  h2.d-flex.align-center Cadastro
  v-form.mt-2(validate-on="submit lazy")
    v-alert.ma-2.pa-2(v-show="!userIsValid" text="Dados estão inválidos" type="error")
    v-text-field(
      label="Nome"
      v-model="user.name"
      :rules="nameRules"
      required
    )
    v-text-field(
      label="E-mail"
      v-model="user.email"
      :rules="emailRules"
      required
    )

    v-text-field(
      label="Senha"
      v-model="user.password"
      :rules="passwordRules"
      required
    )
    v-btn(class="bg-orange" @click="signUp()") Cadastrar
    p.ma-2 Já é cadastrado? Faça o 
      NuxtLink(to="/login") Login
    v-snackbar(
      v-model="snackbar"
      multi-line
    )
      div.text-subtitle-1 Sua conta foi criada com sucesso!!
      p.ma-2 Clique aqui para ser redirecionado(a) para a página de login
        v-btn.ma-2.pa-2(to="/login" variant="outlined") Login
</template>