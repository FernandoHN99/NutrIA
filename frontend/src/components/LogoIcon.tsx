import { Image } from 'react-native';
import React from 'react';
import { getResponsiveSizeWidth } from '../utils/utils';

const LogoIcon = ({ widthPorcentageValue }: { widthPorcentageValue: number }) => {
   const widthValue = getResponsiveSizeWidth(widthPorcentageValue);
   return (
      <Image
         style={{ width: widthValue, height: widthValue }}
         source={require('../../assets/icon.png')}
      />
   );
}

export default LogoIcon;