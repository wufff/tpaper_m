import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	 num_num:0,
     head_:{
      stage: "",
      subject_code: "",
      subject_name: ""
    }
  },
  mutations: {
     setnum(state,paylod){
          state.num_num = paylod.n;
     },
  	 addnum(state,paylod){
  	 	state.num_num += paylod.n;
  	 },
     subnum(state,paylod){
      state.num_num -= paylod.n;
     },     
     chagehead(state,paylod){
        state.head_.stage = paylod.stage;
        state.head_.subject_code = paylod.subject_code;
        state.head_.subject_name = paylod.subject_name;
     }
  },
  getters:{
  	 filter_Num(state){
  	 	return state.num_num > 120 ? 120 : state.num_num
  	 }
  },
  actions: {
  	add_num({commit}){
       commit("addnum",{n:1})
  	},
    sub_num({commit}){
        commit("subnum",{n:1})
    },
    set_num({commit},data){
       commit("setnum",{n:data})
    }
  },
  modules: {
  }
})
