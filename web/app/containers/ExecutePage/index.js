import React from 'react';
import {Button, Select, Table} from 'antd';
import {loadData} from "../EnvironmentPage/actions";
import {initialState as envInitialState} from "../EnvironmentPage/reducer";
import {initialState, reducer} from './reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {createSelector} from 'reselect';
import {connect} from "react-redux";
import {compose} from 'redux';
import saga from "./saga";
import {runTest,loadRecords} from './actions';

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '环境',
  dataIndex: 'environment',
}, {
  title: '测试内容',
  dataIndex: 'suite',
}, {
  title: '测试时间',
  dataIndex: 'testTime',
}];

/* eslint-disable react/prefer-stateless-function */
class ExecutePage extends React.PureComponent {
  state = {
    envName: "",
    testSuite: "",
    selectedRecordKeys: [],
  };

  onEnvChange = value => {
    this.setState({envName: value});
    this.props.dispatch(loadRecords(value));
  };

  onSuiteChange = value => {
    this.setState({testSuite: value});
  };

  componentDidMount = () => {
    this.props.dispatch(loadData());
    this.props.dispatch(loadRecords(""));
  };

  onExecute = () => {
    this.props.dispatch(runTest(this.state));
  };

  onSelectRecordChange = selectedRecordKeys => {
    this.setState({selectedRecordKeys});
  };

  render() {
    const { environments, executes } = this.props;
    const { selectedRecordKeys } = this.state;

    const rowSelection = {
      selectedRowKeys: selectedRecordKeys,
      onChange: this.onSelectRecordChange,
    };

    console.log(executes);
    const data = executes.data.map(e => ({
      key: e.id,
      id: e.id,
      environment: e.environment,
      suite: e.suite,
      testTime: e.testTime,
    }));

    return (
      <div>
        <div style={{marginBottom: 32}}>
          <Select
            showSearch
            isRequired={true}
            style={{width: 320, marginRight: 24}}
            placeholder="选择环境"
            optionFilterProp="children"
            onChange={this.onEnvChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              environments.data.map(env => (
                <Select.Option key={env.name} value={env.name}>{env.name}</Select.Option>
              ))
            }
          </Select>
          <Select
            showSearch
            isRequired={true}
            style={{width: 320, marginRight: 24}}
            placeholder="选择测试内容"
            optionFilterProp="children"
            onChange={this.onSuiteChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option value='cargo'>镜像仓库</Select.Option>
            <Select.Option value='devops'>流水线</Select.Option>
          </Select>
          <Button type="primary" onClick={this.onExecute}>开始测试</Button>
        </div>

        <div>
          <div style={{marginBottom: 16}}>
            <Button
              type="primary"
              onClick={this.onNew}>
              测试报告
            </Button>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  state => state.get('environments', envInitialState),
  state => state.get('executes', initialState),
  (environments, executes) => ({
    environments: environments.toJS(),
    executes: executes.toJS(),
  })
);

const withReducer = injectReducer({key: 'executes', reducer});
const withSaga = injectSaga({key: 'executes', saga});
const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ExecutePage);
