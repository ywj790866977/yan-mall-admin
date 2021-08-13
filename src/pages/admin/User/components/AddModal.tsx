import React from 'react';
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { queryRoleList } from '@/services/admin/role';
import { queryDept } from '@/services/admin/dept';

interface ModalProps {
  addVisible: boolean;
  cancel: () => void;
  finished: (values: any) => Promise<boolean | void>;
  data: API.User;
}

const AddModal: React.FC<ModalProps> = (prop: ModalProps) => {
  const { addVisible, cancel, finished, data } = prop;

  const getRoles: any = async () => {
    const res = await queryRoleList();
    if (res.code === 0) {
      const roles = res.data;
      return roles.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    }
    return {};
  };

  const doGetDept: any = async () => {
    const res = await queryDept();
    if (res.code !== 0 || !res.data || res.data.length <= 0) {
      return null;
    }
    const roles = res.data;
    return roles.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  };

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title={data ? '编辑' : '新增'}
      visible={addVisible}
      modalProps={{
        onCancel: cancel,
      }}
      onFinish={finished}
    >
      <ProFormText hidden name="id" initialValue={data ? data.id : undefined} />
      <ProFormText
        allowClear
        width="xl"
        name="username"
        label="用户名"
        tooltip="最长为 24 位"
        placeholder="请输入用户名"
        rules={[{ required: true, message: '请输入用户名!' }]}
        initialValue={data ? data.username : undefined}
      />

      <ProFormText
        allowClear
        width="xl"
        name="nickname"
        label="昵称"
        placeholder="请输入昵称"
        initialValue={data ? data.nickname : undefined}
      />
      <ProFormRadio.Group
        label="性别"
        name="gender"
        initialValue={data ? data.gender : 0}
        // valueEnum={API.GenderEnum}
        options={[
          { value: 0, label: '男' },
          { value: 1, label: '女' },
        ]}
      />

      <ProFormText
        rules={[{ required: true, message: '请输入用户名!' }]}
        allowClear
        width="xl"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        initialValue={data ? data.mobile : undefined}
      />

      <ProFormText
        rules={[{ required: true, message: '请输入邮箱!' }]}
        allowClear
        width="xl"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        initialValue={data ? data.mobile : undefined}
      />

      <ProFormSelect
        rules={[{ required: true, message: '请选择用户角色!' }]}
        allowClear
        width="xl"
        name="roleIds"
        label="角色"
        fieldProps={{
          mode: 'multiple',
        }}
        placeholder="请选择用户角色"
        initialValue={data ? data.roleIds : undefined}
        request={getRoles}
      />

      <ProFormSelect
        rules={[{ required: true, message: '请选择用户部门!' }]}
        allowClear
        width="xl"
        name="deptId"
        label="部门"
        placeholder="搜索部门"
        initialValue={data ? data.deptId : undefined}
        request={doGetDept}
      />

      <ProForm.Group>
        <ProFormSwitch name="status" label="状态" initialValue={data ? data.status : 0} />
      </ProForm.Group>
    </ModalForm>
  );
};

export default AddModal;
