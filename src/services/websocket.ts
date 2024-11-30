import io, { Socket } from 'socket.io-client';
import { eventBus } from './eventBus';

class WebSocketService {
  private socket: Socket | null = null;

  connect(url: string, options: any = {}): void {
    this.socket = io(url, options);

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('message', (event) => {
      eventBus.emit('ws:message', event);
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      eventBus.emit('ws:error', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  send(event: string, data: any): void {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export const wsService = new WebSocketService(); 