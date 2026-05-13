'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  //use state for count setting dropdown to show and hide also session token to check log in
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);

  return (
    // navbar with logo on the left and login/signup buttons on the right
    <nav className="flex flex-col items-center justify-between bg-gray-950 px-4 pb-3 text-white md:h-16 md:flex-row md:pb-0">
      <Link
        href={'/'}
        className="logo flex items-center justify-center text-lg font-bold"
      >
        <img src="/tea.gif" alt="teagif" width={44} />
        <span>Get Me A Chai!</span>
      </Link>

      <div className="relative">
        {/* when user is logged in show account button which is a dropdowndashboard youpage and sign out */}
        {session && (
          <>
            <button
              onClick={() => setShowdropdown(!showdropdown)}
              onBlur={() => {
                setTimeout(() => {
                  setShowdropdown(false);
                }, 100);
              }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="mx-2 inline-flex items-center rounded-lg bg-blue-700 px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Account
              <svg
                className="ms-3 h-2.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${showdropdown ? '' : 'hidden'} absolute top-12 left-3.75 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session?.user?.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => signOut()}
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* show log in button when user is not loggedin and show log out button when logged in */}
        {session && (
          <button
            className="me-2 w-fit rounded-lg bg-linear-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={'/login'}>
            <button className="me-2 rounded-lg bg-linear-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
