import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Input, Select, Upload, message } from "antd";
import MyNotification from "../../components/MyNotification/MyNotification";
import { IList } from "../../api/RoleApi";
import { IUpload } from "../../api/adminApi";
export default function AddAdmin({
  open,
  setOpen,
  adminList,
  setadminList,
  loginId,
  setLoginId,
}) {
  //定义表单实例
  let [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true);
    IUpload()
      .then(() => {
        setFileList([]);
      })
      .catch((e) => {
        console.log(e.message);
        message.error(e.message);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  //角色列表
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  let [roleList, setRoleList] = useState([]);
  //加载角色的方法
  const loadRoleList = () => {
    IList().then((data) => {
      data = data.map((r) => {
        return {
          value: r.roleId,
          label: r.roleName,
        };
      });
      setRoleList(data);
    });
  };
  useEffect(() => {
    loadRoleList();
    const updata = adminList.find((r) => r.loginId === loginId);
    console.log(updata);
    for (let [key, value] of Object.entries(updata??{})) {
        if(key ==="Id"){
            break;
        }
      form.setFieldsValue(key, value);
    }
  }, [loginId]);

  //通知框状态
  // eslint-disable-next-line
  let [notiMsg, setNotiMsg] = useState({ type: "", description: "" });
  //表单提交的方法
  const onFinish = (values) => {
    console.log(loginId);
    if (loginId !== 0) {
      console.log(loginId);
      // const updata = roleList.reduce((o, r) => (r.roleId === roleId && (r.roleName = values.roleName), o.push(r), o), [])
      // setRoleList([...updata])
      // setNotiMsg({ type: 'success', description: '修改成功' })
    } else {
      try {
        values.Id = adminList.length;
        values.key = values.Id;
        setadminList([...adminList, values]);
        setNotiMsg({ type: "success", description: "添加成功" });
        clear();
      } catch (e) {
        setNotiMsg({ type: "error", description: e.message });
      }
    }
  };
  //表单清空
  const clear = () => {
    form.resetFields();
  };
  //关闭抽屉
  const onClose = () => {
    //setAdminId(0)
    clear();
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title={loginId ? "修改角色" : "添加角色"}
        width={500}
        placement="right"
        onClose={onClose}
        open={open}
      >
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
            label="账号"
            name="loginId"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="loginPwd"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="电话"
            name="phone"
            rules={[{ required: true, message: "请输入电话" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="头像"
            name="photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "请选择头像" }]}
          >
            <Upload {...props}>
              <Button
                type="primary"
                onClick={handleUpload}
                loading={uploading}
                style={{
                  marginTop: 16,
                }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId"
            rules={[{ required: true, message: "请选择角色" }]}
          >
            <Select options={roleList}></Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {loginId ? "修改" : "添加"}
            </Button>
            <Button onClick={clear} style={{ marginLeft: "10px" }}>
              取消
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <MyNotification notiMsg={notiMsg} />
    </>
  );
}
