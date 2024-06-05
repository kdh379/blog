interface Document {
  startViewTransition(callback: () => Promise<void>): void;
}