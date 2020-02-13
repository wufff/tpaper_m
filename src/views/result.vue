<template>
  <div class="page">
     <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
              结果与解析
          </div>
      </div>
      <div class="timebox">
         <div class="title">{{paperTitle.paper_title}}</div>
         <div class="info">
            <span class="space">共用时：{{paperTitle.exam_time}}</span> 
            <span>正确率：{{paperTitle.right_percent}}</span>
         </div>
         <span class="img img-time"  @click="showCard">
             <img src="../assets/time.png" alt="">
         </span>
     </div>
     <div class="main">
         <div class="list">
            <cube-scroll
            ref="scroll"
            :options="options"> 
            <div class="scrollwrap">
                <div class="type" v-for="(val, key) in datalist">
                   <div class="test_title">{{$local.getQ_Zh(key)}}</div>
                   <div class="test_test" v-for="(item,index) in val">
                        <div class="title">
                          <span class="sort">{{index+1}}.</span>
                          <span class="question" v-html='item.context' :class="{wrong:item.is_right == 0}"></span>
                        </div>
                          <ul class="aswerbox" v-if=" key == 'QTP_OBJ_003'">
                             <li :class="{active:index2 == item.select_answer}" v-for="(item2,index2) in item.option">
                                <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                                <span class="option" v-html="item2"></span>
                             </li>                                      
                          </ul>
                          <ul class="aswerbox" v-if=" key == 'QTP_OBJ_004'">
                             <li :class="{active:item.select_answer[index2] == 1}"  v-for="(item2,index2) in item.option">
                                <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                                <span class="option" v-html="item2"></span>
                             </li>                                      
                          </ul>
                          <ul class="aswerbox" v-if=" key == 'QTP_OBJ_006'">
                             <li :class="{active:index2 == item.select_answer }"   v-for="(item2,index2) in pdda">
                                <span class="sort"></span>
                                <span v-html="item2"></span>
                             </li>                                      
                          </ul>                                                        
                          <div class="rightbox">正确答案： <span class="ringtSpan">{{item.right_answer}}</span></div>
                          <!-- <div class="angls">查看解析</div> -->
                          <div class="angls_y">
                             <div class="title">解析</div>
                             <p v-html="item.detailed_answer"></p>
                          </div>
                    </div>                                                 
                </div>                              
              </div>
             </cube-scroll>                    
         </div>
     </div>
     <transition name="moveLeft">
                      <div class="card" v-show="cardshow">
                          <div class="card-items" v-for="(item,index) in cardData">
                              <h5>{{item.qtp_code_descript}}</h5>
                              <ul class="asw clearfix">
                                 <li v-for="(item2,index2) in item.data" 
                                 :class="{disable:item2.is_right == 2,wrong:item2.is_right == 0}"
                                 >{{index2+1}}</li>
                              </ul>
                          </div>
                         <div class="notice">
                            注：以下题目无法自测,可以查看解析
                         </div>
                         <div class="card-items" v-for="(item,index) in cardData2">
                              <h5>{{item.qtp_code_descript}}</h5>
                              <ul class="asw clearfix">
                                 <li v-for="(item2,index2) in item.data" 
                                 class="disable"
                                 >{{index2+1}}</li>
                              </ul>
                          </div>                                                             
                      </div>
                                                
      </transition>                                        
  </div>
</template>
<script>
import { result , resultCrad } from '@/api'
 export default { 
    name: 'result',
    data(){
         return {
           options:{
             click:true,
             bounce:false
           },
           datalist:{},
           pdda:["对","错"],
           paperTitle:{},
           // user:this.$local.fetch("user"),
           cardData:{},
           cardData2:{},
           user:{
              is_vip:false
           },
           cardshow:false
         }
    },
    created(){
       var id = this.$route.query.id;
       result(1,{paper_code_crc32:id}).then((data)=>{
          this.datalist = data.exam_data;
          this.paperTitle = data.paper_info;
       })
       resultCrad(3,{paper_code_crc32:id}).then((data)=>{
          this.cardData = data.online_exam;
          this.cardData2 = data.out_line_exam;
          console.log(this.cardData2);
       })
    },
    methods:{
       back(){
         window.history.go(-1);
       },
       goAnal(){
           this.$router.replace({path:"/analysis",query:{id:this.$route.query.id}});
       },
       showCard(){
          this.cardshow = !this.cardshow;
       }
    }
  }  
</script>
<style scoped lang="less">
.main {
   padding-top: 138px;
   padding-bottom: 0;
   .list {

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
      padding:15px 20px;
      .img-time {
          width: 22px;
          height: 23px;
          position: absolute;
          top: 30px;
          right: 18px;
      }
      .space {
         margin-right: 10px;
      }
      .title {
         margin-bottom: 15px;
      }
      .info {
         color:#919191;
      }
  }  


.card {
        position: fixed;
        left: 0;
        right: 0;
        width: 100%;
        bottom: 0;
        top:138px;
        background: #fff;
        z-index: 999;
        padding: 16px 28px;
        overflow-y:auto; 
        .card-items {
            margin-bottom: 10px;
        }
        h5 {
            color:#474747;
            margin-bottom: 10px;
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
             margin-bottom: 10px;
             &.wrong{
               background: #c85a63;
               color:#fff;
             }
             &.disable{
               color:#c6c6c6;
             }
                     
          }
        }
        .notice {
           color :#c6c6c6;
           margin-bottom: 20px;
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


 .type {
     margin-bottom: 5px;
    .test_title{
        padding: 15px 18px;
       
    }
    .angls {
       padding-left: 10px;
       color:#37aafd;
    }
    .angls_y{
        padding-left: 10px;
        .title {
           color:#37aafd;
        }
        p {
           line-height: 1.4;
           color:#474747;
        }
    }
   .rightbox {
            padding-left:10px; 
            color:#37aafd;
            margin-bottom: 10px;
            .ringtSpan {
                color:#000;
            }
         }     

 }


 .test_test {
    padding: 16px;
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
           margin-bottom: 15px;
         &.wrong { 
            // background: 
            color:#c85a63;              
        }                 
      }    
    .aswerbox {
         padding-left:12px; 
         .sort{
           position: absolute;
           left:16px;
         }     

        .yesorno{
           position: absolute;
           right:12px;
           top:0;
           bottom: 0;
           width:14px; 
           display: flex;
           align-items:center;           
           .img {
             display: block;
             width: 100%;
           }
           .img-false {
              width: 10px;
           }
         }           
         .option {
           padding-left: 20px;
           display: block;
           padding-right:10px;
          
         }
         li {
           border-radius: 2px;
           // background-color: #a3d3f6;
           padding: 12px 9px 12px 24px;
           border-radius: 5px;
           position: relative;
           background: #f6f6f6;
           margin-bottom: 10px;
           &.wrong {
             background: #e89da4;
           }
           &.right {
              background-color: #b9eb79;
           }
           &.active{
                background: #a3d3f6;
            }                

         }
         margin-bottom: 20px;
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
