import type { ReactNode } from 'react';
import cx from 'classnames';

interface Props {
    disabled?: boolean;
    title: ReactNode;
}

export const HeroTitle = ({ disabled, title }: Props) => (
    <h2 className="-mt-11 mb-8 text-4xl font-extrabold leading-[3.5rem] tracking-wide">
        <span
            className={cx('px-4 py-1', {
                'bg-gray-100': disabled,
                'bg-gray-50': !disabled,
            })}
        >
            <span
                className={cx({
                    'text-gray-500': disabled,
                })}
            >
                {title}
            </span>
        </span>
    </h2>
);
