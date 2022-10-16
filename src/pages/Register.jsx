import React from 'react'
import { RegisterApi } from '../request/api';
import './less/Login.less'
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.png'

export default function Register() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        RegisterApi({
            username:values.username,
            password:values.password
        }).then(res=>{
                if(res.errCode===0){
                    message.success(res.message);
                    setTimeout(()=>navigate('/login'),1000)
                }else{
                    message.error(res.message);
                }
            }
        )
    };


    return (
        <div className="login">
            <div className='login_box'>
                <img src={logoImg} alt="" />
                <Form
                    name="basic"

                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"

                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="password"

                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('密码不同'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size="large" placeholder="请确认密码" prefix={<LockOutlined />}/>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/login">已有账号，前往登录</Link>
                    </Form.Item>
                    <Form.Item
                    // wrapperCol={{
                    //     offset: 8,
                    //     span: 16,
                    // }}
                    >
                        <Button size="large" type="primary" htmlType="submit" block>
                            立即注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

