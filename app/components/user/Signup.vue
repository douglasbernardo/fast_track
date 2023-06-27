<template lang="pug">
v-card.pa-3(width="100%")
  h2.d-flex.align-center Cadastro
  v-form.mt-2
    v-text-field(
      label="Nome"
      required
    )
    v-text-field(
      label="E-mail"
      required
    )

    v-text-field(
      label="Senha"
      required
    )
    v-btn(class="bg-orange") Cadastrar
    div.d-inline-block
      p.ma-2 Já é cadastrado? 
    NuxtLink(to="/login") Login
</template>