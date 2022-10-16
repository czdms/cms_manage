import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api'
import moment from 'moment'
import '@wangeditor/editor/dist/css/style.css'
import { Button, PageHeader, Modal, Form, Input, message } from 'antd'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'



export default function Edit() {
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState()
  const [editor, setEditor] = useState(null)
  const params = useParams()
  console.log(params)
  // console.log('$$$$$$$$$')
  const [html, setHtml] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm();

  const dealData = (errCode, msg) => {
    if (errCode === 0) {
      message.success(msg)
      setTimeout(() => {
        navigate('/listlist')
      })

    } else {
      message.error(msg)
    }
    setIsModalOpen(false)
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    // setIsModalOpen(false);
    form
      .validateFields()
      .then(values => {
        // form.resetFields();        

        let { title, subTitle } = values
        // console.log(html)
        if (params.id) {
          ArticleUpdateApi({ title, subTitle, content: html, id: params.id }).then(res => dealData(res.errCode, res.message)
          )
        } else {
          ArticleAddApi({
            title,
            subTitle,
            content: html
          }).then(res => dealData(res.errCode, res.message)
          )
        }
      })
      .catch(() =>
        false
      )

  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const toolbarConfig = {}
  const editorConfig = {
    placeholder: '请输入内容...',
  }
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  useEffect(() => {
    if (params.id) {
      ArticleSearchApi({ id: params.id }).then(res => {
        console.log('###########', res)
        if (res.errCode === 0) {
          setHtml(res.data.content)
          setTitle(res.data.title)
          setSubTitle(res.data.subTitle)
        }
      })
    }
    else {
      setHtml('')
      setTitle('')
      setSubTitle('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div>
      <PageHeader
        ghost={false}
        onBack={params.id ? () => { window.history.back() } : null}
        title="文章编辑"
        subTitle={"当前日期: " + moment(new Date()).format("YYYY-MM-DD")}
        extra={<Button key="1" type="primary" onClick={showModal}>提交文章</Button>}
      >
      </PageHeader>

      <Modal title="填写文章标题" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消">
        <Form
          form={form}
          initialValues={{ title, subTitle }}
          name="basic"
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 21,
          }}

          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请填写标题',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subTitle"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ padding: '0 20px 20px', background: '#fff' }}>
        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
          />
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={editor => {
              setHtml(editor.getHtml())

            }}
            mode="default"
            style={{ height: '500px', overflowY: 'hidden' }}
          />
        </div>
        <div style={{ marginTop: '15px' }}>
          {html}
        </div>
      </div>
    </div>



  )
};




