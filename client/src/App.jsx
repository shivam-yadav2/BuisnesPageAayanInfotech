import React, { useEffect, useState } from "react";
import NavBar from "./Sections/NavBar";
import About from "./Sections/About";
import Services from "./Sections/Services";
import Testimonial from "./Sections/Testimonial";
import ContactForm from "./Sections/ContactForm";
import Footer from "./Sections/Footer";
import Hero from "./Sections/Hero";
import "./App.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [Sliders, setSliders] = useState();
  const getSlider = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://aayan.samadhaangroups.co.in/api/v1/slider/get-slider",
      };
      const response = await axios.request(config);
      console.log(response);
      setSliders(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch sliders");
      console.log(error);
    }
  };

  const [about, setAbout] = useState();

  const getAbout = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://aayan.samadhaangroups.co.in/api/v1/about/get-about",
      };
      const response = await axios.request(config);
      console.log(response);
      setAbout(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch sliders");
      console.log(error);
    }
  };

  const [services, setServices] = useState();
  const getServices = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://aayan.samadhaangroups.co.in/api/v1/service/get-services",
      };
      const response = await axios.request(config);
      console.log(response);
      setServices(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch services");
      console.log(error);
    }
  };

  const [testimonial, setTestimonial] = useState();

  const getTestimonial = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://aayan.samadhaangroups.co.in/api/v1/testimonial/get-testimonial",
      };
      const response = await axios.request(config);
      console.log(response);
      setTestimonial(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
      console.log(error);
    }
  };

  useEffect(() => {
    getSlider();
    getAbout();
    getServices();
    getTestimonial();
  }, []);

  return (
    <div className=" h-full">
      <Toaster />
      <NavBar />
      <Hero data={Sliders} />
      <About data={about} />
      <Services data={services} />
      <Testimonial data={testimonial} />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default App;
