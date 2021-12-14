import React from 'react';
import { ModalForm, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { queryDict } from '@/services/admin/dict';

interface ModalProps {
  addVisible: boolean;
  cancel: () => void;
  finished: (values: any) => Promise<boolean | void>;
  data: API.ClientListItem;
  type: number;
}

const AddModal: React.FC<ModalProps> = (prop: ModalProps) => {
  const { addVisible, cancel, finished, data, type } = prop;

  const getGrantTypes: any = async () => {
    const res = await queryDict('grant_type');
    if (res) {
      return res;
    }
    return [];
  };

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={type === 1 ? '编辑' : '新增'}
      visible={addVisible}
      modalProps={{
        onCancel: cancel,
      }}
      onFinish={finished}
    >
      <ProFormText hidden name="id" initialValue={type === 2 ? data.id : undefined} />

      <ProFormText
        allowClear
        width="md"
        name="clientId"
        label="客户端ID"
        placeholder="请输入客户ID"
        initialValue={data !== undefined ? data.clientId : undefined}
      />

      <ProFormText
        allowClear
        width="md"
        name="clientSecret"
        label="客户端秘钥"
        placeholder="请输入客户秘钥"
        initialValue={data !== undefined ? data.clientSecret : undefined}
      />

      <ProFormText
        allowClear
        width="md"
        name="scope"
        label="域"
        placeholder="请输入客户域"
        initialValue={data !== undefined ? data.scope : undefined}
      />

      <ProFormText
        allowClear
        width="md"
        name="accessTokenValidity"
        label="认证令牌时效(单位:秒)"
        placeholder="请输入认证令牌时效"
        initialValue={data !== undefined ? data.accessTokenValidity : undefined}
      />

      <ProFormText
        allowClear
        width="md"
        name="refreshTokenValidity"
        label="刷新令牌时效(单位:秒)"
        placeholder="请输入刷新令牌时效"
        initialValue={data !== undefined ? data.refreshTokenValidity : undefined}
      />

      <ProFormSwitch
        allowClear
        width="md"
        name="autoapprove"
        label="自动放行"
        placeholder="请输入客户秘钥"
        initialValue={data !== undefined ? data.autoapprove : undefined}
      />

      <ProFormSelect
        allowClear
        width="md"
        name="authorizedGrantTypes"
        label="授权方式"
        placeholder="请输入客户秘钥"
        initialValue={data !== undefined ? data.grantTypes : undefined}
        fieldProps={{
          mode: 'multiple',
        }}
        request={getGrantTypes}
      />
    </ModalForm>
  );
};

export default AddModal;
