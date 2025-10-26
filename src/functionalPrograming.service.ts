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
}
