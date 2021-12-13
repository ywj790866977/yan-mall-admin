import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Popconfirm, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from '@@/plugin-locale/localeExports';
import AddModal from '@/pages/admin/Dept/components/AddModal';
import { queryList, remove, save, update, updateStatus } from '@/services/admin/dept';

const Dept: React.FC = () => {
  const [editType, setEditType] = useState<number>(1);
  const [edtData, setEdtData] = useState<API.DeptListItem>();
  // const [delData, setDelData] = useState<string>();
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const ref = useRef<ActionType>();

  const queryPage = async (param: any) => {
    const res = await queryList(param);
    console.log('res', res);
    if (res.code === 0) {
      return {
        success: true,
        data: res.data,
        current: 0,
        pageSize: 100,
        total: 100,
      };
    }
    return {
      success: false,
    };
  };

  const option = async (values: any) => {
    console.log(values);
    const params: API.DeptListItem = { ...values };
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

  const updateDeptStatus = async (re: API.DeptListItem) => {
    const res = await updateStatus(re.id, re.status === 0 ? 1 : 0);
    if (res.code === 0) {
      message.success('修改状态成功');
      ref.current?.reload();
      return;
    }
    message.error('修改状态失败');
  };

  const handlerUpdateDept = async (re: API.DeptListItem) => {
    if (re.id) {
      const dept: API.DeptListItem = { ...re };
      setEdtData(dept);
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

  const columns: ProColumns<API.DeptListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '8%',
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
          onConfirm={() => updateDeptStatus(record)}
        >
          <Switch checked={!!text} />
        </Popconfirm>
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      width: '15%',
      render: (text, record) => [
        <a key="editable" onClick={() => handlerUpdateDept(record)}>
          编辑
        </a>,
        <Popconfirm
          key="popconfirm"
          title={`确认 ${record.name} 吗?`}
          okText="是"
          cancelText="否"
          onConfirm={() => remove(record.id)}
        >
          <a key="editable">删除</a>
        </Popconfirm>,
      ],
    },
  ];
  //
  // const expandedRowRender: any = (record: API.DeptListItem) => {
  //   return (
  //     <ProTable<API.DeptListItem>
  //       rowKey="id"
  //       columns={columns}
  //       headerTitle={false}
  //       search={false}
  //       options={false}
  //       dataSource={record.children}
  //       pagination={false}
  //     />
  //   );
  // };

  return (
    <PageContainer>
      <ProTable<API.DeptListItem>
        actionRef={ref}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={add}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        // expandable={{expandedRowRender}}
        request={queryPage}
        columns={columns}
        // rowSelection={{alwaysShowAlert:true}}
      />
      <AddModal
        addVisible={addVisible}
        cancel={() => editCancel()}
        finished={option}
        data={edtData as API.DeptListItem}
        type={editType}
      />
    </PageContainer>
  );
};

export default Dept;
