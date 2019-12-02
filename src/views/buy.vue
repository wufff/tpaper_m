<template>
  <div class="page">
     <div class="head" id="head">
     	<span class="back" @click="back">
	  	 	<span class="img back-bt">
	  	 		<img src="../assets/arrow_left_b.png" alt="">
	  	 	</span>
  	 	</span>
  	    <div class="inner">
  	    	VIP会员
  	    </div>
        <span class="buyHistory" @click="goHistory">购买记录</span>
  	 </div>         
     <div class="main">
     	 <div class="list">
	          <cube-scroll
		          ref="scroll" 
		          :options="options">
		          <div class="scrollwrap">
				          <div class="author">
                      <img src="http://wufff.static.dev.dodoedu.com/fztkPage/frontend/images/headbj.png" alt="" class="headimg">
                      <div class="my">
                         <div class="name">{{user_info.user_name}}</div>
                         <div class="info" v-show="!user.is_vip" v-if="ready">您暂未开通会员</div>
                         <div class="info" v-show="user.is_vip" v-if="ready">会员到期时间:{{vip_end_time}}</div>
                         <div class="info" v-show="user.is_vip"  v-if="ready">剩余下载次数:{{not_download_paper_count}}</div>
                      </div>                           
                  </div>
                  <div class="buybox">
                      <h3>开通包月会员</h3>
                      <ul class="buyType">
                         <li class="buyItems active" v-for="(item,index) in vip_items">
                             <div class="type">
                                <div class="mouth">{{item.time}}</div>
                                <div class="can">可下载 {{item.download_paper_count}} 分试卷</div>
                             </div>
                             <div class="priceWrap" @click="play(item.pay_type,item.time)">
                                 ¥ {{item.order_amount / 100}}
                             </div>
                         </li>                                                        
                      </ul>
                   <!--    <div class="btnWrap">
                          <div class="btn">立即开通</div>
                      </div>   -->
                      <div class="benefit">
                          <h3>会员权益</h3>
                          <ul class="benefit">
                            <li>
                              <span class="img free">
                                 <img src="../assets/free.png" alt="">
                              </span>
                              <div>免费查看解析</div>
                            </li>
                              <li>
                              <span class="img freeDown">
                                 <img src="../assets/freeDown.png" alt="">
                              </span>
                              <div>免费下载试卷</div>
                            </li>
                            <li>
                              <span class="img freeWrong">
                                 <img src="../assets/freeWrong.png" alt="">
                              </span>
                              <div>保存错题</div>
                            </li>                                                        
                          </ul>
                      </div> 
                      <div class="noice">
                         <h3>开通说明</h3>
                          <p>1.购买后无法退款，敬请谅解；<br/>
                          2.若充值后会员未能及时生效，请尝试退出长江题库组卷网后再次进入长江题库组卷网查看；若还是无法解决问题，请拨打客服电话400-0000-0000致电客服。</p>
                      </div>                   
                  </div> 
                  
                                     
		          </div>       	 	
	          </cube-scroll>
     	 </div>
     </div>
     <div class="buy-mark" v-show="dialog">
         <transition name="up">
              <div class="buy-dialge" v-show="dialog">
                   <span class="img vip_close" @click="closedailog">
                      <img src="../assets/vip_close.png" alt="">
                   </span>
                   <span class="img vip">
                      <img src="../assets/vip.png" alt="">
                   </span>
                   <div class="nitco">您将购买会员: {{buyTime}}</div>
                   <div>
                       <div class="buyBt" @click="payM">
                           微信支付
                       </div>
                   </div>
               </div>  
        </transition>
     </div>
  </div>
</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import {BUY,PAY} from '@/api';


export default {
  name: 'BUY',
  data(){
     return {
       options:{
         click:true,
         bounce:false,
       },
       user:this.$local.fetch("user"),
       user_info:{},
       vip_items:[],
       buyTime:"",
       buyType:"",
       dialog:false,
       vip_end_time:"",
       not_download_paper_count:"",
       ready:false
     }
  },
  created(){
     BUY(1).then((data)=>{
        this.user_info = data.user_info;
        this.vip_items = data.open_vip_type;
        this.vip_end_time = data.vip_end_time;
        this.not_download_paper_count = data.not_download_paper_count;
        this.ready = true;
        // console.log(data);
     })

     
  },
  mounted(){
    
  },
  methods:{
    back(){
       	window.history.go(-1);
       },
     goHistory(){
        this.$router.push("/buyhistory");
     },
     play(type,time){
        this.dialog = true;
        this.buyType = type;
        this.buyTime = time;
     },
     closedailog(){
       this.dialog = false;
     },
     payM(){
       var obj = {
          pay_type:1,
          vip_type:this.buyType
       }
       var _this = this;
       PAY(1,obj).then(data=>{
            function jsApiCall()
            {
                WeixinJSBridge.invoke('getBrandWCPayRequest',data,function (res) {
                          if(res.err_msg == "get_brand_wcpay_request:ok" ){
                          // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                              _this.$router.push({path:"/my",query:{is_order:1}});
                           }else{
                             alert(res.err_code + res.err_desc + res.err_msg);
                          }
                    }
                );

            }

            function callpay()
            {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                } else {
                    jsApiCall();
                }
            }          
           callpay();
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
 	 padding-top: 53px;
 	 padding-bottom: 0;
 }


 .vip_close {
      width: 21px;
      height: 21px;
      position: absolute;
      right:13px;
      top:13px;
 }
 .vip {
    width: 36px;
    height: 32px;
    margin:  0 auto;
    display: block;
    margin-bottom: 13px;
 }
.buy-mark {
      height: 100%;
      width: 100%;
      position: fixed;
      left: 0;
      right: 0;
      top:0;
      z-index:999;
      background: rgba(0,0,0,0.4);     
      .buy-dialge {
           width: 310px;
           height: 200px;
           border-radius: 10px;
           background-color: #dcb073;
           position: absolute;
           margin-left: -155px;
           margin-top: -100px;
           left:50%;
           top: 50%;
           padding-top: 30px;
           .nitco {
              text-align: center;
              color:#7c5724;
              font-size: 16px;
              margin-bottom: 20px;
           }
          .buyBt {
              width: 252px;
              color:#fff;
              background-color: #a05f38;
              text-align: center;
              height: 43px;
              line-height: 43px;
              border-radius: 5px;
              font-size: 16px;
              margin: 0 auto;
              letter-spacing: 2px;
           }           
      }
 }


#head {
   background-color: #ddb175;
   .buyHistory{
     color:#fff;
     position: absolute;
     right:15px;
     top: 2px;
     font-size: 15px;
   }
}
.recommend {
   	 background-color: #fff;
   	 padding: 6px 15px;
   	 margin-top: 10px;
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
         width: 50%;
         text-align: center;
         font-size: 15px;
         color:#000000;
         position: relative;
      }
   }    

.cart_rk {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    position: fixed;
    bottom: 60px;
    right:40px;
    z-index: 999;
    img {
       width: 100%;
       height: 100%;
    }
    .num_num {
       color:#fff;
       right: -5px;
    }
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
  
 .author {
    background-color: #fff;
    overflow: hidden;
    padding: 17px 22px;
    margin-bottom: 10px;
    .my {
       float: left;
    }
    .name {
       font-size: 18px;
       padding-top: 6px;
    }
    .info {
       font-size: 15px;
       color:#919191;
    }
    img {
       width: 54px;
       height: 54px;
       border-radius: 100%;
       float: left;
       margin-right: 10px;
    }
 }
   .buybox {
     background-color: #fff;
     h3 {
       height: 50px;
       line-height: 50px;
       border-bottom: 0;
       padding: 0 16px;
     }
     .buyType {
        padding: 0 16px;
     }
     .buyItems {
        overflow: hidden;
        border:1px solid #d7d7d7;
        border-radius: 6px;
        padding:22px 16px;
        margin-bottom: 10px;
        &.active{
           background-color: #fbf4dc;
        }
        .priceWrap {
            float: right;
            height: 35px;
            width: 70px;
            background: url('../assets/price_bg.png') no-repeat;
            background-size: contain;
            text-align: center;
            line-height: 36px;
            color:#89632d;
            font-size: 15px;
            font-weight: bold;
        }
        ul.buyType {
           margin-bottom: 15px;
        }
        .type {
            float: left;
            .mouth {
                font-size: 15px;
                margin-bottom: 6px;
            }
            .can {
              color:#a49178;
              font-size: 13px;
            }
        }

     }
    .btnWrap {
              padding: 10px 16px 25px 16px;
              .btn {
                  width: 100%;
                  border-radius: 24px;
                  background-color: #ddb174;
                  text-align: center;
                  color:#fff;
                  padding:12px 0;
                  letter-spacing: 2px;
                  font-size: 16px;
              }
          } 
     .benefit {
          overflow: hidden;
          padding-bottom: 10px;           
          .free {
              height: 51px;
              width: 38px;
              display: block;
              margin: 0 auto 15px auto;

          } 
          .freeDown {
              height: 43px;
              width: 54px;
              display: block;
              margin: 5px auto 17px auto;              
          }
          .freeWrong {
              height: 47px;
              width: 46px;
              display: block;
              margin: 4px auto 15px auto;                 
          }
          > li {
              width: 33.33%;
              float: left;
              text-align: center;
              font-size: 15px;
              color:#777777;

          }  
     } 
     .noice {
       p {
         font-size: 15px;
         padding: 0 30px 20px 30px;
          color:#777777;
         
       }
     }        
   }
</style>
