import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryPage, remove, saveRole, updateRole, updateStatus } from '@/services/admin/role';
import { Button, message, Popconfirm, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/admin/Role/components/AddModal';

const Role: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.Role>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const queryRolePage = async (param: any) => {
    const res = await queryPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.RoleListItem> = res.data;
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

  const deleteRole = async (record: API.RoleListItem) => {
    console.log(record);

    const res = await remove(record.id);
    if (res.code === 0) {
      message.success('删除成功!');
      ref.current?.reload();
      return;
    }
    message.error(res.message);
  };

  const option = async (values: any) => {
    console.log(values);
    const params: API.Role = { ...values };
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

  const handlerUpdateRole = async (re: API.RoleListItem) => {
    if (re.id) {
      const role: API.Role = { ...re };
      setEdtData(role);
      setEditType(2);
      setAddVisible(true);
    } else {
      setEdtData(undefined);
      setEditType(1);
    }
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

  const updateRoleStatus = async (record: API.RoleListItem) => {
    const res = await updateStatus(record.id, record.status === 0 ? 1 : 0);
    if (res.code === 0) {
      message.success('更新成功');
      ref.current?.reload();
      return;
    }
    message.error(res.message);
  };

  const columns: ProColumns<API.RoleListItem>[] = [
    {
      title: 'ID',
      copyable: true,
      dataIndex: 'id',
      width: '8%',
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
      title: '菜单权限',
      dataIndex: 'menus',
      search: false,
      ellipsis: true,
    },
    {
      title: '资源权限',
      dataIndex: 'permissions',
      search: false,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      search: false,
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      search: false,
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '100px',
      render: (text, record) => (
        <Popconfirm
          title={`确定要 ${record.status ? '关闭' : '开启'} ${record.name} 吗?`}
          onConfirm={() => updateRoleStatus(record)}
        >
          <Switch checkedChildren="启用中" unCheckedChildren="未启用" checked={!!text} />
        </Popconfirm>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <a key="editable" onClick={() => handlerUpdateRole(record)}>
          编辑
        </a>,
        <Popconfirm title={`确定要删除 ${record.name} 吗?`} onConfirm={() => deleteRole(record)}>
          <a key="editable">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RoleListItem>
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
        request={queryRolePage}
        columns={columns}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => editCancel()}
        finished={option}
        data={edtData as API.Role}
        type={editType}
      />
    </PageContainer>
  );
};

export default Role;
