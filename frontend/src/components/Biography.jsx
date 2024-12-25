import React from "react";

const Biography = ({imageUrl}) => {
return (
<>
  <div className="container biography">
    <div className="banner">
      <img src={imageUrl} alt="whoweare" />
    </div>
    <div className="banner">
      <p>Biography</p>
      <h3>Who We Are</h3>
      <p>
        At Rohith HealthCare, we are committed to delivering exceptional healthcare solutions that prioritize patient
        well-being, accessibility, and innovation. Our dedicated team of healthcare professionals and technology experts
        work together to provide personalized care, advanced medical services, and seamless experiences for every
        patient.

        With a focus on quality and compassion, we strive to enhance the healthcare journey by offering comprehensive
        services, from preventive care to complex treatments. Our goal is to ensure that everyone has access to the
        highest standards of medical care, no matter where they are.

        Driven by our passion for better healthcare, we continuously invest in cutting-edge technologies and collaborate
        with leading medical institutions to bring the best practices and innovations to our patients. We are here to
        help you live a healthier, happier life.
      </p>
      <p>We are all in 2024!</p>
      <p>We are working on a <b>MERN STACK PROJECT.</b></p>
    </div>
  </div>
</>
);
};

export default Biography;