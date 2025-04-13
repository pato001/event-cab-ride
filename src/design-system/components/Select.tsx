import type { ComponentProps } from 'react';
import cx from 'classnames';

interface Props extends ComponentProps<'select'> {
    unselectable?: 'on' | 'off';
    items: {
        label: string;
        value: string;
    }[];
}

export const Select = ({ className, items, unselectable = 'on', ...props }: Props) => (
    <select
        {...props}
        className={`w-full px-3 py-2 text-lg shadow-sm bg-blue-50 border-r-8 border-transparent ${cx(
            className,
            {
                'text-gray-400 bg-gray-100': props.disabled,
            },
        )}`}
    >
        {unselectable === 'on' && (
            <option key="unselectable" value="">
                Please select
            </option>
        )}
        {items.map((item) => (
            <option key={item.value} value={item.value}>
                {item.label}
            </option>
        ))}
    </select>
);
