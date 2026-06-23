export {};

declare global {
  interface WindowEventMap {
    "awc:calm-enter": CustomEvent<void>;
    "awc:calm-leave": CustomEvent<void>;
  }
}
