import React,{useState,useEffect} from 'react'
import "./Login.scss"
import { Button, Form, Input } from "antd"
import MyNotification from '../../components/MyNotification/MyNotification'
import {loginapi} from '../../api/adminApi'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    //导航
    let navigate=useNavigate();
    //判断是否已登录
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            navigate('/layout')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    //通知框状态
    let [notiMsg,setNotiMsg]=useState({type:'',description:''})
    // //提示框
    // const [api, contextHolder] = notification.useNotification();

    // const openNotificationWithIcon = (type,description) => {
    //     api[type]({
    //       description
    //     });
    // }
    let [form]=Form.useForm();
    //表单成功提交的方法
    const onFinish = async (values) => {
        let {message,success}=await loginapi(values)
        console.log(message,success)
       
        if(success){
            setNotiMsg({type:'success',description:message})
            //跳转到首页
            navigate('/layout')
        }else{
            setNotiMsg({type:'error',description:message})
        }
      };
    return (
        <div className='Login'>
            <div className='content'>
            <h2>xxxxxxxxxxxxx</h2>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ username: '',password:'' }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '请输入账号!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button onClick={()=>{form.resetFields()}} style={{marginLeft:'20px'}}>
                            取消
                        </Button>
                    </Form.Item>

                </Form>
            </div>
            <MyNotification notiMsg={notiMsg}/>
        </div>
    )
}
