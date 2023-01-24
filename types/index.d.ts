import '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    customColor1: Palette['primary'];
    customColor2: Palette['primary'];
    customColor3: Palette['primary'];
    customColor4: Palette['primary'];
    customColor5: Palette['primary'];
    lightGray: Palette['primary'];
    offWhite: Palette['primary'];
    green: Palette['primary'];
    red: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    customColor1?: PaletteOptions['primary'];
    customColor2?: PaletteOptions['primary'];
    customColor3?: PaletteOptions['primary'];
    customColor4?: PaletteOptions['primary'];
    customColor5?: PaletteOptions['primary'];
    lightGray?: PaletteOptions['primary'];
    offWhite?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    red?: PaletteOptions['primary'];
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
    body4: React.CSSProperties;
    body5?: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;
    specialH2: React.CSSProperties;
    subheader2: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    body4: React.CSSProperties;
    body5?: React.CSSProperties;
    button1?: React.CSSProperties;
    button2?: React.CSSProperties;
    specialH2?: React.CSSProperties;
    subheader2?: React.CSSProperties;
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    customColor1: true;
    customColor2: true;
    customColor3: true;
    customColor4: true;
    customColor5: true;
    lightGray: true;
    offWhite: true;
    green: true;
    red: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
    body4: true;
    body5: true;
    button1: true;
    button2: true;
    specialH2: true;
    subheader2: true;
  }
}
