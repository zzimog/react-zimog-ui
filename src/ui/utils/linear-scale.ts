import { clamp } from './clamp';

type Range = [from: number, to: number];

export function linearScale(input: Range, output: Range, clamped?: boolean) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) {
      return output[0];
    }

    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    const result = output[0] + ratio * (value - input[0]);

    return clamped ? clamp(result, output[0], output[1]) : result;
  };
}
