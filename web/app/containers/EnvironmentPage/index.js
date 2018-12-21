import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createSelector} from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {Button, Modal, Table, Form, Input} from 'antd';
import {loadData, newEnvironment, deleteEnvironments} from './actions';
import {initialState, reducer} from './reducer';

import saga from './saga';

const styles = {
  button: {
    marginRight: '16px',
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

/* eslint-disable react/prefer-stateless-function */
class EnvironmentPage extends React.Component {
  state = {
    selectedRowKeys: [],
    newDialogVisible: false,
    newConfirmLoading: false,
    name: '',
    address: '',
    registry: '',
  };

  componentDidMount = () => {
    this.props.dispatch(loadData());
  };

  onSelectChange = selectedRowKeys => {
    this.setState({selectedRowKeys});
  };

  onNewDialogCancel = () => {
    this.setState({newDialogVisible: false});
  };

  onNewDialogConfirm = () => {
    this.setState({newDialogVisible: false});
    this.props.dispatch(newEnvironment({
      name: this.state.name,
      address: this.state.address,
      registry: this.state.registry,
    }));
  };

  onInputChange = field => event => {
    this.setState({[field]: event.target.value});
  };

  onNew = () => {
    this.setState({newDialogVisible: true});
  };

  onDelete = () => {
    this.props.dispatch(deleteEnvironments(this.state.selectedRowKeys));
  };

  render() {
    const { environments } = this.props;
    const { selectedRowKeys, newDialogVisible, newConfirmLoading } = this.state;
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

    const data = environments.data.map(env => ({
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

        <Modal
          title="新增环境"
          visible={newDialogVisible}
          onOk={this.onNewDialogConfirm}
          confirmLoading={newConfirmLoading}
          onCancel={this.onNewDialogCancel}>
          <div>
            <Form.Item
              {...formItemLayout}
              label="名称">
              <Input onChange={this.onInputChange('name')} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="地址">
              <Input onChange={this.onInputChange('address')} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="镜像仓库">
              <Input onChange={this.onInputChange('registry')} />
            </Form.Item>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  state => state.get('environments', initialState),
  environments => ({
    environments: environments.toJS(),
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
