import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Tree } from 'antd';
import { DataNode } from 'rc-tree/lib/interface';
import { queryMenuTree } from '@/services/admin/menu';
import ProCard from '@ant-design/pro-card';

const List: React.FC = () => {
  const [treeNodeData, setTreeNodeData] = useState<DataNode[]>([]);
  // 初始化 生成一级节点
  useEffect(() => {
    if (treeNodeData.length === 0) {
      queryMenuTree().then((res) => {
        if (res.code === 0) {
          setTreeNodeData(res.data);
        }
      });
    }
  }, [treeNodeData.length]);

  const titleRender: any = (node: DataNode) => {
    return (
      <div style={{ width: '100%' }}>
        <span onDoubleClick={() => {}}>{node.title}</span>
        <div style={{ float: 'right' }}>
          <Button size="small" type="primary" style={{ marginLeft: '100px ' }} onClick={() => {}}>
            新增
          </Button>
          <Button size="small" type="ghost" style={{ margin: '0px 5px ' }} onClick={() => {}}>
            删除
          </Button>
        </div>
      </div>
    );
  };
  return (
    <PageContainer>
      <ProCard title="品牌分类">
        <Tree titleRender={titleRender} treeData={treeNodeData} />
      </ProCard>
    </PageContainer>
  );
};
export default List;
