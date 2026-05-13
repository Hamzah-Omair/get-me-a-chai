'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from 'next-auth/react';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

const PaymentPage = ({ username }) => {
  const [paymentform, setpaymentform] = useState({
    name: '',
    message: '',
    amount: '',
  });
  const [currentUser, setcurrentUser] = useState();
  const [payments, setpayments] = useState([]);
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get('paymentdone') == 'true') {
      toast('Thanks for your donation!', {
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
      router.push(`/${username}`);
    }
  }, [searchParams, router, username]);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  // fetch information from mongoDB to display on the page like in the suppoters sesction
  const getData = async () => {
    //fetches user information to display on the page
    let u = await fetchuser(username);
    setcurrentUser(u);
    //fetches payments information to display on the page
    let dbpayments = await fetchpayments(username);
    setpayments(dbpayments);
  };

  //does the main work of sending info to backend and to razorpay for payment
  const pay = async (amount) => {
    //sends a request to backend to create an order and store it by default done is no
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid,
      amount: amount,
      currency: 'INR',
      name: 'Get Me A Chai',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: orderId,
      // tells razor pay where to send the receipt after payment is done
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    //handing over the required information to razorpay sdk to open the payment window
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="cover relative w-full">
        <img
          width={100}
          height={100}
          className="h-96 w-full object-cover"
          src={currentUser?.coverpic || 'cover.jpg'}
          alt=""
        />
        <div className="absolute right-[36%] -bottom-15 size-32 overflow-hidden rounded-full border-2 border-white md:right-[46%]">
          <img
            className="size-32 rounded-full object-cover"
            width={128}
            height={128}
            src={currentUser?.profilepic || 'avatar.jpg'}
            alt="img"
          />
        </div>
      </div>

      <div className="info my-17 flex flex-col items-center justify-center gap-2 text-gray-300">
        <div className="text-lg font-bold">@{username}</div>

        <div className="text-center text-sm text-gray-300">
          Lets help {username} to get a chai by donating and sharing this page
          with your friends.
        </div>

        <div className="text-center text-xs text-gray-300">
          {payments.length} People have donated ₹
          {payments.reduce((total, p) => total + p.amount, 0)} so far.
        </div>

        <div className="payment my-5 flex w-4/5 flex-col gap-3 md:flex-row">
          {/* showing list of suppoters as a leader board */}
          <div className="suppoters w-full rounded-lg bg-slate-900 p-10 text-white md:w-1/2">
            <h2 className="my-5 text-center text-3xl font-bold">
              TOP 10 SUPPOTERS
            </h2>
            <ul>
              {payments.length === 0 && (
                <li className="my-2">No payments yet.</li>
              )}
              {payments.map((p, i) => {
                return (
                  <li key={p._id} className="my-2 flex items-center gap-2">
                    <img width={40} src="avatar.gif" alt="User avatar" />
                    <span>
                      {p.name} donated{' '}
                      <span className="font-bold">₹{p.amount}</span> with a
                      message &quot;{p.message}&quot;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="makePayments w-full rounded-lg bg-slate-900 p-10 text-white md:w-1/2">
            <h2 className="my-5 text-center text-2xl font-bold">
              Make a Payment
            </h2>

            <div className="flex flex-col gap-5">
              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                className="rounded-lg bg-gray-800 p-3 text-white"
                placeholder="Enter Name"
                type="text"
              />
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                className="rounded-lg bg-gray-800 p-3 text-white"
                placeholder="Enter Message"
                type="text"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                className="rounded-lg bg-gray-800 p-3 text-white"
                placeholder="Enter Amount"
                type="number"
              />
              <button
                onClick={() => {
                  pay(paymentform.amount * 100);
                }}
                className="rounded-full bg-slate-600 p-3 text-white hover:bg-slate-700 disabled:bg-slate-200"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4
                }
              >
                Make Payment
              </button>
            </div>

            <h2 className="my-5 text-center text-2xl font-bold">
              Or choose from these amounts
            </h2>

            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                className="rounded-lg bg-slate-800 p-3 text-white hover:bg-slate-900"
                onClick={() => {
                  pay(500);
                }}
              >
                ₹5
              </button>

              <button
                className="rounded-lg bg-slate-800 p-3 text-white hover:bg-slate-900"
                onClick={() => {
                  pay(1000);
                }}
              >
                ₹10
              </button>

              <button
                className="rounded-lg bg-slate-800 p-3 text-white hover:bg-slate-900"
                onClick={() => {
                  pay(2000);
                }}
              >
                ₹20
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
