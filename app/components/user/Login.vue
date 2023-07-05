<script lang="ts" setup>
const show1 = ref(false)
const user = reactive({
  email: '',
  password: ''
})

const login = () => {
  const userLogin = {
    email: user.email,
    password: user.password
  }
  console.log(userLogin)
}
</script>
<template lang="pug">
v-container
  v-card.pa-3(:width="inject('isMobile') ? '100%' : '50%'")
    h1.text-center Login
    v-form.mt-2
      v-text-field(
        label="Digite seu E-mail"
        variant="outlined"
        v-model="user.email"
        required
      )

      v-text-field(
        :type="show1 ? 'text' : 'password'"
        label="Digite sua senha"
        variant="outlined"
        v-model="user.password"
        @click:append-inner="show1 = !show1"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      )
      v-btn(class="bg-orange" @click="login()") Logar
      p.ma-2 Não é cadastrado? 
        NuxtLink(to="/cadastro") Cadastre-se
</template>
