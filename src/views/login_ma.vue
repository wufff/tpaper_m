<template>
  <div class="page">
    <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
            登录
      </div>
     </div>      
     <div class="main">
         <div class="list">
             <div class="content">
                <div class="item clearfix">
                     <cube-input 
                      v-model="usename" 
                      @blur.native.capture="handleBug" 
                      :clearable="clearable"
                      :placeholder="placeholder1"
                      ></cube-input>
                </div>
                <div class="item clearfix">
                    <cube-input 
                    v-model="password" 
                    :placeholder="placeholder2" 
                    :type="type2"
                     @blur.native.capture="handleBug">
                     </cube-input>
                </div>
                <div class="notice">
                    <span  @click="goForgaet">忘记密码</span>
                </div>                              
             </div>
             <div class="btn_subimt" @click="subimt">
                 登录
             </div>
             <div class="type" @click="goToyz">
                 <span>手机验证码登录</span>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import tree from '@/components/tree.vue'
import encode from 'nodejs-base64-encode'
import md5 from 'md5'
import { LOGIN_M } from '@/api';

export default {
  name: 'items',
  data(){
     return {
       usename:"",
       password:"",
       placeholder1:"请输入手机号(账号)",
       placeholder2:"请输入密码",
       clearable:{
            visible: true, 
            blurHidden: false          
       },
       type2:"password"
     }
  },

  created(){
     
  },
  mounted(){
    
  },
  methods:{
     back(){
       window.history.go(-1);
     },
     goToyz(){
        var id = this.$route.query.redr;
        this.$router.push({path:"/login",query:{redr:id}});
     },
    handleBug() {
        console.log("handleBug")
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
     },      
     subimt(){
        if(this.usename != "" && this.password != ""){
           var statTime_ =  Date.parse(new Date());
           var statTime =  statTime_ / 1000;
           var overTime = statTime + 300;

           // var str = 'user_mobile='+this.usename + '&start_time=' + statTime +'&end_time=' + overTime;
           var obj = {
              user_mobile:this.usename,
              start_time:statTime,
              end_time:overTime
           }

           var str = JSON.stringify(obj);
           var salt_ = encode.encode(str,'base64');
           var md = md5(this.usename+statTime+overTime+"tpaper@&%*$");
           var salt = salt_ + "."+md;
           var obj = {
               salt:salt,
               user_pwd:this.password,
               user_mobile:this.usename,
           }
            LOGIN_M(1, obj).then((data) => {
               // console.log(data);
              if (typeof data == 'object') {
                var token = data.sid;
                var headUrl = data.header_url;
                var hash = this.$route.query.redr ? this.$route.query.redr : "/"; 
                this.$local.save("token", token);
                if(headUrl){
                   window.location.href = headUrl;
                }else{
                  
                    this.$router.push({path:hash});
                                     
                }
              } else {
                this.$createToast({
                  type: 'none',
                  time: 500,
                  txt: data
                }).show();
              }
            })
        }
     },
     goForgaet(){
        var id = this.$route.query.redr;
        this.$router.push({path:"/find",query:{redr:id}});         
     }
  },
  components: {
     foot,
     tree
  }
}
</script>
<style scoped lang="less">
    .main {
       padding-top: 52px;
       background-color: #fff;
    }
  

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


   .content {
     padding-top: 85px;
     margin-bottom: 90px;
     input {
          background-color: #f6f6f6;
          height: 50px;
          line-height: 50px;
          border-radius: 5px;
          display: block;
          padding-left: 25px;
       }
       input.usename {
          width: 260px;
          margin: 0 auto;
          display: block;
          padding:0 25px;
          font-size: 15px;
          margin-bottom: 20px;
       }     
     input.code {
        width: 150px;
        float: left;
     }
     .item {
       margin-bottom: 17px;
       padding:0 35px;
     }
     .codeBtn {
        float:right;
        height: 50px;
        line-height: 52px;
        text-align: center;
        width: 110px;
        background: #37aafd;
        color:#fff;
        border-radius: 5px;
     }
     .notice{
        padding-left: 32px;
        color:#777777;
        margin-bottom: 81px;
        text-align: right;
        padding-right: 30px;
     }
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

   .btn_subimt {
      height: 50px;
      width: 310px;
      margin: 0 auto;
      text-align: center;
      line-height: 50px;
      color:#fff;
      background-color: #37aafd;
      font-size: 17px;
      letter-spacing: 4px;
      border-radius: 3px;
      margin-bottom: 35px;
   }

     .selectBox {
        width: 100%;
        height: 100%;
     }

   .type{
     text-align: center;
     color:#777777;
   }
</style>
