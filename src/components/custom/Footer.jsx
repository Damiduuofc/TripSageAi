import React from 'react';

function Footer() {
  return (
    <div className='mt-10'>
      <footer className="bg-gray-200 dark:bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start dark:text-teal-600">
              <img src="/Logo.png" alt="Logo" width={50} height={40} />
            </div>
            <p className="mt-4 text-center text-sm text-black lg:mt-0 lg:text-right dark:text-black">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
