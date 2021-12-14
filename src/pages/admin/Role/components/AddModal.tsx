import React from 'react';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { queryMenuPage } from '@/services/admin/menu';

interface ModalProps {
  addVisible: boolean;
  cancel: () => void;
  finished: (values: any) => Promise<boolean | void>;
  data: API.Role;
  type: number;
}

const AddModal: React.FC<ModalProps> = (prop: ModalProps) => {
  const { addVisible, cancel, finished, data, type } = prop;

  const getRoles: any = async () => {
    const res = await queryMenuPage({ size: 100 });
    if (res.code === 0) {
      const pageData: API.PageRes<API.MenuListItem> = res.data;
      const roles = pageData.records;
      if (roles === undefined) {
        return [];
      }
      return roles.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    }
    return {};
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
        width="xl"
        name="name"
        label="角色名称"
        tooltip="最长为 24 位"
        placeholder="请输入用户名"
        rules={[{ required: true, message: '请输入名称!' }]}
        initialValue={data !== undefined ? data.name : undefined}
      />

      <ProFormText
        allowClear
        width="xl"
        name="code"
        label="角色编码"
        placeholder="请输入编码"
        initialValue={data !== undefined ? data.code : undefined}
      />

      <ProFormSelect
        rules={[{ required: true, message: '请选择部门权限!' }]}
        allowClear
        width="xl"
        name="menuIds"
        label="菜单权限"
        fieldProps={{
          mode: 'multiple',
        }}
        placeholder="请选菜单权限"
        initialValue={data !== undefined ? data.menuIds : undefined}
        request={getRoles}
      />

      <ProForm.Group>
        <ProFormSwitch
          name="status"
          label="状态"
          initialValue={data !== undefined ? data.status : undefined}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default AddModal;
