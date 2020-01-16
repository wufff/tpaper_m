<template>
  <div class="page">
     <div class="head">
     	<span class="back" @click="back">
	  	 	<span class="img back-bt">
	  	 		<img src="../assets/arrow_left_b.png" alt="">
	  	 	</span>
  	 	</span>
  	    <div class="inner">
  	    	全部试卷
  	    </div>
  	 </div>    
      <div class="filter clearfix">
         <div class="item" v-for="(item,index) in selectValue"  @click="selectTitle(index,item.current)">
            {{item.name}}
            <span class="img down-img">
              <img src="../assets/filter_up.png" v-show="item.open" alt="">
              <img src="../assets/filter_down.png" v-show="!item.open" alt="">
            </span>
            <span class="border-right" v-show="index < 1"></span>
         </div>
      </div>     
     <div class="main">
     	 <div class="list">
	          <cube-scroll
		          ref="scroll" 
		          :options="options"
              :data="datalist" 
              @pulling-up="onPullingUp">
		          <div class="scrollwrap">
				          <div class="recommend" v-show="datalist.length > 0">
				                 <ul class="list">
				                      <!-- <router-link :to="{path:'/paperDtail',query:{id:item.paper_code_crc32}}" tag="li" v-for="(item,index) in datalist">
				                          <h4>{{item.paper_title}}</h4>
				                          <div class="info">
				                              <span>类型：{{item.paper_extent_name}}</span>
				                              <span>大小：{{item.paper_size}}</span>
				                          </div>
				                          <span class="time">{{item.add_time}}</span>
				                      </router-link>  -->   
                                <li v-for="(item,index) in datalist" @click="godown(item.id)">
                                  <h4>{{item.paper_title}}</h4>
                                  <div class="info">
                                      <span>类型：{{item.paper_extent_name}}</span>
                                      <span>大小：{{item.paper_size}}</span>
                                  </div>
                                  <span class="time">{{item.add_time}}</span>
                              </li>                                                                                                       
				                 </ul>
				           </div>                        
		          </div>
              <div v-show="datalist.length < 1" class="noneData" >{{text.noneText}}</div>     	 	
	          </cube-scroll>
     	 </div>
     </div>

        <div class="downlist" v-show="downlistVisble" @click="hidedownList">
                <transition name="up">
                  <ul class="content"  v-show="downlistVisble">
                      <li class="item" 
                      :class="{active:index == selectdowinIndex[currentSelect]}" 
                      v-for="(item,index) in downlistData"
                      @click.stop="select(item.name,item.id,index)"
                      >
                      {{item.name}}
                    </li>
                  </ul>  
                </transition>       
          </div>
       <div class="downbox" v-show="downVisb" @click="hidedonw">
               <transition name="up">
                  <div class="downcontent" v-show="downVisb" @click.stop>
                       <div class="h3">将试卷发送至</div>
                       <span class="img youxiang" @click.stop="goitems()">
                         <img src="../assets/youxiang.png" alt="">
                         <span class="text">我的邮箱</span>
                      </span>
                  </div>
              </transition>       
        </div>          

        <!--  <router-link class="cart_rk" to="/cart" tag="div">
              <img src="../assets/cart_rk.png" alt="">
              <span class="num_num" v-show="num_num > 0">{{num_num}}</span>
          </router-link>     -->              
      </div>


</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import {PaperList,VEREMAL,GETSUBJECT} from '@/api';
import  { mapState }  from 'vuex'
export default {
  name: 'items',
  data(){
     return {
      text:{
         noneText:""
      },     
      godownId:"", 
      downVisb:false,
      datalist: [],
      options: {
        click: true,
        bounce: false,
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载更多',
            noMore: '没有更多的数据啦'
          }
        }
      },
      head_s: this.$local.fetch("head_s"),
      downlistVisble: false,
      selectdowinIndex: [0, 0],
      selectValue: [{
        name: "全部年级",
        id: "",
        open: false
      }, {
        name: "全部学科",
        id: "",
        open: false
      }],
      downlistData: [],
      downlist: [],
      currentSelect: 0,

      page: {
        current: 1,
        total: 1
      }

    }
  },
  created(){
      var obj = {
          // sort_type:this.selectValue[0].id,
          grade_code:this.selectValue[1].id,
          page:this.page.current,
      };
      PaperList(1,obj).then((data)=>{
          this.datalist = data.data;
          // console.log(this.datalist);
          var Arry = [];
          var grade =  data.grade_list
          console.log(grade)
          grade.unshift({id:"",name:"全部年级"}); 
          Arry.push(grade);
          var first =[{id:"",name:"全部学科"}]
          Arry.push(first);
          // console.log(Arry);
          this.downlist = Arry;
          this.page.total = data.total_page;
          this.page.current ++;
          this.initText();
      })
  },
  mounted(){
    
  },
computed:{
     ...mapState(['num_num']),
  },  
  methods:{
     back(){
     	   window.history.go(-1);
     },
      goitems(){
         console.log(this.godownId)
         VEREMAL(1,{paper_id:this.godownId}).then((res)=>{
           if(res.is_vip == 1){
                this.$router.push({path:"/mydown_doc",query:{id:this.godownId}})
           }else{
                this.$router.push({path:"/buy"})
           }
         })
      },
     hidedonw(){
        this.downVisb = false;
     },      
     hidedownList(){
       this.downlistVisble = false;
     },
     godown(id){
      this.downVisb = true;
      this.godownId = id;
    },     
    select(name,id,index){
        this.selectValue[this.currentSelect].name = name;
        this.selectValue[this.currentSelect].id = id;
        this.selectValue[this.currentSelect].open = false;
        this.selectdowinIndex[this.currentSelect] =  index;
        this.downlistVisble = false;
        this.page.current = 1;
        if(this.currentSelect == 0){
            if(index == 0){//选的全部不发api
                this.selectValue[1].name = "全部学科";
                this.selectValue[1].id = "";
                this.renderItems(1,"first");   
                this.downlist[1] =  [{id:"",name:"全部学科",open: false}];
                this.selectdowinIndex[1] = 0;         
            }else{
               GETSUBJECT(1,{grade_code:id}).then((res)=>{
                             console.log(res);
                             var mapAryy = res.map((item)=>{
                                   return {
                                       id: item.sub_code,
                                       name:item.sub_name
                                   }
                             })
                            mapAryy.unshift({id:"",name:"全部学科"});
                            this.downlist[1] =  mapAryy;
                            console.log(this.downlist);
                            this.selectValue[1].name = "全部学科";
                            this.selectValue[1].id = "";
                            this.renderItems(1,"first");
                          })               
            }  
        }else{
           this.renderItems(1,"first");
        }
     },
    selectTitle(index,current){
        this.selectValue[index].open = !this.selectValue[index].open;
        this.downlistVisble = !this.downlistVisble;
        this.downlistData = this.downlist[index];
        this.currentSelect = index;
     },
     renderItems(type,fisrt){
       var obj = {
            // sort_type:this.selectValue[0].id,
            grade_code:this.selectValue[1].id,
            page:this.page.current
        }
       PaperList(type,obj).then((data)=>{
          if(fisrt){
             this.$refs.scroll.scrollTo(0,0,0);
             this.datalist = data.data;
             this.page.total = data.total_page;
          }else{
             this.datalist.push(...data.data)
          }
          if(data.data.length == 0){
              this.$refs.scroll.forceUpdate();
              return;
          }          
          this.page.total = data.total_page; 
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
  components: {
     foot
  }
}
</script>
<style scoped lang="less">
 .main {
 	 padding-top: 93px;
 	 padding-bottom: 0;
 }
 .youxiang {
        width: 48px;
        height: 40px;
        display: inline-block;
        .text {
           font-size: 12px;
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
              font-size: 14px;
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
  

   
</style>
