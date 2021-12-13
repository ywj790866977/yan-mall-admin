import { Modal } from 'antd';
import React from 'react';

interface UpdateFormProp {
  modalVisible: boolean;
  onCancel: () => void;
  children: React.ReactNode;
}

const UpdateForm: React.FC<UpdateFormProp> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="修改商品信息"
      visible={modalVisible}
      width={1200}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;
