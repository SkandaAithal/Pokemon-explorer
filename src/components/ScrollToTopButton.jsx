import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  //! State to manage the visibility of the button
  const [isVisible, setIsVisible] = useState(false);

  //! Event handler to determine visibility based on scroll position
  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 100); //^ Button becomes visible when scrolling down more than 100 pixels
  };

  // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  //! Effect to add and remove scroll event listener to avoid continous clicks of button and unpredictable scrolling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Runs once on component mount to set up the event listener

  return (
    <ButtonContainer onClick={scrollToTop} $isVisible={isVisible}>
      <FaArrowUp />
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #1900ff;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  transition: background-color 0.3s;

  &:hover {
    background-color: #02154c;
  }
`;

export default ScrollToTopButton;
