export const _PLATFORM = {
  location: typeof window !== 'undefined' && window.location,
  history: typeof window !== 'undefined' && window.history,
  addEventListener(eventName: string, callback: Function, capture: boolean): void {
    this.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName: string, callback: Function, capture: boolean): void {
    this.global.removeEventListener(eventName, callback, capture);
  },
  performance: typeof window !== 'undefined' && window.performance,
  requestAnimationFrame(callback: Function): number {
    return this.global.requestAnimationFrame(callback);
  }
};
