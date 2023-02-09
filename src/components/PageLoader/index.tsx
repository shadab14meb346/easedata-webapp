import { Box } from '@mui/material';

import { useStyles } from './useStyles';

interface IPageLoader {
  height?: string;
  padding?: string;
}

const PageLoader = ({ height = '100vh', padding = '0px' }: IPageLoader) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.mainContainer}
      sx={{
        height: height,
        padding: padding,
      }}
    >
      <div className={classes.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="#333"
            d="M8 2C4.692 2 2 4.692 2 8s2.692 6 6 6a6.01 6.01 0 005.917-5H12.9A4.992 4.992 0 018 13c-2.768 0-5-2.232-5-5a4.992 4.992 0 018.77-3.27L10.5 6H14V2.5l-1.523 1.523A5.978 5.978 0 008 2z"
          ></path>
        </svg>
      </div>
    </Box>
  );
};

export default PageLoader;
