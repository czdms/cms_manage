import React from 'react'
import {Outlet} from 'react-router-dom'
import './assets/base.css'
import { Button } from 'antd'

export default function App() {
  return (
    <div>
      <Button type="primary" block>
      Primary
    </Button>
    <Outlet/>
    </div>
  )
}
