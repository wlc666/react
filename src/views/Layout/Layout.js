import {
  MenuFoldOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  MailOutlined,
  SettingOutlined,
  NotificationOutlined,
  UserOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { Layout, Menu ,Modal} from 'antd';
import React, { useState,useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.scss'
const {confirm}=Modal

const { Header, Sider, Content } = Layout;
export default function Home() {
  const navigate=useNavigate()
  const [current, setCurrent] = useState('home');
  useEffect(()=>{
    
    if(!sessionStorage.getItem("token")){
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  //顶部菜单项
  const items2 = [
    {
      label: '首页',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: '邮件',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: '通知',
      key: 'noti',
      icon: <NotificationOutlined />,
    },
    {
      label: '个人中心',
      key: 'SmineubMenu',
      icon: <UserOutlined />,
      children: [
        {
          key: 'personal',
          label: '个人信息',
        },
        {
          key: 'change',
          label: '修改密码',
        },
        {
          key: 'exit',
          label: '退出登录',
        },
      ],
    },
  ];
  //左侧菜单项
  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: '账户管理',
      children: [
        { 
          key:'role',
          label: '角色管理'
        },
        {
          key: 'admin',
          label: '用户管理'
        },
      ]
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: '客房管理',
      children: [
        {
          key: 'type',
          label: '房型管理'
        },
        {
          key: 'room',
          label: '房间管理'
        },
        {
          key: 'total',
          label: '营业统计'
        },
      ]
    },
    {
      key: 'cum',
      icon: <SettingOutlined />,
      label: '客户管理',
    },
  ]
  //点击菜单方法
  const onClikMenu = (e) => {
    setCurrent(e.key)
    switch(e.key){
      case 'role':
        navigate('/layout/role')
      break;
      case 'admin':
        navigate('/layout/admin')
      break;
      //退出系统
      case 'exit':
        confirm({
          title: '',
          icon: <ExclamationCircleFilled />,
          content: '是否退出',
          okText:'确认',
          cancelText:'取消',
          onOk() {
            //清楚缓存跳转登录
            sessionStorage.clear()
            localStorage.clear()
            navigate('/')
          },
        });
        break;
        default:
          break;
    }
  }
  
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? "XXX" : "XXXXXX"}</div>
        <Menu
          onClick={onClikMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          selectedKeys={[current]}
        />
      </Sider>
      <Layout >
        <Header className='header'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <Menu theme='dark' onClick={onClikMenu} className='menu' selectedKeys={[current]} mode="horizontal" items={items2} />
        </Header>

        <Content className='content'>
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
