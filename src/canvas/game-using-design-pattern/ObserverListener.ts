export interface Updatable {
   update(canvas: HTMLCanvasElement): void;
}

export class Listener {
   observer: Updatable[];

   constructor() {
      this.observer = [];
   }

   addObserver(updatable: Updatable) {
      this.observer.push(updatable);
   }

   removeObserver(updatable: Updatable) {
      const index = this.observer.indexOf(updatable);
      this.observer.splice(index, 1);
   }

   notify(canvas: HTMLCanvasElement) {
      this.observer.forEach(observe => {
         observe.update(canvas);
      })
   }


}