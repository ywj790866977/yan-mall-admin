// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

/** 获取当前的用户 GET /api/currentUser */
export async function queryRoutes(options?: { [key: string]: any }) {
  return request<{
    data: MenuDataItem[];
  }>('/api/yan-admin/v1/menu/routes', {
    method: 'GET',
    ...(options || {}),
  });
}
