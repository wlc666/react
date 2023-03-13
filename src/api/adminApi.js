import axios from '../utils/request'
import md5 from 'md5'
//登录
export const loginapi=async (params)=>{
   params.password=md5(md5(params.password).split('').reverse().join(''))
   let data= axios.get('cANKVGi3bb328ab1936cabffca832459d2391c3615831c8?uri=/bingjs.com',{params})
   return await data.then((response)=>{
   
    if(params.username===response.data.username&&params.password===response.data.password){
      response.success=true
      response.message='登录成功'
      sessionStorage.setItem('token',response.data.token)
      return response
    }else{
      response.success=false
      response.message='登录失败'
      return response
    }
   })
   .catch((err)=>{
    console.log('失败',err)
   })
}