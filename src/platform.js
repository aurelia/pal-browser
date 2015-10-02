export const PLATFORM = {
  location: window.location,
  history: window.history,
  XMLHttpRequest: XMLHttpRequest,
  addEventListener(eventName: string, callback: Function, capture: boolean) {
    PLATFORM.global.addEventListener(eventName, callback, capture);
  },
  removeEventListener(eventName: string, callback: Function, capture: boolean) {
    PLATFORM.global.removeEventListener(eventName, callback, capture);
  },
};
