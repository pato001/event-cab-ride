import { SocketPort } from './CabListPort';

export const createWebSocketAdapter = (url: string): SocketPort => {
    let socket: WebSocket | null = null;
    let messageListeners: Array<(event: MessageEvent) => void> = [];

    const connect = () => {
        socket = new WebSocket(url);

        socket.addEventListener('message', (event) => {
            messageListeners.forEach((listener) => listener(event));
        });
    };

    const disconnect = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.close();
        }
    };

    const send = (data: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(data);
        }
    };

    const onMessage = (callback: (message: MessageEvent) => void) => {
        messageListeners.push(callback);
    };

    return {
        connect,
        disconnect,
        send,
        onMessage,
    };
};

export function createVirtualCabListAdapter(options?: SocketPort) {
    const adapter = options ? () => options : createWebSocketAdapter;
    return adapter;
}
