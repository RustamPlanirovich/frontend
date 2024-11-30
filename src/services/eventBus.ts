type EventCallback = (data: any) => void;

class EventBus {
  private subscribers: Map<string, Set<EventCallback>> = new Map();

  subscribe(event: string, callback: EventCallback): void {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event)!.add(callback);
  }

  unsubscribe(event: string, callback: EventCallback): void {
    const callbacks = this.subscribers.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  emit(event: string, data: any): void {
    const callbacks = this.subscribers.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

export const eventBus = new EventBus(); 