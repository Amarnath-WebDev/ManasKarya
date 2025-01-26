import React from "react";

const ContactUs = () => {
  return (
    <div className="font-sans bg-gray-100 p-8 rounded-lg shadow-lg text-gray-800">
      <h2 className="text-4xl font-extrabold text-gray-900">Contact Us</h2>

      <p className="mt-4 text-lg leading-relaxed">
        We would love to hear from you! If you have any questions, suggestions, or feedback, please feel free to get in touch with us.
      </p>

      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            rows="5"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>

      <p className="mt-6 text-center text-gray-700">
        Alternatively, you can reach us at <span className="font-bold">contact@manaskarya.com</span>
      </p>
    </div>
  );
};

export default ContactUs;
