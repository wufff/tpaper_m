<template>
  <div id="app">
    <router-view/>  
  </div>
</template>

<style lang="less">
@import './style/reset.css';
body, html, #app {
   width: 100%;
   height: 100%;
   font-size: 15px;
   background-color: #f1f1f1;
}
//==========布局
 .main {
   height: 100%;
   width: 100%;
   padding-bottom:52px;
   .list {
      width: 100%;
      height: 100%;
   }
 }
 .page {
   height: 100%;
   width: 100%;    
 }

.before-trigger {
    color:#999;
}

//===========单件

.item input, .item .cube-input,  .item.cube-input-clear {
    background: #f6f6f6;
}
.item input{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
}
.head {
    height: 50px;
    background-color: #37aafd;
    position: fixed;
    top:0;
    right: 0;
    color:#fff;
    left:0;
    line-height: 50px;
    font-size: 17px;
    padding: 0 15px;
    z-index: 100;
    .inner {
        text-align: center;
        line-height: 50px; 
     }    
    .moreBt {
          display: inline-block;
          width: 16px;
          height: 15px;
          margin-right: 10px; 
          img {
              width: 100%;
              height: 100%;
          }
       }    
   .space {
     font-size: 22px;
   }       
 }
 //模块开头
h3{
   font-size: 17px;
   height:44px;
   line-height: 44px;
   position: relative;
   border-bottom: 1px solid #e8e8e8;
   .more {
     position: absolute;
     right: 0;
     bottom: 0px;
   }
 }
//试卷标题
  h4  {
    font-size: 15px;
    color:#000000;
    margin-bottom: 12px;
    max-height:36px;
    overflow: hidden;
  }
 .img {
   display: inline-block;
   img {
     width: 100%;
     height: 100%;
   }
 }
.downlist {
      width: 100%;
      height: 100%;
       position: fixed;
       left:0;
       right:0;
       top:0;
       z-index: 90;
       background-color: rgba(0,0,0,0.5);
       padding-top: 96px;
       .content {
          background-color: #fff;
          padding: 12px 23px;
          .item {
              line-height: 36px;
              height: 36px;
              color:#919191;
              font-size: 16px;
              &.active {
                  color:#37aafd;
              }
          }
       }
  }


  .downbox {
       width: 100%;
       height: 100%;
       position: fixed;
       left:0;
       right:0;
       top:0;
       z-index: 100;
       background-color: rgba(0,0,0,0.5);   
       padding-bottom: 50px;  
       .downcontent {
          background-color: #fff;
          height: 140px;
          position: absolute;
          bottom:2px;
          width: 100%;
          text-align: center;
          .h3{
             padding-left: 10px;
             padding-top: 15px;
             text-align: left;
             margin-bottom: 15px;
             color:#777;
          }
          .vipBt {
             color:#37aafd;;
          }
       }
  }


 .back {
    display: inline-block;
    width: 40px;
    height: 100%;
    padding-left: 20px;
    position: absolute;
    left:0px;
    bottom: 0;
 }
 .back-bt {
    width: 8px;
    height: 15px;
    position: relative;
    top:2px;
 }


.num_num {
    border-radius: 100%;
    background: red;
    text-align: center;
    line-height: 22px;
    position: absolute;
    font-size: 12px;
    min-width: 22px;
 }


.noneWarp {
    text-align: center;
    padding-top: 155px;
   .none_items {
          width: 108px;
          height: 85px;
          margin-bottom: 15px;
    }    
    .none_com {
        height: 72.5px;
        width: 101.5px;
        margin-bottom: 15px; 
    }
    .title{
        margin-bottom: 15px;
    }
    .goItem {
        color:#37aafd;
        font-size: 17px;
    }
 }


 .test {
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
       margin-bottom: 18px;
       position: relative;
       .sort {
         position: absolute;

       }
       > p { 
         padding-left: 15px;
      }
      > div {
         display: inline-block;
         padding-left: 15px;
      }
    }
    .aswerbox {
         padding-left:12px; 
         .sort{
           position: absolute;
           left:2px;
         }
         .option {
           padding-left: 20px;
           display: block;
         }
         li {
           border-radius: 2px;
           // background-color: #a3d3f6;
           padding: 6px;
           position: relative;
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
           bottom: -7px;
           border:1px solid #919191;
           border-radius: 2px;
           padding: 6px  9px;
        }
        .addItemBt_y{
           position: absolute;
           right: 0;
           bottom: -7px;
           background-color: #37aafd;
           color: #fff;
           border-radius: 2px;
           padding: 6px  9px;           
        }
     }

   }




//==================loading===========================
    .mint-indicator {
          -webkit-transition: opacity .2s linear;
          transition: opacity .2s linear;
      }
      .mint-indicator-wrapper {
          top: 50%;
          left: 50%;
          position: fixed;
          -webkit-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
          border-radius: 5px;
          background: rgba(0,0,0,.7);
          color: #fff;
          box-sizing: border-box;
          text-align: center;
          z-index: 9999
      }
      .mint-indicator-mask {
            top: 0;
            left: 0;
            position: fixed;
            width: 100%;
            height: 100%;
            opacity: 0;
            background: transparent;
            z-index: 9999
       }


      .mint-indicator-spin {
          display: inline-block;
          text-align: center;
      }
      .mint-spinner-snake {
          -webkit-animation: mint-spinner-rotate .8s infinite linear;
          animation: mint-spinner-rotate .8s infinite linear;
          border: 4px solid transparent;
          border-radius: 50%;
      }
      @-webkit-keyframes mint-spinner-rotate {
          0% {
              -webkit-transform: rotate(0deg);
                      transform: rotate(0deg);
          }
          100% {
              -webkit-transform: rotate(360deg);
                      transform: rotate(360deg);
          }
          }
        @keyframes mint-spinner-rotate {
          0% {
              -webkit-transform: rotate(0deg);
                      transform: rotate(0deg);
          }
          100% {
              -webkit-transform: rotate(360deg);
                      transform: rotate(360deg);
          }
}

//============== 小球=============


// ==================动画===========================
.up-enter-active, .up-leave-active {
     transition: .3s;
  }
.up-enter, .up-leave-to /* .fade-leave-active below version 2.1.8 */ {
     transform:translateY(30px);
     opacity: 0
}

.noneData {
   text-align: center;
   padding-top: 50px;
   color: #999999;
   font-size: 16px;
}

// cub-ui

.cube-dialog-btn_highlight {
   color:#37aafd;
}


.vipContent {
    text-align: center;
    line-height: 1.6;
}


.cube-dialog-content-def > p {
   font-size: 15px;
}

body .cube-radio_selected .cube-radio-ui {
    background-color: #37aafd;
  }

.moveLeft-enter-active, .moveLeft-leave-active {
     transition: .3s;
}
.moveLeft-enter, .moveLeft-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform:translateX(100%);
}

body .cube-upload-def .cube-upload-file {
    margin: 0 3px 2px 3px;
}


#del {
   position:absolute;
   right: 20px;
   z-index: 999999;
   top: 80px;
   font-size: 24px;
   color:#999;
   font-weight: bold;
}

.cube-dialog-content-def .control_head {
   color:#000;
   padding-bottom: 5px;
   font-size: 16px;
}


.cube-textarea-wrapper::after {
   border:none;
}
// .cube-input {
//    z-index: 9999;
// }
</style>
