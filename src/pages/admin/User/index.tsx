import {PageContainer} from "@ant-design/pro-layout";
import React from "react";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {FormattedMessage} from "umi";
import {rule} from "@/services/ant-design-pro/api";
import ProTable from '@ant-design/pro-table';

const User: React.FC = () => {

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        // headerTitle={intl.formatMessage({
        //   id: 'pages.searchTable.title',
        //   defaultMessage: 'Enquiry form',
        // })}
        // actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              // handleModalVisible(true);
            }}
          >
            <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
          </Button>,
        ]}
        request={rule}
        // columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
        />
    </PageContainer>


  )

}


export default User;
