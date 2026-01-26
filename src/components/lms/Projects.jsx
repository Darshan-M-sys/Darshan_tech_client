import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import LmsFooter from "./LMSFooter";

const Projects = () => {
  return (
    <>
   
  <Helmet>
    {/* Primary Meta */}
    <title>Our Projects | DarshanTech Innovations – LMS, SaaS & Web Apps</title>
    <meta
      name="description"
      content="Explore real-world projects by DarshanTech Innovations including LMS platforms, SaaS applications, business software, and full-stack web solutions. Transparency-driven development."
    />
    <meta
      name="keywords"
      content="DarshanTech Innovations projects, LMS projects, SaaS development, web application projects, MERN stack projects, software company India"
    />
    <meta name="author" content="DarshanTech Innovations" />

    {/* Mobile Friendly */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* Open Graph (Social Sharing) */}
    <meta property="og:title" content="Our Projects | DarshanTech Innovations" />
    <meta
      property="og:description"
      content="We build real, production-ready LMS, SaaS, and business software projects. No fake demos. Only real solutions."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.darshantechinnovations.tech/training/projects" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Our Projects | DarshanTech Innovations" />
    <meta
      name="twitter:description"
      content="Real-world LMS, SaaS & full-stack web development projects by DarshanTech Innovations."
    />

    {/* Canonical */}
    <link
      rel="canonical"
      href="https://www.darshantechinnovations.tech/training/projects"
    />
  </Helmet>
  <Helmet>
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DarshanTech Innovations",
      "url": "https://www.darshantechinnovations.tech",
      "founder": {
        "@type": "Person",
        "name": "Darshan M"
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
            Our Projects
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
            We are actively building innovative software solutions and real-world
            projects at{" "}
            <span className="font-semibold text-indigo-600">
              DarshanTech Innovations
            </span>
            . This page will soon showcase our work and success stories.
          </p>
        </header>

        {/* NO PROJECTS MESSAGE */}
        <section className="bg-white rounded-3xl shadow-md p-12 text-center mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Projects Coming Soon 🚀
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            We are currently working on multiple projects including web
            applications, LMS platforms, SaaS products, and business software
            solutions. Once completed, all projects will be displayed here with
            detailed case studies.
          </p>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Transparency matters to us. Instead of displaying sample or fake
            projects, we prefer to showcase only real, production-ready work.
          </p>
        </section>

        {/* WHAT WE ARE WORKING ON */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            What We Are Working On
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Learning Management Systems (LMS)
              </h3>
              <p className="text-gray-600">
                Scalable LMS platforms with role-based access, course management,
                quizzes, and analytics.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Business Web Applications
              </h3>
              <p className="text-gray-600">
                Custom web applications designed to automate business workflows
                and improve operational efficiency.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                SaaS Platforms
              </h3>
              <p className="text-gray-600">
                Cloud-ready SaaS products built with scalability, security, and
                performance in mind.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Full-Stack Web Solutions
              </h3>
              <p className="text-gray-600">
                End-to-end solutions using modern stacks like MERN for real-world
                applications.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Educational & Training Projects
              </h3>
              <p className="text-gray-600">
                Hands-on training projects developed for students and learners
                to gain real industry experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Freelance Client Work
              </h3>
              <p className="text-gray-600">
                Custom development work for clients across different domains,
                following professional standards and best practices.
              </p>
            </div>

          </div>
        </section>

        {/* TRUST MESSAGE */}
        <section className="bg-indigo-50 rounded-3xl p-12 text-center mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why We Choose Transparency
          </h2>
          <p className="text-gray-700 max-w-4xl mx-auto">
            We believe trust is built on honesty. Rather than displaying demo or
            copied projects, we wait until real solutions are completed and
            delivered to clients. This ensures authenticity, credibility, and
            long-term relationships.
          </p>
        </section>

        {/* CTA */}
        <footer className="bg-indigo-600 rounded-3xl text-center text-white p-12">
          <h2 className="text-3xl font-bold mb-4">
            Want to Be Our First Case Study?
          </h2>
          <p className="max-w-3xl mx-auto text-indigo-100 mb-6">
            If you have an idea or project in mind, let’s build it together and
            showcase it here as a real success story.
          </p>
          <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
            Start a Project
          </button>
        </footer>

      </div>
    </section>
    <LmsFooter/>
    </>
  );
};

export default Projects;
