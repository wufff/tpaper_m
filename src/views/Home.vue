<template>
  <div class="page">
  	 <div class="head">
  	 	<span class="moreBt" @click="showStduy">
  	 		<img src="../assets/more.png" alt="">
  	 	</span>
  	 	{{$local.stage_zh(head_s.stage_code)}} <span class="space" v-show="head_s.stage_code">·</span> {{head_s.subject_name}}
  	 </div>
  	 <div class="main">
      <div class="list">
       <cube-scroll
          ref="scroll" 
          :options="options">        
  	 	    <div class="scrollwrap">
              <router-link to="/buy" tag="div" class="goVip" v-show="!is_vip">
                      <span class="vipImg img">
                        <img src="../assets/vip.png" alt="">
                      </span>
                          开通VIP享更多会员特效
              </router-link>
               <div class="nav clearfix">
                <router-link :to="{path:'/items',query:{tree:'open'}}" tag="div">
                  <img src="../assets/bases.png" alt="">
                  <div class="name">知识点选题</div>
                </router-link>
                <router-link to="/allpaper" tag="div">
                  <img src="../assets/selects.png" alt="">
                  <div class="name">试卷选题</div>
                </router-link>
                <router-link to="/my/history_ct" tag="div">
                  <img src="../assets/wrongs.png" alt="">
                  <div class="name">错题本</div>
                </router-link>  
               </div>
               <div class="recommend">
                 <h3>
                  精选试卷
                    <router-link to="/allpaper" tag="span" class="more">更多</router-link>
                 </h3>
                 <ul class="list">
                      <router-link :to="{path:'/paperDtail',query:{id:item.paper_code_crc32}}" tag="li" v-for="(item,index) in paper_list" :key="index">
                          <h4>{{item.paper_title}}</h4>
                          <div class="info">
                              <span>浏览：{{item.view_count}}</span>
                              <span>下载：{{item.download_count}}</span>
                          </div>
                          <span class="time">{{item.paper_creation_offset}}</span>
                      </router-link>                                                                         
                 </ul>
               </div>             
          </div>
       </cube-scroll>  
  	  </div>
      <foot></foot>	
     </div>
     <div class="selectBox" v-show="secetVisb">
       <div class="list">
        <cube-scroll
          ref="scroll" 
          :options="options">        
          <div class="scrollwrap">  
            <transition name="up">        
                 <div class="content" v-show="secetVisb">
                    <div class="item" v-for="(item,index) in subject_" >
                        <h5>{{$local.stage_zh(index+1)}}</h5>
                        <div class="inner clearfix">
                           <span 
                           v-for="(item1,index2) in item" 
                           :class="{active:head_s.subject_code == item1.subject_code && head_s.stage_code == index+1}" 
                           @click="selectSub(item1.subject_code,item1.subject_name,index)"
                           >{{item1.subject_name}}</span>         
                        </div>
                    </div>           
                 </div>
            </transition>
          </div>
         
           </cube-scroll>          
        </div>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import { indexApi, subList } from '@/api';
import  { mapState }  from 'vuex'
export default {
  name: 'home',
  data(){
     return {
        options:{
           click:true,
           bounce:false           
        },
        secetVisb:false,
        paper_list:[],
        subject_:[],
        head_s:{},
     }
  },
  computed:{
     ...mapState(['is_vip']),
  },
  created(){
     var code;
     var url = window.location.href;
     // console.log(url)
     var parms = url.split("?")[1];
     // console.log(parms)
     if(!parms){
        code ="";
     }else{
       var pasrm = parms.split("&");
       for (var i = 0;i<pasrm.length; i++){
          var key = pasrm[i].split("=")[0];
           console.log(key)
          if(key == "code"){
             code = pasrm[i].split("=")[1]
          }
       }
     }

     console.log(code);

     subList(2).then((res)=>{
        var data = res;
        for(let k in data) {  
            this.subject_.push(data[k]); 
        } 
       var head_save = this.$local.fetch("head_s"); 
       if(!head_save.stage_code){
           this.head_s  = {
              stage_code:1,
              subject_code: this.subject_[0][0].subject_code,
              subject_name: this.subject_[0][0].subject_name
           }
          this.$local.save("head_s",this.head_s);
       }else{
          this.head_s = head_save;
       }

        indexApi(1,{stage_code:this.head_s.stage_code,subject_code:this.head_s.subject_code,code:code}).then((res)=>{
          this.paper_list = res.paper_list;
          // var is = res.is_vip == 1 ? true : false;
          // var user = {
          //     is_vip:is
          // }
          // this.$local.save("user",user);
       })        
     })
  },

  methods:{
    showStduy(){
       this.secetVisb =  !this.secetVisb;
    },
    selectSub(code,name,index){
      this.head_s = {
          stage_code:index + 1,
          subject_code: code,
          subject_name: name
       }        
       this.$local.save("head_s",this.head_s)
       this.showStduy();
       this.refList();
    },
    refList(){
      indexApi(1,{stage_code:this.head_s.stage_code,subject_code:this.head_s.subject_code}).then((res)=>{
          this.paper_list = res.paper_list;
      })       
    }
  },
  components: {
     foot
  }
}
</script>
<style scoped lang="less">
    .main {
       padding-top: 50px;
    }
   .goVip {
   	   height: 34px;
   	   color:#7f5010;
   	   line-height: 35px;
   	   padding:0 15px;
   	   background:url("../assets/arrow_right_z.png") no-repeat #dcaf72;
   	   background-size:  6px 10px;
   	   background-position: 97% 11px;;
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

   .recommend {
   	 background-color: #fff;
   	 padding: 6px 15px;
   	 .more {
   	 	 font-size: 15px;
   	 	 color:#5e5e5e;
   	 }
     .list > li{
        padding: 16px 0;
        border-bottom:1PX solid #e8e8e8; 
        position: relative;
        .info{
           font-size: 14px;
           color:#919191;
           > span { margin-right: 10px; }
          
        }
        .time {
             position: absolute;
             right: 0;
             bottom:16px;
              color:#919191;
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
       padding-top: 53px;
       .list {
          width: 100%;
          height: 100%;
          background: #fff;
       }
       .item {
          h5 {
             height: 35px;
             line-height: 35px;
             margin-bottom: 5px;
          }
          .inner {
            span {
               float: left;
               margin-right: 10px;
               margin-bottom: 10px;
               width: 78px;
               height: 33px;
               line-height: 36px;
               display: block;
               text-align: center;
               background-color: #f1f1f1;
               font-size: 14px;
               &.active {
                  background-color: #37aafd;
                  color:#fff;
               }
            }
          }
       }
       .content {
          background-color: #fff;
          padding: 15px 0px 4px 15px;
          height: 100%;
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
