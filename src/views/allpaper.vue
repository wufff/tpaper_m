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
		          :options="options">
		          <div class="scrollwrap">
				          <div class="recommend">
				                 <ul class="list">
				                      <router-link to="/paperDtail" tag="li" v-for="(item,index) in datalist">
				                          <h4>{{item.paper_title}}</h4>
				                          <div class="info">
				                              <span>浏览：{{item.view_count}}</span>
				                              <span>下载：{{item.download_count}}</span>
				                          </div>
				                          <span class="time">{{item.paper_creation_offset}}</span>
				                      </router-link>                                                                           
				                 </ul>
				           </div>                        
		          </div>       	 	
	          </cube-scroll>
     	 </div>
     </div>
    
        <div class="downlist" v-show="downlistVisble">
                <transition name="up">
                  <ul class="content"  v-show="downlistVisble">
                      <li class="item" 
                      :class="{active:index == selectdowinIndex[currentSelect]}" 
                      v-for="(item,index) in downlistData"
                      @click="select(item.name,item.id,index)"
                      >
                      {{item.name}}
                    </li>
                  </ul>  
                </transition>       
           </div>

         <router-link class="cart_rk" to="/cart" tag="div">
              <img src="../assets/cart_rk.png" alt="">
              <span class="num_num">1</span>
          </router-link>                  
      </div>


</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import {PaperList} from '@/api';


export default {
  name: 'items',
  data(){
     return {
       datalist:[],
       options:{
         click:true,
         bounce:false,
       },
       head_s:this.$local.fetch("head_s"),
      
       downlistVisble:false,
       selectdowinIndex:[0,0],
       selectValue:[{name:"最新",id:3,open:false},{name:"全部年级",id:"",open:false}],
       downlistData:[],
       downlist:[],
       currentSelect:0,

       page:{
          current:1,
          total:1
       }, 
       
     }
  },
  created(){
      var obj = {
          sort_type:this.selectValue[0].id,
          grade_code:this.selectValue[1].id,
          page:this.page.current,
          ...this.head_s
      }
      PaperList(1,obj).then((data)=>{
          this.datalist = data.data;
          this.page.total = data.total_page;
          var Arry = [];
          var grade =  data.grade_list
          grade.unshift({id:"",name:"全部年级"});
          Arry.push(data.sort_type_list);   
          Arry.push(grade);
          this.downlist = Arry;
          console.log(this.datalist)
      })
  },
  mounted(){
    
  },
  methods:{
     back(){
     	window.history.go(-1);
     },
    select(name,id,index){
        this.selectValue[this.currentSelect].name = name;
        this.selectValue[this.currentSelect].id = id;
        this.selectValue[this.currentSelect].open = false;
        this.selectdowinIndex[this.currentSelect] =  index;
        this.downlistVisble = false;
        this.page.current = 1;
        // this.renderItems(1,"first");
     },
    selectTitle(index,current){
        this.selectValue[index].open = !this.selectValue[index].open;
        this.downlistVisble = !this.downlistVisble;
        this.downlistData = this.downlist[index];
        this.currentSelect = index;
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
  

   
</style>
