import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import { IProps, IState } from './interface';

import './index.scss';

export class CustomButton extends Component<IProps, IState> {
  render() {
    return <View className="timer"></View>;
  }
}
