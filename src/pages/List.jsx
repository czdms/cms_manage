
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import moment from 'moment'
import { ArticleListApi,ArticleDeleteApi } from '../request/api';

import { List, Skeleton, Pagination, Button, message } from 'antd';

// import { importManager } from 'less';



export default function Listlist() {
  const navigate = useNavigate()
  const [list, setList] = useState([]);
  const [deleteArticle,setDeleteArticle] = useState(1)
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getList = (num) => {
    ArticleListApi({
      num: num,
      count: pageSize
    }).then(res => {
      //console.log(res)
      if (res.errCode === 0) {
        let { arr, total, num, count } = res.data
        setList(arr)
        setTotal(total)
        setCurrent(num)
        setPageSize(count)
      }
    })
  }
  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteArticle])
  const onChange = (pages) => {

    getList(pages)
  }
  const delFn = (id) => {
    
    ArticleDeleteApi({id}).then((res)=>{
      //console.log(res)
      if(res.errCode===0){
        message.success(res.message)
        setDeleteArticle(deleteArticle+1)

      }
    }

    )
  }
  return (
    <div className='list_table' style={{ padding: '20px' }}>
      <List
        className="demo-loadmore-list"

        itemLayout="horizontal"

        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type='primary' onClick={()=>{navigate('/edit/'+item.id)}}>编辑</Button>,
              <Button type='danger' onClick={()=>{delFn(item.id)}}>删除</Button>]}
          >
            <Skeleton loading={false} title={false} active>
              <List.Item.Meta

                title={<a href="!#">{item.title}</a>}
                description={item.subTitle}
              />
              <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination style={{ float: 'right', marginTop: '20px' }} onChange={onChange} total={total} current={current} pageSize={pageSize} />
    </div>
  )
}
