import classNames from 'classnames';
import { useStyles } from './useStyles';
import CustomMaterialTable from '@components/common/CustomMaterialTable';
import { Button } from '@mui/material';
import { PageInfo } from 'types/utils';
interface IShowDataProps {
  data: any[];
  className?: string;
  exportFileName: string;
  pageInfo?: PageInfo;
  handleLoadMore?: () => void;
  dataLoading?: boolean;
}

const ShowData = ({
  data,
  className = '',
  exportFileName,
  pageInfo,
  handleLoadMore,
  dataLoading,
}: IShowDataProps) => {
  if (!data?.length) return null;
  const classes = useStyles();
  const getColumns = () => {
    const headers = Object.keys(data[0]);
    return headers?.map((header: string) => ({
      field: header,
      title: header,
      width: 10 * header.length,
    }));
  };
  const getRows = () => {
    return data?.map((item: any, index: number) => {
      return {
        id: index,
        ...item,
      };
    });
  };
  const LoadMoreButton = () => {
    return (
      <Button variant="outlined" disabled={!pageInfo?.has_next_page}>
        Load More
      </Button>
    );
  };
  return (
    <div className={classNames(classes.main, className)}>
      <CustomMaterialTable
        isLoading={dataLoading}
        columns={getColumns()}
        data={getRows()}
        options={{
          exportButton: true,
          search: false,
          maxBodyHeight: '400px',
          exportAllData: true,
          exportFileName,
          pageSize: 20,
          headerStyle: {
            backgroundColor: '#5569ff',
            color: '#FFF',
            textTransform: 'none',
          },
        }}
        title=" "
        localization={{
          toolbar: {
            exportTitle: 'Export Data',
          },
        }}
        actions={[
          {
            icon: '',
            tooltip: 'Add Item',
            onClick: handleLoadMore,
            isFreeAction: true,
            iconProps: {
              component: LoadMoreButton,
            },
          },
        ]}
      />
    </div>
  );
};
export default ShowData;
