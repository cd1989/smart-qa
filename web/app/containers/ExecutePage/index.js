import React from 'react';
import {Button, Select} from 'antd';
import {loadData} from "../EnvironmentPage/actions";
import {initialState as envInitialState} from "../EnvironmentPage/reducer";
import {initialState, reducer} from './reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {createSelector} from 'reselect';
import {connect} from "react-redux";
import {compose} from 'redux';
import saga from "./saga";
import {runTest} from './actions';

/* eslint-disable react/prefer-stateless-function */
class ExecutePage extends React.PureComponent {
  state = {
    envName: "",
    testSuite: "",
  };

  onEnvChange = value => {
    this.setState({envName: value});
  };

  onSuiteChange = value => {
    this.setState({testSuite: value});
  };

  componentDidMount = () => {
    this.props.dispatch(loadData());
  };

  onExecute = () => {
    this.props.dispatch(runTest(this.state));
  };

  render() {
    const {environments} = this.props;

    return (
      <div>
        <div style={{marginBottom: 16}}>
          <Select
            showSearch
            isRequired={true}
            style={{width: 320}}
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
        </div>
        <div style={{marginBottom: 16}}>
          <Select
            showSearch
            isRequired={true}
            style={{width: 320}}
            placeholder="选择测试内容"
            optionFilterProp="children"
            onChange={this.onSuiteChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option value='cargo'>镜像仓库</Select.Option>
            <Select.Option value='devops'>流水线</Select.Option>
          </Select>
        </div>
        <div>
          <Button type="primary" onClick={this.onExecute}>开始测试</Button>
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
