import React, { useEffect, useRef, useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  StepsForm,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { message, TreeSelect } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { DataNode } from 'rc-tree/lib/interface';
import { queryMenuTree } from '@/services/admin/menu';
import ProFormItem from '@ant-design/pro-form/es/components/FormItem';
import type { DpEditorValueState } from '@/pages/goods/Add/components/DpEditor';
import DpEditor from '@/pages/goods/Add/components/DpEditor';
import GoodsAttr from '@/pages/goods/Add/components/GoodsAttr';
import GoodsSpec from '@/pages/goods/Add/components/GoodsSpec';

const Add: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [treeNodeData, setTreeNodeData] = useState<DataNode[]>([]);
  const [editeData, setEditeData] = useState<DpEditorValueState>({ html: '' });
  // const [quillData, setQuillData] = useState<string>('');

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
    <PageContainer>
      <ProCard>
        <StepsForm<{ name: string }>
          formRef={formRef}
          onFinish={async () => {
            // await waitTime(1000);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
          containerStyle={{ width: '60%' }}
        >
          <StepsForm.StepForm<{ name: string }>
            name="base"
            title="商品信息"
            // stepProps={{
            //   description: '这里填入的都是基本信息',
            // }}
            onFinish={async () => {
              console.log(formRef.current?.getFieldsValue());
              // await waitTime(2000);
              return true;
            }}
          >
            <ProFormItem
            // name="111" label="品牌" rules={[{ required: true }]}
            >
              <TreeSelect style={{ width: '45%' }} treeData={treeNodeData} />
            </ProFormItem>
            <ProFormText
              name="name"
              label="商品名称"
              width="md"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入名称"
              // rules={[{ required: true }]}
            />
            <ProFormSelect
              label="商品品牌"
              name="brand"
              width="md"
              // rules={[{ required: true }]}
              initialValue="1"
              options={[
                { value: '1', label: '苹果' },
                { value: '2', label: '华为' },
              ]}
            />
            <ProFormText name="unit" label="计量单位" width="md" placeholder="请输入计量单位" />
            <ProFormDigit name="库存" label="库存" width="md" placeholder="请输入计量库存" />
            <ProFormDigit
              name="originPrice"
              label="商品原价"
              width="md"
              placeholder="请输入原价"
              // rules={[{ required: true }]}
            />
            <ProFormDigit
              name="price"
              label="商品现价"
              width="md"
              placeholder="请输入现价"
              // rules={[{ required: true }]}
            />

            <ProFormTextArea name="description" label="描述" width="lg" placeholder="请输入描述" />
            <ProFormUploadButton
              name="album"
              label="商品相册"
              max={10}
              width="sm"
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
              }}
              action="/upload.do"
            />
            <ProFormItem name="detail" label="商品详情">
              <DpEditor EditorValue={editeData} onChange={setEditeData} />
            </ProFormItem>
          </StepsForm.StepForm>
          <StepsForm.StepForm<{
            checkbox: string;
          }>
            name="checkbox"
            title="设置属性"
            onFinish={async () => {
              console.log(formRef.current?.getFieldsValue());
              return true;
            }}
          >
            <GoodsAttr />
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="time"
            title="设置规格"
            // stepProps={{
            //   description: '这里填入发布判断',
            // }}
          >
            <GoodsSpec />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  );
};
export default Add;
