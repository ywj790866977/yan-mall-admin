import React, { useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/order/List/components/AddModal';
import { queryOrderPage } from '@/services/order/order';

const List: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.OrderListItem>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const handlerUpdate = (record: API.OrderListItem) => {
    console.log(record);
    setEdtData(record);
  };

  const add = () => {
    setAddVisible(true);
    setEditType(1);
  };

  const editCancel = () => {};

  const option = async (values: any) => {
    console.log(values);
    return false;
  };

  const queryDataPage = async (param: any) => {
    const res = await queryOrderPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.OrderListItem> = res.data;
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
  const columns: ProColumns<API.OrderListItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: '5%',
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
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
      title: '商品',
      dataIndex: 'orderItemList',
      search: false,
    },
    {
      title: '会员Id',
      dataIndex: 'memberId',
      search: false,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
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
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => handlerUpdate(record)}>
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
      <ProTable<API.OrderListItem>
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
        // params={{}}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => editCancel()}
        finished={option}
        data={edtData as API.OrderListItem}
        type={editType}
      />
    </div>
  );
};
export default List;
