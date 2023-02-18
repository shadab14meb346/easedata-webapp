import classNames from 'classnames';
import { useStyles } from './useStyles';
import CustomMaterialTable from '@components/common/CustomMaterialTable';
interface IShowDataProps {
  data: any[];
  className?: string;
  exportFileName: string;
}
const ShowData = ({ data, className = '', exportFileName }: IShowDataProps) => {
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
  return (
    <div className={classNames(classes.main, className)}>
      <CustomMaterialTable
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
      />
    </div>
  );
};
export default ShowData;
