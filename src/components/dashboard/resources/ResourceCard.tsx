"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowRight } from "react-icons/hi";
import { ActivityGuideline } from "@/types/ai";

interface ResourceCardProps {
  resource: ActivityGuideline;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Link href={resource.linkToDetail} className="block group my-2">
      <div className="p-4 rounded-xl glass-light border border-white/10 hover:border-color-accent-magic/70 hover:bg-color-accent-magic/5 transition-all duration-300 shadow-sm hover:shadow-lg flex gap-4 items-center">
        {resource.imageUrl && (
          <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden relative">
            <Image
              src={resource.imageUrl}
              alt={resource.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-grow">
          <span className="text-xs text-color-accent-magic font-medium bg-color-accent-magic/10 px-2 py-0.5 rounded-full inline-block mb-1">
            {resource.type}
          </span>
          <h4 className="font-semibold text-foreground group-hover:text-color-accent-magic transition-colors">
            {resource.title}
          </h4>
          <p className="text-sm text-foreground/70 mt-1 line-clamp-2">
            {resource.description}
          </p>
        </div>
        <HiOutlineArrowRight className="w-5 h-5 text-foreground/50 group-hover:text-color-accent-magic transition-colors flex-shrink-0" />
      </div>
    </Link>
  );
};

export default ResourceCard;
