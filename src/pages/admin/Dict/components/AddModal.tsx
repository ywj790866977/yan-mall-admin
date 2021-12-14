import React from 'react';
import ProForm, { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-form';

interface ModalProps {
  addVisible: boolean;
  cancel: () => void;
  finished: (values: any) => Promise<boolean | void>;
  data: API.DictListItem;
  type: number;
}

const AddModal: React.FC<ModalProps> = (prop: ModalProps) => {
  const { addVisible, cancel, finished, data, type } = prop;

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
        name="name"
        width="md"
        label="字典名称"
        placeholder="请输入字典名称"
        initialValue={type === 2 ? data.name : undefined}
      />

      <ProFormText
        name="code"
        width="md"
        label="字典编码"
        placeholder="请输入字典编码"
        initialValue={type === 2 ? data.code : undefined}
      />

      <ProFormText
        name="remark"
        width="md"
        label="字典备注"
        placeholder="请输入字典备注"
        initialValue={type === 2 ? data.remark : undefined}
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
