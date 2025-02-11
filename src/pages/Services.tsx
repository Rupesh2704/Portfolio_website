import React from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaLaptopCode, FaUserTie, FaFolderOpen } from 'react-icons/fa';

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}

const ServicesContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 40px;
  }
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.cardBackground}, ${theme.background})`};
  border-radius: 20px;
  padding: 35px 25px;
  box-shadow: 0 10px 30px ${({ theme }) => theme.shadowColor}22;
  transition: all 0.4s ease-in-out;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.shadowColor}33;
    background: ${({ theme }) => `linear-gradient(145deg, ${theme.cardBackground}, ${theme.primary}11)`};
    border-color: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
    
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  width: 90px;
  border-radius: 50%;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.iconBackground}55, ${theme.iconBackground}22)`};
  margin: 0 auto 25px;
  transition: all 0.4s ease;
  border: 2px solid ${({ theme }) => `${theme.primary}22`};

  ${ServiceCard}:hover & {
    transform: scale(1.1) rotate(5deg);
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.cardBackground};
    border-color: transparent;
  }

  @media (max-width: 768px) {
    height: 70px;
    width: 70px;
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
`;

const ServiceTitle = styled.h3`
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 20px;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const ServiceDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 25px;
  line-height: 1.7;
  text-align: center;
  font-size: 1.05rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const Price = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const BookButton = styled.a`
  display: block;
  width: fit-content;
  margin: 0 auto;
  padding: 14px 32px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    background: #ff6b6b;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 1rem;
  }
`;

const PageTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  letter-spacing: 1px;
  
  &:after {
    content: '';
    display: block;
    width: 60%;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    margin: 15px auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    
    &:after {
      width: 80%;
      height: 3px;
      margin: 10px auto 0;
    }
  }
`;

const services: ServiceCardProps[] = [
  {
    title: "ATS-Friendly Resume Optimization",
    description: "Improve your resume's visibility and success rate with ATS systems. Get expert optimization to ensure your resume reaches human recruiters.",
    price: "₹149",
    icon: <FaFileAlt />
  },
  {
    title: "Portfolio Review & Suggestions",
    description: "Receive detailed feedback and actionable suggestions to enhance your portfolio and make it stand out to potential employers.",
    price: "₹99",
    icon: <FaFolderOpen />
  },
  {
    title: "Mock Interviews",
    description: "Practice technical interviews with experienced professionals. Get real-time feedback and improve your interview skills.",
    price: "₹299",
    icon: <FaUserTie />
  },
  {
    title: "HR Mails",
    description: "Get top company HR mails for your job applications.",
    price: "₹99",
    icon: <FaFileAlt />
  },
  {
    title: "Custom Website Development",
    description: "Get a fully responsive and dynamic website built to your specifications. Modern design principles and optimal performance guaranteed.",
    price: "₹1299",
    icon: <FaLaptopCode />
  }
];

const Services: React.FC = () => {
  return (
    <ServicesContainer>
      <PageTitle>Our Services</PageTitle>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <IconWrapper>
              {service.icon}
            </IconWrapper>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <Price>{service.price}</Price>
            <BookButton href="#contact">Book Now</BookButton>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

export default Services; 