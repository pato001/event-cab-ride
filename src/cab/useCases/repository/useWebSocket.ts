import { useEffect, useRef } from 'react';
import { useVirtualCabsAdapterFactory } from '../adapter/CabListProvider';

export const useWebSocket = (url: string) => {
    const factory = useVirtualCabsAdapterFactory();
    const createWebSocketAdapter = factory();
    const socket = useRef(createWebSocketAdapter(url));

    useEffect(() => {
        const socketConnection = socket.current;

        if (!socketConnection) return;

        socketConnection.connect();

        return () => {
            socketConnection.disconnect();
        };
    }, [url]);

    const send = (data: string) => {
        socket.current.send(data);
    };

    const onMessage = (callback: (message: MessageEvent) => void) => {
        socket.current.onMessage(callback);
    };

    return { send, onMessage };
};
