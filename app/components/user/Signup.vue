<script lang="ts" setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useStore } from '../../store/authStore';
const snackbar = ref(false)
const {mobile} = useDisplay()
const show1 = ref(false)
const user = reactive({
  name: '',
  email: '',
  password: ''
})
const errors = ref<Array<string>>([])
const passedWithNoErrors = ref<Array<boolean>>([])
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
const store = useStore()
const signUp = async () => {
  const regex= /.+@.+\..+/
  user.email && user.name && user.password ? passedWithNoErrors.value.push(true) : errors.value.push("Preencha os dados corretamente")
  user.name ? passedWithNoErrors.value.push(true) : errors.value.push("Nome está vazio")
  user.email ? passedWithNoErrors.value.push(true) : errors.value.push("E-mail está vazio")
  user.password ? passedWithNoErrors.value.push(true) : errors.value.push("Senha está vazio")
  regex.test(user.email) ? passedWithNoErrors.value.push(true) : errors.value.push('E-mail é inválido') 

  if(passedWithNoErrors.value.every((itens)=>itens===true) && !errors.value.length) {
    store.signUp(user.name,user.email,user.password)
  }
}
</script>
<template lang="pug">
v-container
  v-card.pa-2(:width="mobile ? '100%' : '50%'")
    h1.text-center Cadastro
    v-form.mt-2
      v-alert.mb-2(
        variant="outlined"
        text="Preencha os dados corretamente" 
        type="warning"  
        closable
        close-label="Close Alert"
      )
      v-alert.mb-2(
        v-for="error in errors"
        variant="outlined"
        :text="error" 
        type="error"  
        closable
        close-label="Close Alert"
      )
      v-text-field(
        label="Nome"
        v-model="user.name"
        :rules="nameRules"
        variant="outlined"
        required
      )
      v-text-field(
        label="E-mail"
        v-model="user.email"
        :rules="emailRules"
        variant="outlined"
        required
      )

      v-text-field(
        v-model="user.password"
        :type="show1 ? 'text' : 'password'"
        label="Digite sua senha"
        variant="outlined"
        :rules="passwordRules"
        @click:append-inner="show1 = !show1"
        :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
<style lang="sass" scoped>
.v-container
  display: flex
  justify-content: center
  align-items: center
  height: 100%
  width: 100%
</style>