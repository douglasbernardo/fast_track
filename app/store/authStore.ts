
import axios from "axios"
import { defineStore } from "pinia"

export const useStore = defineStore('user', {
  state: () => ({
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token')
  }),

  actions: {
    async signIn(email: string, pass:string) {
      await axios.post('http://localhost:3030/auth/login',{
        email: email,
        password: pass
      }).then((res)=>{
        this.user = res.data.payload.name
        this.token = res.data.access_token
        localStorage.setItem('user',res.data.payload.username)
        localStorage.setItem('token',res.data.access_token)
        navigateTo('/')
      })
    },
    async signUp(name:string, email: string, pass:string) {
      await axios.post('http://localhost:3030/user/cadastro',{
        name: name,
        email: email,
        password: pass
      }).then((res)=>{
        if(res) navigateTo('/login')
      })
    },
    logout(){
      this.user = null
      this.token = null
      localStorage.clear()
      navigateTo('/')
    }
  }
})