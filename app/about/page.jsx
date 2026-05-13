import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-8 py-8 md:px-4">
      <h1 className="mb-4 text-3xl font-semibold">About Get Me a Chai</h1>
      <p className="mb-6 text-lg">
        Get Me a Chai is a crowdfunding platform designed for creators to fund
        their projects with the support of their fans. It&apos;s a space where
        your fans can directly contribute to your creative endeavors by buying
        you a chai. Unlock the potential of your fanbase and bring your projects
        to life.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">How It Works</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div className="mb-6 flex items-center">
          <img
            className="mr-4 h-20 w-20 rounded-full"
            src="/group.gif"
            alt="Fans Want to Collaborate"
          />
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              Fans Want to Collaborate
            </h3>
            <p>
              Your fans are enthusiastic about collaborating with you on your
              projects.
            </p>
          </div>
        </div>
        <div className="mb-6 flex items-center">
          <img
            className="mr-4 h-20 w-20 rounded-full"
            src="/coin.gif"
            alt="Support Through Chai"
          />
          <div>
            <h3 className="mb-2 text-xl font-semibold">Support Through Chai</h3>
            <p>
              Receive support from your fans in the form of chai purchases,
              directly contributing to your project funding.
            </p>
          </div>
        </div>
        {/* Add more steps as needed */}
      </div>

      <h2 className="mb-4 text-2xl font-semibold">Benefits for Creators</h2>
      <ul className="mb-6 list-disc pl-6">
        <li className="mb-2">Direct financial support from your fanbase</li>
        <li className="mb-2">Engage with your fans on a more personal level</li>
        <li className="mb-2">
          Access to a platform tailored for creative projects
        </li>
        {/* Add more benefits */}
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Benefits for Fans</h2>
      <ul className="mb-6 list-disc pl-6">
        <li className="mb-2">
          Directly contribute to the success of your favorite creators
        </li>
        <li className="mb-2">
          Exclusive rewards and perks for supporting creators
        </li>
        <li className="mb-2">
          Be part of the creative process and connect with creators
        </li>
        {/* Add more benefits */}
      </ul>

      {/* Additional sections */}
      <h2 className="mb-4 text-2xl font-semibold">Benefits of Collaboration</h2>
      <ul className="mb-6 list-disc pl-6">
        <li className="mb-2">
          Unlock new opportunities through collaboration with fellow creators
        </li>
        <li className="mb-2">Expand your network and reach a wider audience</li>
        <li className="mb-2">
          Combine skills and resources to create innovative projects
        </li>
        {/* Add more benefits */}
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Community Engagement</h2>
      <ul className="mb-6 list-disc pl-6">
        <li className="mb-2">
          Interact with a supportive community of like-minded individuals
        </li>
        <li className="mb-2">
          Receive valuable feedback and encouragement from peers
        </li>
        <li className="mb-2">
          Participate in discussions and events centered around your interests
        </li>
        {/* Add more benefits */}
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Access to Resources</h2>
      <ul className="mb-6 list-disc pl-6">
        <li className="mb-2">
          Gain access to resources such as tutorials, templates, and tools
        </li>
        <li className="mb-2">
          Receive guidance and mentorship from experienced creators
        </li>
        <li className="mb-2">
          Stay updated on industry trends and best practices
        </li>
        {/* Add more benefits */}
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Recognition and Exposure</h2>
      <ul className="mb-6 list-disc pl-6">
        <li className="mb-2">
          Showcase your work to a global audience and gain recognition
        </li>
        <li className="mb-2">Feature in promotional materials and campaigns</li>
        <li className="mb-2">
          Build your portfolio and increase your credibility as a creator
        </li>
        {/* Add more benefits */}
      </ul>

      <h2 className="mb-4 text-2xl font-semibold">Supportive Community</h2>
      <ul className="mb-6 list-disc pl-6">
        <li className="mb-2">
          Join a community that values creativity, diversity, and inclusivity
        </li>
        <li className="mb-2">
          Find encouragement and inspiration from fellow members
        </li>
        <li className="mb-2">
          Collaborate on projects and share resources for mutual growth
        </li>
        {/* Add more benefits */}
      </ul>
    </div>
  );
};

export default About;

export const metadata = {
  title: 'About - get me a chai',
};
