<script lang="ts" setup>
import axios from 'axios';
import { useStore } from '../../store/authStore';
const store = useStore()
const show1 = ref(false)
const user = reactive({
  email: '',
  password: ''
})
const errors = ref<Array<string>>([])
const passedWithNoErrors = ref<Array<boolean>>([])
const login = async () => {
  const regex= /.+@.+\..+/
  user.email && user.password ? passedWithNoErrors.value.push(true) : errors.value.push("Preencha os dados corretamente")
  user.email ? passedWithNoErrors.value.push(true) : errors.value.push("E-mail está vazio")
  user.password ? passedWithNoErrors.value.push(true) : errors.value.push("Senha está vazio")
  regex.test(user.email) ? passedWithNoErrors.value.push(true) : errors.value.push('E-mail é inválido') 
  errors.value = []
  if(passedWithNoErrors.value.every((itens)=>itens===true) && !errors.value.length) {
    store.signIn(user.email,user.password)
  }
}
</script>
<template lang="pug">
v-container
  //-v-list.flex-wrap {{ store }}
  v-card.pa-3(:width="inject('isMobile') ? '100%' : '50%'")
    h1.text-center Login
    v-alert.mb-2(
      v-if="errors"
      v-for="error in errors"
      variant="outlined"
      :text="error" 
      type="error"  
      closable
      close-label="Close Alert"
    )
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
      v-btn(class="bg-orange" @click="login") Logar
      p.ma-2 Não é cadastrado? 
        NuxtLink(to="/cadastro") Cadastre-se
</template>
