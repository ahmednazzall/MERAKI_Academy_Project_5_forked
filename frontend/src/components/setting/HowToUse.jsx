import React from "react";

const HowToUse = () => {
  const content = {
    title: "Welcome to Our Website!",
    description: "Here's how you can make the most of our platform:",
    steps: [
      "1. **Create an Account**: Register with your email and set up a secure password.",
      "2. **Customize Your Profile**: Add a bio, profile picture, and update your general settings.",
      "3. **Privacy Controls**: Manage your privacy settings, block or unblock users, and set your profile visibility.",
      "4. **Security Settings**: Enable two-factor authentication and manage active sessions for better security.",
      "5. **Explore Features**: Use our tools to connect, share, and grow within the community.",
      "6. **Contact Support**: Reach out to us for assistance via the Help section.",
    ],
  };

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ul>
        {content.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default HowToUse;
