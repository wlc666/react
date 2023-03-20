import axios from '../utils/request'

//角色列表
export const IList=async ()=>{
    
    let {data}=await axios.get('cANKVGi3bb328ab1936cabffca832459d2391c3615831c8?uri=RoleData')
    
    
    return data;
}
//添加角色
export const IAdd=async ()=>{
    let {data}=await axios.post('cANKVGi3bb328ab1936cabffca832459d2391c3615831c8?uri=RoleData')
    return data;
}
//删除角色

export const IDelete=async (id)=>{
    let {data}=await axios.post(`cANKVGi3bb328ab1936cabffca832459d2391c3615831c8?uri=RoleData/`,id)
    return data;
}
//修改角色

export const IUpdate=async (data)=>{
    let {data}=await axios.post(`cANKVGi3bb328ab1936cabffca832459d2391c3615831c8?uri=RoleData/`,{data})
    return data;
}
//角色详情