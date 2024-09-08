declare module 'react-native-stopwatch' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface StopwatchProps {
      start: boolean;
      reset: boolean;
      options?: {
        container?: ViewStyle;
        text?: TextStyle;
      };
      getTime?: (time: string) => void;
      laps?: boolean;
    }
  
    export default class Stopwatch extends Component<StopwatchProps> {}
  }