<template>
  <div class="page">
     <div class="head" id="head">
     	<span class="back" @click="back">
	  	 	<span class="img back-bt">
	  	 		<img src="../assets/arrow_left_b.png" alt="">
	  	 	</span>
  	 	</span>
  	    <div class="inner">
  	    	购买记录
  	    </div>
  	 </div>         
     <div class="main">
     	 <div class="list">
	          <cube-scroll
		          ref="scroll" 
		          :options="options"
              @pulling-up="onPullingUp"
              >
            <!--   <div class="scrollwrap" v-show="datalist.length < 1" v-if="ready">
                 <div class="noneWarp">
                       <span class="img none_com">
                         <img src="../assets/none_com.png" alt="">
                       </span>
                       <div class="title">暂无购买记录！</div>
                   </div>                         
              </div> -->
		          <div class="scrollwrap" v-show="datalist.length > 0">
				          <ul class="oder" v-for="(item,index) in datalist">
                     <li>
                        <div class="number">
                           <span>订单号：{{item.order_id}}</span>
                           <span class="status">{{item.pay_status_descript}}</span>
                        </div>
                        <div class="conetent">
                           <div class="left">
                              <div class="name">{{item.vip_type_descript}}</div>
                              <span>{{item.add_time}}</span>
                           </div>
                           <div class="right">
                                ¥ {{item.order_amount}}
                           </div>
                        </div>
                     </li>                             
                  </ul>      
		          </div>       	 	
	          </cube-scroll>
     	 </div>
     </div>
  
  </div>
</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import {BUYHOS} from '@/api';


export default {
  name: 'buyhistory',
  data(){
     return {
      options:{
         click:true,
         bounce:false,
         pullUpLoad: {
          threshold: 200,
          txt: {
            more: '加载更多',
            noMore: '没有更多的数据啦'
          }
        }
       },       
       datalist:[],
       ready:false,
       page:{
          current:1,
          totle:1
       }            
     }
  },
  created(){
     this.renderItems(1,"fisrt")
  },
  mounted(){
    
  },
  methods:{
    back(){
      window.history.go(-1);
    },
    renderItems(type,first){
       var aDate = {
          page:this.page.current  
       }
       BUYHOS(type,aDate).then((data)=>{
          // console.log(data.vip_order);
          console.log(data);
          if(first){
             this.$refs.scroll.scrollTo(0,0,0);
             this.datalist = data.vip_order;
             this.ready = true;
          }else{
            this.datalist.push(...data.qtrunk_list);
          }
          if(data.length == 0){
              this.$refs.scroll.forceUpdate();
              return;
          } 
          this.page.totle = data.total_page;
          this.page.current ++;
       })
    },	
    onPullingUp(){
        //console.log(123);
       if(this.page.current == this.page.totle+1){
          this.$refs.scroll.forceUpdate();
       }else{
         var aDate = {
          page:this.page.current  
        }
        BUYHOS(3,aDate).then((data)=>{ 
           this.datalist.push(...data.vip_order);
           this.page.current ++;
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
 	 padding-top: 53px;
 	 padding-bottom: 0;
 }

#head {
   .buyHistory{
     color:#fff;
     position: absolute;
     right:15px;
     top: 2px;
     font-size: 15px;
   }
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
       margin-bottom: 5px;
       padding-top: 6px;
       color:#7f5010;
    }
    .info {
       font-size: 15px;
       color:#919191;
       margin-bottom: 5px;
    }
    img.headimg {
       width: 58px;
       height: 58px;
       border-radius: 100%;
       float: left;
       margin-right: 10px;
       position: relative;
       top:11px;
    }
 }
  .small {
     font-size: 14px;
     color:#919191;
  }
  .vip {
    height: 17px;
    width: 20px;
    position: relative;
    top:2px;
  }
  

  .oder {
     
      > li {
         background-color: #fff;
          padding:0 15px;
          margin-bottom: 8px;
      }
      .number {
         height: 45px;
         line-height: 45px;
         border-bottom: 1PX solid #ddd;
         color:#919191;
         .status {
           float: right;
         }
      }
      .conetent {
          overflow: hidden;
          padding:8px 0;
          .left{
             float: left;
             .name{
                margin-bottom: 5px;
                color:#000;
                font-size: 17px;
             }
             .time {
               color:#919191;
             }
          }
          .right{ 
             float:right;
             padding-top: 11px;
             font-size: 17px;
          }
      }
  }
</style>
