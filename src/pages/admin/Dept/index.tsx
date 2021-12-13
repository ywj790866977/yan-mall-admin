import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm, Switch, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import type { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import { queryDeptPage, queryDeptTree } from '@/services/admin/dept';
import CreateForm from '@/components/Model/CreateForm';
import { getUpdateColumns } from '@/util/utils';

interface DeptTreeProp {
  deptSelect: (s: string) => void;
  deptCurrent: (s: string | number) => void;
}

interface MenuListProp {
  deptIds: string;
  dept: string | number;
}

const MenuList: React.FC<MenuListProp> = (prop: MenuListProp) => {
  const { deptIds } = prop;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();
  const addFormRef = useRef();

  const queryPage = async (param: any) => {
    const res = await queryDeptPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.DeptListItem> = res.data;
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

  // const option = async (values: any) => {
  //   console.log(values);
  //   const params: API.User = {...values};
  //   // params.status = values.status ? 1 : 0;
  //   if (values.id) {
  //     const res = await updateRole(values.id, params);
  //     if (res && res.code === 0) {
  //       // setAddVisible(false);
  //       // setEdtData(undefined);
  //       message.success('修改成功');
  //       return true;
  //     }
  //     message.error(res.message);
  //     return false;
  //   }
  //
  //   const res = await saveRole(params);
  //   console.log('save res', res);
  //   if (res && res.code === 0) {
  //     // setAddVisible(false);
  //     message.success('创建成功');
  //     ref.current?.reload();
  //     return true;
  //   }
  //   message.error(res.message);
  //   return false;
  // };

  // const updateStatus = async (re: API.UserListItem) => {
  //   const res = await updateUserStatus(re.id, re.status === 0 ? 1 : 0);
  //   if (res.code === 0) {
  //     message.success('修改状态成功');
  //     ref.current?.reload();
  //     return;
  //   }
  //   message.error('修改状态失败');
  // };

  const handlerUpdateUser = async (re: API.DeptListItem) => {
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

  const updateStatus = (record: API.DeptListItem) => {
    console.log(record);
  };

  // const richTrans = (value: any) => {
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const key in value) {
  //     if (getObjectClass(value[key]) === 'EditorState' || getObjectClass(value[key]) === 'e') {
  //       // eslint-disable-next-line no-param-reassign
  //       value[key] = value[key].toHTML();
  //     }
  //   }
  // };

  const columns: ProColumns<API.DeptListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: '部门名称',
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
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      search: false,
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

  async function handleAdd(value: any) {
    console.log(value);
    return true;
  }

  return (
    <div>
      <ProTable<API.DeptListItem>
        actionRef={ref}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={queryPage}
        columns={columns}
        params={{ deptIds }}
        // rowSelection={{alwaysShowAlert:true}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          formRef={addFormRef}
          onSubmit={async (value) => {
            // richTrans(value);
            const success: boolean = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (ref.current) {
                ref.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          // search={twoColumns}
          form={{
            labelCol: { span: 6 },
            labelAlign: 'left',
          }}
          columns={getUpdateColumns(columns)}
          rowSelection={{}}
        />
      </CreateForm>
    </div>
  );
};

const MenuTree: React.FC<DeptTreeProp> = (prop: DeptTreeProp) => {
  const { deptSelect, deptCurrent } = prop;
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
      const menuIds: string[] = [];
      getDeptId(menuIds, info.node);
      deptSelect(menuIds.join(','));
      deptCurrent(info.node.key);
    }
  };
  return (
    <div>
      <Tree treeData={treeNodeData} onSelect={onSelect} />
    </div>
  );
};

const Dept: React.FC = () => {
  const [selectDepts, setSelectDepts] = useState<string>('');
  const [currentDept, setCurrentDept] = useState<string | number>('');

  return (
    <PageContainer>
      <ProCard
        title="部门结构"
        headerBordered
        style={{ marginRight: 10, width: '30%', float: 'left' }}
        bordered
      >
        <MenuTree deptSelect={setSelectDepts} deptCurrent={setCurrentDept} />
      </ProCard>
      <ProCard
        title="部门管理"
        headerBordered
        style={{ marginRight: 10, width: '65%', float: 'left' }}
        bordered
      >
        <MenuList deptIds={selectDepts} dept={currentDept} />
      </ProCard>
    </PageContainer>
  );
};

export default Dept;
