import React, { Component } from 'react';
import style from './index.module.css';
import { Card, Tabs, Button, Form, Input } from 'antd';
import { login } from '../../api/index';
import {loginAction, menuAction} from '../../redux/actions/login';
import {connect} from 'react-redux';
import {menuFilter} from '../../utils/menuFilter';
import {asyncRouterMap} from '../../common/routerMap';

class Index extends Component {
    login = ()=>{
        const {loginAction, menuAction} = this.props;
        
        this.formRef.validateFields().then(res=>{
            //表单校验通过
            console.log('表单校验通过',res)
            login(res).then((res)=>{
                const {token, role, nickname} = res;
                //存储token
                sessionStorage.setItem('token',token);
                //存储用户的权限和昵称
                loginAction({
                    role:role,
                    nickname:nickname
                });
                //获取菜单权限，并存到redux中
                menuAction(menuFilter(asyncRouterMap, role));
                //跳转到home
                this.props.history.push('/index/home');

            }).catch(err=>{
                console.log("后端验证err",err)
            })
        }).catch(err=>{
            //表单校验不通过
            console.log('表单校验不通过', err)
        })
    }
    render() {
        return (           
            <div className={style.wrap}>
                <Card 
                title="好好的系统平台"
                bordered={false}
                headStyle={{ textAlign: 'center' }}
                style={{ width: 500,
                    color: 'pink',
                    fontWeight: 'bold', }}>

                    <p>您好{this.props.res.nickname}，BB欢迎您！</p>

                    <Tabs defaultActiveKey="1">
                        <items tab="手机号密码登陆" key="1">
                            <Form ref={(a)=>{this.formRef=a}} name="basic" wrapperCol={{ span: 24 }} >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: '请输入您的B账号' },
                                        { pattern:/^\w{4,12}$/, message: '请您输入4-12位数字下划线字母组合'} 
                                    ]} >
                                    <Input placeholder="开心的一天！"/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入您的B密码' }]} >
                                    <Input.Password placeholder="请问今天您吃好了吗：）"/>
                                </Form.Item>

                                <Button style={{ width: "100%" }} onClick={this.login} type="primary" htmlType="submit">
                                    快来和BB玩！
                                </Button>
                            </Form>
                        </items>

                        <items tab="新用户注册" key="2">
                            Content of Tab Pane 2
                        </items>
                    </Tabs>
                </Card> 
            </div>
        )
    }
}


export default connect(
    state=>({res:state}),
    { 
        loginAction,
        menuAction
     }
)(Index)