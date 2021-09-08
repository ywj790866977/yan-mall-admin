export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'table',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/user',
        name: 'user',
        icon: 'smile',
        component: './admin/User',
      },
      {
        path: '/admin/menu',
        name: 'menu',
        component: './admin/Menu',
      },
      {
        path: '/admin/dict',
        name: 'dict',
        component: './admin/Dict',
      },
      {
        path: '/admin/dept',
        name: 'dept',
        component: './admin/Dept',
      },
      {
        path: '/admin/client',
        name: 'client',
        component: './admin/Client',
      },
      {
        path: '/admin/role',
        name: 'role',
        component: './admin/Role',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    icon: 'Shop',
    routes: [
      {
        path: '/product/list',
        name: 'list',
        component: './product/List',
      },
      {
        path: '/product/brand',
        name: 'brand',
        component: './product/Brand',
      },
      {
        path: '/product/category',
        name: 'category',
        component: './product/Category',
      },
      {
        path: '/product/add',
        name: 'add',
        component: './product/Add',
      },
    ],
  },
  {
    path: '/sale',
    name: 'sale',
    routes: [
      {
        path: '/sale/advert',
        name: 'advert',
        component: './sale/Advert',
      },
    ],
    icon: 'ShoppingCart',
  },
  {
    path: '/order',
    name: 'order',
    icon: 'ShoppingCart',
    routes: [
      {
        path: '/order/list',
        name: 'list',
        component: './order/List',
      },
    ],
  },
  {
    path: '/member',
    name: 'member',
    icon: 'user',
    routes: [
      {
        path: '/member/list',
        name: 'list',
        component: './member/List',
      },
    ],
  },
  {
    path: '/tool',
    name: 'tool',
    icon: 'table',
    routes: [
      {
        path: '/tool/register',
        name: 'register',
        component: './tool/Register',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
