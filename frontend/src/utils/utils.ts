import { Dimensions } from 'react-native';

export const getScreenDimensions = () => {
   const { width, height } = Dimensions.get('window');
   return { width, height };
};

export const getResponsiveSizeWidth = (percentage: number) => {
   const { width } = getScreenDimensions();
   return width * (percentage / 100);
};

export const getResponsiveSizeHeight = (percentage: number) => {
   const { height } = getScreenDimensions();
   return height * (percentage / 100);
};

export const hexToRgba = (hex: string , opacity: string) => {
   const r = parseInt(hex.slice(1, 3), 16);
   const g = parseInt(hex.slice(3, 5), 16);
   const b = parseInt(hex.slice(5, 7), 16);
 
   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
 };

export const formatDate = (date: Date): string => {
   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};