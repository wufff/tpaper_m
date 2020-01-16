<template>
  <div class="page">
      <div class="head">
        <span class="back" @click="back" >
              <span class="img back-bt">
                <img src="../assets/arrow_left_b.png" alt="">
              </span>
           </span>
          <div class="inner">
             下载记录
          </div>
     </div>       
     <div class="main">
      <div class="list">
       <cube-scroll
          ref="scroll" 
          :options="options"
          @pulling-up="onPullingUp"
          >        
          <div class="scrollwrap">
               <div class="recommend">
                <div class="noneData" v-if="datalist.length < 1">{{text.noneText}}</div>
                 <ul class="list">
                      <li v-for="(item,index) in datalist">
                         <router-link :to="{path:'/paperDtail',query:{id:item.paper_code_crc32}}" tag="div" class="top">
                            <h4>{{item.paper_title}}</h4>
                            <div class="info">
                                <span>共 {{item.paper_q_count}} 题</span>
                            </div>
                            <span class="time">{{item.add_time.slice(0,11)}}</span>                             
                         </router-link>
                         <div class="bottom clearfix">
                             <div class="tab" @click="delet({paper_code_crc32:item.paper_code_crc32},index)">
                                <span class="img dele_h">
                                    <img src="../assets/dele_h.png" alt="">
                                </span>
                                删除试卷
                                <div class="border-right"></div>
                             </div>
                              <div class="tab" @click="goDown(item.paper_code_crc32)">
                                <span class="img save_h">
                                    <img src="../assets/save_h.png" alt="">
                                </span>
                                下载试卷
                             </div>                             
                         </div>
                      </li>                                                                                                             
                 </ul>
               </div>             
          </div>
       </cube-scroll>  
      </div>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { history_xz,deledown} from '@/api'
export default {
  name: 'home',
  data(){
     return {
        text:{
           noneText:""
        },          
        options:{
           click:true,
           bounce:false,
           pullUpLoad: {
                    threshold: 100,
                    txt: {
                      more: '加载更多',
                      noMore: '没有更多的数据啦'
              }
           }                      
        },
        datalist:[],
        hasNext:true
     }
  },
  computed:{
     lastId(){
        if(this.datalist.length == 0) {
           return 0;
        }else{
          return this.datalist[this.datalist.length-1].id;
        }
     }
  },
  created(){
     this.renderPages(1,true);
  },  
  methods:{
     back(){
       window.history.go(-1);
     },
     goDown(id){
        this.$router.push({path:"/mydown",query:{id:id}})
     },
     delet(obj,index){
         deledown(3,obj).then((data)=>{
               this.datalist.splice(index,1)
        })
     },
     renderPages(tpye,isfisrt,fun){
         history_xz(tpye,{id:this.lastId}).then((data)=>{
            console.log(data);
            this.text.noneText ="暂无下载记录！"
            if(isfisrt){
               this.datalist = data;
               console.log(this.datalist);
            }else{
               this.datalist.push(...data);
            }
            if( data.length == 0 ){
                this.$refs.scroll.forceUpdate();
            }   
            this.hasNext =  data.length == 0 ?  true : false ; 
            if(fun){
               fun(this.hasNext);
            }
        })       
     },
     onPullingUp(){
        var _this  = this;
        this.renderPages(3,false,function(has){
            console.log(has);
            if(!has){
                _this.$refs.scroll.forceUpdate();
            }else{
                _this.$refs.scroll.refresh();
            }
        }); 
      }    
  },  
  components: {
     
  }
}
</script>
<style scoped lang="less">
    .main {
       padding-top: 35px;
       padding-bottom: 0px;
    }
   .goVip {
       height: 34px;
       color:#7f5010;
       line-height: 35px;
       padding:0 15px;
       background:url("../assets/arrow_right_z.png") no-repeat #dcaf72;
       background-size:  6px 15px;
       background-position: 97% 10px;;
       .vipImg { 
          width: 16px;
          height: 14px;
        }
   }
   .nav { 
      width: 100%;
      padding: 30px 15px 20px 15px;
      background-color: #fff;
      margin-bottom: 9px;
      > div {
         float: left;
         width: 33.33%;
         text-align: center;
         img {
           width: 38px;
           height: 38px;
           margin-bottom: 17px;
         }
         .name { 
               font-size: 14px;
               // font-weight: bold;
               color:#000000;
          }
      }
   }

 .border-right{
      display: block;
      width: 1px;
      height: 20px;
      background: #ddd;
      position: absolute;
      top: 11px;
      right:0; 
   }



   .recommend {
     padding: 6px 0 0 0;
     .more {
       font-size: 15px;
       color:#5e5e5e;
     }
     .list > li{
        padding: 16px 10px 0 10px;
        position: relative;
        background-color: #fff;
        margin-top: 10px;
        .top{
           padding-bottom: 18px;
        }
        .info{
           font-size: 14px;
           color:#919191;
           > span { margin-right: 10px; }
          
        }
        .time {
             position: absolute;
             right: 15px;
             bottom:56px;
             color:#919191;
           }   
        .bottom{
           .tab {
              width: 50%;
              float: left;
              color:#919191;
              font-size: 14px;
              color:#919191;
              text-align: center;
              height: 43px;
              line-height: 43px;
              border-top: 1PX solid #ddd;
              position: relative;
           }
          .dele_h {
              width: 18px;
              height: 18px;
             position: relative;
              top:2px;
              margin-right: 2px;              

          }
          .save_h {
              width: 16px;
              height: 16px;
              position: relative;
              top:2px;
              margin-right: 3px;
          }
        }       
     }
   }

   //下拉框
  .selectBox {
      width: 100%;
      height: 100%;
       position: fixed;
       left:0;
       right:0;
       top:0;
       z-index: 90;
       background-color: rgba(0,0,0,0.5);
       padding-top: 49px;
       .content {
          background-color: #fff;
          padding: 4px 15px;
          h6 {
             font-size: 15px;
             color:#000;
             height: 44px;
             line-height: 44px;
          }
          ul{
             width: 360px;
             margin-bottom: 3px;
          }
          li {
             float: left;
             width: 76px;
             height: 35px;
             line-height: 35px;
             text-align: center;
             background-color: #f1f1f1;
             margin-right: 14px;
             margin-bottom: 14px;
          }
         
       }

  }
   


</style>
