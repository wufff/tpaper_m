<template>
  <div class="page">
    <div class="head">
      <span class="back" @click="back">
        <span class="img back-bt">
          <img src="../assets/arrow_left_b.png" alt="">
        </span>
      </span>
        <div class="inner" @click="test">
          在线自测
        </div>
     </div> 
     <div class="timebox">
         已用时：{{time}}</span>
         <span class="img img-time"  @click="showCard">
             <img src="../assets/time.png" alt="">
         </span>
     </div>       
     <div class="main">
        <div class="list">
           <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in datalist " :key="index">
               <div class="inner">            
                  <div class="test_title">{{$local.getQ_Zh(item.qtp_code)}}</div>
                  <div class="test_test">
                        <div class="title">
                          <span class="sort">{{index + 1}}.</span>
                          <span class="question" v-html="item.context"></span>
                         </div> 
                          <ul class="aswerbox" v-if="$local.getQ_Zh(item.qtp_code) == '单选题'">
                               <li v-for="(item2,index2) in item.option" :class="{active:index2 === item.answer}" @click="asDx(index,index2)">
                                  <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                                  <span class="option" v-html="item2"></span>
                                </li>                               
                          </ul>
                           <ul class="aswerbox" v-if="$local.getQ_Zh(item.qtp_code) == '多选题'">
                                <li v-for="(item2,index2) in item.option" :class="{active:item.answer[index2] == 1}" @click="asDd(index,index2)">
                                  <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                                  <span class="option" v-html="item2"></span>
                                </li>                                                               
                          </ul>                                                      
                          <ul class="aswerbox" v-if="$local.getQ_Zh(item.qtp_code) == '判断题'">
                               <li v-for="(item2,index2) in pdoption" :class="{active:index2 === item.answer}" @click="asPd(index,index2)">
                                   <span>{{item2}}</span>
                                </li>                               
                          </ul>                            
                    </div>                    
               </div>
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
         </swiper>    
        </div>
     </div>
    <div class="control">
             <!-- <div class="item">
                上一题
                <span class="border-right"></span>
              </div> -->
            <div class="item disabled" v-show="currut == 0">
                上一题
                <span class="border-right"></span>
            </div>
            <div class="item" v-show="currut > 0" @click="preSile">
                上一题
                <span class="border-right"></span>
            </div>            
            <div class="item" @click="nextSile" v-show="datalist.length > currut + 1">                  
               下一题
            </div>
             <div class="item disabled" v-show="datalist.length == currut + 1 ">                  
               下一题
            </div>            
      </div>
      <transition name="moveLeft">
            <div class="card" v-show="cardshow" id="card">
                <div class="card-items" v-for="(val, key) in cardData">
                    <h5>{{$local.getQ_Zh(key)}}</h5>
                    <ul class="asw clearfix">
                       <li v-for="(item,index) in val">{{index+1}}</li>               
                    </ul>
                </div>
                <div class="sumbitBt" @click="sumbit">
                     交卷
                </div>                    
            </div> 
      </transition>         
  </div>
</template>
<script>
import foot from '@/components/foot.vue'; 
import { swiper, swiperSlide } from 'vue-awesome-swiper';  
import { myTest,subimtTest } from '@/api';
import 'swiper/dist/css/swiper.css'


export default {
  name: 'myTest',
  data() {
    var _this = this;
    return {
       time:"00:00:00",
       datalist:[],
       currut:0,
       second:0,
       cardData:{},
       cardshow:false,
       pdoption:["对","错"],
       swiperOption:{
           speed:180,
           nextButton:'.item',
           on:{
            slideChange: function () {
                 _this.currut = this.activeIndex;
              }
            },
            cancelable:false
          },                 
      }
  },
  created() {
     var id =  this.$route.query.id; 
     myTest(1,{paper_code_crc32:id}).then((data)=>{
        this.startTime();
        this.cardData = data;
        this.initCart();
        for (var x in data){
           this.datalist.push(...data[x]);
        }
     })

  },
  mounted(){
      
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
  },  
  methods:{
     back(){
       window.history.go(-1);
     },
     showCard(){
        this.cardshow = !this.cardshow;
     },
     sumbit(){
         this.showAlert();

     },
     startTime(){
          var count = 0;
          var _this = this;
          var timer = setInterval(function(){
          var h = parseInt(_this.second / 60 / 60);
          var m = parseInt(_this.second / 60) % 60;
          var s = parseInt(_this.second) % 60;
          var ms = "";
          h = h < 10 ? '0' + h : h;
          m = m < 10 ? '0' + m : m;
          s = s < 10 ? '0' + s : s;
          _this.time = h + ':' + m + ':' + s;
          _this.second += 1;
        }, 1000)         
     },
     asDx(index,index2){
          var parent =  document.getElementById("card");
          var lis = parent.getElementsByTagName("li");          
          this.datalist[index].answer = index2;
          lis[index].className = "active";
     },
     asDd(index,index2){
        var parent =  document.getElementById("card");
        var lis = parent.getElementsByTagName("li");         
        var _this = this;
        var v = _this.datalist[index].answer[index2];
        if(v == 1){
           this.$set(_this.datalist[index].answer,index2,"");
            var arry = _this.datalist[index].answer;
           let is_kong = arry.some(item =>{
               return item == 1
           })
           if(!is_kong){
                lis[index].className = "";
           }
        }else{
           this.$set(_this.datalist[index].answer,index2,1);
           lis[index].className = "active";
        }
     },     
     asPd(index,index2){
        var parent =  document.getElementById("card");
        var lis = parent.getElementsByTagName("li");        
        this.datalist[index].answer = index2;
        lis[index].className = "active";
     },
       
     nextSile(){
        this.swiper.slideNext();
     },
     preSile(){
         this.swiper.slidePrev();
     },
     test(){
       this.initCart();
     },
     initCart(){
        var _this = this;
        this.$nextTick(function(){
           setTimeout(function(){
              var parent =  document.getElementById("card");
              var lis = parent.getElementsByTagName("li");
              for(var i = 0;i<lis.length; i++){
                 lis[i].index = i;
                 lis[i].innerHTML = (i+1);
                 lis[i].onclick = function(){
                    var index = this.index;
                    _this.swiper.slideTo(index,0)
                    _this.showCard()
                 }
              }                          
           },10)               
       });
     },
   showAlert() {
          var parent =  document.getElementById("card");
          var lis = parent.getElementsByTagName("li");  
          var parentId = document.querySelector("#card");
          var actives = parentId.querySelectorAll(".active");
          this.$createDialog({
            type: 'confirm',
            title: '确认交卷？您的答题数为:',
            content:actives.length +'/'+lis.length,
            onConfirm:()=>{
                var aswdata =  this.datalist.map(item => {
                        return {
                            master_code:item.master_code,
                            answer:this.$local.fomartAnswer(item.qtp_code,item.answer)
                        }
                });
                var obj = {
                    answer_time:this.second,
                    paper_code_crc32:this.$route.query.id,
                    answer_data:aswdata
                }
                subimtTest(1,obj).then(res=>{
                   this.$router.replace({path:"/result",query:{id:this.$route.query.id}});
                })
            }
         }).show();
         if(lis.length > actives.length) {
             var text =  document.querySelector(".cube-dialog-content-def");
             text.style.color = "red";
         } 
       if(lis.length == actives.length) {
             var text =  document.querySelector(".cube-dialog-content-def");
             text.style.color = "#85c630";
         }            
    }      
  },
  components:{
    foot,
    swiper,
    swiperSlide
  }
}




</script>

<style scoped lang="less">

  .page{
     .main {
        padding-top:87px;
     }
     .list {
        position: relative;

     }
     
  }


.cube-dialog-title .cube-dialog-title-def {
    text-align: center;
    white-space:normal;
 }

.card {
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        width: 100%;
        bottom: 0;
        top:109px;
        background: #fff;
        z-index: 99;
        padding: 16px 28px;
        .card-items {
            margin-bottom: 20px;
        }
        h5 {
            color:#474747;
            margin-bottom: 20px;
        }
        .asw {
         
          li {
             float: left;
             border-radius: 100%;
             width: 30px;
             height: 30px;
             text-align: center;
             line-height: 30px;
             margin-left: 15px;
             margin-bottom: 15px;
             &.active{
               background: #37aafd;
               color:#fff;
             }
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


  .control {
       position: fixed;
       bottom:0px;
       left:0;
       right: 0;
       height: 51px;
       background: red;
       z-index: 80;
       background: #37aafd;
       .item {
          float: left;
          width: 50%;
          text-align: center;
          line-height:50px;
          color: #fff;
          position: relative;
       }
       .disabled {
         color:#73c4fe;
       }
     }  

  



   .border-right{
      display: block;
      width: 1px;
      height: 20px;
      background: #e2e2e2;
      position: absolute;
      top: 14px;
      right:0; 
   }





  .swiper-container {
      width: 100%;
      height: 100%;
      .inner {
         margin-top: 10px;
         background: #fff;
         width: 100%;
         height: 100%;         
      }
  }

 


  .timebox {
      position: fixed;
      top:50px;
      background: #fff;
      left:0;
      right: 0;
      padding: 9px 7px;
      font-size: 16px;
      color:#474747;
      .img-time {
          width: 22px;
          height: 23px;
          position: absolute;
          top: 7px;
          right: 9px;
      }
  }

 .test_title {
    font-size: 16px;
    color:#919191;
    height: 22.5px;
    padding: 16px;
 }
  

 .test_test {
    padding: 16px;
    margin-top: 10px;
    background-color: #fff;
   .add-img { 
        width: 11px;
        height: 11px;
    }
   .add-img_y{
      width: 11px;
      height: 9px;
      margin-right: 3px;
   }    

    .title {
       margin-bottom: 8px;
    }
     .sort{
           position: absolute;
           left:18px;
         }
         .question {
           padding-left: 20px;
           display: block;  
           font-size: 16px;   
           color:#000000;       
      }    
    .aswerbox {
         padding-left:12px; 
         .sort{
           position: absolute;
           left:16px;
         }        
         .option {
           padding-left: 20px;
           display: block;
         }
         li {
           border-radius: 2px;
           // background-color: #a3d3f6;
           padding: 12px 9px 12px 24px;
           border-radius: 5px;
           position: relative;
           background: #f6f6f6;
           margin-bottom: 8px;
           &.active {
             background: #a3d3f6;

           }
         }
         margin-bottom: 30px;
       }     
     .bottom {
        padding-left: 15px;
        color:#919191;
        position: relative;
         .type{ 
            margin-right: 20px;
          }
        .addItemBt{
           position: absolute;
           right: 0;
           bottom: 0;
           border:1px solid #919191;
           border-radius: 2px;
           padding: 6px  9px;
        }
        .addItemBt_y{
           position: absolute;
           right: 0;
           bottom: 0;
           background-color: #37aafd;
           color: #fff;
           border-radius: 2px;
           padding: 6px  9px;           
        }
     }

   }


  



  
 
</style>
