import React, {useState } from 'react'
import { Button, Drawer, Form, Input } from 'antd'
import MyNotification from '../../components/MyNotification/MyNotification'
export default function AddRole({ open, setOpen, roleList, setRoleList, roleId,setRoleId ,roleName}) {
    //定义表单实例
    let [form] = Form.useForm()
    //通知框状态
    let [notiMsg, setNotiMsg] = useState({ type: '', description: '' });
    //表单提交的方法
    const onFinish = (values) => {
        if (roleId !== 0) {
            // eslint-disable-next-line
            const updata = roleList.reduce((o, r) => (r.roleId === roleId && (r.roleName = values.roleName), o.push(r), o), [])
            setRoleList([...updata])
            setNotiMsg({ type: 'success', description: '修改成功' })
        } else {
            try {
                values.roleId = roleList.length
                values.key = values.roleId
                setRoleList([...roleList, values])
                setNotiMsg({ type: 'success', description: '添加成功' })
                clear()
            } catch (e) {
                setNotiMsg({ type: 'error', description: e.message })
            }
        }
    };
    //表单清空
    const clear = () => {
        form.resetFields()
    }
    //关闭抽屉
    const onClose = () => {
        setRoleId(0)
        clear()
        setOpen(false)
    }
    return (
        <>
            <Drawer title={roleId?'修改角色':'添加角色'} width={500} placement="right" onClose={onClose} open={open}>
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="角色名称"
                        name="roleName"
                        rules={[{ required: true, message: '请输入角色名称' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                        {roleId?'修改':'添加'}
                        </Button>
                        <Button onClick={clear} style={{ marginLeft: '10px' }}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <MyNotification notiMsg={notiMsg} />
        </>
    )
}
