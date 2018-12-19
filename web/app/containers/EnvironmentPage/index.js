import React from 'react';
import {Button, Table} from 'antd';

const styles = {
  button: {
    marginRight: '16px',
  },
};

/* eslint-disable react/prefer-stateless-function */
export default class EnvironmentPage extends React.Component {
  state = {
    selectedRowKeys: [],
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
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }, {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    }];

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
