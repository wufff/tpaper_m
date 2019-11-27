<template>
  <div class="page">
     <div class="head">
          <span class="moreBt" @click="showTree">
            <img src="../assets/more.png" alt="">
          </span>
          知识点： <span class="space"></span>{{treeValue.name}}
     </div>  	 
  	 <div class="filter clearfix">
         <div class="item" v-for="(item,index) in selectValue"  @click="selectTitle(index,item.current)">
            {{item.name}}
            <span class="img down-img">
              <img src="../assets/filter_up.png" v-show="item.open" alt="">
              <img src="../assets/filter_down.png" v-show="!item.open" alt="">
            </span>
            <span class="border-right" v-show="index < 2"></span>
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
        <div v-show="datalist.length < 1" class="noneData" v-html="text.noneText"></div>
        <div class="test" v-for="(item,index) in datalist">
            <div class="title" v-html = "item.context"> </div>
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
            <div class="bottom">
                <span class="type">{{$local.getQ_Zh(item.qtp_code)}}</span>
                <span>使用 {{item.usage_count}} 次</span>
                <span class="addItemBt" v-on:click="addNum_num({qtp_code:item.qtp_code,master_code:item.master_code,index:index},$event)" v-show="item.is_add_qtrunk == 1">
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
      <foot ref="foot"></foot>	
      <tree ref="tree" :treeList = "tree" @func="selectTree"></tree>
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
  </div>
</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import tree from '@/components/tree.vue'
import {treeData,fitterData,items,additem,deleItems} from '@/api';
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
       head_s:this.$local.fetch("head_s"),
       user:this.$local.fetch("user"),
       datalist:[],
       downlistVisble:false,
       selectValue:[{name:"全部题型",id:"",open:false},{name:"全部难度",id:"",open:false},{name:"全部年级",id:"",open:false}],
       selectdowinIndex:[0,0,0],
       currentSelect:"",
       downlist:[],
       downlistData:[],
       tree:[],
       treeValue:{id:"",name:"全部"},
       page:{
          current:1,
          totle:1
       }
     }
  },
  computed:{
     
  },
  // watch:{
  //   selectValue:{
  //       handler(newVal, objVal){
  //           console.log(123);
  //       },
  //       deep:true
  //   }
  // },
  created(){
    treeData(3,this.head_s).then((data)=>{
        data.unshift({id:"",name:"全部"});
        this.tree = data;
    })
    fitterData(3,this.head_s).then((data)=>{
       var value = [];
       var TempArry = [];
       for (let x in data){
          for (let y in data[x]){
             TempArry.push({id:y,name:data[x][y]});     
          }
          if (x == "diff_list"){TempArry.unshift({id:"",name:"全部难度"})}
          if (x == "grade_list"){TempArry.unshift({id:"",name:"全部年级"})}
          if (x == "qtp_list"){TempArry.unshift({id:"",name:"全部题型"})}
          value.push(TempArry);
          TempArry = [];
       }
       this.downlist = value;
    }) 
    this.renderItems(1);
  },

  mounted(){
    if(this.$route.query.tree){
         this.showTree();
    }
  },
  methods:{
     select(name,id,index){
        this.selectValue[this.currentSelect].name = name;
        this.selectValue[this.currentSelect].id = id;
        this.selectValue[this.currentSelect].open = false;
        this.selectdowinIndex[this.currentSelect] =  index;
        this.downlistVisble = false;
        this.page.current = 1;
        this.renderItems(1,"first");
     },
     selectTitle(index,current){
        this.selectValue[index].open = !this.selectValue[index].open;
        this.downlistVisble = !this.downlistVisble;
        this.downlistData = this.downlist[index];
        this.currentSelect = index;
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
          this.$refs.foot.drop(event.target);
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
    showTree(){
       this.$refs.tree.show();
     },
    selectTree(obj){
       this.treeValue = obj;
       this.page.current = 1;
       this.renderItems(1,"first");
    },


    renderItems(type,first){
       var aDate = {
          qtp_code:this.selectValue[0].id,
          diff:this.selectValue[1].id,
          grade_code:this.selectValue[2].id,
          know_node:this.treeValue.id,
          ...this.head_s,
          page:this.page.current  
       }
       items(type,aDate).then((data)=>{
          if(first){
             this.$refs.scroll.scrollTo(0,0,0);
             this.datalist = data.data;
          }else{
            this.datalist.push(...data.data);
          }
          if(data.data.length == 0){
              this.$refs.scroll.forceUpdate();
              return;
          } 
          this.initText();       
          this.page.totle = data.total_page;
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
     foot,
     tree
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
         width: 33.333%;
         text-align: center;
         font-size: 15px;
         color:#000000;
         position: relative;
      }
   }

   .main {
        padding-top: 92px;
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






 
     .selectBox {
        width: 100%;
        height: 100%;
     }



    



      // <div class="test">
      //       <div class="title">
      //          1. 计算: (0-3)x5的结果是 计算: x5的结果是 计算结果是 计算: x5的结结果是 计算: x5的结(   )
      //       </div>

      //       <ul class="aswerbox">
      //          <li>
      //             <span class="sort">A.</span>
      //             <span class="option">-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15-15</span>
      //          </li>
      //           <li>
      //             <span class="sort">B.</span>
      //             <span class="option">-15</span>
      //          </li> 
      //           <li>
      //             <span class="sort">C.</span>
      //             <span class="option">-15</span>
      //           </li>
      //           <li>
      //             <span class="sort">D.</span>
      //             <span class="option">-15</span>
      //          </li>                                             
      //       </ul>
      //       <div class="bottom">
      //           <span class="type"></span>
      //           <span>使用 0 次</span>
      //           <span class="addItemBt_y">
      //               <span class="img add-img_y">
      //                 <img src="../assets/yes.png" alt="">
      //               </span> 
      //             已添加
      //           </span>                  
      //       </div>            
      //   </div> 
        
   
</style>
