import { Injectable } from '@nestjs/common';

@Injectable()
export class FunctionalProgrammingServiceMath {
  doSomethingFunction(x: number, ...func: ((x: number) => number)[]): number {
    for (const f of func) {
      x = f(x);
    }
    return x;
    // return func.reduce((acc, currFunc) => currFunc(acc), x);
  }

  addFive(x: number): number {
    return x + 5;
  }

  divideByTwo(x: number): number {
    return x / 2;
  }

  multiplyByThree(x: number): number {
    return x * 3;
  }

  get(math: number): number {
    return this.doSomethingFunction(
      math,
      this.divideByTwo,
      this.addFive,
      this.addFive,
      this.addFive,
      this.divideByTwo,
      this.multiplyByThree,
      this.multiplyByThree,
    );
  }
}
