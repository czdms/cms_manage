import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ReadOutlined, EditOutlined, DatabaseOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

export default function Aside() {
  const navigate = useNavigate()
  const location = useLocation()
  const [defaultKey, setDefaultKey] = useState('')
  useEffect(() => {
    let path = location.pathname;
        let key = path.split('/')[1];
        setDefaultKey(key)
  }, [location.pathname])
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }


  const onClick = (e) => {
    navigate(e.key)
    setDefaultKey(e.key)

  };
  const items = [
    getItem('查看文章列表list', 'listlist', <ReadOutlined />,),
    getItem('查看文章列表', 'list', <ReadOutlined />,),
    getItem('文章编辑', 'edit', <EditOutlined />,),
    getItem('修改资料', 'means', <DatabaseOutlined />,),
  ];
  return (
    <Menu
      className='aside'
      onClick={onClick}
      style={{
        width: 160,
      }}
      selectedKeys={[defaultKey]}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
}


