import React, { Component } from 'react'
import { Card, Col, Form, Row, Input, Select, Button, Table, Pagination, message } from 'antd';
import {teacherInfo, delTeacher, batchDelete} from '@/api/teacher';
import Modal from './AddModal';
import moment from 'moment';

export default class Index extends Component {
    state={
        disable:true,
        searchData:{
            page:1,
            pageSize:10,
        }, 
        listData:[], //列表数据
        loading:false, //加载状态
        showModal:false, //模态框状态
        total:0, //总条数
        filledInfo:{}, //输入框的值
        title:'',
        record:{}, //表格的一条数据，有id
        selectedRowKeys:[], //选中的行
    }

    formRef = React.createRef();

    serach=()=>{
        const filledInfo = this.formRef.current.getFieldsValue(true);
        this.setState({
            filledInfo
        },()=>{this.getForm()});
    }

    reset=()=>{
        this.formRef.current.resetFields();
        this.setState({
            searchData:{
                page:1,
                pageSize:10,
            }, 
            filledInfo:{},
        },()=>{this.getForm()});        
    }

    getForm=()=>{
        const {filledInfo, searchData} = this.state;
        this.setState({
            loading:true
        })
        teacherInfo({...filledInfo, ...searchData}).then(res=>{
            this.setState({
                listData:res.data.map(item=>({...item, key:item.id})), //每一行都要有key是table的要求，必须有
                loading:false,
                total:res.total
            }, ()=>{console.log('listData', this.state.listData)});
            
        });
    }

    showModal=()=>{
        this.setState({
            showModal:true,
            title:'新建教师'
        })
    }

    isCancel=(val)=>{
        this.setState({
            showModal:val
        })
    }

    changePage=(page, pageSize)=>{
        console.log(page, pageSize);
        this.setState({
            searchData:{
                page,
                pageSize,
            }
        }, ()=>{this.getForm()}); //setState是异步的，所以要在回调函数中调用getForm,setState第二个参数是回调函数
        
    }

    teacherEdit=(record)=>{      
        console.log('record',record); 
        this.setState({
            showModal:true,
            title:'编辑教师',
            record
        }, ()=>{
            //日期需要转回moment对象，setFieldsValue需要传入一个对象
            let {birth, date} = record;
            birth = moment(birth);
            date = moment(date);
            this.modalRef.formRef.setFieldsValue({...record, birth, date});
            }
            );
    }

    teacherDelete=(id)=>{
        //这里要传一个{id：id}，同名可以简写为{id}
        delTeacher({id}).then(res=>{
            if(res.code===0){
                //删除操作成功
                message.success(res.msg , 10); //10s后自动关闭
                this.getForm();
            }
        }).catch(err=>{
            console.log('del失败', err);
        })
    }

    selectRows=(selectedRowKeys)=>{ 
        this.setState({
            selectedRowKeys,
        },()=>{
            if(this.state.selectedRowKeys.length>0){
                this.setState({
                    disable:false
                })
            }
        })   
    }

    batchDelete=()=>{ 
        //这里要传一个{ids：[ids]}
        batchDelete({ids:this.state.selectedRowKeys}).then(res=>{           
            if(res.code===0){
                //删除操作成功
                message.success(res.msg , 10); //10s后自动关闭
                this.getForm();
            }
        }).catch(err=>{
            console.log('batchdel失败', err);
        });
    }

    render() {
        const columns = [
            {
              title: '序号',
              dataIndex: 'index', //dataIndex对应的是data中的key,要和后端返回的数据中key（必须有）对应
              key: 'index',
              width: 60,
              render: (text, record, index) => index+1 //text是dataIndex对应的值，record是data中的一条数据，index是序号
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              width: 80,
            },
            {
              title: '性别',
              dataIndex: 'gender',
              key: 'name',
              width: 80,
              render: (text) => text === 1 ? '男' : '女'
            },
            {
                title: '级别',
                dataIndex: 'level',
                key: 'level',
                width: 100,
                render: (text) => {
                    if(text===1){
                        return '初级教师'
                    }else if(text===2){
                        return '中级教师'
                    }else if(text===3){
                        return '高级教师' 
                    }else{
                        return '特级教师'}
                    }
            },
            {
                title: '年级',
                dataIndex: 'grade',
                key: 'grade',
                width: 80,
              },
              {
                title: '科目',
                dataIndex: 'subject',
                key: 'subject',
                width: 80,
              },
              {
                title: '入职日期',
                dataIndex: 'date',
                key: 'date',
                width: 150,
              },
              {
                title: '手机号码',
                dataIndex: 'tel',
                key: 'tel',
                width: 150,
              },
              {
                title: '毕业院校',
                dataIndex: 'school',
                key: 'school',
                width: 150,
              },
              {
                title: '出生年月',
                dataIndex: 'birth',
                key: 'birth',
                width: 150,
              },
              {
                title: '家庭住址',
                dataIndex: 'address',
                key: 'address',
                width: 150,
              },
              {
                title: '学历',
                dataIndex: 'education',
                key: 'education',
                width: 80,
              },
              {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                fixed: 'right',
                width: 150,
                render: (text, record) => {
                    return (
                        <div>
                        <Button type='primary' size='small' onClick={()=>{this.teacherEdit(record)}}>受赏</Button>
                        <Button className='ml' type="primary" danger size='small' onClick={()=>{this.teacherDelete(record.id)}}>开除</Button>
                        </div>
                    )
                },
              },
          ];
        const {disable, listData, loading, showModal, total, title, record, } = this.state;
        return (
            <div>
                <Card 
                className='mt'
                bordered={false}
                >
                    <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    ref={this.formRef}
                    >
                        {/* <>Row 可以用 gutter 来设定列间隔</> */}
                        <Row gutter={10}>
                            <Col span={6}>
                                <Form.Item 
                                label="姓名"
                                name="name"
                                >
                                    <Input placeholder="请输入姓名" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item 
                                    label="科目"
                                    name="subject"
                                    >
                                        <Select
                                        defaultValue="全部"
                                        options={[
                                            {
                                            value: '语文',
                                            label: '语文',
                                            },
                                            {
                                                value: '数学',
                                                label: '数学',
                                            },
                                            {
                                            value: '英语',
                                            label: '英语',
                                            },
                                            {
                                                value: '物理',
                                                label: '物理',
                                                },
                                            {
                                            value: '化学',
                                            label: '化学',
                                            },
                                            {
                                                value: '生物',
                                                label: '生物',
                                                },
                                            
                                        ]}
                                        />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                            <Form.Item 
                                label="手机"
                                name="tel"
                                >
                                    <Input placeholder="请输入手机号码" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Button className='ml' type='primary' onClick={this.serach}>搜索</Button>
                                <Button className='ml' onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card className='mt'>
                    <Button type='primary' onClick={this.showModal}>创建老师</Button>
                    <Button className='ml' disabled={disable} onClick={this.batchDelete} danger>批量删除</Button>
                </Card>
                <Card className='mt'>
                    <Table 
                    columns={columns} 
                    dataSource={listData} 
                    scroll={{ x: 1200 }}
                    style={{fontSize:'12px', textAlign:'center'}}
                    loading={loading}
                    pagination={false} //先关闭默认的分页
                    rowSelection={{
                        type: 'checkbox',
                        //selectedRowKeys, selectedRows是内置的，onChange自动返回的参数
                        onChange: (selectedRowKeys) => {this.selectRows(selectedRowKeys)},
                      }}
                    />
                    <Pagination 
                    size="small" 
                    total={total} 
                    showSizeChanger 
                    showQuickJumper
                    onChange={this.changePage}
                     />
                </Card>
                <Modal 
                showModal={showModal} 
                isCancel={this.isCancel} 
                getForm={this.getForm}
                ref = {a=>this.modalRef=a}
                title= {title}
                record={record}
                >
                </Modal>
            </div>
        )
    }
}
