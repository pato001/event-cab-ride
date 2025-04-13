import { ReactNode } from 'react';
import cx from 'classnames';

interface Props {
    model: string;
    eta: number;
    segment: string;
    capacity?: number;
    rating?: number;
    impediment?: string;
}

export const CabListItem = ({
    model,
    eta,
    segment,
    capacity,
    rating,
    impediment,
}: Props) => {
    let ratingText: ReactNode | null = null;

    if (rating) {
        ratingText = (
            <>
                {` · ${rating}/5 `}
                <i className="text-orange-300 not-italic">★</i>
            </>
        );
    }

    return (
        <div
            className={`-mx-10 mb-0 border-t-1 border-white pt-2 pb-3 px-6 space-y-1 ${cx(
                {
                    'bg-[#e3fafc]': !impediment,
                    'bg-[#f3f0ff]': impediment,
                },
            )}`}
        >
            <div className="flex justify-between">
                <span className="text-left text-xl">{model}</span>
                <span className="text-right text-lg">Arrives in {eta}m</span>
            </div>
            <div className="flex justify-between">
                <span className="text-left">
                    {segment}
                    {capacity ? ` · ${capacity} seats` : ''}
                    {ratingText}
                </span>
                <span className="text-right text-red-600">{impediment} </span>
            </div>
        </div>
    );
};
