'use client';

import { useRouter } from 'next/navigation';
import { LuCookie } from 'react-icons/lu';
import { Button } from '../ui/button';

export function CookieConsentFab() {
  const router = useRouter();

  const handleClick = () => {
    router.push('?occ=true');
  };

  return (
    <Button
      onClick={handleClick}
      variant="default"
      size="icon"
      className="fixed bottom-16 left-4 z-[1000] rounded-full shadow-2xl sm:bottom-8"
    >
      <LuCookie size={24} />
    </Button>
  );
}
