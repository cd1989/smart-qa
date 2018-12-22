import React from 'react';
import {Button, Icon, Select, Table, Spin} from 'antd';
import {loadData} from "../EnvironmentPage/actions";
import {initialState as envInitialState, reducer as envReducer} from "../EnvironmentPage/reducer";
import {initialState, reducer} from './reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {createSelector} from 'reselect';
import {connect} from "react-redux";
import {compose} from 'redux';
import envSaga from "../EnvironmentPage/saga";
import saga from "./saga";
import {deleteRecords, loadRecords, runTest} from './actions';
import { formatTime } from './../util';

const columns = [{
  title: '环境',
  dataIndex: 'environment',
}, {
  title: '测试内容',
  dataIndex: 'suite',
}, {
  title: '测试时间',
  dataIndex: 'testTime',
  render: text => formatTime(text),
}, {
  title: '状态',
  dataIndex: 'succeed',
  render: (text, record) => record.succeed ? (<Icon type="check"/>) : (<Icon type="close"/>),
}];

/* eslint-disable react/prefer-stateless-function */
class ExecutePage extends React.PureComponent {
  state = {
    envName: "",
    testSuite: "",
    selectedRecordKeys: [],
    rows: [],
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

  onSelectRecordChange = (selectedRecordKeys, rows) => {
    this.setState({selectedRecordKeys, rows});
  };

  onRecordsDelete = () => {
    this.props.dispatch(deleteRecords(this.state.selectedRecordKeys, this.state.envName));
    this.setState({selectedRecordKeys: []});
  };

  render() {
    const {environments, executes} = this.props;
    const {envName, testSuite, selectedRecordKeys, rows} = this.state;
    const suite = rows.length === 0 ? "cargo" : rows[0].suite;

    const rowSelection = {
      selectedRowKeys: selectedRecordKeys,
      onChange: this.onSelectRecordChange,
    };

    const data = executes.data.map(e => ({
      key: e.id,
      id: e.id,
      environment: e.environment,
      suite: e.suite,
      testTime: e.testTime,
      succeed: e.succeed,
    }));

    return (
      <div>
        <div style={{marginBottom: 32}}>
          <Select
            showSearch
            isRequired={true}
            style={{width: 280, marginRight: 24}}
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
            style={{width: 280, marginRight: 24}}
            placeholder="选择测试内容"
            optionFilterProp="children"
            onChange={this.onSuiteChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option value='cargo'>镜像仓库</Select.Option>
            <Select.Option value='devops'>流水线</Select.Option>
          </Select>
          <Button type="primary" disabled={envName===""||testSuite===""||executes.processing} onClick={this.onExecute}>
            {executes.processing ? "正在测试...": "开始测试"}
          </Button>
          { executes.processing ? <Spin style={{marginLeft: 16}}/>: <span/> }
        </div>

        <div>
          <div style={{marginBottom: 16}}>
            <Button
              href={`/reports/${selectedRecordKeys[0]}/${suite}/report.html`}
              disabled={selectedRecordKeys.length !== 1}
              type="primary"
              style={{marginRight: 16}}>
              测试报告
            </Button>
            <Button
              disabled={selectedRecordKeys.length === 0}
              onClick={this.onRecordsDelete}>
              删除记录
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

export default compose(
  injectReducer({key: 'executes', reducer: reducer}),
  injectReducer({key: 'environments', reducer: envReducer}),
  injectSaga({key: 'executes', saga: saga}),
  injectSaga({key: 'environments', saga: envSaga}),
  connect(mapStateToProps),
)(ExecutePage);
