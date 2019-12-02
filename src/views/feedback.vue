<template>
  <div class="page">
      <div class="head">
        <span class="back" @click="back">
          <span class="img back-bt">
            <img src="../assets/arrow_left_b.png" alt="">
          </span>
        </span>
          <div class="inner">
             意见反馈
          </div>
     </div>   	  
  	 <div class="main">
      <div class="list">        
  	 	    <div class="scrollwrap">
             <h4>问题描述</h4>
             <div class="textarea">
                <cube-textarea 
                v-model="maov"
                :autoExpand ="autoExpand"
                :placeholder ="placeholder"
                :maxlength = "maxlength"
                ></cube-textarea>
             </div>
             <h4>联系方式 ( 手机号、QQ或邮箱 ) </h4> 
             <div class="tell">
                  <cube-input 
                  v-model="tell" 
                  :placeholder ="placeholder2"
                  ></cube-input>
             </div>                   
             <h4>图片（可选）</h4> 
             <div class="upload">
                 <cube-upload
                  action="http://libo5050.tpaper.dev.dodoedu.com/Commonajax/uploadExcel"
                  :simultaneous-uploads="1"
                  @file-success="filesUp"
                  @file-removed="removed"
                  @files-added="filesAdded"/>
             </div> 
             <span class="btn" @click="submit">提交反馈</span>        
          </div>
      
  	  </div>
     </div>
     
  </div>
</template>

<script>
// @ is an alias to /src
import foot from '@/components/foot.vue'
import { FEEDBACK } from '@/api'
export default {
  name: 'home',
  data(){
     return {
        placeholder:"请输入反馈内容",
        placeholder2:"请输入电话号码",
        autoExpand:true,
        maxlength:120,
        maov:"",
        tell:"",
        fileValue:[]
     }
  },
  methods:{
     back(){
       window.history.go(-1);
     },
     filesAdded(files) {
      let hasIgnore = false
      const maxSize = 5 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: 'You selected >5M files'
      }).show()
    },
    submit(){
      if(this.tell != "" && this.maov != ""){
          var obj  = {
            mobile:this.tell,
            content:this.maov,
            content_attach:this.fileValue.join(",")
         }         
         FEEDBACK(1,obj).then(data=>{
                this.$createToast({
                  type: 'none',
                  time: 500,
                  txt: data
                }).show();
         })
      }
       
    },
    filesUp({response}){
       if(response.type == "success"){
          var url = response.message.url
          this.fileValue.push(url);
          console.log(this.fileValue)
       }
    },
    removed({response}){
      if(response.type == "success"){
                var url = response.message.url
                this.fileValue.splice(this.fileValue.findIndex(item => {item === url}), 1);
                console.log(this.fileValue);
             }      
      }
  },
  components: {
     foot
  }
}
</script>
<style scoped lang="less">
    .main {
       padding-top:60px;
       padding-bottom: 0px;
       h4 {
         height: 36px;
         line-height: 36px;
         margin-bottom: 0px;
         padding-left: 15px;
       }
    }
 
  

  .textarea {
      height: 80px;
      background: #fff;
  }

  .cube-textarea_active::after, .cube-input_active::after{
        border-color:#fff;
    }
  
   .upload {
      padding: 0 15px;
      margin-bottom: 140px;
   }

   // .btnW {
   //    width: 100%;
   //    height: 45px;
   //    position: fixed;
   //    left:0;
   //    right: 0px;
   //    bottom: 0px;
   // }

   .btn{
      height: 46px;
      width: 345px;
      margin: 0 auto;
      color:#fff;
      background: #37aafd;
      border-radius: 5px;
      display: block;
      text-align: center;
      line-height: 46px;
      font-size: 16px;
      letter-spacing: 2px;
   }


   


</style>
