export const PLATFORM = {
  location: window.location,
  history: window.history,
  addEventListener(eventName: string, callback: Function, capture: boolean): void {
    PLATFORM.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName: string, callback: Function, capture: boolean): void {
    PLATFORM.global.removeEventListener(eventName, callback, capture);
  }
};
