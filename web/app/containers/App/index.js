import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Breadcrumb, Icon, Layout, Menu} from 'antd';
import EnvironmentPage from 'containers/EnvironmentPage/Loadable';
import ExecutePage from 'containers/ExecutePage/Loadable';

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

class App extends React.Component {
  render() {
    const {location} = this.props;

    return (
      <Layout>
        <Header className="header">
          <div style={styles.logo}>自动测试平台</div>
        </Header>
        <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              defaultOpenKeys={['location.pathname']}
              style={{height: '100%', borderRight: 0}}
            >
              <Menu.Item key="/environments">
                <Link to="/environments">
                  <Icon type="laptop"/>
                  <span>环境管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/executes">
                <Link to="/executes">
                  <Icon type="play-circle"/>
                  <span>执行测试</span>
                </Link>
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
              <Switch>
                <Route exact path="/" component={EnvironmentPage}/>
                <Route path="/environments" component={EnvironmentPage}/>
                <Route path="/executes" component={ExecutePage}/>
                <Redirect to="/"/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
