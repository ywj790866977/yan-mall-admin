// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { DataNode } from 'rc-tree/lib/interface';

/** 获取 GET /api/currentUser */
export async function queryDeptTree(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: DataNode[];
  }>('/api/admin/v1/dept/queryDeptTree', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function queryDept(name?: string, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.Dept[];
  }>('/api/admin/v1/dept/list', {
    method: 'GET',
    params: {
      name,
    },
    ...(options || {}),
  });
}

/** 分页查询 */
export async function queryDeptPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.DeptListItem>;
  }>('/api/admin/v1/dept/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
