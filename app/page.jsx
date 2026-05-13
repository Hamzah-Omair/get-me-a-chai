import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Home - get me a chai',
};

export default function Home() {
  return (
    <>
      {/* Section 1 of main page */}
      <div className="flex h-[44vh] flex-col items-center justify-center gap-5 px-5 text-center text-white md:px-0">
        {/* buy me a Chai Heading with a tea gif */}
        <div className="flex gap-0 text-5xl font-bold md:gap-2">
          Buy me a Chai
          <span>
            <img src="/tea.gif" alt="teagif" width={44} />
          </span>
        </div>
        <p>Support your favorite developers by buying them a cup of chai!</p>

        {/* adding 2 buttons called start now and read more */}
        <div>
          <Link href={'/login'}>
            <button
              type="button"
              className="me-2 mb-2 rounded-lg bg-linear-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
              Start Now
            </button>
          </Link>
          <Link href={'/about'}>
            <button
              type="button"
              className="me-2 mb-2 rounded-lg bg-linear-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-linear-to-bl focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="h-1 bg-white opacity-10"></div>

      {/* Section 2 of main page */}
      <div className="container mx-auto px-5 pt-14 pb-24 text-center text-white">
        {/* Section 2 Heading */}
        <h1 className="mb-14 text-center text-2xl font-bold">
          Your fans can buy you a chai
        </h1>

        {/* icon Section */}
        <div className="flex justify-around gap-5">
          {/* Icon 1 */}
          <div className="item flex flex-col items-center justify-center space-y-5">
            <img
              className="rounded-full bg-slate-400 p-2 text-black"
              width={88}
              src="/man.gif"
              alt="man"
            />
            <p className="font-bold">Fund yourself</p>
            <p className="text-center">Your fans are availabe to help</p>
          </div>

          {/* Icon 2 */}
          <div className="item flex flex-col items-center justify-center space-y-5">
            <img
              className="rounded-full bg-slate-400 p-2 text-black"
              width={88}
              src="/coin.gif"
              alt="coin"
            />
            <p className="font-bold">Fund yourself</p>
            <p className="text-center">Your fans are availabe to help</p>
          </div>

          {/* Icon 3 */}
          <div className="item flex flex-col items-center justify-center space-y-5">
            <img
              className="rounded-full bg-slate-400 p-2 text-black"
              width={88}
              src="/group.gif"
              alt="group"
            />
            <p className="font-bold">Fans Want to help you</p>
            <p className="text-center">Your fans are availabe to help</p>
          </div>
        </div>
      </div>

      <div className="h-1 bg-white opacity-10"></div>

      {/* Section 3 of main page */}
      <div className="container mx-auto flex flex-col items-center justify-center pt-14 pb-32 text-white">
        {/* heading 3 */}
        <h1 className="mb-14 text-center text-2xl font-bold">
          Learn More About the Project
        </h1>
        {/* video embed */}
        <div className="aspect-video w-[90%]">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=iByZmljCQMLAabsW"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
