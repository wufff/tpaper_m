<template>
  <div class="detailPage" v-show="visble">
    <div class="head">
      <span class="back" @click="back">
        <span class="img back-bt">
          <img src="../assets/arrow_left_b.png" alt="">
        </span>
      </span>
        <div class="inner">
          试题详情
        </div>
     </div>
     <div class="main">
        <div class="list">
               <div class="inner" v-if="(data.qtp_code)" v-show="readys">            
                  <div class="test_title">{{$local.getQ_Zh(data.qtp_code)}}</div>
                  <div class="test_test">
                        <div class="title">
                          <!-- <span class="sort">1.</span> -->
                           <div v-html='data.context'></div>
                        </div>
                      <ul class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '单选题'">
                         <li v-for="(item2,index2) in data.option" :class="{active:index2 == data.right_answer}">
                            <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                            <span class="option" v-html="item2"></span>
                          </li>                               
                      </ul>
                       <ul class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '多选题'">
                         <li v-for="(item2,index2) in data.option" :class="{active:data.right_answer[index2] == 1}">
                            <span>{{$local.ABC_Zh(index2)}}.</span>
                            <span>{{item2}}</span>
                          </li>                               
                      </ul>                      
                      <ul class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '判断题'">
                         <li v-for="(item2,index2) in option_" :class="{active:index2 == data.right_answer-1}">
                            <span>{{item2}}</span>
                         </li>                            
                      </ul>  
                      <div class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '填空题'">
                         <div class="aswer_label">答案：</div>
                         <div class="aswer_content" v-for="(item2,index2) in data.right_answer">
                            <span>{{item2}}</span>
                         </div>
                      </div>
                       <div class="aswerbox" v-if="$local.getQ_Zh(data.qtp_code) == '简答题'">
                         <div class="aswer_label">答案：</div>
                         <div class="aswer_content">
                            <span v-html='data.right_answer'></span>
                         </div>
                      </div>                                                                  
                    </div>  
                    <div class="analysis">
                       <div class="inner" v-if="user.is_vip">
                          解析：
                       <p v-html="data.detailed_answer">
                      
                       </p>                           
                       </div>
                       <div class="inner" v-if="!user.is_vip" @click="buy">
                          <div class="govip">
                             <span class="img vip">
                               <img src="../assets/vip.png" alt="">
                             </span>
                             开通vip查看试题解析
                             <span class="img arrow_right">
                                <img src="../assets/arrow_right_z.png" alt="">
                            </span>                             
                          </div>
                       </div>
                    </div>                  
               </div> 
        </div>
     </div>       
  </div>
</template>
<script>

 


export default {
  name: 'itemDtail',
  props:{
     data: {
       type:Object,
       default: {}
    }
  },    
  data() {
    return {
       user:this.$local.fetch("user"), 
       option_:["错","对"],
       visble:false,
       readys:false
    }
  },
  created(){
     // console.log(this.$local.fetch("user"));
  },
  computed: {
    
  },  
  methods:{
     back(){
       this.visble = false;
       this.readys = false;
     }, 
     show(){
       this.visble = true;
     },
     ready(){
       this.readys = true;
     },
     buy(){
       this.$router.push("/buy")
     }
  },
  components:{
      
   
  }
}

</script>

<style scoped lang="less">

 
  .detailPage {
      height: 100%;
      width: 100%;
      position: fixed;
      left: 0;
      right: 0;
      top:0;
      z-index:999;
      background: #fff;
      padding-top: 52px;
  }
   
  .main {
     .list{
       overflow-y: auto;
     }
     padding-bottom: 0;
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






 .test_title {
    font-size: 16px;
    color:#919191;
    height: 22.5px;
    padding: 16px;
 }
  

 .test_test {
    padding: 16px;
    margin-top: 0px;
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
       margin-bottom: 20px;
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
         padding-left: 0;
         .aswer_label { 
            display: inline; 
          }
        .aswer_content{
           display: inline-block; 
        }
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
             background: #b9eb79;

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



   .analysis {
      padding: 0 16px;
      margin-top: -30px;
      .inner{
          padding: 15px;
          background: #f6f6f6;
          border-radius: 4px;
          p {
             line-height: 1.6
          }
      }
     .govip{
        background: #e2b77c;
        height: 100%;
        width: 100%;
        height: 49px;
        line-height: 49px;
        padding-left:10px;
        color:#7f5010;
       
     }
   }
  
 .arrow_right {
            width: 6px;
            height:10px;
            float:right;
            margin-right: 12px;
        }   

  .vip {
        width: 19px;
        height: 18px;
        margin-right: 5px;
        position: relative;
        top:2px;

  }
  
 
</style>
