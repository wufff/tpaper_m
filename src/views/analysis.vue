<template>
  <div class="page">
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
               <div class="inner">            
                  <div class="test_title">单选题</div>
                  <div class="test_test">
                        <div class="title">
                          <span class="sort">1.</span>
                          <span class="question">计算: (0-3)x5的结果是 计算: x5的结果是 计算结果是 计算: x5的结结果是 计算: x5的结(   )</span>
                        </div>
                          <ul class="aswerbox">
                             <li class="active">
                                <span class="sort">A.</span>
                                <span class="option">-15-15-15-15-15-15-15-15-15-15-15-15-15</span>
                             </li>
                              <li>
                                <span class="sort">B.</span>
                                <span class="option">-15</span>
                             </li> 
                              <li>
                                <span class="sort">C.</span>
                                <span class="option">-15</span>
                              </li>
                              <li>
                                <span class="sort">D.</span>
                                <span class="option">-15</span>
                             </li>                                             
                          </ul>
                    </div>  
                    <div class="analysis">
                       <div class="inner">
                          解析：
                       <p>)x5的结果是 计算: x5的结果是 计算结果是 
                       )x5的结果是 计算: x5的结果是 计算结果是 计算: x5的结结计算: x5的结结</p>                           
                       </div>
                       <div class="inner">
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
  name: 'analysis',
  data() {
    return {
        testItems:[{name:1},{name:2}],
        options:{
         click:true,
         bounce:false
       },
       user:this.$local.fetch("user"),
       swiperOption:{
         speed:180,
         on:{
          slideChange: function () {
            
            }
          },
          cancelable:false
        }    
    }
  },
  created(){
   
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
  },  
  methods:{
     back(){
       window.history.go(-1);
     }
  },
  components:{
   
   
  }
}

</script>

<style scoped lang="less">

 .page{
     .main {
        padding-top:46px;
     }
     .list {
        position: relative;

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
