<template>
  <div class="page">
      <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
            错题记录
      </div>
     </div>           
    
   <div class="main">
      <div class="list">
          <cube-scroll
          ref="scroll"
          :data="datalist" 
          :options="options"
          @pulling-up="onPullingUp">
        <div>
        </div>  
        <div class="scrollwrap">
        <span class="pionter" v-show="!user.is_vip" v-if="datalist.length > 0">非会员只保留3个月错题记录，请及时整理错题。</span>
        <div class="noneData" v-if="datalist.length < 1">{{text.noneText}}</div>
        <div class="test" v-for="(item,index) in datalist">
           <div class="top" @click="showDtail(item.master_code_crc32)">
              <div class="title"> 
                   <span class="sort">{{item.number}}</span>
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
              <ul class="aswerbox" v-if="$local.getQ_Zh(item.qtp_code) == '判断题'">
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
                <span class="addItemBt" v-on:click="addNum_num({qtp_code:item.qtp_code,master_code:item.master_code,index:index},$event)" v-show="item.is_add_qtrunk == 1">
                  <span class="img add-img">
                    <img src="../assets/add.png" alt="">
                  </span> 
                  试题篮
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
       
       <router-link class="cart_rk" to="/cart" tag="div">
              <img src="../assets/cart_rk.png" alt="">
              <span class="num_num">{{num_num}}</span>
      </router-link>  
      <itemDtail  ref="itemDtail" :data="itemOne"></itemDtail>       
  </div>
</template>

<script>
// @ is an alias to /src
import itemDtail from '@/components/itemDtail.vue'
import {history_ct,additem,deleItems,ITEMDTAIL} from '@/api';
import  { mapState }  from 'vuex'

export default {
  name: 'items',
  data(){
     return {
       text:{
           noneText:""
       },
       ball_off:true,
       options:{
         click:true,
         bounce:false,
         pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多的数据啦'
          }
        }
       },
       datalist:[],
       itemOne:{},
       user:this.$local.fetch("user"),
       page:{
          current:1,
          totle:1
       }
     }
  },

  created(){
    this.renderItems(1);
  },

  mounted(){
   
  },
  methods:{
    back(){
       window.history.go(-1);
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
      if(this.user.is_vip){
           if(this.num_num == 50){
               this.$createDialog({
                type: 'alert',
                content: '<p class="vipContent">您的试题篮最多只能装50道试题，请组卷下载后再添加吧。</p>',
              }).show()
              this.ball_off = false;               
          }          
      }       
      if (this.ball_off) {
        this.ball_off = false;
        additem(3, obj).then((data) => {
            this.datalist[obj.index].is_add_qtrunk = 0;
             this.$store.dispatch("add_num");
            this.ball_off = true;
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
    showDtail(id){
      this.$refs.itemDtail.show();
      ITEMDTAIL(1,{master_code_crc32:id}).then((data)=>{
          this.itemOne = data[0];
          this.$refs.itemDtail.ready();
          console.log(this.itemOne);
      })
    },    
    renderItems(type,first){
       var aDate = {
          page:this.page.current  
       }
       history_ct(type,aDate).then((data)=>{
          if(first){
             this.$refs.scroll.scrollTo(0,0,0);
             this.datalist = data.qtrunk_list;
             this.initText(); 
          }else{
            this.datalist.push(...data.qtrunk_list);
          }
          if(data.qtrunk_list.length == 0){
              this.$refs.scroll.forceUpdate();
              return;
          } 
          this.text.noneText ="暂无下载记录！"
          this.page.totle = data.page;
          this.page.current ++;
       })
    },
    onPullingUp(){
       if(this.page.current == this.page.totle+1){
          this.$refs.scroll.forceUpdate();
       }else{
          this.renderItems(3); 
       }
    },
    initText(){
        this.text.noneText = "无数据！";   
    }
  },
  computed:{
     ...mapState(['num_num']),
  },
  components: {
     itemDtail
  }
}
</script>
<style scoped lang="less">

   .head {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
   }
   .add-img { 
        width: 11px;
        height: 11px;
        position: relative;
        top:1PX;
    }
   .add-img_y{
      width: 11px;
      height: 9px;
      margin-right: 3px;
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



   .main {
        padding-top:52px;
        padding-bottom: 0;
     .list {
        // padding: 15px 0;
        height: 100%;
        width: 100%;
     }
   }

   .test {
    padding: 16px;
    margin-top: 10px;
    background-color: #fff;
    .title {
       margin-bottom: 8px;
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



  
  .cart_rk {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    position: fixed;
    bottom: 60px;
    left:40px;
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


 
 .pionter {
       padding-left: 15px;
       color: #919191;
       padding-top: 5px;
       display: block;
   }     
   
</style>
