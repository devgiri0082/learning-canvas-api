interface AdvanceObserver {
   update(count: number): void;
}

export class AdvanceObserver1 implements AdvanceObserver {
   update(count: number) {
      console.log(`advance by ${count}`);

   }
}

export class AdvanceObserver2 implements AdvanceObserver {
   update(count: number) {
      console.log(`${count} they advanced by`);

   }
}

export default class AdvanceListener {
   count: number = 0;
   observers: AdvanceObserver[];

   constructor(count: number) {
      this.count = count;
      this.observers = [];
   }

   addObserver(observer: AdvanceObserver) {
      this.observers.push(observer);
   }

   advance(count: number) {
      this.count += count;
      this.notify(count);

   }

   private notify(count: number) {
      this.observers.forEach(observer => {
         observer.update(count);
      })
   }

}