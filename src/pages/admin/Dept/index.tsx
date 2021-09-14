import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { saveRole, updateRole } from '@/services/admin/role';
import { Button, message, Popconfirm, Switch, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/admin/User/components/AddModal';
import type { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import { queryMenuPage, queryMenuTree } from '@/services/admin/menu';

interface MenuTreeProp {
  menuSelect: (s: string) => void;
}

interface MenuListProp {
  menuId: string;
}

const MenuList: React.FC<MenuListProp> = (prop: MenuListProp) => {
  const { menuId } = prop;
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.User>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const queryPage = async (param: any) => {
    const res = await queryMenuPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.MenuListItem> = res.data;
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

  const handlerUpdateUser = async (re: API.MenuListItem) => {
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

  const updateStatus = (record: API.MenuListItem) => {
    console.log(record);
  };

  const columns: ProColumns<API.MenuListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: '12%',
    },
    {
      title: '父ID',
      dataIndex: 'parentId',
      search: false,
      width: '8%',
    },
    {
      title: '路由名称',
      dataIndex: 'routeName',
      search: false,
    },
    {
      title: '路由路径',
      dataIndex: 'routePath',
      search: false,
    },
    {
      title: '组件',
      dataIndex: 'component',
      search: false,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      search: false,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      // width: '80px',
      render: (text, record) => (
        <Popconfirm
          title={`确定要 ${record.status ? '关闭' : '开启'} ${record.name} 吗?`}
          onConfirm={() => updateStatus(record)}
        >
          <Switch checked={!!text} />
        </Popconfirm>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: '15%',
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
      <ProTable<API.MenuListItem>
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
        request={queryPage}
        columns={columns}
        params={{ menuIds: menuId }}
        // rowSelection={{alwaysShowAlert:true}}
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

const MenuTree: React.FC<MenuTreeProp> = (prop: MenuTreeProp) => {
  const { menuSelect } = prop;
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

  const getMenuId = (deptIds: string[], node: DataNode) => {
    deptIds.push(node.key as string);
    if (!node.children || node.children.length === 0) {
      return;
    }
    node.children.forEach((child) => {
      getMenuId(deptIds, child);
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
      const menuIds: string[] = [];
      getMenuId(menuIds, info.node);
      menuSelect(menuIds.join(','));
    }
  };
  return (
    <div>
      <Tree treeData={treeNodeData} onSelect={onSelect} />
    </div>
  );
};

const Dept: React.FC = () => {
  const [selectMenu, setSelectMenu] = useState<string>('');
  console.log(selectMenu);

  return (
    <PageContainer>
      <ProCard
        title="菜单结构"
        headerBordered
        style={{ marginRight: 10, width: '25%', float: 'left' }}
        bordered
      >
        <MenuTree menuSelect={setSelectMenu} />
      </ProCard>
      <ProCard
        title="菜单管理"
        headerBordered
        style={{ marginRight: 10, width: '70%', float: 'left' }}
        bordered
      >
        <MenuList menuId={selectMenu} />
      </ProCard>
    </PageContainer>
  );
};

export default Dept;
