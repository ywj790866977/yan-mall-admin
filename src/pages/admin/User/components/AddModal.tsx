import React from 'react';
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';

interface ModalProps {
  addVisible: boolean;
  cancel: () => void;
  finished: (values: any) => Promise<boolean | void>;
  data: API.UserListItem;
}
//
// type RoleOptions =  {
//   value: number;
//   label: string;
// }

const AddModal: React.FC<ModalProps> = (prop: ModalProps) => {
  const { addVisible, cancel, finished, data } = prop;

  // const convter: RoleOptions[] = (role: API.Role[]) => {
  //   return  role.map(item => {
  //     return{value: item.id, label: item.name}
  //   });
  //
  // }

  // const getDept: ProFieldRequestData = async () => {
  //   const res = await queryDeptList();
  //   console.log(res);
  //   const roleList: RoleOptions[] = convter(res.data)
  //
  //
  // }

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
        rules={[{ required: true, message: '请输入部门!' }]}
        allowClear
        width="xl"
        name="dept"
        label="部门"
        placeholder="请输入"
        initialValue={data ? data.mobile : undefined}
        // request={getDept}
      />

      <ProForm.Group>
        <ProFormSwitch name="status" label="状态" initialValue={data ? data.status : undefined} />
      </ProForm.Group>
    </ModalForm>
  );
};

export default AddModal;
