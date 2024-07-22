import React, { useState } from "react";
import axios from "axios";
import { useAlert, Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useNavigate } from "react-router-dom";
import "./styles/styles.css";

// Styled components
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const FormContainer = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 100px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const GuideButton = styled(Button)`
  margin-left: 10px;
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const AdminButton = styled(Button)`
  margin-top: 10px;
  background-color: #17a2b8;

  &:hover {
    background-color: #138496;
  }
`;

const AnimatedFormContainer = animated(FormContainer);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const alert = useAlert();
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert.info("Please wait while we submit your form...");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      console.log("Form submitted successfully", response.data);
      alert.success("Form submitted successfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      }); // Clear form after submission
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert.error("There was an error submitting the form!");
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -50px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  });

  const startGuide = () => {
    const driverObj = driver({
      overlayColor: "blue",
      overlayOpacity: 0.4,
      showProgress: true,
      steps: [
        {
          element: ".form-container",
          popover: {
            title: "Fill the Form",
            description: `Don't worry, I will help you fill the form.`,
            position: "bottom",
            style: {
              backgroundColor: "yellow",
              color: "black",
            },
          },
        },
        {
          element: ".form-group-name",
          popover: {
            title: "Name",
            description: "Enter your name.",
            position: "bottom",
            style: {
              backgroundColor: "yellow",
              color: "black",
            },
          },
        },
        {
          element: ".form-group-email",
          popover: {
            title: "Email",
            description: "Enter your email address.",
            position: "bottom",
            style: {
              backgroundColor: "yellow",
              color: "black",
            },
          },
        },
        {
          element: ".form-group-message",
          popover: {
            title: "Message",
            description: "Enter your message.",
            position: "bottom",
            style: {
              backgroundColor: "yellow",
              color: "black",
            },
          },
        },
        {
          element: ".submit-button",
          popover: {
            title: "Submit",
            description: "Click here to submit your form.",
            position: "bottom",
            style: {
              backgroundColor: "yellow",
              color: "black",
            },
          },
        },
      ],
    });
    driverObj.drive();
  };

  return (
    <Container>
      <AnimatedFormContainer className="form-container" style={formAnimation}>
        <center><h1>Contact Form</h1></center>
        <form onSubmit={handleSubmit}>
          <FormGroup className="form-group-name">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="form-group-email">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="form-group-message">
            <Label htmlFor="message">Message</Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></Textarea>
          </FormGroup>
          <Button type="submit" style={{ backgroundColor: "yellow", color: "black", fontWeight: "bolder" }} className="submit-button">
            Submit
          </Button>
          <GuideButton type="button" onClick={startGuide}>
            Guide Me
          </GuideButton>
          <AdminButton type="button" onClick={() => navigate('/admin')}>
            Go to Admin Page
          </AdminButton>
        </form>
      </AnimatedFormContainer>
    </Container>
  );
};

const AlertProviderWrapper = ({ children }) => {
  const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: "30px",
    transition: transitions.SCALE,
  };

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      {children}
    </AlertProvider>
  );
};

const ContactFormWithAlert = () => (
  <AlertProviderWrapper>
    <ContactForm />
  </AlertProviderWrapper>
);

export default ContactFormWithAlert;
