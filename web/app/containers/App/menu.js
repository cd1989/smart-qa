import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

const AppMenu = ({ location }) => {
    const MENUS = [
        {
            name: '环境管理',
            path: '/environments',
            ico: 'laptop'
        },
        {
            name: '执行测试',
            path: '/executes',
            ico: 'play-circle'
        },
        {
            name: '添加用例',
            path: '/cases',
            ico: 'read'
        },
    ];

    return <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname === '/' ? '/environments' : location.pathname]}
        defaultOpenKeys={['location.pathname']}
        style={{ height: '100%', borderRight: 0 }}>
        {MENUS.map(menu => {
            return <Menu.Item key={menu.path}>
                <Link to={{
                    pathname: menu.path,
                    state: menu
                }}>
                    <Icon type={menu.ico} />
                    <span>{menu.name}</span>
                </Link>
            </Menu.Item>
        })}
    </Menu>
};

AppMenu.propTypes = {
    location: PropTypes.object.isRequired,
};

export default AppMenu;
