import React from "react";

const AboutUs = () => {
  return (
    <div className="font-sans h-screen bg-gray-100 p-8 rounded-lg shadow-lg text-gray-800">
      <h2 className="text-4xl font-extrabold text-gray-900">About Us!</h2>

      <h2 className="text-3xl font-bold text-center mt-6 text-blue-600">
        Welcome To ManasKarya
      </h2>

      <p className="mt-6 text-lg leading-relaxed">
        <span className="font-bold text-blue-600">ManasKarya</span> is a Professional <span className="font-bold">todo list</span> Platform. Here we will only provide you with interesting content that you will enjoy very much. We are committed to providing you the best of <span className="font-bold">todo list</span>, with a focus on reliability and <span className="italic">its a todo list you can track the work</span>. We strive to turn our passion for <span className="font-bold">todo list</span> into a thriving website. We hope you enjoy our <span className="font-bold">todo list</span> as much as we enjoy giving them to you.
      </p>

      <p className="mt-6 text-lg leading-relaxed">
        I will keep on posting such valuable and knowledgeable information on my website for all of you. Your love and support matter a lot.
      </p>

      <p className="font-bold text-center mt-8 text-gray-900">
        Thank you For Visiting Our Site
        <br /><br />
        <span className="text-blue-600 text-xl">Have a great day!</span>
      </p>
    </div>
  );
};

export default AboutUs;
