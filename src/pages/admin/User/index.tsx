import { PageContainer } from '@ant-design/pro-layout';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import type { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import { queryDeptTree } from '@/services/admin/dept';
import { queryPage, saveUser, updateUser } from '@/services/admin/user';
import AddModal from '@/pages/admin/User/components/AddModal';

interface DeptTreeProps {
  setDeptIdsFunc: (s: string) => void;
}

const DeptTree: React.FC<DeptTreeProps> = (props: DeptTreeProps) => {
  const { setDeptIdsFunc } = props;
  const { Search } = Input;
  const [treeNodeData, setTreeNodeData] = useState<DataNode[]>([]);

  // 初始化 生成一级节点
  useEffect(() => {
    if (treeNodeData.length === 0) {
      queryDeptTree().then((res) => {
        if (res.code === 0) {
          setTreeNodeData(res.data);
        }
      });
    }
  }, [treeNodeData.length]);

  const search = (keyword: string) => {
    console.log(keyword);
  };

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
      setDeptIdsFunc(deptIds.join(','));
    }
  };

  return (
    <div style={{ padding: 25 }}>
      <Search style={{ marginBottom: 8 }} placeholder="Search" onSearch={search} />

      <Tree treeData={treeNodeData} onSelect={onSelect} />
    </div>
  );
};

interface UserListProps {
  deptIdsVariable: string;
}

const UserList: React.FC<UserListProps> = (props: UserListProps) => {
  const { deptIdsVariable } = props;
  // const [delVisible, setDelVisible] = useState<boolean>(false);
  const [edtData, setEdtData] = useState<API.User>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const GenderEnum = {
    0: { text: '男' },
    1: { text: '女' },
  };

  const StatusEnum = {
    0: { text: '停用', color: '#a2a2a2' },
    1: { text: '启用', color: '#87d068' },
  };

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

  const option = async (values: any) => {
    console.log(values);
    const params: API.User = { ...values };
    // params.status = values.status ? 1 : 0;
    if (values.id) {
      const res = await updateUser(values.id, params);
      if (res && res.code === 0) {
        setAddVisible(false);
        setEdtData(undefined);
        message.success('修改成功');
        return true;
      }
      message.error(res.message);
      return false;
    }

    const res = await saveUser(params);
    console.log('save res', res);
    if (res && res.code === 0) {
      setAddVisible(false);
      message.success('创建成功');
      ref.current?.reload();
      return true;
    }
    message.error(res.message);
    return false;
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
      search: false,
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
      valueEnum: GenderEnum,
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
      valueEnum: StatusEnum,
    },
  ];

  return (
    <div>
      <ProTable<API.UserListItem>
        // headerTitle={intl.formatMessage({
        //   id: 'pages.searchTable.title',
        //   defaultMessage: 'Enquiry form',
        // })}
        actionRef={ref}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setAddVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={queryUserPage}
        params={{ deptIds: deptIdsVariable }}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => setAddVisible(false)}
        finished={option}
        data={edtData as API.User}
      />
    </div>
  );
};

const User: React.FC = () => {
  const [deptIds, setDeptIds] = useState<string>('');
  return (
    <PageContainer>
      <ProCard split="vertical">
        <ProCard colSpan="384px" ghost>
          <DeptTree setDeptIdsFunc={setDeptIds} />
        </ProCard>
        <ProCard>
          <UserList deptIdsVariable={deptIds} />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default User;
