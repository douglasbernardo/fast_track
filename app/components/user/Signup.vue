<script lang="ts" setup>
import axios from 'axios';

const user = reactive({
  name: '',
  email: '',
  password: ''
})
const signUp = async () => {
  const objUser = {
    name: user.name,
    email: user.email,
    password: user.password
  }
  await axios.post('http://localhost:3030/user/cadastro',objUser).then(res=>console.log(res.data))
}
</script>
<template lang="pug">
v-card.pa-3(width="100%")
  h2.d-flex.align-center Cadastro
  v-form.mt-2
    v-text-field(
      label="Nome"
      v-model="user.name"
      required
    )
    v-text-field(
      label="E-mail"
      v-model="user.email"
      required
    )

    v-text-field(
      label="Senha"
      v-model="user.password"
      required
    )
    v-btn(class="bg-orange" @click="signUp()") Cadastrar
    p.ma-2 Já é cadastrado? Faça o 
      NuxtLink(to="/login") Login
</template>