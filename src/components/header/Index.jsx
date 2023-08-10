import React, { Component } from 'react'
import { DownOutlined, HeartOutlined, SmileOutlined} from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginAction, menuAction } from '../../redux/actions/login';



class Index extends Component {
    logOut = () => {
        //清除token和redux中的数据
        sessionStorage.clear();
        this.props.loginAction({role:'',nickname:''});
        this.props.menuAction([]);
        //跳转到登录页
        this.props.history.push('/login');       
    }
    render() {
        const menu = (
            <Menu
              items={[
                {
                  key: '1',
                  label: (
                    <NavLink to="/index/personal">
                      个人信息
                    </NavLink>
                  ),
                  icon: <HeartOutlined />,
                },
                {
                  key: '2',
                  label: (
                    // 用<NavLink>标签onClick会报错
                    <a onClick={this.logOut}> 
                      退出登录
                    </a>
                  ),
                  icon: <SmileOutlined />,
                },
              ]}
            />
          );
        return (
            <div>
                <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                    <Space>
                    {/* 长度会报错？resizeError */}
                        欢迎您, {this.props.res.loginReducer.nickname} 
                        <DownOutlined />
                    </Space>
                    </a>
                </Dropdown>
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