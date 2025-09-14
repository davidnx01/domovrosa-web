'use client';

import { cn } from "@/lib/utils";

interface ParagraphProps {
  content: string;
  innerHTML?: boolean;
  className?: string;
}

export function Paragraph({ content, innerHTML, className }: ParagraphProps) {
  if (innerHTML) return (
    <div 
      dangerouslySetInnerHTML={{ __html: content }}
      className={cn('paragraph-inner', className)}
    />
  )

  return (
    <p className={cn('text-base lg:text-lg', className)}>
      {content}
    </p>
  )
}