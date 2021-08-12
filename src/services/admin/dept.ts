// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { DataNode } from 'rc-tree/lib/interface';

/** 获取当前的用户 GET /api/currentUser */
export async function queryDeptTree(options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: DataNode[];
  }>('/api/yan-admin/v1/dept/queryDeptTree', {
    method: 'GET',
    ...(options || {}),
  });
}