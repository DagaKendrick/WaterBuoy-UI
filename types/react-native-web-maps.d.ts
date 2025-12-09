declare module 'react-native-web-maps' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';

  export const Marker: ComponentType<any>;
  const MapView: ComponentType<ViewProps & any>;
  export default MapView;
}
