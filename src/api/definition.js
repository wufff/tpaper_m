import axios from 'axios';
import qs from 'qs';
var storage = window.localStorage;
var loading = document.getElementById("loading");
var instance = axios.create({
  baseURL: 'http://libo5050.tpaper.dev.dodoedu.com/',
  timeout: 5000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default {
    get:function (url) {
	 return function (load,params){
	 	    var token = storage.getItem("token") ? JSON.parse(storage.getItem("token")) : "";
	         if(!params){
			 	 params = {
			 	 	token:token
			 	 }
			 }else{
			 	params.token = token;
			 }	 	     
	 	  if(load == 1 || load == 2) {
	 	  	  loading.style.display = "block";
	 	  }
	      return instance.get(url,	
	      	 qs.stringify({param:params})
	      ).then((res) => {
	      	 const {type,data,message } = res.data;
	      	 if(type == "success"){
			   if(load == 1 || load == 3) {
	 	  	         loading.style.display = "none";
	 	        }                  
	      	 	 return data;
	      	 }
           if(type == "error"){
			   if(load == 1 || load == 3) {
	 	  	         loading.style.display = "none";
	 	        }            
	 	        // console.log(message)
	 	        return message;      
	      	 }	      	 
	      }).catch((res)=>{
	      	  alert(res);
	      })
	 }
   },
   
   post:function(url){
	return function (load,params){
           var token = storage.getItem("token") ? JSON.parse(storage.getItem("token")) : "";
			 if(!params){
			 	 params = {
			 	 	token:token
			 	 }
			 }else{
			 	params.token = token;
			 }
 		 if(load == 1 || load == 2) {
	 	  	  loading.style.display = "block";
	 	  }		  

	      return instance.post(url,
	      	  qs.stringify({param:params})
	      ).then((res) => {
	             const {type,data,message } = res.data;
	             
		      	 if(type == "success"){
				   if(load == 1 || load == 3) {
		 	  	         loading.style.display = "none";
		 	        }                  
		      	 	 return message;
		      	 }
	           if(type == "error"){
				   if(load == 1 || load == 3) {
		 	  	         loading.style.display = "none";
		 	        }            
		 	        // console.log(message)
		 	        return message;      
		      	 }	      	 
	         }).catch((res)=>{
	      	    alert(url+"|"+res)
	      })
	 }   	  
   },
   login:function(url){
	  return function (load,params){
 		 if(load == 1 || load == 2) {
	 	  	  loading.style.display = "block";
	 	  }		  

	      return instance.post(url,
	      	  qs.stringify({param:params})
	      ).then((res) => {
	             const {type,data,message } = res.data;
	             
		      	 if(type == "success"){
				   if(load == 1 || load == 3) {
		 	  	         loading.style.display = "none";
		 	        }                  
		      	 	 return message;
		      	 }
	           if(type == "error"){
				   if(load == 1 || load == 3) {
		 	  	         loading.style.display = "none";
		 	        }            
		 	        // console.log(message)
		 	        return message;      
		      	 }	      	 
	         }).catch((res)=>{
	      	     alert(url+"|"+res)
	      })
	 }   	  
   }   
}

