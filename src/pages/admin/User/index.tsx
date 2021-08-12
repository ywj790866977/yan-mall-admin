import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import type { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import { queryDeptTree } from '@/services/admin/dept';
import { queryPage } from '@/services/admin/user';

const DeptTree: React.FC = (props: any) => {
  const { setDeptIds } = props;
  const { Search } = Input;

  const search = (keyword: string) => {
    console.log(keyword);
  };

  const [treeNodeData, setTreeNodeData] = useState<DataNode[]>([]);
  // 初始化 生成一级节点
  // @ts-ignore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (treeNodeData.length === 0) {
      const res = await queryDeptTree();
      if (res.code === 0) {
        setTreeNodeData(res.data);
      }
    }
  }, [treeNodeData.length]);

  const getDeptId = (deptIds: string[], node: DataNode) => {
    deptIds.push(node.key as string);
    if (!node.children || node.children.length === 0) {
      return;
    }
    node.children.forEach((child) => {
      getDeptId(deptIds, child);
    });
  };

  const onSelect = async (
    selectedKeys: Key[],
    info: {
      event: 'select';
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    },
  ) => {
    if (selectedKeys.length > 0) {
      // 获取当前选中id
      const deptIds: string[] = [];
      getDeptId(deptIds, info.node);
      setDeptIds(deptIds.join(','));
    }
  };

  return (
    <div style={{ padding: 25 }}>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onSearch={search} />

      <Tree
        // onExpand={this.onExpand}
        // expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        treeData={treeNodeData}
        // loadData={loadTreeData}
        onSelect={onSelect}
      />
    </div>
  );
};

const UserList: React.FC = (props: any) => {
  const { deptIds } = props;

  const ref = useRef<ActionType>();

  const queryUserPage = async (param: any) => {
    const res = await queryPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.UserListItem> = res.data;
      return {
        success: true,
        data: page.records,
        current: page.current,
        pageSize: page.size,
        total: page.total,
      };
    }
    return {
      success: false,
    };
  };

  const columns: ProColumns<API.UserListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: '5%',
    },
    {
      title: '用户Id',
      dataIndex: 'id',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      search: false,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '手机号',
      copyable: true,
      dataIndex: 'mobile',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'select',
      // valueEnum: GenderEnum,
      width: '5%',
      search: false,
    },
    {
      title: '部门名称',
      copyable: true,
      dataIndex: 'deptName',
      search: false,
    },
    {
      title: '角色名称',
      copyable: true,
      dataIndex: 'roleName',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      valueType: 'select',
      // valueEnum: StatusEnum,
    },
  ];

  return (
    <ProTable<API.UserListItem>
      // headerTitle={intl.formatMessage({
      //   id: 'pages.searchTable.title',
      //   defaultMessage: 'Enquiry form',
      // })}
      actionRef={ref}
      // rowKey="key"
      search={{
        labelWidth: 80,
      }}
      toolBarRender={() => [
        <Button
          type="primary"
          key="primary"
          onClick={() => {
            // handleModalVisible(true);
          }}
        >
          <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
        </Button>,
      ]}
      request={queryUserPage}
      params={{ deptIds }}
      columns={columns}
      // rowSelection={{
      //   onChange: (_, selectedRows) => {
      //     setSelectedRows(selectedRows);
      //   },
      // }}
    />
  );
};

const User: React.FC = () => {
  const [deptIds, setDeptIds] = useState<string>('');
  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="384px" ghost>
          <DeptTree setDeptIds={setDeptIds} />
        </ProCard>
        <ProCard>
          <UserList deptIds={deptIds} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default User;
