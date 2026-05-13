'use server';
import Razorpay from 'razorpay';
import Payments from '@/models/Payments';
import connectDb from '@/db/connectDb';
import User from '@/models/User';

//front end passes the amount and the info is passed through here
export const initiate = async (amount, to_username, paymentform) => {
  await connectDb();

  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;

  //create a new razor pay instance to create an order and get the order id
  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  //creates an option object converting the amount entered by the user into an integer
  let options = {
    amount: Number.parseInt(amount),
    currency: 'INR',
  };

  //incatance refers to razorpay server
  // await instance.orders.create(options) creates an order on the razorpay server waits for a response and stores the response in x which contains information provided by razor pay
  let x = await instance.orders.create(options);

  //all the infomation razorpay provided in x is being stored in my database by default ther is an additional field for payment confomation which is set to false
  await Payments.create({
    oid: x.id, //xid is the order id provided by razorpay
    amount: amount / 100, //amount entered by the user
    to_user: to_username, //username is the name(email in this case) of the user reciving the payment
    name: paymentform.name, //name that is entered by the user in the form the one making the payment
    message: paymentform.message, // the payment message the user entered in the form
  });
  return x;
};

//finds a specific user from the database and returns it so that it can be given to the frontend when this function is called
export const fetchuser = async (username) => {
  await connectDb();
  let u = await User.findOne({ username: username }).lean();
  if (!u) return {};
  let user = { ...u, _id: u._id.toString() };
  return user;
};

//used to generate the learderboard ont the frontend
export const fetchpayments = async (username) => {
  await connectDb();
  // finds all the payments that are made to the specific user by the payees(other user) and sorts them in decreasing order of the amount and limits the result to 10

  let p = await Payments.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();
  //return the payment after converting id and data to like createdat and updated at to string
  return p.map((payment) => ({
    ...payment,
    _id: payment._id.toString(),
    createdAt: payment.createdAt?.toISOString(),
    updatedAt: payment.updatedAt?.toISOString(),
  }));
};
export const updateProfile = async (data, oldusername) => {
  await connectDb();
  let ndata = Object.fromEntries(data);

  // If the username is being updated, check if username is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: 'Username already exists' };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    // Now update all the usernames in the Payments table
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};
