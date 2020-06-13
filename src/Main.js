import React from 'react';
import logo from './logo.svg';
import login_img from './Images/Sistema.jpg'
import ReactDOM from "react-dom";
import './Login.css';
import "antd/dist/antd.css";
import { Row, Col, Form, Input, Button, Card, Layout, Menu, Table, Tag, Space } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    RightOutlined,
  } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default class Main extends React.Component {
  constructor() {
    super();



    this.state = {
        collapsed: false,
        data: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3300/allRequests',{
        method: 'GET'})
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
          if(responseJson.length === 0){
            this.setState({erro: "Usuário e/ou senha incorreta."})
          } else {
            this.setState({data: responseJson})
            console.log('aaa')

  
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


render(){

    const columns = [
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'CNPJ',
          dataIndex: 'cnpj',
          key: 'cnpj',
        },
        {
          title: 'Enviado por',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Button type="primary" shape="circle" icon={<RightOutlined />} onClick={(e) => {this.props.history.push({pathname:'/', record:record})}}/>
          ),
        },
      ];
      

  return (
    <>
    <Layout style={{height:'100vh'}}>
        <Sider >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Requisições Pendentes
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              Lista de Estabelecimentos
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{

              padding: 24,
            }}
          >
            <Card><Table columns={columns} dataSource={this.state.data} /></Card>
          </Content>
        </Layout>
      </Layout>
      </>
  );
}
  
}


