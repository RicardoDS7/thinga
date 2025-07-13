"use client";
import React, { useState } from 'react';

interface DescriptionBoxProps {
    description: string;
    maxLength?: number;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({
    description,
    maxLength = 180,
}) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = description.length > maxLength;
    const displayedText = expanded || !isLong
        ? description
        : description.slice(0, maxLength) + '...';

    return (
        <div className="description-box p-6 bg-white rounded-lg shadow-md">
            <p className="whitespace-pre-line mb-2">
                {displayedText}
                {isLong && (
                    <button
                        className="cursor-pointer ml-2 text-[var(--color-primary)] underline text-sm"
                        onClick={() => setExpanded((prev) => !prev)}
                        type="button"
                    >
                        {expanded ? 'See less' : 'See more'}
                    </button>
                )}
            </p>
        </div>
    );
};

export default DescriptionBox;