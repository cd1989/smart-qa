import React from 'react';

import {Breadcrumb, Icon, Layout, Menu} from 'antd';

const {Header, Content, Sider} = Layout;

const styles = {
  logo: {
    minWidth: '120px',
    marginRight: '24px',
    float: 'left',
    color: 'white',
    fontSize: '21px',
  },
};

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div style={styles.logo}>自动测试平台</div>
        </Header>
        <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%', borderRight: 0}}
            >
              <Menu.Item key="1">
                <Icon type="pie-chart"/>
                <span>环境管理</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop"/>
                <span>执行测试</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>环境管理</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
