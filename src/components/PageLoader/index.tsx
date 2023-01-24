import { Box } from '@mui/material';

import theme from 'src/style-system/theme';

import { useStyles } from './useStyles';

interface IPageLoader {
  isTransparent?: boolean;
  height?: string;
  padding?: string;
  backGroundColor?: string;
}

const PageLoader = ({
  isTransparent,
  height = '100vh',
  padding = '0px',
  backGroundColor = theme.palette.customColor4.main,
}: IPageLoader) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.mainContainer}
      sx={{
        backgroundColor: backGroundColor,
        opacity: isTransparent ? 0.75 : 1,
        height: height,
        padding: padding,
      }}
    >
      <div className={classes.logo}>Logo</div>
    </Box>
  );
};

export default PageLoader;
