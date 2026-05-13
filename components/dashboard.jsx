'use client';
import React, { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (session?.user?.name) {
      let a = await updateProfile(e, session.user.name);
      update();
      toast('Profile Updated', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const getData = async () => {
      if (session?.user?.name) {
        let u = await fetchuser(session.user.name);
        setform(u || {});
      }
    };
    getData();
  }, [session?.user?.name]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container mx-auto px-6 py-5">
        <h1 className="my-5 text-center text-3xl font-bold text-white">
          Welcome to your Dashboard
        </h1>

        <form className="mx-auto max-w-2xl" action={handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              value={form.name ? form.name : ''}
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          {/* input for email */}
          <div className="my-2">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              value={form.email ? form.email : ''}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          {/* input forusername */}
          <div className="my-2">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              value={form.username ? form.username : ''}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          {/* input for profile picture of input type text */}
          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Picture
            </label>
            <input
              value={form.profilepic ? form.profilepic : ''}
              onChange={handleChange}
              type="text"
              name="profilepic"
              id="profilepic"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          {/* input for cover pic  */}
          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Cover Picture
            </label>
            <input
              value={form.coverpic ? form.coverpic : ''}
              onChange={handleChange}
              type="text"
              name="coverpic"
              id="coverpic"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          {/* input razorpay id */}
          <div className="my-2">
            <label
              htmlFor="razorpayid"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Razorpay Id
            </label>
            <input
              value={form.razorpayid ? form.razorpayid : ''}
              onChange={handleChange}
              type="text"
              name="razorpayid"
              id="razorpayid"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          {/* input razorpay secret */}
          <div className="my-2">
            <label
              htmlFor="razorpaysecret"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Razorpay Secret
            </label>
            <input
              value={form.razorpaysecret ? form.razorpaysecret : ''}
              onChange={handleChange}
              type="text"
              name="razorpaysecret"
              id="razorpaysecret"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          {/* Submit Button  */}
          <div className="my-6">
            <button
              type="submit"
              className="block w-full rounded-lg bg-blue-500 p-2 text-sm font-medium text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
