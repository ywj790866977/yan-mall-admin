import React from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';

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
    </ModalForm>
  );
};

export default AddModal;
