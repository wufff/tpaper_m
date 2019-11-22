import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	 num_num:28,
     head_:{
      stage: "",
      subject_code: "",
      subject_name: ""
    }
  },
  mutations: {
  	 addnum(state,paylod){
  	 	state.num_num += paylod.n;
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
  	}
  },
  modules: {
  }
})
