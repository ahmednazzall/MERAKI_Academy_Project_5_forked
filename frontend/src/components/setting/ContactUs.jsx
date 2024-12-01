import React from "react";
import { Card, Col, Row, Button, Typography } from "antd";
import { MailOutlined, PhoneOutlined, LinkedinOutlined } from "@ant-design/icons";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ContactUs = () => {
  const navigate = useNavigate()
  // Static contact information
  const contactInfo = {
    Email: {
      Serren: "sereenesam@gmail.com",
      Ahmad: "nazzall.ahmed@gmail.com",
      Abdulelah: "abdalelahaljamal@gmail.com",
    },
    LinkedIn: {
      Serren: "https://www.linkedin.com/in/sereenhanandeh/",
      Ahmad: "https://www.linkedin.com/in/ahmednazzall/",
      Abdulelah: "https://www.linkedin.com/in/abdalelahaljamal/",
    },
    Phone_Number: {
      Serren_phone: "0539457475",
      Ahmad_phone: "0798546036",
      Abdulelah_phone: "0775532898",
    },
  };

  return (
    <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh", 
        background: "linear-gradient(135deg, #e0f7fa, #81d4fa)" // Toned down light gradient background
    }}> 
     <div className="Back-Con">

<IoArrowBackOutline className="Back" onClick={()=>{
  navigate('/home')
}}/>

</div>
      <div style={{ width: "90%", padding: "30px", textAlign: "center" }}>
        <Title level={2} style={{ color: "#003366" }}>
          Contact Us
        </Title>
        <Paragraph style={{ fontSize: "18px", color: "#003366" }}>
          Get in touch with our team. Click on the icons to contact us directly.
        </Paragraph>

        <Row gutter={16} justify="center">
          {/* Contact Card for Serren */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Serren Hanandeh"
              bordered={false}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
                backgroundColor: "#ffffff", /* White card background */
              }}
            >
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a href={`mailto:${contactInfo.Email.Serren}`} style={{ color: "#1890ff" }}>
                  {contactInfo.Email.Serren}
                </a>
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <PhoneOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a href={`tel:${contactInfo.Phone_Number.Serren_phone}`} style={{ color: "#1890ff" }}>
                  {contactInfo.Phone_Number.Serren_phone}
                </a>
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <LinkedinOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a
                  href={contactInfo.LinkedIn.Serren}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1890ff" }}
                >
                  LinkedIn Profile
                </a>
              </Paragraph>
            </Card>
          </Col>

          {/* Contact Card for Ahmad */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Ahmad Nazzall"
              bordered={false}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
                backgroundColor: "#ffffff", /* White card background */
              }}
            >
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a href={`mailto:${contactInfo.Email.Ahmad}`} style={{ color: "#1890ff" }}>
                  {contactInfo.Email.Ahmad}
                </a>
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <PhoneOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a href={`tel:${contactInfo.Phone_Number.Ahmad_phone}`} style={{ color: "#1890ff" }}>
                  {contactInfo.Phone_Number.Ahmad_phone}
                </a>
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <LinkedinOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a
                  href={contactInfo.LinkedIn.Ahmad}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1890ff" }}
                >
                  LinkedIn Profile
                </a>
              </Paragraph>
            </Card>
          </Col>

          {/* Contact Card for Abdulelah */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Abdulelah Aljamal"
              bordered={false}
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
                backgroundColor: "#ffffff", /* White card background */
              }}
            >
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <MailOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a href={`mailto:${contactInfo.Email.Abdulelah}`} style={{ color: "#1890ff" }}>
                  {contactInfo.Email.Abdulelah}
                </a>
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <PhoneOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a href={`tel:${contactInfo.Phone_Number.Abdulelah_phone}`} style={{ color: "#1890ff" }}>
                  {contactInfo.Phone_Number.Abdulelah_phone}
                </a>
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", color: "#1890ff" }}>
                <LinkedinOutlined style={{ marginRight: "8px", color: "#1890ff" }} />
                <a
                  href={contactInfo.LinkedIn.Abdulelah}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1890ff" }}
                >
                  LinkedIn Profile
                </a>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
