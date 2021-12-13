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

/** 更新状态 PUT */
export async function updateStatus(id: string, status: number, options?: { [key: string]: any }) {
  return request<{
    code: number;
  }>(`/api/admin/v1/dept/updateStatus/${id}`, {
    method: 'PUT',
    data: {
      status,
    },
    ...(options || {}),
  });
}

/** 更新 PUT */
export async function update(id: string, data: API.DeptListItem, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dept/update/${id}`, {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 保存 POST */
export async function save(data: API.DeptListItem, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dept/`, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 保存 POST */
export async function remove(id: string, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dept/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 部门数据 POST */
export async function queryList(options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
    data: API.DeptListItem[];
  }>(`/api/admin/v1/dept/deptTree`, {
    method: 'GET',
    ...(options || {}),
  });
}
