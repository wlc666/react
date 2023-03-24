import React, { useEffect, useState } from 'react'
import { Button, Table, Space, Popconfirm } from 'antd'
import { IList } from '../../api/RoleApi'
import AddRole from './AddRole'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MyNotification from '../../components/MyNotification/MyNotification'
export default function Role() {
  let rolename='';
  let [roleId,setRoleId]=useState(0)
  let [notiMsg, setNotiMsg] = useState({ type: '', description: '' })
  //是否打卡抽屉
  const [open, setOpen] = useState(false)
  //角色列表获取
  let [roleList, setRoleList] = useState([])
  useEffect(() => {
    IList().then(data => {
      data = data.map(r => {
        return {
          ...r,
          key: r.roleId
        }
      })
      setRoleList(data)
    })
  }, [])
  //删除
  const del = (roleId) => {
    // IDelete().then(data=>{
    //   data = data.filter(r=>r.roleId!==roleId)
    //   setRoleList(data)
    // })
    // eslint-disable-next-line
    if (roleId == true) {
      setNotiMsg({ type: 'error', description: '系统管理员不可删除' })
    }
    else {
      setRoleList(roleList.filter((r) => r.roleId !== roleId))
    }
  }
  //修改
  const edit = (id,name) => {
    rolename=name
    setOpen(true)
    setRoleId(id)
  }
  const columns = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: 'Action',
      key: 'action',
      render: (ret) => (
      
        <Space size="middle">
          <Popconfirm
            title=""
            description="确定要删除吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => del(ret.roleId)}
          >
            <DeleteOutlined />
          </Popconfirm>
          
          <EditOutlined onClick={()=>{edit(ret.roleId,ret.roleName)}}/>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className='search'>
        <Button size='small' onClick={() => { setOpen(true) }}>添加</Button>
      </div>
      <Table size='small' dataSource={roleList} columns={columns} />;
      <AddRole open={open} setOpen={setOpen} roleList={roleList} setRoleList={setRoleList} roleId={roleId} setRoleId={setRoleId} roleName={rolename}/>
      <MyNotification notiMsg={notiMsg} />
    </>
  )
}
