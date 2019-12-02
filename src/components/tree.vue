<template>
  <div class="treebox" v-show="visble">
     <div class="main"> 
      <transition name="up">
          <div class="list"  v-show="visble">
             <div class="scrollwrap">
                <div  v-for="(item,index) in  treeList">
                   <div class="treeItem" @click="selectItem(item.name,item.search_node)">
                    <span class="img-tree">
                      <img src="../assets/tree_open.png" alt="" v-show="!item.open" v-if="item.children" @click.stop="open(index)">
                      <img src="../assets/tree_close.png" alt="" v-show="item.open"  v-if="item.children"  @click.stop="close(index)">
                    </span>
                    {{item.name}}
                  </div>
                  <div v-for="(item2,index2) in item.children" v-show="item.open"> 
                      <div class="treeItem2" @click="selectItem(item2.name,item2.search_node)">
                        <span class="img-tree">
                          <img src="../assets/tree_open.png" alt="" v-show="!item2.open" v-if="item2.children" @click.stop="open(index,index2)">
                          <img src="../assets/tree_close.png" alt="" v-show="item2.open" v-if="item2.children" @click.stop="close(index,index2)"> 
                        </span>
                       {{item2.name}}
                      </div> 
                      <div  v-for="(item3,index3) in item2.children" v-show="item2.open"> 
                          <div class="treeItem3" @click="selectItem(item3.name,item3.search_node)">{{item3.name}}</div>
                      </div>
                  </div>                 
                </div>
             </div>        
          </div>
         </transition>   
     </div>
   </div>
</template>
<script>
export default {
  name: 'tree',
  props:{
     treeList: {
       type:Array,
       default: []
    }
  },  
  data() {
    return {
        visble:false  
    }
  },
  methods:{
     show(){
        this.visble = !this.visble;
     },
     open(index,index2){
       if(index2 || index2 == 0){
         this.treeList[index].children[index2].open = true;
       }else{
          this.treeList[index].open = true;
       }
     },
     close(index,index2){
        if(index2 || index2 == 0){
             this.treeList[index].children[index2].open = false;
       }else{
          this.treeList[index].open = false;
       }        
     },
     selectItem(name,id){
        this.$emit('func',{name:name,id:id})
        this.show();
     }
  }
}
</script>
<!-- [
         {
          "text": "一层1",
          "opened":true,
          "children": [{
            "text": "二层1",
            "selected": true
          },
          {
            "text": "二层2",
            "icon": "fa fa-warning icon-state-danger"
          },
          {
            "text": "二层3",
            "icon": "fa fa-folder icon-state-default",
            "opened": false,
            "children": [{
              "text": "三层1"
            }]
          }]
        }, 
        {
          "text": "一层2",
          "opened":false,
        }
      ]  -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .treebox {
      height: 100%;
      width: 100%;
      position: fixed;
      left: 0;
      right: 0;
      top:0;
      z-index:99;
      
  }






  .main {
     padding-top: 54px;
     padding-bottom: 0;
     background:rgba(0,0,0,0.5); 
     .list {
        background-color: #fff;
        width: 100%;
        height: 100%;
        overflow-y:auto;
     }
  }
  .scrollwrap {
      background-color: #fff;
      padding: 0 15px;
      .img-tree {
         display: inline-block;
         width: 15px;
         height: 15px;
         text-align: center;
         img {
            max-width:12px;
            max-height:12px;
            position: relative;
            top:-2px;
         }
      }
  }
 



  .treeItem, .treeItem2, .treeItem3{
      font-size: 18px;
      height:42px;
      line-height: 42px;
      color:#474747;
      background: url("../assets/arrow_right.png") no-repeat center right;
      background-size:6px  10px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .treeItem2 {
      padding-left: 30px;
  }
  .treeItem3 {
      padding-left: 80px;
  }
</style>
