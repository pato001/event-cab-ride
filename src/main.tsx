import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import './index.css';
import { ContextProvider } from './common/context';
import { provideVirtualCabs } from './cab/useCases/adapter/CabListProvider';
import { createVirtualCabListAdapter } from './cab/useCases/adapter/CabListAdapter';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider providers={[provideVirtualCabs(createVirtualCabListAdapter)]}>
            <App />
        </ContextProvider>
    </React.StrictMode>,
);
