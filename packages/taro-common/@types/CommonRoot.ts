import { ComponentClass } from 'react';

// import { TimerProps } from './Timer';

export interface IProps {}

// declare constCommonRootCompComp: { Timer: ComponentClass<TimerProps> };
declare const CommonRootComp: ComponentClass<IProps>;

export const CommonRoot = CommonRootComp;
