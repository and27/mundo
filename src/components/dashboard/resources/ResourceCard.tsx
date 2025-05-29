"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ResourceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  type: string;
  tags?: string[];
  actionButtonLabel: string;
  actionLink?: string;
  onActionClick?: () => void;
  className?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  imageUrl,
  type,
  tags,
  actionButtonLabel,
  actionLink,
  onActionClick,
  className = "",
}) => {
  const cardContent = (
    <>
      {imageUrl ? (
        <div className="relative w-full h-40 mb-3 rounded-t-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="relative w-full h-40 mb-3 rounded-t-lg bg-black/30 flex items-center justify-center text-condor/50">
          <p className="text-sm">{type}</p>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs bg-condor/20 text-condor px-2 py-1 rounded-full mb-2 self-start">
          {type}
        </span>
        <h3 className="text-lg font-semibold text-jaguar mb-1 flex-grow min-h-[2.5em]">
          {title}
        </h3>
        <p className="text-sm text-condor/80 mb-3 flex-grow min-h-[3em]">
          {description}
        </p>
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-black/30 text-condor/70 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto">
          {actionLink ? (
            <Link
              href={actionLink}
              className="block w-full bg-jaguar hover:bg-jaguar/80 text-black font-bold py-2 px-3 rounded-md transition text-sm text-center"
            >
              {actionButtonLabel}
            </Link>
          ) : (
            <button
              onClick={onActionClick}
              className="w-full bg-jaguar hover:bg-jaguar/80 text-black font-bold py-2 px-3 rounded-md transition text-sm"
            >
              {actionButtonLabel}
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`bg-black/20 rounded-lg border border-condor/30 shadow-md flex flex-col overflow-hidden h-full ${className}`}
    >
      {cardContent}
    </div>
  );
};

export default ResourceCard;
