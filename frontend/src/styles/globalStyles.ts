import { StyleSheet } from 'react-native';
import theme from './theme';

const globalStyles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.color01,
   },
   heading: {
      fontSize: theme.fonts.sizes.large,
      fontFamily: 'NotoSans-Bold',
   },
   text: {
      fontSize: theme.fonts.sizes.small,
      fontFamily: 'NotoSans-Regular',
      color: theme.colors.color05,
   },
   
});

export default globalStyles;
