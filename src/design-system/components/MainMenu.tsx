import { PropsWithChildren } from 'react';
import styles from './MainMenu.module.css';

const MainMenuItem = ({ children }: PropsWithChildren) => (
    <li
        className={`px-3 py-2 text-xl leading-10 odd:bg-gray-50/95 even:bg-white/95 hover:bg-blue-50/95  ${styles.item}`}
    >
        <span className="pt-1 block">-</span>
        {children}
    </li>
);

export const MainMenu = ({ children }: PropsWithChildren) => (
    <ul className="my-8 divide-y divide-gray-100 border-b-gray-100 border-b-1">
        {children}
    </ul>
);

MainMenu.Item = MainMenuItem;
