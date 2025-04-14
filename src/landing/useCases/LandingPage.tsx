import { FocusPageLayout, HeroTitle, MainMenu } from '@design-system';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
    return (
        <FocusPageLayout>
            <HeroTitle title="Event app" />
            <MainMenu>
                <MainMenu.Item>
                    <Link to="/schedule">Venue details</Link>
                </MainMenu.Item>
                <MainMenu.Item>
                    <Link to="/information">Players lineup</Link>
                </MainMenu.Item>
                <MainMenu.Item>
                    <Link to="/schedule">Event schedule</Link>
                </MainMenu.Item>
                <MainMenu.Item>
                    <Link to="/cab-service">Cab service</Link>
                </MainMenu.Item>
            </MainMenu>
        </FocusPageLayout>
    );
};
