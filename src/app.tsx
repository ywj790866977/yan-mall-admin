import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import * as Icon from '@ant-design/icons';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type {
  RequestInterceptor,
  RequestOptionsInit,
  ResponseError,
  ResponseInterceptor,
} from 'umi-request';
import { message, notification } from 'antd';
import type { MenuDataItem } from '@ant-design/pro-layout/lib/typings';
import React from 'react';
import { queryRoutes } from '@/services/admin/menu';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  menuData: MenuDataItem[];
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      // 获取服务的路由
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const routeRes = await queryRoutes();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
      menuData: routeRes.data,
    };
  }
  return {
    fetchUserInfo,
    settings: {},
    menuData: [],
  };
}

// const iconEnum = {
//   SmileOutlined: <SmileOutlined/>,
//   TableOutlined: <TableOutlined/>,
//   UserOutlined: <UserOutlined/>,
//   ShoppingCartOutlined: <ShoppingCartOutlined/>,
//   ShopOutlined: <ShopOutlined/>,
// };

/**
 * 处理动态路由icon
 */
const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => {
    if (!icon) {
      return {
        ...item,
        children,
      };
    }
    return {
      ...item,
      icon: icon && React.createElement(Icon[icon as string]),
      // icon: icon &&iconEnum[icon],
      children,
    };
  });

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom;
      }
      // 支持二级菜单显示icon
      return (
        <Link to={menuItemProps.path}>
          {menuItemProps.pro_layout_parentKeys &&
            menuItemProps.pro_layout_parentKeys.length > 0 &&
            menuItemProps.icon}
          {defaultDom}
        </Link>
      );
    },
    disableContentMargin: false,
    /* 去水印
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
     */
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    menuDataRender: (menuData) => {
      return loopMenuItem((initialState && initialState.menuData) || menuData);
    },
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

/** 处理token */
const tokenInterceptor: RequestInterceptor = (url: string, options: RequestOptionsInit) => {
  const token = localStorage.getItem('auth-token');
  // console.log("token,",token)
  if (token) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return {
      url,
      options: { ...options, headers },
    };
  }
  return {
    url,
    options: { ...options },
  };
};
/** 未登录或者登录失效跳转登录页面 */
const respInterceptor: ResponseInterceptor = async (response) => {
  const data = await response.clone().json();
  // console.log("data",data)
  if (data && (data.code === 1080 || data.code === 1070)) {
    message.error(data.message);
    localStorage.removeItem('auth-token');
    // eslint-disable-next-line no-restricted-globals
    location.href = '/user/login';
    return response;
  }
  return response;
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [tokenInterceptor],
  responseInterceptors: [respInterceptor],
};
