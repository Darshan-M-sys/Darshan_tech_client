import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./Footer";

const Services = () => {
  return (
    <>
      <Helmet>
        {/* BASIC SEO */}
        <title>Services | DarshanTech Innovations</title>
        <meta
          name="description"
          content="DarshanTech Innovations offers technical training, LMS platforms, custom software development, freelance services, and IT consulting for businesses and learners."
        />
        <meta
          name="keywords"
          content="DarshanTech Innovations Services, Software Development, LMS Platform, Tech Training, Freelance Developer, IT Consulting"
        />
        <meta name="author" content="Darshan M" />
        <link
          rel="canonical"
          href="https://www.darshantechinnovations.com/services"
        />

        {/* OPEN GRAPH */}
        <meta property="og:title" content="Services | DarshanTech Innovations" />
        <meta
          property="og:description"
          content="Explore our services including technical training, LMS platforms, freelance development, and custom software solutions."
        />
        <meta
          property="og:image"
          content="https://comparative-jade-vqiucb0iyi.edgeone.app/darshantech%20innovations.jpeg"
        />
        <meta
          property="og:url"
          content="https://www.darshantechinnovations.com/services"
        />
        <meta property="og:type" content="website" />

        {/* STRUCTURED DATA – SERVICES */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DarshanTech Innovations",
            "url": "https://www.darshantechinnovations.com",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Technical Training",
                    "description": "Hands-on technical training programs for students and professionals."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "LMS Platform Development",
                    "description": "Custom learning management systems with live classes and progress tracking."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Custom Software Development",
                    "description": "Scalable software solutions tailored to business needs."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Freelance Web Development",
                    "description": "Frontend and full-stack freelance development services."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "IT Consulting",
                    "description": "Technical consulting and system architecture guidance."
                  }
                }
              ]
            }
          }
          `}
        </script>
      </Helmet>

    <Header/>
    <section className="bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HERO */}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Services
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            At <span className="font-semibold text-indigo-600">DarshanTech Innovations</span>,
            we provide end-to-end technical education, software solutions, and
            professional freelance development services to help individuals and
            businesses grow.
          </p>
        </header>

        {/* SERVICES GRID */}
        <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-24">

          {/* TECH TRAINING */}
          <article className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Technical Training & Education
            </h2>
            <p className="text-gray-600 mb-4">
              Industry-focused, practical training designed to make learners
              job-ready with real-world project experience.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Full-Stack Web Development (MERN)</li>
              <li>Frontend Development (HTML, CSS, JS, React)</li>
              <li>Backend Development (Node, Express)</li>
              <li>Database Design (MongoDB)</li>
              <li>Authentication & Web Security</li>
              <li>AI-Powered Web Applications</li>
              <li>LMS & Project-Based Learning</li>
            </ul>
          </article>

          {/* SOFTWARE DEVELOPMENT */}
          <article className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Custom Software Development
            </h2>
            <p className="text-gray-600 mb-4">
              We build scalable, secure, and customized software solutions
              tailored to your business needs.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Custom Web Applications</li>
              <li>SaaS Product Development</li>
              <li>E-Commerce Platforms</li>
              <li>Business Automation Systems</li>
              <li>Admin Panels & Dashboards</li>
              <li>API Development & Integrations</li>
              <li>Secure Authentication Systems</li>
            </ul>
          </article>

          {/* FREELANCE */}
          <article className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Freelance Development Services
            </h2>
            <p className="text-gray-600 mb-4">
              Professional freelance services for startups, entrepreneurs,
              institutions, and growing businesses.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Full-Stack Web Development</li>
              <li>Website Design & Optimization</li>
              <li>Custom Feature Development</li>
              <li>Bug Fixing & Performance Tuning</li>
              <li>API & Third-Party Integrations</li>
              <li>UI/UX Implementation</li>
              <li>Technical Consulting</li>
            </ul>
          </article>

          {/* LMS DEVELOPMENT */}
          <article className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              LMS & EdTech Solutions
            </h2>
            <p className="text-gray-600 mb-4">
              Complete Learning Management System development for educators,
              institutes, and online platforms.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Student & Teacher Dashboards</li>
              <li>Course & Content Management</li>
              <li>Live Classes & Video Integration</li>
              <li>Assignments & Quiz Systems</li>
              <li>Secure Authentication</li>
              <li>Progress Tracking & Analytics</li>
            </ul>
          </article>

          {/* CONSULTING */}
          <article className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Technical Consulting
            </h2>
            <p className="text-gray-600 mb-4">
              Expert guidance to help you choose the right technologies and
              architecture for your project.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Project Planning & Architecture</li>
              <li>Technology Stack Selection</li>
              <li>Code Review & Optimization</li>
              <li>Security & Performance Audits</li>
              <li>Scalability Planning</li>
            </ul>
          </article>

          {/* SUPPORT */}
          <article className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Maintenance & Support
            </h2>
            <p className="text-gray-600 mb-4">
              Ongoing support and maintenance to keep your software secure,
              updated, and running smoothly.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Bug Fixes & Updates</li>
              <li>Performance Monitoring</li>
              <li>Security Patches</li>
              <li>Feature Enhancements</li>
              <li>Long-Term Technical Support</li>
            </ul>
          </article>

        </section>

        {/* CTA */}
        <footer className="bg-indigo-600 rounded-3xl text-center text-white p-12">
          <h2 className="text-3xl font-bold mb-4">
            Need a Service? Let’s Talk
          </h2>
          <p className="max-w-3xl mx-auto text-indigo-100 mb-6">
            Whether you need technical training, software development, or a
            reliable freelance developer, we are ready to help you achieve your
            goals.
          </p>
          <Link to="/contactUs" className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
            Contact Us
          </Link>
        </footer>

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Services;
