import React from 'react';
import { Select } from 'antd';
import { loadData } from "../EnvironmentPage/actions";
import { initialState as envInitialState } from "../EnvironmentPage/reducer";
import { initialState, reducer } from './reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createSelector } from 'reselect';
import { connect } from "react-redux";
import { compose } from 'redux';
import saga from "./saga";

/* eslint-disable react/prefer-stateless-function */
class ExecutePage extends React.PureComponent {
  onChange = value => {
    console.log(`selected ${value}`);
  };

  componentDidMount = () => {
    this.props.dispatch(loadData());
  };

  render() {
    const { environments } = this.props;

    return (
      <div>
          <Select
            showSearch
            isRequired={true}
            style={{ width: 320 }}
            placeholder="选择环境"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              environments.data.map(env => (
                <Select.Option value={env.name}>{env.name}</Select.Option>
              ))
            }
          </Select>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  state => state.get('environments', envInitialState),
  state => state.get('executes', initialState),
  (environments, executes)=> ({
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
