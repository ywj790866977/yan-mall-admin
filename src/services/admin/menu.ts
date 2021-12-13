// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { DataNode } from 'rc-tree/lib/interface';

/** 获取路由 GET /api/currentUser */
export async function queryRoutes(options?: { [key: string]: any }) {
  return request<{
    data: MenuDataItem[];
  }>('/api/admin/v1/menu/routes', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取菜单树形结构 GET /api/currentUser */
export async function queryMenuTree(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: DataNode[];
  }>('/api/admin/v1/menu/menuTree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取分页 GET */
export async function queryMenuPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.MenuListItem>;
  }>('/api/admin/v1/menu/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** list GET */
export async function queryList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.MenuListItem[];
  }>('/api/admin/v1/menu/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新状态 */
export async function updateMenuStatus(
  id: string,
  status: number,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/menu/updateStatus/${id}`, {
    method: 'PUT',
    data: {
      status,
    },
    ...(options || {}),
  });
}

/** 更新状态 */
export async function deleteMenu(id: string, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/menu/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 更新 PUT */
export async function updateMenu(id: string, data: API.Menu, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/menu/${id}`, {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 更新 PUT */
export async function saveMenu(data: API.Menu, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/menu/`, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
