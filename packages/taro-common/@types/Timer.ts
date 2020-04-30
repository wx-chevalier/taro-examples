import { ComponentClass } from 'react';

export interface TimerProps {
  startTime: number;
  endTime: number;
  onTimeup?(): void;
  onTick?(): void;
}

declare const TimerComp: ComponentClass<TimerProps>;

export const Timer = TimerComp;
