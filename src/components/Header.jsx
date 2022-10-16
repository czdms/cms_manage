import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import logoImg from '../assets/logo.png'
import defaultAvatar from '../assets/defaultAvatar.png'
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, message } from 'antd';



export default function Header(props) {
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(defaultAvatar) 
    const [username, setUsername] = useState("游客")

    useEffect(()=>{
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')
        if(username1) {
            setUsername(username1)
        }
        if(avatar1) {
            setAvatar('http://47.93.114.103:6688/' + avatar1)
        }
    },[props.myKey])

    const logout = ({key}) => {
        if(key==='/login'){
            message.success('退出成功，即将返回登录页')
        }
        localStorage.clear();
       setTimeout(()=>{
        navigate(key)
       },1000)
      }

    const menu = (
        <Menu
        onClick={logout}
            items={[
                {
                    
                    key: '/means',
                    label: '修改资料',
                    // disabled:true
                },
                {
                    type: 'divider',
                },
                {
                    key: '/login',
                    label:'退出登录'
                },

            ]}
        />
    );

    return (

        <header>
            <img src={logoImg} alt="" className='logo' />
            <Dropdown className='right' overlay={menu}>
                <a className='ant-dropdown-link' href="/#" onClick={e => e.preventDefault()}>
                    <img src={avatar} className="avatar" alt="" />
                    <Space>
                        <span>{username}</span>
                        <CaretDownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </header>

    )
}
