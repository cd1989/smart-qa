import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Breadcrumb, Layout} from 'antd';
import EnvironmentPage from 'containers/EnvironmentPage/Loadable';
import ExecutePage from 'containers/ExecutePage/Loadable';
import CasePage from 'containers/CasePage/Loadable';
import AppMenu from './menu';

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
            <AppMenu {...{ location }} />
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>{location.state.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}
            >
              <Switch>
                <Route exact path="/" component={EnvironmentPage}/>
                <Route path="/environments" component={EnvironmentPage}/>
                <Route path="/executes" component={ExecutePage}/>
                <Route path="/cases" component={CasePage}/>
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
