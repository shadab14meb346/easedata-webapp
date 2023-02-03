import { useGetHubSpotContactsQuery } from '@http/data-source';
import {
  SelectChangeEvent,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useStyles } from './useStyles';

interface IFetchHubSpotContactsProps {
  selectDataSource?: number;
}
const FetchHubSpotContacts = ({
  selectDataSource,
}: IFetchHubSpotContactsProps) => {
  const [selectedTable, setSelectedTable] = useState<null | string>(null);
  const {
    data: contacts,
    error,
    loading,
    fetchHubSpotContacts,
  } = useGetHubSpotContactsQuery();
  const classes = useStyles();
  const tables = ['Contacts'];
  const handleGetAllContactsClick = () => {
    fetchHubSpotContacts();
  };
  const handleChange = (event: SelectChangeEvent<typeof selectedTable>) => {
    setSelectedTable(event.target.value);
  };
  if (!selectDataSource) return null;
  return (
    <div className={classes.main}>
      <InputLabel id="demo-multiple-name-label">Select Table</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={selectedTable}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        className={classes.select}
      >
        {tables?.map((table: string) => (
          <MenuItem key={table} value={table}>
            {table}
          </MenuItem>
        ))}
      </Select>
      {selectedTable && (
        <Box marginTop={1}>
          <Button
            disabled={loading}
            variant="outlined"
            onClick={handleGetAllContactsClick}
          >
            Get All Contacts
          </Button>
          {loading ? (
            'data loading....'
          ) : (
            <>
              {!loading && !!contacts.length && (
                <table>
                  <tr>
                    <th>first_name</th>
                    <th>last_name</th>
                    <th>created_at</th>
                  </tr>
                  {contacts?.map((contact: any) => {
                    return (
                      <tr>
                        <td>{contact.first_name}</td>
                        <td>{contact.last_name}</td>
                        <td>{contact.created_at}</td>
                      </tr>
                    );
                  })}
                </table>
              )}
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default FetchHubSpotContacts;
