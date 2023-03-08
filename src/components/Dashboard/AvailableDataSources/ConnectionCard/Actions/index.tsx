import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useStyles } from './useStyles';
import { useState } from 'react';
import DeleteConfirmationModel from './DeleteConfirmationModel';

interface ActionsProps {
  dataSourceId: number;
  refetch: () => void;
}
const Actions = ({ dataSourceId, refetch }: ActionsProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleConfirmationDialogClose = () => {
    setOpenConfirmationDialog(false);
    handleClose();
    refetch();
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setOpenConfirmationDialog(true);
  };
  return (
    <>
      <DeleteConfirmationModel
        handleClose={handleConfirmationDialogClose}
        open={openConfirmationDialog}
        dataSourceId={dataSourceId}
      />
      <IconButton
        aria-label="settings"
        className={classes.settingsButton}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
export default Actions;
