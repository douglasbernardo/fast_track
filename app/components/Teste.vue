<script lang="ts" setup>
  const code = ref('')
  const codeRules = ref([
    value => {
      if(value.length <= 13) return true
      return 'O codigo deve conter apenas 13 caracteres'
    }
  ])
</script>
<template lang="pug">
v-container
    v-sheet(
      class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
      elevation="4"
      height="290"
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
          v-model="code"
          label="Exemplo: AD123456789BR" 
          :counter="13"
          :rules="codeRules"
          variant="solo"
        )
        v-btn(class="bg-orange" append-icon="mdi-magnify" color="orange") Fazer o Rastreamento
</template>

<style lang="sass">
.v-container
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  width: 100vw
</style>