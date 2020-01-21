<template>
  <div class="page">
      <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
             下载试卷
          </div>
     </div>   	  
  	 <div class="main">
        <div class="list">
            <div class="head-title">
               <h5>{{title}}</h5>
                <span>类型：{{paper_extent_name}}</span>
                <span>大小：{{paper_size}}</span>
                <span class="time">{{time}}</span>
           </div> 
           <div class="email">
              <h5>邮箱</h5>
              <div class="content">
                 <input type="text" v-model="email" class="emailInput" placeholder="输入您的邮箱">
              </div>
              <div class="notice">
                *试卷将发送到您的邮箱，请确保邮箱信息有效无误。
              </div>
           </div>   	 	    
    	  </div>
     </div>
    <div class="sumbitBt" @click="sumbit">
        <span class="img downLoad_b">
               <img src="../assets/downLoad_b.png" alt="">
         </span>  
         提交下载申请
      </div>   
  </div>
</template>

<script>
// @ is an alias to /src
import { myDwon, down,VEREMAL,DOWNDOC } from '@/api'

export default {
  name: 'myDwon',
  data(){
     return {
        selected: 3,
        email:"",
        title:"",
        time:"",
        paperTitle:"",
        selectVisb:true,
         paper_extent_name:"",
         paper_size:""
     }
  },
  created(){
      let id = this.$route.query.id;
      VEREMAL(1,{paper_id:id}).then((res)=>{
         let data = res["paper_info"];
         this.paperTitle = data;
         this.title = data.paper_title;
         this.time = data["add_time"];
         this.email = data.email;
         this.paper_extent_name = data.paper_extent_name;
         this.paper_size = data.paper_size;
      })      
  },
  methods:{
     back(){
       window.history.go(-1);
     },
      sumbit(){
        if(!this.email){
            this.$createToast({
                type: 'none',
                time: 800,
                txt: `请输入邮箱`
            }).show();             
        }else{
            let  obj = {
                paper_id:this.$route.query.id,
                email:this.email
            };
            DOWNDOC(1,obj).then((data)=>{
               this.$createToast({
                    type: 'none',
                    time: 1000,
                    txt: data
                 }).show();
               if( data == "发送成功" ){
                   setTimeout(function(){
                       window.history.go(-1);
                   },1000)
               }
            })
        }
     }
  },
  components: {
     
  }
}
</script>
<style scoped lang="less">
    .main {
       padding-top: 52px;
       padding-bottom: 0px;
    }
   .goVip {
   	   height: 34px;
   	   color:#7f5010;
   	   line-height: 35px;
   	   padding:0 15px;
   	   background:url("../assets/arrow_right_z.png") no-repeat #dcaf72;
   	   background-size:  6px 15px;
   	   background-position: 97% 10px;
   	   .vipImg { 
          width: 16px;
          height: 14px;
   	    }
   }


 .downLoad_b {
      width: 17px;
      height: 17px;
      position: relative;
      top:2px;
      margin-right: 2px;
  }   


   .type {
      background:#fff;
      h5 {
          height: 42px;
          line-height: 42px;
          padding-left: 15px;
           font-size: 16px;
      }
      margin-bottom:10px;
   }
   .email {
      background:#fff;
      padding: 5px 15px 25px 15px;
      h5 {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
      }    
      .content {
          input {
              width: 88%;
              display: block;
              background-color: #f1f1f1;
              height: 40px;
              line-height: 40px;
              padding:0 20px;
          }
      }  
   }
   .notice {
      color:#777777;
      font-size: 14px;
      padding-top: 10px;
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


 .sumbitBt {
     height: 50px;
     background: #37aafd;
     color:#fff;
     text-align: center;
     position: absolute;
     bottom: 0;
     left:0;
     right: 0;
     width: 100%;;
     line-height: 50px;
     font-size: 18px;
     letter-spacing: 2px;
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
   	 padding: 6px 0;
   	 .more {
   	 	 font-size: 15px;
   	 	 color:#5e5e5e;
   	 }
     .list > li{
        padding: 16px 10px 0 10px;
        position: relative;
        background-color: #fff;
        margin-bottom: 10px;
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

.head-title {
    background: #fff;
    padding:10px 15px;
    font-size: 15px;
    position: relative;
    margin-bottom: 10px;
    h5 {
       margin-bottom: 5px;
    }
    span {
       font-size: 14px;
       color:#919191;
        margin-right: 10px;
    }
    .time {
       position: absolute;
       bottom:10px;
       right: 15px;
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
