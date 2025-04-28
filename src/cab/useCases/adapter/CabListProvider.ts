import { createGenericContext } from '../../../common/context';
import { SocketPort } from './CabListPort';

type Adapter = (url: string) => SocketPort;

type Factory = () => Adapter;

export const { useContext, createContextProvider: provideVirtualCabs } =
    createGenericContext<Factory>();

export function useVirtualCabsAdapterFactory() {
    return useContext().value;
}
