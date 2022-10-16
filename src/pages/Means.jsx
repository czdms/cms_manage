import React,{useEffect, useState} from 'react'
import { GetUserDataApi, ChangeUserDataApi } from '../request/api';
import './less/Means.less'
import { Button,  Form, Input,  message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 /1024 /1024  < 2;
  if (!isLt2M) {
    message.error('请上传小于200KB的图片!');
  }
  return isJpgOrPng && isLt2M;
};
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

function Means(props) {
  // const [username1,setUsername1] = useState('')
  // const [password1,setPassword1] = useState('')
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(()=>{
    GetUserDataApi().then(res=>{
      // console.log(res)
      if(res.errCode===0){
        console.log(res)
        sessionStorage.setItem('username',res.data.username)

      }
    })
  },[])

  const onFinish = (values) => {
    // console.log(values)
    
    if(values.username && values.username !== sessionStorage.getItem('usernsme') && values.password.trim() !=="") {
      console.log('121212')
      ChangeUserDataApi({
        username:values.username,
        password:values.password
      }
      ).then(res=>{
        console.log('666666666666',res)
      })
    }
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        localStorage.setItem('avatar',info.file.response.data.filePath)
        props.addKey()
        message.success('修改成功')
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div className='means'>
      <Form
      onFinish={onFinish}
      name="basic"
      style={{width:'400px'}}
      autoComplete="off"
    >
      <Form.Item
        label="修改用戶名："
        name="username"
      >
        <Input placeholder='请输入新用户名'/>
      </Form.Item>

      <Form.Item
        label="修 改 密 码："
        name="password"
      >
        <Input placeholder='请输入新密码'/>
      </Form.Item>

      <Form.Item>
        <Button  type="primary" htmlType="submit" style={{float:'right'}}>
          提交
        </Button>
      </Form.Item>
    </Form>
    <p>点击下方修改头像</p>
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/upload"
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{"cms-token": localStorage.getItem('cms-token')}}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addKey(){
      const action = {type:"addKeyFn"}
      dispatch(action)
    }
  }
}

export default  connect(null,mapDispatchToProps)(Means)
