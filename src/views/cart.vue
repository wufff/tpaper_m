<template>
  <div class="page">
      <div class="main">
          <div class="list">
             <cube-scroll
            ref="scroll"
            :options="options">  
             <div class="wrapscroll" v-show="lengths < 1 && ready">
                   <div class="noneWarp">
                       <span class="img none_items">
                         <img src="../assets/none_items.png" alt="">
                       </span>
                       <div class="title">试题篮是空的！</div>
                       <router-link to="/items" class="goItem">
                          去选题
                        </router-link>
                   </div>                 
             </div>          
             <div class="wrapscroll" v-show="lengths > 0">
                <div class="itemClassfiy" v-for="(val,key,index) in datalist" :class="{padding:open[index]}">
                    <div class="title">{{$local.getQ_Nu(index)}}、{{$local.getQ_Zh(key)}}</div>
                    <div class="closeBtndiv"  @click="up_down(index)">
                        <span class="img closeBtn">
                            <img src="../assets/arrow_up.png" alt="" v-show="open[index]">
                            <img src="../assets/arrow_down.png" alt="" v-show="!open[index]">
                        </span>
                    </div>
                    <div class="items" v-show="open[index]">
                       <div class="test" v-for="(item,index) in val.data" @click="showDtail(item.master_code_crc32)">
                           <div class="test_title">
                               <span>{{index+1}} .</span>
                               <div v-html="item.context"></div>
                          </div>

                             <ul class="aswerbox" v-if="$local.getQ_Zh(key) == '单选题' || $local.getQ_Zh(key) == '多选题'">
                               <li v-for="(item2,index2) in item.option">
                                  <span class="sort">{{$local.ABC_Zh(index2)}}.</span>
                                  <span class="option">{{item2}}</span>
                                </li>                               
                            </ul>
                            <ul class="aswerbox" v-if="$local.getQ_Zh(key) == '判断题'">
                               <li>
                                  <span>对</span>
                               </li>
                                <li>
                                  <span>错</span>
                               </li>                                       
                            </ul>                             

                             <span class="img dele_h" @click.stop="deletItem({qtp_code:item.qtp_code,master_code:item.master_code,index:index})">
                                <img src="../assets/dele_h.png" alt="">
                            </span>                              
                       </div>                       
                    </div>
                </div>
                             
             </div>
             </cube-scroll>
          </div>
      </div>  
     <div class="control"  v-show="lengths > 0">
         <div class="item" @click="delAll">
            <span class="img dele_b">
               <img src="../assets/dele_b.png" alt="">
            </span>
            清空试题
            <span class="border-right"></span>
          </div>
         <div class="item" @click="downLoad_b">
            <span class="img downLoad_b">
               <img src="../assets/downLoad_b.png" alt="">
            </span>                     
         下载试卷
          <span class="border-right"></span>
         </div>
         <div class="item"  @click="saveAll">
            <span class="img save_b">
               <img src="../assets/save_b.png" alt="">
            </span>            
         保存试卷
       </div>
     </div>
     <itemDtail  ref="itemDtail" :data="itemOne"></itemDtail>
     <foot></foot>
  </div>
</template>
<script>
import foot from '@/components/foot.vue';
import itemDtail from '@/components/itemDtail.vue'
import { cart,deleItems,deleAll,savaCart,ITEMDTAIL} from '@/api';
export default {
  name: 'cart',
  data() {
    return {
        data:"",
        options:{
         click:true,
         bounce:false,
       },     
       ready:false,   
       datalist:{},
       itemOne:{},
       head_s:this.$local.fetch("head_s"),
       open:[true,true,true,true,true,true]
    }
  },
  created(){
    cart(1).then((data)=>{
       console.log(data);
       this.datalist = data;
       this.ready = true;
    })
  },
  methods:{
     up_down(index){
        var bl = !this.open[index];
        var _this = this;
        this.$set(_this.open,index,bl);
     },
    deletItem(obj) {
      var qtp_code = obj.qtp_code;
      var index = obj.index;
      deleItems(3, obj).then((data) => {
        this.datalist[qtp_code].data.splice(index, 1);
        this.$store.dispatch("sub_num");
        if (this.datalist[qtp_code].data.length == 0) {
          this.$delete(this.datalist, qtp_code)
        }
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
    delAll(){
       deleAll(3).then((data)=>{
           this.datalist = {};
           this.$store.dispatch("set_num",0);
       })
    },
    downLoad_b(){
       this.dialog = this.$createDialog({
        type: 'prompt',
        title: '请输入试卷标题',
        prompt: {
          value: '',
          placeholder: '输入试卷标题'
        },
        onConfirm: (e, promptValue) => {
          if(!promptValue){
             this.dialog.show();
             return false;
          }
           var obj = {
              paper_title:promptValue,
              ...this.head_s
           }
           savaCart(3,obj).then((data)=>{
                var id = data.paper_id;
                this.$router.push({path:"/myDown",query:{id:id}})  
           })
        }
      }).show()        
    },
    saveAll(){
       this.dialog = this.$createDialog({
        type: 'prompt',
        title: '请输入试卷标题',
        prompt: {
          value: '',
          placeholder: '输入试卷标题'
        },
        onConfirm: (e, promptValue) => {
          if(!promptValue){
             this.dialog.show();
             return false;
          }
           var obj = {
              paper_title:promptValue,
              ...this.head_s
           }
          savaCart(3,obj).then((data)=>{
              this.$createToast({
                        type: 'none',
                        time: 500,
                        txt: `保存成功`
               }).show();  
               this.datalist  = {};  
               var id = data.paper_id;
               this.$router.push({path:"/paperDtail",query:{id:id}})        
          })
        }
      }).show()
    }
  },
  computed:{
     lengths(){
         var arr = Object.keys(this.datalist);
         return arr.length        
     }
  },
  components:{
    foot,
    itemDtail 
  }
}

</script>





<style scoped lang="less">
  .page{
     .main {
        padding-bottom: 103px;
     }
     .list {
        
     }
     .control {
       position: fixed;
       bottom:50px;
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
  }

  .itemClassfiy {
     background: #fff;
     padding: 0 15px 0px 15px;
     margin-top: 10px;
     position: relative;
     &.padding {
         padding:  0 15px 10px 15px;
     }
     .title {
        font-size: 18px;
        height: 57px;
        line-height: 57px;
        padding-left: 15px;
        background: #fff;
        position: relative;
      }
     .closeBtn {
         height: 8px;
         width: 15px;
         margin: 0 auto;
         display: block;
     }
     .closeBtndiv{
         position: absolute;
         right: 15px;
         top:10px;   
         width: 40px;
         height: 40px;   
         padding-top:8px;
     }
    .test {
        padding: 16px 16px 25px 16px;
        background: #f1f1f1;
        margin-bottom: 10px;
        margin-top: 0px;
        position: relative;
        .dele_h {
            width: 18px;
            height: 19px;
            position: absolute;
            bottom:15px;
            right: 15px;
        }
        .test_title {
           font-size: 15px;
           margin-bottom: 8px;
           position: relative;
           > span {
             position: absolute;
             left:0;
             top:2px;
           }
           > div {
              padding-left: 20px;
              padding-top:2px;
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
               font-size: 15px;
             }
             li {
               border-radius: 2px;
               // background-color: #a3d3f6;
               padding: 6px;
               position: relative;
             }
             margin-bottom: 10px;
           }     
       }                
  }






 .noneWarp {
    text-align: center;
    padding-top: 155px;
   .none_items {
          width: 108px;
          height: 85px;
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


.border-right{
      display: block;
      width: 1px;
      height: 20px;
      background: #fff;
      position: absolute;
      top: 14px;
      right:0; 
   }  



  
 
</style>
