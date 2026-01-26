import React from "react";
import Header from "./Header";
import darshantech from "../assets/images/darshantech.png"
import { Helmet } from "react-helmet";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
     <Helmet>
        <title>About Us | DarshanTech Innovations</title>
        <meta
          name="description"
          content="Learn about DarshanTech Innovations – a leading tech education and software development company offering technical training, business solutions, and freelance services."
        />
        <meta
          name="keywords"
          content="About DarshanTech, Technical Training, Software Development, Freelance Services, LMS Development, Full-Stack Web Development"
        />
        <meta property="og:title" content="About Us | DarshanTech Innovations" />
        <meta property="og:description" content="Learn about our vision, mission, and the services we offer for learners and businesses." />
        <meta property="og:image" content={darshantech} />
        <meta property="og:url" content="https://www.darshantechinnovations.com/about" />
      </Helmet>

  
    <Helmet>
  <script type="application/ld+json">
    {`
    {
    "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DarshanTech Innovations",
      "url": "https://www.darshantechinnovations.com",
      "logo": "https://comparative-jade-vqiucb0iyi.edgeone.app/darshantech%20innovations.jpeg",
      "founder": {
        "@type": "Person",
        "name": "Darshan M",
        "jobTitle": "Founder & Full-Stack Developer",
        "image": "https://hilarious-salmon-tjpk2xg93d.edgeone.app/darshanM.png",
        "sameAs": [
          "https://www.linkedin.com/in/darshan-m-tech"
          
        ]
      },
      "sameAs": [
        "https://www.linkedin.com/company/darshantech",
        "https://www.facebook.com/darshantechinnovations"
      ]
    }
    `}
  </script>
</Helmet>

    <Header/>
    <section className="bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HERO SECTION */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            About Us – Empowering Skills, Building Software, Driving Business Growth
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to <span className="font-semibold text-indigo-600">DarshanTech Innovations</span>,
            where technology meets education and real-world software solutions.
            We specialize in technical teaching, business-focused software
            development, and freelance development services.
          </p>
        </header>

        {/* WHO WE ARE */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed max-w-4xl">
            <span className="font-semibold text-indigo-600">DarshanTech Innovations</span> is founded
            and led by <span className="font-semibold">Darshan</span>, a Full-Stack Developer,
            Technical Trainer, and Software Consultant. Our focus is on bridging
            the gap between theory and real-world application through practical
            learning and production-ready software.
          </p>
        </section>

        {/* WHAT WE DO */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">What We Do</h2>

          <div className="grid gap-8 md:grid-cols-3">

            {/* TEACHING */}
            <article className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Technical Teaching & Skill Development
              </h3>
              <p className="text-gray-600 mb-4">
                We provide step-by-step, project-based training in modern
                technical stacks, helping learners become industry-ready.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Full-Stack Web Development (MERN)</li>
                <li>HTML, CSS, JavaScript</li>
                <li>React.js & Frontend Architecture</li>
                <li>Node.js & Express</li>
                <li>MongoDB & Database Design</li>
                <li>Authentication & Security</li>
                <li>REST APIs & Integrations</li>
                <li>AI-Powered Applications</li>
                <li>LMS Development</li>
              </ul>
            </article>

            {/* BUSINESS SOLUTIONS */}
            <article className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Software Solutions for Businesses
              </h3>
              <p className="text-gray-600 mb-4">
                We design and build scalable, secure, and customized software
                solutions to help businesses grow digitally.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Custom Web Applications</li>
                <li>Business Management Systems</li>
                <li>E-Commerce Platforms</li>
                <li>SaaS Products</li>
                <li>Learning Management Systems</li>
                <li>Admin Dashboards & Analytics</li>
                <li>Secure Authentication</li>
                <li>API Integrations</li>
              </ul>
            </article>

            {/* FREELANCE */}
            <article className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                Freelance Development Services
              </h3>
              <p className="text-gray-600 mb-4">
                We offer reliable freelance development services for startups,
                entrepreneurs, and growing businesses.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Full-Stack Web Development</li>
                <li>Website Optimization</li>
                <li>Custom Feature Development</li>
                <li>Bug Fixing & Performance</li>
                <li>API Development</li>
                <li>UI/UX Implementation</li>
                <li>Technical Consulting</li>
              </ul>
            </article>

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-600">
            <li>✔ Industry-Relevant Teaching</li>
            <li>✔ Real-World Project Experience</li>
            <li>✔ Clean & Scalable Code</li>
            <li>✔ Business-Oriented Solutions</li>
            <li>✔ Transparent Communication</li>
            <li>✔ On-Time Delivery</li>
            <li>✔ Long-Term Support</li>
          </ul>
        </section>

        {/* VISION & MISSION */}
        <section className="grid md:grid-cols-2 gap-10 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted technology education and software solutions
              brand, empowering students, developers, and businesses to succeed
              in the digital era.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Teach industry-ready technical skills</li>
              <li>Build secure and scalable software</li>
              <li>Deliver affordable freelance services</li>
              <li>Make technology accessible & impactful</li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <footer className="bg-indigo-600 rounded-3xl text-center text-white p-10">
          <h2 className="text-3xl font-bold mb-4">
            Let’s Build the Future Together
          </h2>
          <p className="max-w-3xl mx-auto text-indigo-100">
            Whether you want to learn modern tech skills, build a powerful
            software product, or hire a reliable freelance developer —
            <span className="font-semibold text-white">
              {" "}DarshanTech Innovations
            </span>{" "}
            is here to help.
          </p>
        </footer>

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default AboutUs;
