import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FunctionalProgrammingServiceMath {
  // higher-order function
  plusBy =
    (x: number): ((y: number) => number) =>
    (y: number): number =>
      x + y;

  // higher-order function
  divideBy =
    (divisor: number) =>
    (x: number): number =>
      divisor === 0
        ? (() => {
            throw new BadRequestException('Division by zero');
          })()
        : x / divisor;

  //   divideBy =
  //     (divisor: number) =>
  //     (x: number): number => {
  //       if (divisor === 0)
  //         throw new BadRequestException('Division by zero is not allowed.');
  //       return x / divisor;
  //     };

  // higher-order function
  multiplyBy =
    (factor: number) =>
    (x: number): number =>
      x * factor;

  isEven = (x: number): boolean => x % 2 === 0;

  // ฟังก์ชันสำหรับ compose ฟังก์ชันหลายตัวเข้าด้วยกัน
  compose =
    <T>(...fns: Array<(x: T) => T>) =>
    (x: T): T =>
      fns.reduce((acc, fn) => fn(acc), x);

  //   compose = (...func: ((x: number) => number)[]): ((x: number) => number) => {
  //     return (x: number): number => {
  //       let result = x;
  //       for (const f of func) {
  //         result = f(result);
  //       }
  //       return result;
  //     };
  //     // return func.reduce(
  //     //   (f, g) =>
  //     //     (x: number): number =>
  //     //       g(f(x)),
  //     // );
  //   };

  // higher-order function
  apply =
    (fn: (x: number) => number) =>
    (factor: number): number =>
      fn(factor);
  addFive = (x: number): number => x + 5;
  addTen = (x: number): number => x + 10;

  // ใช้ composition เพื่อสร้าง pipeline ทางคณิตศาสตร์
  get(math: number): number {
    const pipeline = this.compose(
      this.plusBy(10),
      this.divideBy(2),
      this.divideBy(3),
      this.multiplyBy(3),
      this.multiplyBy(2),
      this.apply(this.addFive),
      this.apply(this.addTen),
    );

    return pipeline(math);
  }

  filter = <T>(predicate: (x: T) => boolean): ((input: T[]) => T[]) => {
    return (input) => {
      const result: T[] = [];
      for (const i of input) {
        if (predicate(i)) {
          result.push(i);
        }
      }
      return result;
    };
  };

  testFilter() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const filterEven = this.filter((x: number) => x % 2 === 0);
    const filterOdd = this.filter<number>((x) => !this.isEven(x));

    const oddOrEven = ['odd', 'even', 'even', 'odd', 'even', 'odd'];
    const filterOddString = this.filter((x) => x === 'odd');
    const filterEvenString = this.filter<string>((x) => x === 'even');

    return {
      evenNumbers: filterEven(numbers),
      oddNumbers: filterOdd(numbers),

      oddStrings: filterOddString(oddOrEven),
      evenStrings: filterEvenString(oddOrEven),
    };
  }

  map = <T, U>(mapper: (x: T) => U): ((input: T[]) => U[]) => {
    return (input) => {
      const result: U[] = [];
      for (const i of input) {
        result.push(mapper(i));
      }
      return result;
    };
  };

  testMap() {
    const numbers = [1, 2, 3, 4, 5];
    const multiplyByTwenty = this.map(this.multiplyBy(20));
    return multiplyByTwenty(numbers);
  }
}
