import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className='p-5 bg-blue-500 flex items-center'>
      <div className='text-xl font-medium text-white mr-4'>Movier</div>
      <Link href='/' className='px-2 py-1 bg-white text-blue-500 rounded-lg'>
        Home
      </Link>
    </header>
  );
}

export default Header;
