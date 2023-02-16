import { Box } from '@mui/material';
import classNames from 'classnames';
import { useStyles } from './useStyles';

interface IShowDataProps {
  data: any[];
  className?: string;
}
const ShowData = ({ data, className = '' }: IShowDataProps) => {
  const classes = useStyles();
  if (!data?.length) return null;
  const headers = Object.keys(data[0]);
  return (
    <div className={classNames(classes.main, className)}>
      <Box marginTop={1}>
        <table style={{ marginTop: '8px' }}>
          <tr>
            {headers?.map((header: string) => (
              <th>{header}</th>
            ))}
          </tr>
          {data?.map((item: any) => {
            return (
              <tr>
                {headers?.map((header: string) => (
                  <td>{item[header]}</td>
                ))}
              </tr>
            );
          })}
        </table>
      </Box>
    </div>
  );
};

export default ShowData;
