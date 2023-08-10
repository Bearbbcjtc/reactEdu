import React, { Component } from 'react'
import { Row, Col, Modal, Form, Input, Select, DatePicker, Radio, message } from 'antd';
import moment from 'moment';
import {addTeacher, editTeacher} from '@/api/teacher';

export default class AddModal extends Component {

    handleOk=()=>{
        const {id} = this.props.record;
        this.formRef.validateFields().then(res=>{
            const birth = moment(res.birth).format('YYYY-MM-DD');
            const date = moment(res.date).format('YYYY-MM-DD');

            //用目前填的表内容+id去请求接口
            const resData = this.props.title==='新建教师'?addTeacher({...res,birth,date}):editTeacher({...res,birth,date,id});
            
            resData.then(res=>{
                if(res.code===0){
                    //添加/修改操作成功
                    message.success(res.msg , 10); //10s后自动关闭
                    this.props.isCancel(false);
                    this.formRef.resetFields();
                    this.props.getForm();
                }
            }).catch(err=>{});           
        }).catch(err=>{});
    }

    handleCancel=()=>{
        this.props.isCancel(false);
    }

    render() {
        return (
            <div>
                <Modal title={this.props.title} open={this.props.showModal} onOk={this.handleOk} onCancel={this.handleCancel} width={800}>
                    <Form
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    ref={a=>this.formRef=a}
                    >
                        <Row>
                        <Col span={12}>
                            <Form.Item
                                label="姓名"
                                name="name"
                                rules={[
                                {
                                    required: true,
                                    message: '姓名不能为空!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="性别"
                                name="gender"
                                rules={[
                                {
                                    required: true,
                                    message: '性别不能为空!',
                                },
                                ]}
                            >
                                <Select
                                    options={[
                                    {
                                        value: 1,
                                        label: '男',
                                    },
                                    {
                                        value: 2,
                                        label: '女',
                                    },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="级别"
                                name="level"
                                rules={[
                                {
                                    required: true,
                                    message: '级别不能为空!',
                                },
                                ]}
                            >
                                <Select
                                    options={[
                                    {
                                        value: 1,
                                        label: '初级教师',
                                    },
                                    {
                                        value: 2,
                                        label: '中级教师',
                                    },
                                    {
                                        value: 3,
                                        label: '高级教师',
                                    },
                                    {
                                        value: 4,
                                        label: '特级教师',
                                    },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label="年级"
                                name="grade"
                                rules={[
                                {
                                    required: true,
                                    message: '年级不能为空!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="科目"
                                name="subject"
                                rules={[
                                {
                                    required: true,
                                    message: '科目不能为空!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="入职日期"
                                name="date"
                                rules={[
                                {
                                    required: true,
                                    message: '入职日期不能为空!',
                                },
                                ]}
                            >
                                <DatePicker
                                style={{
                                    width: '100%',
                                  }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="类型"
                                name="type"
                                rules={[
                                {
                                    required: true,
                                    message: '类型不能为空!',
                                },
                                ]}
                            >
                                <Radio.Group>
                                {/* 后端表格传回是'1',所以setValue对应以便传入 */}
                                <Radio value='1'>全职</Radio>
                                <Radio value='2'>兼职</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="手机号码"
                                name="tel"
                                rules={[
                                {
                                    required: true,
                                    message: '手机号码不能为空!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="毕业院校"
                                name="school"
                                rules={[
                                {
                                    required: true,
                                    message: '毕业院校不能为空!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="出生年月"
                                name="birth"
                                rules={[
                                {
                                    required: true,
                                    message: '出生年月不能为空!',
                                },
                                ]}
                            >
                                <DatePicker
                                style={{
                                    width: '100%',
                                  }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="家庭住址"
                                name="address"
                                rules={[
                                {
                                    required: true,
                                    message: '家庭住址不能为空!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="学历"
                                name="education"
                                rules={[
                                {
                                    required: true,
                                    message: '学历不能为空!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    </Form>
                    
                </Modal>
            </div>
        )
    }
}
