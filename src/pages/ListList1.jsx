import React, { useState, useEffect } from 'react'

import moment from 'moment'
import './less/List.less'
import { ArticleListApi } from '../request/api';
import { Space, Table, Button } from 'antd';



function MyTitle(props) {
  return (
    <div>
      <a className='table_title' href={'http://codesohigh.com:8765/article/'+props.id} target="black">{props.title}</a>
      <p style={{ color: '#999' }}>{props.subTitle}</p>
    </div>
  )
}


export default function List() {
  const [arr, setArr] = useState([])
  const [pagination,setPagination] = useState({current:1,pageSize:10,total:10})

  const getArticleList = (current,pageSize) => {
    ArticleListApi(
      {
        num:current,
        count:pageSize
      }
    ).then(res => {
      if (res.errCode === 0) {
        console.log(res.data)
        let {num,count, total} = res.data
        setPagination({
          current:num,
          pageSize:count,
          total
        })
        let newArr = JSON.parse(JSON.stringify(res.data.arr))
        let myarr = []
        newArr.map(item => {
          let obj = {
            key: item.id,
            date: moment(item.date).format("YYYY-MM-DD hh-mm-ss"),
            mytitle: <MyTitle title={item.title} subTitle={item.subTitle} id={item.id} />
          }
          myarr.push(obj)
          return myarr
        })

        setArr(myarr)
      }
    })
  }

  useEffect(() => {
    getArticleList(pagination.current,pagination.pageSize)
   // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [])

const pageChange = (arg) => {
  console.log(arg)
  getArticleList(arg.current,arg.pageSize)
}

  const columns = [
    {
      width: '60%',
      dataIndex: 'mytitle',
      key: 'mytitle',
      render: text => <div>{text}</div>
    },

    {

      dataIndex: 'date',
      key: 'date',
      render: (text) => (
        <p>{text}</p>
      )
    },

    {

      key: 'action',
      render: record => {
        
        return (
        
          <Space size="middle">
            <Button type='primary' onClick={()=>{console.log(record.key)}}>编辑</Button>
            <Button type='danger' onClick={()=>{console.log(record.key)}}>删除</Button>
          </Space>
          
        )
      },
    },
  ];
  return (
    <div className='list_table'>
      <Table 
      showHeader={false} 
      columns={columns} 
      dataSource={arr} 
      onChange={pageChange}
       pagination={pagination}/>
    </div>
  )
}







