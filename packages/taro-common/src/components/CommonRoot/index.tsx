import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import { Timer } from '../Timer';

import { IProps, IState } from './interface';
import './index.scss';

export class CommonRoot extends Component<IProps, IState> {
  render() {
    return <View className="timer">123</View>;
  }
}

(CommonRoot as any).Timer = Timer;
