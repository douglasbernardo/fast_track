<script lang="ts" setup>
  import axios from 'axios'
  const code = reactive({
    value: ''
  })
  const codeRules = ref([
    value => {
      if(value.length <= 13) return true
      return 'O codigo deve conter apenas 13 caracteres'
    }
  ])
  const items= [
    {
      color: 'red-lighten-2',
      icon: 'mdi-star',
    },
    {
      color: 'purple-lighten-2',
      icon: 'mdi-book-variant',
    },
    {
      color: 'green-lighten-1',
      icon: 'mdi-airballoon',
    },
    {
      color: 'indigo-lighten-2',
      icon: 'mdi-layers-triple',
    },
  ]
  const trackResult = ref()
  const isLoading = ref(false)
  const clicked = ref(false)
  const trackOrder = async() => {
    clicked.value = true
    isLoading.value = true
    await axios.post('http://localhost:3030/track',{orderCode: code.value})
    .then((res) => {
      trackResult.value = res.data
      isLoading.value = false
    })
  }
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
          v-model="code.value"
          label="Exemplo: AD123456789BR" 
          :counter="13"
          :rules="codeRules"
          variant="solo"
        )
        v-btn(class="bg-orange" @click="trackOrder" append-icon="mdi-magnify" color="orange") Fazer o Rastreamento
        v-progress-circular.ma-2(
          v-show="isLoading && clicked"
          indeterminate
          color="amber"
        )
      template(v-if="trackResult")
        template(v-for="item in trackResult")
          v-timeline(align="start" style="margin-top:6rem")
            v-timeline-item(
              v-for="track in item.eventos"
              class="bg-green-lighten-1"
              fill-dot
            )
              v-card
                v-card-title {{ track.descricao }}
                v-card-text(class="bg-white text--primary")
                  p Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imp.
                  v-btn(
                    :color="item.color"
                    variant="outlined"
                  ) Button
</template>
<style lang="sass">
.v-container
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  width: 100vw
</style>