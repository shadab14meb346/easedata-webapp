import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useDeleteDataSourceMutation } from '@http/data-source';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

interface DeleteConfirmationModelProps {
  open: boolean;
  handleClose: () => void;
  dataSourceId: number;
}
const DeleteConfirmationModel = ({
  open,
  handleClose,
  dataSourceId,
}: DeleteConfirmationModelProps) => {
  const { loading, error, data, deleteDataSource } =
    useDeleteDataSourceMutation();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (data?.success) {
      enqueueSnackbar('Deleted successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      handleClose();
    }
    if (error) {
      enqueueSnackbar(`Couldn't delete, please try again`, {
        variant: 'error',
      });
    }
  }, [data, error]);

  console.log({ data, error });
  const handleDelete = () => {
    deleteDataSource(dataSourceId);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'red',
        }}
      >
        <ErrorOutlineIcon sx={{ mr: 1 }} />
        Are you sure you want to delete this data source?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          All of the queries related to this data source will be deleted as
          well.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="outlined">
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModel;
