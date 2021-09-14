// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取 GET /api/currentUser */
export async function queryClientPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.ClientListItem>;
  }>('/api/yan-admin/v1/oauthClient/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
