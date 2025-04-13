import type { ComponentProps, PropsWithChildren } from 'react';

interface Props extends ComponentProps<'div'> {
    label: string;
}

export const FormField = ({
    children,
    label,
    className,
    ...props
}: PropsWithChildren<Props>) => (
    <div {...props} className={`mb-6 pb-3 ${className}`}>
        <FormLabel>{label}</FormLabel>
        {children}
    </div>
);

export const FormLabel = ({
    children,
    className,
    htmlFor,
    ...props
}: PropsWithChildren<ComponentProps<'label'>>) => (
    <label
        {...props}
        htmlFor={htmlFor}
        className={`block text-xl text-gray-700 mb-1 ${className}`}
    >
        {children}
    </label>
);
