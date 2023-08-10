import React, { Component, lazy, Suspense } from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect, NavLink} from 'react-router-dom'
import style from './index.module.css';
import {connect} from 'react-redux';
import { regetInfo } from '../../api/index';
import {loginAction, menuAction} from '../../redux/actions/login';
import { Layout, Menu} from 'antd';
import {menuFilter} from '../../utils/menuFilter';
import {asyncRouterMap} from '../../common/routerMap';
import Headers from '@/components/header/Index';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Index extends Component {
    state = {
        menuTab:[],
    }

    //递归渲染菜单+<Navlink>加路由跳转
    menuRender=(menuList)=>{
        return menuList.map(item => {
            if(item.children){
                return <SubMenu key={item.path} title={item.meta.title}>
                    {this.menuRender(item.children)} 
                </SubMenu>
            }
            return (<Menu.Item key={item.path}> 
            {item.meta.title} 
        <NavLink to={'/index'+item.path}></NavLink> 
            </Menu.Item>)
        })
    }

    //递归渲染路由，动态路由，用户输入地址也无法到达
    renderRoute=(menuList)=>{
        let routeArr = []; //闭包，全局引用
        const asyncRoute=(menuList)=>{   
            menuList.map(item=>{
            if(item.children){
                return asyncRoute(item.children);
            }else{
                return routeArr.push(<Route 
                path={`/index${item.path}`} 
                component={lazy(()=>import(`@/views${item.path}/Index.jsx`))}  //17react ok,18不行，webpack config alias
                key={item.path} >
                </Route>)
                }   
        })
    }
        asyncRoute(menuList);
        return routeArr; //一定要return,否则无法渲染
    }
    

    componentDidMount(){ 
        if(this.props.res.menuReducer.length !== 0){
            const menuTab = this.menuRender(this.props.res.menuReducer);
            this.setState({
                menuTab
            })
            this.renderRoute(this.props.res.menuReducer);
        }else{
            //刷新
            regetInfo().then(res=>{
                const {role, nickname} = res.data;
                const {loginAction, menuAction} = this.props;
                //存储用户的权限和昵称
                loginAction({
                    role:role,
                    nickname:nickname
                });
                //获取菜单权限，并存到redux中
                menuAction(menuFilter(asyncRouterMap, role));

                //强制更新状态，17版本不用这样
                this.forceUpdate(()=>{
                    const menuTab = this.menuRender(this.props.res.menuReducer);
                    this.setState({
                        menuTab
                    })
                    this.renderRoute(this.props.res.menuReducer);
                    console.log('Update.menuReducer', this.props.res.menuReducer);
                });   
                
            })
        }
}
    render() {
        return (
            <div>
                <Layout style={{background:'black'}}>
                    <Sider className={style.sider}>
                        <div style={{ width: "100%", textAlign:'center'}}>
                            <h1 style={{ color:'#fff', marginTop:30}}>好好的哟</h1>
                            <Menu style={{marginTop:30}} theme='dark'> {/*这个一定要写的结构*/}
                            {this.state.menuTab}
                            </Menu> 
                        </div>
                    </Sider>
                    <Layout style={{overflow:'scroll'}}>
                        <Header className={style.header}>
                            <Headers history={this.props.history}></Headers>
                        </Header>
                        <Suspense fallback={<div>loading...</div>}>
                            <Content className={style.content}>
                                {this.renderRoute(this.props.res.menuReducer)}
                            </Content>
                        </Suspense>
                    </Layout>
                </Layout>
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
