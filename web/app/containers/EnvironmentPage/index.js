import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createSelector} from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {Button, Table} from 'antd';
import {loadData} from './actions';
import {initialState, reducer} from './reducer';

import saga from './saga';

const styles = {
  button: {
    marginRight: '16px',
  },
};

/* eslint-disable react/prefer-stateless-function */
class EnvironmentPage extends React.Component {
  state = {
    selectedRowKeys: [],
  };

  componentDidMount = () => {
    this.props.dispatch(loadData());
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  }

  onNew = () => {
    console.log('new...');
  }

  onDelete = () => {
    console.log('delete...');
  }

  render() {
    const { environments } = this.props;
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
      title: '名称',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '地址',
      dataIndex: 'address',
    }, {
      title: '镜像仓库',
      dataIndex: 'registry',
    }, {
      title: '添加时间',
      dataIndex: 'creationTime',
    }];

    const data = environments.data.toJS().map(env => ({
      key: env.name,
      name: env.name,
      address: env.address,
      registry: env.registry,
      creationTime: env.creation_time,
    }));

    return (
      <div>
        <div style={{marginBottom: 16}}>
          <Button
            style={styles.button}
            type="primary"
            onClick={this.onNew}>
            新增
          </Button>
          <Button
            onClick={this.onDelete}
            disabled={!hasSelected}>
            删除
          </Button>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  state => state.get('environments', initialState),
  environments => ({
    environments: environments.toObject(),
  })
);

const withReducer = injectReducer({key: 'environments', reducer});
const withSaga = injectSaga({key: 'environments', saga});
const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EnvironmentPage);
