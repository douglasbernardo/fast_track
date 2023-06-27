<template lang="pug">
v-card.pa-3(width="100%")
  h2.d-flex.align-center Login
  v-form.mt-2
    v-text-field(
      label="E-mail"
      required
    )

    v-text-field(
      label="Senha"
      required
    )
    v-btn(class="bg-orange") Logar
    div.d-inline-block
      p.ma-2 Ainda não é cadastrado? 
    NuxtLink(to="/cadastro") Cadastre-se
</template>
