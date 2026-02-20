'use client';

import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaStar } from 'react-icons/fa';

export function TestimonialCard({ author, text, rating = 5, service, className }) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-xl border border-orange-100',
        'bg-gradient-to-b from-orange-50/50 to-white',
        'p-6 text-start',
        'hover:from-orange-50 hover:shadow-lg hover:border-orange-200',
        'max-w-[380px] min-w-[320px]',
        'transition-all duration-300',
        className
      )}
    >
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="text-orange-500 text-sm" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 mb-6 leading-relaxed text-sm italic">
        "{text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-orange-100">
        <Avatar className="h-12 w-12 border-2 border-orange-200">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name?.charAt(0) || '?'}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold text-gray-900 leading-none">
            {author.name}
          </h3>
          {service && (
            <p className="text-xs text-orange-700 mt-1">
              {service}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
