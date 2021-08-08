import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import type {RunTimeLayoutConfig} from 'umi';
import {history, Link} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import {MenuDataItem} from "@ant-design/pro-layout/lib/typings";
import {getRouters} from "@/services/admin/router";
import * as Icon from '@ant-design/icons';
import React from "react";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading/>,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  menuData?: MenuDataItem[] | undefined
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    // 获取服务的路由
    const res = await getRouters();

    return {
      fetchUserInfo,
      currentUser,
      settings: {},
      menuData: res.data
    };
  }
  return {
    fetchUserInfo,
    settings: {},
    menuData: []
  };
}

// 处理动态路由icon
const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => (
  menus.map(({icon, children, ...item}) => {
    if(!icon){
      return {
        ...item,
        children
      }
    }
    return {
      ...item,
      icon: icon && React.createElement(Icon[icon]),
      children: children && loopMenuItem(children),
    }
  })
);


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    rightContentRender: () => <RightContent/>,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const {location} = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined/>
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs">
          <BookOutlined/>
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    // menuDataRender: (menuData) => initialState.menuData || menuData,
    menuDataRender: (menuData) => {
      return loopMenuItem(initialState && initialState.menuData || menuData);
    }

  };
};
