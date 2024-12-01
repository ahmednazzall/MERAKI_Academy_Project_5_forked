import React from "react";
import { Card, List, Typography } from "antd";
import "./HowToUse.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const HowToUse = () => {
  const navigate = useNavigate()
  const content = {
    title: "Welcome to Our Platform!",
    description: "Follow these steps to get started and maximize your experience:",
    steps: [
      "Create an Account: Register with your email and set up a secure password.",
      "Customize Your Profile: Add a bio, profile picture, and update your settings.",
      "Privacy Controls: Adjust privacy settings to suit your needs.",
      "Security Settings: Enable two-factor authentication for enhanced security.",
      "Explore Features: Discover tools to connect, share, and grow.",
      "Contact Support: Get assistance anytime through the Help section.",
    ],
  };

  return (
    <div className="how-to-use-container">
      <div className="Back-Div">

      <IoArrowBackOutline className="Back" onClick={()=>{
        navigate('/home')
      }}/>

      </div>
      <Card className="how-to-use-card">
        <Title level={2} className="how-to-use-title">
          {content.title}
        </Title>
        <Paragraph className="how-to-use-description">
          {content.description}
        </Paragraph>
        <List
          className="how-to-use-steps"
          dataSource={content.steps}
          renderItem={(step, index) => (
            <List.Item className="how-to-use-step-item">
              <div className="step-container">
                <div className="step-number">{index + 1}</div>
                <Typography.Text>{step}</Typography.Text>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default HowToUse;
