import React, { useRef, useState } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { saveRole, updateRole } from '@/services/admin/role';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/admin/User/components/AddModal';
import { queryPermissionPage } from '@/services/admin/permission';

const Permission: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.User>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const queryPage = async (param: any) => {
    const res = await queryPermissionPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.PermissionListItem> = res.data;
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

  const handlerUpdateUser = async (re: API.PermissionListItem) => {
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

  const columns: ProColumns<API.PermissionListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: '5%',
    },
    {
      title: '权限名称',
      dataIndex: 'name',
    },
    {
      title: 'URL权限表示',
      copyable: true,
      dataIndex: 'urlPerm',
      search: false,
    },
    {
      title: '按钮权限表示',
      dataIndex: 'btnPerm',
      search: false,
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
      <ProTable<API.PermissionListItem>
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

export default Permission;
