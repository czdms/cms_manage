import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header';
import Aside from './components/Aside'
import './assets/base.less'
import { Layout } from 'antd';
import Bread from './components/Bread';
import { connect } from 'react-redux';



function App(props) {
  
  return (
    <div>
      <Layout id='app'>
        <Header key={props.myKey}></Header>
        <div className='container'>
          <Aside></Aside>
          <div className='container_box'>
            <Bread />
            <div className='container_content'>
              <Outlet/>
            </div>
          </div>
        </div>
        <footer>Respect | Copyright &copy;
          2022 Author 唯爱瓜子
        </footer>
      </Layout>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    myKey:state.myKey
  }
}

export default connect(mapStateToProps)(App)