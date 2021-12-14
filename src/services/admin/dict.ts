// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 分页查询 */
export async function queryDictPage(params: any, options?: { [key: string]: any }) {
  return request<{
    code: number;
    data: API.PageRes<API.DictListItem>;
  }>('/api/admin/v1/dict/page', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 删除 DELETE */
export async function remove(id: string, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dict/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 更新 PUT */
export async function update(
  id: string,
  params: API.DictListItem,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dict/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 保存 POST */
export async function save(params: API.DictListItem, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dict`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 保存字典项 POST */
export async function saveItem(params: API.DictItem, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dictItem`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 更新字典项 PUT */
export async function updateItem(
  id: string,
  params: API.DictItem,
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dictItem/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除字典项 DELETE */
export async function removeItem(id: string, options?: { [key: string]: any }) {
  return request<{
    code: number;
    message: string;
  }>(`/api/admin/v1/dictItem/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 分页查询 */
export async function queryDict(code: string) {
  const res = await queryDictPage({ size: 100, code });

  if (res.code === 0 && res.data && res.data.records) {
    const records: API.DictListItem[] = res.data.records;
    if (!records) {
      return [];
    }
    const dict: API.DictListItem = records[0];

    return dict.children.map((item) => {
      return {
        value: item.value,
        label: item.name,
      };
    });
  }
}
