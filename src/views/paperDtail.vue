<template>
  <div class="page">
     <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
              试卷详情
          </div>
      </div>  
      <div class="main">
         <div class="list">
          <cube-scroll
            ref="scroll" 
            :options="options"
            >
          <div class="scrollwrap">
           <div class="head-title">
               <h5>{{paperTitle.paper_title}}</h5>
               <span>{{paperTitle.paper_stage_descript}}{{paperTitle.subject_name}} 共{{paperTitle.paper_q_count}}题</span>
               <span class="time">{{paperTitle.paper_creation_offset}}</span>
           </div>
        <div v-show="datalist.length < 1" class="noneData" v-html="text.noneText"></div>
        <div class="test" v-for="(item,index) in datalist">
           <div class="top" @click="showDtail(item.master_code_crc32)">
            <div class="title"> 
              <span class="sort">{{index+1}}. </span>
              <div v-html="item.context"></div>
            </div>
           <!--  <div class="fj">
                <video src="http://images.dev.dodoedu.com/resource/4aaf30161bcff084.mp4" 
                    width="100%" 
                    height="180" 
                    controls>
                </video>
            </div> -->
            <ul class="aswerbox" v-if="$local.getQ_Zh(item.qtp_code) == '单选题' || $local.getQ_Zh(item.qtp_code) == '多选题'">
               <li v-for="(item2,index2) in item.option">
                  <span>{{$local.ABC_Zh(index2)}}.</span>
                  <span>{{item2}}</span>
                </li>                               
            </ul>
            <ul class="aswerbox" v-if="$local.getQ_Zh(item.qtp_code) == '判断题'" >
               <li>
                  <span>对</span>
               </li>
                <li>
                  <span>错</span>
               </li>                                       
            </ul> 
            </div>           
            <div class="bottom">
                <span class="type">{{$local.getQ_Zh(item.qtp_code)}}</span>
                <span>使用 {{item.usage_count}} 次</span>
                <span class="addItemBt"  v-on:click="addNum_num({qtp_code:item.qtp_code,master_code:item.master_code,index:index},$event)" v-show="item.is_add_qtrunk == 1">
                  <span class="img add-img">
                    <img src="../assets/add.png" alt="">
                  </span> 
                  试题栏
                </span>
                <span class="addItemBt_y" v-show="item.is_add_qtrunk == 0" v-on:click="deletItem({qtp_code:item.qtp_code,master_code:item.master_code,index:index})">
                    <span class="img add-img_y">
                      <img src="../assets/yes.png" alt="">
                    </span> 
                  已添加
                </span>             
            </div>            
          </div>           
          </div>   
           </cube-scroll>                         
         </div>
      </div>
     <div class="control">

         <router-link to="/cart" tag="div" class="item">
            <span class="img myCart_rukou">
               <img src="../assets/myCart_rukou.png" alt="">
            </span>
            试题篮
            <div class="ball-container">
                <div v-for="(item,index) in balls" :key="index">
                  <transition 
                  @after-enter="afterEnter" 
                  @enter="enter" 
                  @before-enter="beforeEnter">
                    <div v-show="item.show" class="ball">
                      <div class="inner inner-hook"></div>
                    </div>
                  </transition>                     
                </div>
            </div>            
            <span class="border-right"></span>
            <span class="num_num" v-show="num_num > 0">{{num_num}}</span>
          </router-link>
         <div class="item" @click="goDown">
            <span class="img downLoad_b">
               <img src="../assets/downLoad_b.png" alt="">
            </span>                     
         下载试卷
          <span class="border-right"></span>
         </div>
         <div class="item" @click="goMyTest">
            <span class="img save_b">
               <img src="../assets/myTest.png" alt="">
            </span>            
           在线自测
       </div>
     </div>
     <itemDtail  ref="itemDtail" :data="itemOne"></itemDtail>                          
  </div>
</template>
<script>
import itemDtail from '@/components/itemDtail.vue'
import { paperDtail,additem,deleItems,ITEMDTAIL } from '@/api'
import  { mapState }  from 'vuex'

function createBalls (){
    let ret = [];
    for (let i = 0;i<10;i++){
       ret.push({show:false})
    }
    return ret;
}

 export default { 
    name: 'paperDtail',
    data(){
      return {
        text: {
          noneText: "",
          dialgText:"在线自测仅支持客观题（单选题、多选题、判断）",
          dialgText_:"试卷中如含有主观题,点击确定,后系统将会自动过滤掉主观题"
        },
        datalist: [],
        ball_off:true,
        paperTitle:{

        },
        user:this.$local.fetch("user"),
        options: {
          click: true,
          bounce: false
        },
        head_s: this.$local.fetch("head_s"),
        is_online_qtrunk:1,   //有  没有
        dropBalls:[],
        balls:createBalls(),
        itemOne:{},
        page: {
          current: 1,
          total: 1
        }
      }
    },
    computed:{
       ...mapState(['num_num']),
    },
    created(){
       var id = this.$route.query.id;
       paperDtail(1,{paper_code_crc32:id}).then((data)=>{
          console.log(data);
          this.paperTitle =  data.paper_info;
          var qtrunk_list = data.qtrunk_list;
          this.is_online_qtrunk = data.is_online_qtrunk;
          for (var x in  qtrunk_list) {
              this.datalist.push(...qtrunk_list[x]);
          }
          // console.log(this.datalist);
       })
    },
    methods:{
       back(){
         window.history.go(-1);
       },
       goMyTest(){
           // this.$router.push({path:"/myTest"});
           this.showAlert();
       },
       addNum_num(obj, event) {
          if(!this.user.is_vip){
                if(this.num_num == 30){
                    this.$createDialog({
                      type: 'confirm',
                      content: '<p class="vipContent">您的试题篮最多只能装30道试题，VIP用户可选50道试题，<br/>快开通VIP吧～</p>',
                      confirmBtn: {
                        text: '去开通',
                      },
                      onConfirm:()=> {
                          this.$router.push({path:"/buy"});
                      }
                     }).show();
                    this.ball_off = false;
                }
            }          

            if (this.ball_off) {
              this.ball_off = false;
              additem(3,obj).then((data) => {
                this.drop(event.target)
                setTimeout(() => {
                  this.datalist[obj.index].is_add_qtrunk = 0;
                   this.ball_off = true;
                }, 300)
              })
            }
          },   
      deletItem(obj){
         deleItems(3,obj).then((data)=>{
             this.datalist[obj.index].is_add_qtrunk = 1;
             this.$store.dispatch("sub_num");
             this.ball_off = true;
         })
      },
      drop(el){
       for (let i = 0; i<this.balls.length;i++){
         const ball = this.balls[i];
         if(!ball.show){
            ball.show=true;
            ball.el = el;
            this.dropBalls.push(ball);
            return
         }
       }
     },
     beforeEnter(el){
        var html = document.querySelector("html");
        var  fontSize = html.style.fontSize;
        var reg = /\d+/;
        var rem = fontSize.match(reg)[0];
        const ball = this.dropBalls[this.dropBalls.length -1];
        const rect = ball.el.getBoundingClientRect();
        var  AdaX =  1.8 * rem;
        var AdaY = 0.586667 * rem;
        const x = rect.left - AdaX;
        const y = -(window.innerHeight - rect.top - AdaY);
        el.style.display = '';
        el.style.transform  = `translate3d(0,${y}px,0)`;
        const inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.transform = `translate3d(${x}px,0,0)`;
     },
     enter(el,done){
       this._reflow = document.body.offsetHeight  //触发重绘
       el.style.transform = `translate3d(0,0,0)`;
       const inner = el.getElementsByClassName('inner-hook')[0];
       inner.style.transform = `translate3d(0,0,0)`;
       el.addEventListener("transitionend",done) //监听结束触发下个钩子
     },
     afterEnter(el){
        const ball = this.dropBalls.shift();
        this.$store.dispatch("add_num");
        if(ball){
           ball.show = false;
           el.style.display = "none"
        }
     },
     showAlert() {
          this.$createDialog({
            type: 'confirm',
            title: this.text.dialgText,
            content: this.text.dialgText_,
            onConfirm:()=>{
               if(this.is_online_qtrunk == 1) {
                  this.$router.push({path:"/myTest",query:{id:this.$route.query.id}});
               }
            }
          }).show()
        },
       goDown(){
          var id = this.$route.query.id;
          this.$router.push({path:"/myDown",query:{id:this.$route.query.id}});
       },
      showDtail(id){
            this.$refs.itemDtail.show();
            ITEMDTAIL(1,{master_code_crc32:id}).then((data)=>{
                this.itemOne = data[0];
                this.$refs.itemDtail.ready();
            })
      }             
    },
    components: {
         itemDtail
    }    
  }  
</script>
<style scoped lang="less">
 .main {
   padding-top: 49px;
   padding-bottom: 52px;

 }

  .head-title {
    background: #fff;
    padding:10px 15px;
    font-size: 15px;
    position: relative;
    h5 {
       margin-bottom: 5px;
    }
    span {
       font-size: 14px;
       color:#919191;
    }
    .time {
       position: absolute;
       bottom:10;
       right: 15px;
    }
  }


.cube-dialog-title .cube-dialog-title-def {
    text-align: left;
    white-space:normal;
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


.num_num {
   right: 15px;
   top: 8px
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
          width: 33.333%;
          text-align: center;
          line-height:50px;
          color: #fff;
          position: relative;
       }
     } 





.myCart_rukou {
     width: 22px; 
     height: 22px;
     position: relative;
     top:6px;
}


   .dele_b{  
     width: 17px;
     height: 19px;
     position: relative;
     top:2px;
     margin-right: 4px;
  }

  .downLoad_b {
      width: 17px;
      height: 17px;
      position: relative;
      top:2px;
      margin-right: 2px;
  }
 
  .save_b {
      width: 17px;
      height: 17px;
      position: relative;
      top:3px;
      margin-right: 2px;     
   }

.ball-container {
   .ball {
      position:fixed;
      left:92px;
      bottom:28px;
      z-index:2;
      transition:all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
      .inner {
          width:16px;
          height:16px;
          border-radius: 50%;
          background:rgb(0,160,220);
          transition:all 0.4s linear;
      }      
   }
}






</style>
