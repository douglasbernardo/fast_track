import axios from 'axios';
import { defineStore } from 'pinia';

export const codeStore = defineStore('code',{
    state: () => ({
      codes: []
    }),
    actions:{
      async getMyCodes(user: string){
        await axios.post('http://localhost:3030/track/meus-codigos',{user: user }).then((res)=>{
          this.codes = res.data
        })
      }
    }
})