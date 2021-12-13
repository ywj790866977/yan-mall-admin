import React, { useEffect, useRef, useState } from 'react';
import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { TreeSelect } from 'antd';
import { queryMenuTree } from '@/services/admin/menu';
import type { DataNode } from 'rc-tree/lib/interface';

interface ModalProps {
  addVisible: boolean;
  cancel: () => void;
  finished: (values: any) => Promise<boolean | void>;
  data: API.Menu;
  type: number;
}

const AddModal: React.FC<ModalProps> = (prop: ModalProps) => {
  const { addVisible, cancel, finished, data, type } = prop;
  const [treeNodeData, setTreeNodeData] = useState<DataNode[]>([]);

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (treeNodeData.length === 0) {
      queryMenuTree().then((res) => {
        if (res.code === 0) {
          setTreeNodeData(res.data);
        }
      });
    }
  }, [treeNodeData.length]);

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
      onVisibleChange={() => formRef.current?.resetFields}
    >
      <ProFormText hidden name="id" initialValue={type === 2 ? data.id : undefined} />

      <ProFormText
        allowClear
        width="md"
        name="name"
        label="菜单名称"
        placeholder="请输入菜单名称"
        rules={[{ required: true, message: '请输入菜单名称!' }]}
        initialValue={data !== undefined ? data.name : undefined}
      />

      <ProFormSelect width="xl" name="parentId" label="父级菜单">
        <TreeSelect style={{ width: '44%' }} treeData={treeNodeData} />
      </ProFormSelect>
      <ProFormText
        allowClear
        width="md"
        name="routeName"
        label="路由名称"
        placeholder="请输入路由名称"
        initialValue={data !== undefined ? data.routeName : undefined}
      />

      <ProFormText
        allowClear
        width="md"
        name="routePath"
        label="路由路径"
        placeholder="请输入路由路径"
        initialValue={data !== undefined ? data.routePath : undefined}
      />
      <ProFormText
        allowClear
        width="md"
        name="component"
        label="组件"
        placeholder="请输入组件"
        initialValue={data !== undefined ? data.component : undefined}
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
