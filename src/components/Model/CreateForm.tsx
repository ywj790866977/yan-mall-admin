import React from 'react';
import { Modal } from 'antd';

interface CreateFormProp {
  modalVisible: boolean;
  onCancel: () => void;
  children: React.ReactNode;
}

const CreateForm: React.FC<CreateFormProp> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建商品信息"
      visible={modalVisible}
      width={1200}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;