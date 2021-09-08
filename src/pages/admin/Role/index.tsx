import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryPage, saveRole, updateRole } from '@/services/admin/role';
import { Button, message, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/admin/User/components/AddModal';
import type { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import { queryDeptTree } from '@/services/admin/dept';

const RoleList: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.User>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

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

  const option = async (values: any) => {
    console.log(values);
    const params: API.User = { ...values };
    // params.status = values.status ? 1 : 0;
    if (values.id) {
      const res = await updateRole(values.id, params);
      if (res && res.code === 0) {
        setAddVisible(false);
        setEdtData(undefined);
        message.success('修改成功');
        return true;
      }
      message.error(res.message);
      return false;
    }

    const res = await saveRole(params);
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

  // const updateStatus = async (re: API.UserListItem) => {
  //   const res = await updateUserStatus(re.id, re.status === 0 ? 1 : 0);
  //   if (res.code === 0) {
  //     message.success('修改状态成功');
  //     ref.current?.reload();
  //     return;
  //   }
  //   message.error('修改状态失败');
  // };

  const handlerUpdateUser = async (re: API.UserListItem) => {
    console.log(re);
    // if (re.id) {
    //   const res = await userInfo(re.id);
    //   if (res.code === 0 && res.data) {
    //     setEdtData(res.data);
    //     setEditType(2);
    //     setAddVisible(true);
    //   }
    // } else {
    //   setEdtData(undefined);
    //   setEditType(1);
    // }
  };

  const editCancel = () => {
    setAddVisible(false);
    setEditType(1);
    setEdtData(undefined);
  };

  const add = () => {
    setEdtData(undefined);
    setEditType(1);
    setAddVisible(true);
  };

  const columns: ProColumns<API.UserListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: '5%',
    },
    {
      title: '角色名称',
      copyable: true,
      dataIndex: 'name',
    },
    {
      title: '角色编码',
      copyable: true,
      dataIndex: 'code',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => handlerUpdateUser(record)}>
          编辑
        </a>,
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.UserListItem>
        actionRef={ref}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={add}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={queryUserPage}
        columns={columns}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => editCancel()}
        finished={option}
        data={edtData as API.User}
        type={editType}
      />
    </div>
  );
};

const MenuTree: React.FC = () => {
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
      // setDeptIdsFunc(deptIds.join(','));
    }
  };
  return (
    <div>
      <Tree treeData={treeNodeData} onSelect={onSelect} />
    </div>
  );
};

const Role: React.FC = () => {
  // const [deptIds, setDeptIds] = useState<string>('');
  return (
    <PageContainer>
      <ProCard
        title="角色管理"
        headerBordered
        style={{ marginRight: 10, width: '45%', float: 'left' }}
        bordered
      >
        <RoleList />
      </ProCard>
      <ProCard
        title="菜单管理"
        headerBordered
        style={{ marginRight: 10, width: '20%', float: 'left' }}
        bordered
      >
        <MenuTree />
      </ProCard>
      <ProCard
        title="权限管理"
        headerBordered
        style={{ paddingRight: 1, width: '30%', float: 'left' }}
        bordered
      >
        <MenuTree />
      </ProCard>
    </PageContainer>
  );
};

export default Role;
