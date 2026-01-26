import React from "react";
import { Helmet } from "react-helmet";
import Home from "./Home";

const LMS = () => {
  
  return (
    <>
      <Helmet>
        {/* BASIC SEO */}
        <title>LMS Platform | DarshanTech Innovations</title>
        <meta
          name="description"
          content="DarshanTech Innovations LMS is a modern learning management system offering live classes, courses, assessments, progress tracking, and mentor-led training."
        />
        <meta
          name="keywords"
          content="LMS Platform, Learning Management System, Online Courses, Live Classes, EdTech, Technical Training, DarshanTech Innovations"
        />
        <meta name="author" content="Darshan M" />
        <link
          rel="canonical"
          href="https://www.darshantechinnovations.tech/training"
        />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="LMS Platform | DarshanTech Innovations" />
        <meta
          property="og:description"
          content="A modern LMS platform with live classes, mentor support, and industry-ready technical training."
        />
        <meta
          property="og:image"
          content="https://comparative-jade-vqiucb0iyi.edgeone.app/darshantech%20innovations.jpeg"
        />
        <meta
          property="og:url"
          content="https://www.darshantechinnovations.tech/training"
        />
        <meta property="og:type" content="website" />

        {/* STRUCTURED DATA – LMS */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "DarshanTech LMS",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "provider": {
              "@type": "Organization",
              "name": "DarshanTech Innovations",
              "url": "https://www.darshantechinnovations.tech",
              "founder": {
                "@type": "Person",
                "name": "Darshan M"
              }
            },
            "description": "A learning management system offering live classes, courses, progress tracking, assessments, and mentor-led training."
          }
          `}
        </script>
      </Helmet>

      {/* LMS HOME CONTENT */}
      <Home />
    </>
  );
};

export default LMS;
