import { getResponsiveSizeWidth } from "../utils/utils";
import { hexToRgba } from "../utils/utils";

const theme = {
   colors: {
      color01: '#f5f4f4',
      color02: '#9cfc97',
      color03: '#2e933c',
      color04: '#297045',
      color05: '#204e4a',
      white: '#ffffff',
      black: '#000000',
      backgroundColor: '#CAD8CF', // hexToRgba('#297045', '0.2')
      headerColor: '#79A48A' // hexToRgba(theme.colors.color04, '0.5'),
   },
   fonts: {
      sizes: {
         small: getResponsiveSizeWidth(5),
         medium: getResponsiveSizeWidth(6),
         large: getResponsiveSizeWidth(8),
      }
   },
   // spacing: {
   //    small: 8,
   //    medium: 16,
   //    large: 24,
   //    xLarge: 32,
   // },
   borderRadius: {
      small: getResponsiveSizeWidth(5),
      medium: getResponsiveSizeWidth(5),
      large: getResponsiveSizeWidth(5),
   },
   // zIndex: {
   //    low: 1,
   //    medium: 10,
   //    high: 100,
   // },
   // breakpoints: {
   //    mobile: 480,
   //    tablet: 768,
   //    desktop: 1024,
   // },
};

export default theme;