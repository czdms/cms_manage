import React from 'react'
import { LoginApi } from '../request/api';
import './less/Login.less'
import { Button, Form, Input,message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Link,useNavigate} from 'react-router-dom'
import logoImg from '../assets/logo.png'

export default function Login() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log('Success:', values);
        LoginApi({
            username:values.username,
            password:values.password
        }).then(
            res=>{
                console.log(res)
                if(res.errCode===0){
                    message.success(res.message)
                    localStorage.setItem('avatar',res.data.avatar)
                    localStorage.setItem('cms-token',res.data['cms-token'])
                    localStorage.setItem('editable',res.data.editable)
                    localStorage.setItem('player',res.data.player)
                    localStorage.setItem('username',res.data.username)
                    setTimeout(()=>{
                        navigate('/')
                    },1000)
                }
                else{
                    message.error(res.message)
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
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input size="large" placeholder="请输入用户名" prefix={<UserOutlined  />}/>
                </Form.Item>

                <Form.Item
                    name="password"
                    
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password size="large" placeholder="请输入密码" prefix={<LockOutlined />}/>
                </Form.Item>
                <Form.Item>
                    <Link to="/register">还没账号，立即注册</Link>
                </Form.Item>
                <Form.Item
                    // wrapperCol={{
                    //     offset: 8,
                    //     span: 16,
                    // }}
                >
                    <Button size="large" type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    )
}
