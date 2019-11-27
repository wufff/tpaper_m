<template>
  <div class="page">
    <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
            错题记录
      </div>
     </div>      
     <div class="main">
        <div class="list">
            <cube-scroll
            ref="scroll"
            :options="options">
          <span class="pionter">非会员只保留3个月错题记录，请及时整理错题。</span>
          <div class="scrollwrap">
              <div class="test">
                  <div class="title">
                     1. 计算: (0-3)x5的结果是 (   )
                  </div>
                  <ul class="aswerbox">
                     <li>
                        <span>A.</span>
                        <span>-15</span>
                     </li>
                      <li>
                        <span>B.</span>
                        <span>-15</span>
                     </li> 
                      <li>
                        <span>C.</span>
                        <span>-15</span>
                      </li>
                      <li>
                        <span>D.</span>
                        <span>-15</span>
                     </li>                                             
                  </ul>
                  <div class="bottom">
                      <span class="type">单选题</span>
                      <span>使用 0 次</span>
                      <span class="addItemBt" @click="addCart">
                        <span class="img add-img">
                          <img src="../assets/add.png" alt="">
                        </span> 
                        试题栏
                      </span>                                   
                  </div>
              </div>
          </div>   
           </cube-scroll>             
        </div>
     </div>
     <router-link class="cart_rk" to="/cart" tag="div">
              <img src="../assets/cart_rk.png" alt="">
              <span class="num_num">1</span>
       </router-link>         
  </div>
</template>

<script>
import { history_ct } from '@/api';

export default {
  name: 'history_ct',
  data(){
     return {
       options:{
         click:true,
         bounce:false
       },
       datalist:[],
       downlistVisble:false,
       page:{
          current:1,
          totle:1
       }       
     }
  },

  created(){
      this.renderlist(1,"first")
  },
  mounted(){
  
  },
  methods:{
     back(){
       window.history.go(-1);
     },
     renderlist(type,first){
        history_ct(1,{page:this.page.current}).then((data)=>{
           if(first){
              this.datalist = data;
           }else{
            this.datalist.push(...data.data);
          } 
          this.page.totle = data.total_page;
          this.page.current ++;          

        })         
     },
     addCart(){
      
     } 
  },
  components: {
    
  }
}
</script>
<style scoped lang="less">

  

   .pionter {
       padding-left: 15px;
       color: #919191;
       padding-top: 5px;
       display: block;
   }

   .border-right{
      display: block;
      width: 1px;
      height: 20px;
      background: #e2e2e2;
      position: absolute;
      top: 11px;
      right:0; 
   }


   .filter {
      background-color: #fff;
      position: fixed;
      z-index: 98;
      top:50px;
      left: 0;
      right: 0;
      .down-img {
         width: 11px;
         height: 6px;
         position: relative;
         top:-2px;
         margin-left: 5px;
      }

      .item {
         height: 42px;
         line-height: 42px;
         float: left;
         width: 33.333%;
         text-align: center;
         font-size: 15px;
         color:#000000;
         position: relative;
      }
   }

   .main {
        padding-top: 52px;
        padding-bottom: 0px;
   }

   
     .selectBox {
        width: 100%;
        height: 100%;
     }


  .cart_rk {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    position: fixed;
    bottom: 60px;
    left:40px;
    z-index: 99999;
    img {
       width: 100%;
       height: 100%;
    }
    .num_num {
       color:#fff;
       right: -5px;
    }
 }

   
</style>
