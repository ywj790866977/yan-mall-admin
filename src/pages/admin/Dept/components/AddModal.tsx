import React from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

interface ModalProps {
  addVisible: boolean;
  cancel: () => void;
  finished: (values: any) => Promise<boolean | void>;
  data: API.DeptListItem;
  type: number;
  deptId: string | number;
}

const AddModal: React.FC<ModalProps> = (prop: ModalProps) => {
  const { addVisible, cancel, finished, data, type, deptId } = prop;
  console.log(deptId);

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
      // action={}
    >
      <ProFormText hidden name="id" initialValue={type === 2 ? data.id : undefined} />
      <ProFormText
        name="name"
        label="部门名称"
        placeholder="请输入部门名称"
        width="md"
        rules={[{ required: true, message: '请输入用户名!' }]}
      />
      <ProFormText
        name="parentId"
        label="父ID"
        placeholder="请输入父Id"
        width="md"
        rules={[{ required: true, message: '请输入用户名!' }]}
      />
    </ModalForm>
  );
};

export default AddModal;
