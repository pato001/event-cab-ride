export type SocketPort = {
    connect: () => void;
    disconnect: () => void;
    send: (data: string) => void;
    onMessage: (callback: (message: MessageEvent) => void) => void;
};
