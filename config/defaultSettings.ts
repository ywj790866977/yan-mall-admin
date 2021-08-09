import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 菜单导航主题模式 navTheme：‘light’ | ‘dark’; 正常|黑暗
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  // ayout: 'side' | 'top' | 'mix';// 左侧菜单栏| 上边菜单栏|混合模式，会分割菜单，上面为一级菜单，左侧为二级菜单
  layout: 'mix',
  // 内容区宽度contentWidth : ‘Fluid’ | ‘Fixed’; 流体|固定
  contentWidth: 'Fluid',
  // fixedHeader :false,是否固定头
  fixedHeader: false,
  fixSiderbar: true,
  //  colorWeak：true,色弱模式
  colorWeak: false,
  title: 'yan-mall后台管理系统',
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
};

export default Settings;
