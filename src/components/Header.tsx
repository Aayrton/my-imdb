'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

const Header: React.FC<{}> = ({}) => {
  const pathname = usePathname();

  return (
    <header className="bg-black text-white h-20">
      <div className="container pl-24 pr-24 mx-auto flex justify-between items-center h-full ">
        <Link
          href="/"
          className="text-2xl rounded-lg border-2 border-yellow-200 p-1"
        >
          MY IMDB
        </Link>
        {pathname !== '/' && (
          <Link href="/">
            <ArrowBackIcon className="align-bottom" />
            <span className="ml-2">Retour à la liste</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
