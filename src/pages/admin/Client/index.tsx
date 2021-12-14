import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/admin/Client/components/AddModal';
import { queryClientPage, save, update } from '@/services/admin/client';
import { remove } from '@/services/admin/dict';

const Client: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.ClientListItem>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const handlerUpdate = (record: API.ClientListItem) => {
    console.log('update', record);
    if (record.id) {
      setEdtData(record);
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

  const option = async (values: any) => {
    console.log(values);
    const params: API.ClientListItem = { ...values };
    // params.status = values.status ? 1 : 0;
    if (values.id) {
      const res = await update(values.id, params);
      if (res && res.code === 0) {
        setAddVisible(false);
        setEdtData(undefined);
        message.success('修改成功');
        return true;
      }
      message.error(res.message);
      return false;
    }

    const res = await save(params);
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

  const deleteClient = async (record: API.ClientListItem) => {
    const res = await remove(record.id);
    if (res.code === 0) {
      message.success('删除成功!');
      ref.current?.reload();
      return;
    }
    message.error(res.message);
  };

  const queryDataPage = async (param: any) => {
    const res = await queryClientPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.ClientListItem> = res.data;
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
  const columns: ProColumns<API.ClientListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: '客户端ID',
      dataIndex: 'clientId',
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
      title: '客户端秘钥',
      dataIndex: 'clientSecret',
      search: false,
    },
    {
      title: '域',
      dataIndex: 'scope',
      search: false,
    },
    {
      title: '自动放行',
      dataIndex: 'autoapprove',
      search: false,
    },
    {
      title: '授权方式',
      dataIndex: 'authorizedGrantTypes',
      search: false,
    },
    {
      title: '认证令牌时效(单位:秒)',
      dataIndex: 'accessTokenValidity',
      search: false,
    },
    {
      title: '刷新令牌时效(单位:秒)',
      dataIndex: 'refreshTokenValidity',
      search: false,
    },

    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => [
        <a key="editable" onClick={() => handlerUpdate(record)}>
          编辑
        </a>,
        <Popconfirm
          title={`确定要删除 ${record.clientId} 吗?`}
          onConfirm={() => deleteClient(record)}
        >
          <a key="editable">删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<API.ClientListItem>
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
        request={queryDataPage}
        columns={columns}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => editCancel()}
        finished={option}
        data={edtData as API.ClientListItem}
        type={editType}
      />
    </div>
  );
};
export default Client;
