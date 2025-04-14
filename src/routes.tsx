import { LandingPage } from './landing/useCases/LandingPage';
import { FocusPageLayout, HeroTitle } from '@design-system';
import {CabServicePage} from './cab/useCases/CabServicePage';
export const routes = [
    {
        index: true,
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/cab-service',
        element: <CabServicePage />,
    },
    {
        path: '*',
        element: (
            <FocusPageLayout>
                <HeroTitle title="Page not found" disabled />
            </FocusPageLayout>
        ),
    },
];
