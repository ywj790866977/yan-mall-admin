import React, { useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Image } from 'antd';
import { queryGoodsPage } from '@/services/goods/goods';

const Product: React.FC = () => {
  const ref = useRef<ActionType>();

  const handlerUpdate = (record: API.GoodsListItem) => {
    console.log(record);
  };

  const queryDataPage = async (param: any) => {
    const res = await queryGoodsPage(param);
    if (res.code === 0) {
      const page: API.PageRes<API.GoodsListItem> = res.data;
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
  const columns: ProColumns<API.GoodsListItem>[] = [
    {
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: '图片',
      dataIndex: 'picUrl',
      search: false,
      width: '15%',
      render: (node, re) => {
        return <Image width={100} src={re.picUrl} />;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
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
      title: '原价',
      dataIndex: 'originPrice',
      search: false,
    },
    {
      title: '现价',
      dataIndex: 'price',
      search: false,
    },

    {
      title: '品牌',
      dataIndex: 'brandName',
      search: false,
    },
    {
      title: '类型',
      dataIndex: 'categoryName',
      search: false,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      search: false,
    },
    {
      title: '描述',
      dataIndex: 'description',
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
      <ProTable<API.GoodsListItem>
        actionRef={ref}
        rowKey="id"
        search={{
          labelWidth: 80,
        }}
        // toolBarRender={() => [
        //   <Button type="primary" key="primary" onClick={add}>
        //     <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
        //   </Button>,
        // ]}
        request={queryDataPage}
        // params={{}}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
    </div>
  );
};
export default Product;
