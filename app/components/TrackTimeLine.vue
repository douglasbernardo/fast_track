<script lang="ts" setup>
  const props = defineProps({
    array: {type: Array}
  })
</script>
<template lang="pug">
template(v-for="item in array")
  v-timeline.mb-15(align="start")
    v-timeline-item(
      v-for="track in item.eventos"
      dot-color="purple-lighten-3"
      icon="mdi-truck-check"
      fill-dot
      max-width="300"
      )
      v-card
          v-card-title(class="bg-green-lighten-1" class="text-wrap") {{ track.descricao }}
          v-chip.ma-1(variant="outlined") Data: {{ track.dtHrCriado.slice(0,10).split('-').reverse().join('/') }}
          v-chip.ma-1(variant="outlined") Horário: {{ track.dtHrCriado.slice(11) }}
    v-alert(
      v-if="item.mensagem"
      title="Erro Inesperado"
      :text="item.mensagem"
      type="error"
    )
      p Código: {{ item.codObjeto }}
</template>