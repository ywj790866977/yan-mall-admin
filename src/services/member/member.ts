// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取 GET */
export async function queryMemberPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.MemberListItem>;
  }>('/api/member/admin/v1/member/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
