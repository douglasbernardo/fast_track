// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr:false,
  css: ['vuetify/lib/styles/main.sass','@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@vite-pwa/nuxt'
  ],
  pwa: {
    manifest: {
      name: "Fast Track",
      short_name: "FAST T",
      description:"Rastreador de encomendas",
      icons: [
        {
          src:'icons/track-64.png',
          sizes:'64x64',
          type:'image/png'
        },
        {
          src:'icons/track-512.png',
          sizes:'512x512',
          type:'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions:{
      enabled: true,
      type: "module"
    }
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  }
})
