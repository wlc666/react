import React,{useState,useEffect} from 'react'
import {Table} from 'antd'
import {IList} from '../../api/adminApi'
import {Button} from 'antd'
import AddAdmin from './AddAdmin'
export default function Admin() {
    //是否打卡抽屉
  const [open, setOpen] = useState(false)
    //账户列表获取
    let [adminList, setadminList] = useState([])
    useEffect(() => {
        IList().then(({data,count}) => {
            console.log(data)
            data = data.map(r => {
                return {
                  ...r,
                  key: r.Id
                }
              })
          setadminList(data)
        })
      }, [])
    const columns = [
        {
          title: '编号',
          dataIndex: 'Id',
        },
        {
          title: '账号',
          dataIndex: 'loginId',
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '电话',
            dataIndex: 'phone',
          },
          {
            title: '头像',
            dataIndex: 'photo',
          },
          {
            title: '角色',
            dataIndex: 'roleId',
          },
        // {
        //   title: '操作',
        //   key: 'action',
        //   render: (ret) => (
          
        //     <Space size="middle">
        //       <Popconfirm
        //         title=""
        //         description="确定要删除吗？"
        //         okText="确定"
        //         cancelText="取消"
        //         onConfirm={() => del(ret.roleId)}
        //       >
        //         <DeleteOutlined />
        //       </Popconfirm>
              
        //       <EditOutlined onClick={()=>{edit(ret.roleId,ret.roleName)}}/>
        //     </Space>
        //   ),
        // },
      ];
  return (
   <>
   <div className='search'>
        <Button size='small' onClick={() => { setOpen(true) }}>添加</Button>
      </div>
      <AddAdmin open={open} setOpen={setOpen} adminList={adminList} setadminList={setadminList} L/>
        <Table size='small' dataSource={adminList} columns={columns} />;
   </>
  )
}
