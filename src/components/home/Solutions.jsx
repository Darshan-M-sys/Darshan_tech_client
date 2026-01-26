import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Solutions = () => {
  return (
    <>
    <Header/>
    <section className="bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HERO */}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Our Solutions
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
            At <span className="font-semibold text-indigo-600">DarshanTech Innovations</span>,
            we deliver reliable, scalable, and future-ready technology solutions
            designed to earn your trust and drive long-term success.
          </p>
        </header>

        {/* TRUST POINTS */}
        <section className="grid md:grid-cols-3 gap-10 mb-24">
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">
              Client-Centric Approach
            </h3>
            <p className="text-gray-600">
              We listen first. Every solution is carefully designed based on your
              business goals, challenges, and long-term vision.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">
              Secure & Scalable Systems
            </h3>
            <p className="text-gray-600">
              Our solutions are built with security, performance, and scalability
              in mind—ensuring your software grows with your business.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">
              Proven Technical Expertise
            </h3>
            <p className="text-gray-600">
              With hands-on experience in modern stacks and real-world projects,
              we deliver solutions that work in production—not just on paper.
            </p>
          </div>
        </section>

        {/* SOLUTION TYPES */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Solutions We Deliver
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Business Software Solutions
              </h3>
              <p className="text-gray-600 mb-4">
                Custom-built applications that streamline operations, improve
                efficiency, and enable data-driven decisions.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Business Management Systems</li>
                <li>Admin Dashboards & Analytics</li>
                <li>Process Automation Tools</li>
                <li>Secure Authentication Systems</li>
                <li>API-Based Integrations</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Web & SaaS Solutions
              </h3>
              <p className="text-gray-600 mb-4">
                High-performance web and SaaS platforms designed for scalability,
                reliability, and user experience.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Custom Web Applications</li>
                <li>SaaS Product Development</li>
                <li>E-Commerce Platforms</li>
                <li>Role-Based Access Systems</li>
                <li>Cloud-Ready Architecture</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                LMS & EdTech Solutions
              </h3>
              <p className="text-gray-600 mb-4">
                End-to-end learning platforms that deliver seamless digital
                education experiences.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Learning Management Systems</li>
                <li>Course & Content Management</li>
                <li>Live Classes & Assessments</li>
                <li>Progress Tracking & Analytics</li>
                <li>Student & Teacher Dashboards</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Technical Training Solutions
              </h3>
              <p className="text-gray-600 mb-4">
                Practical, real-world training programs that create confident,
                job-ready developers.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Full-Stack Development Training</li>
                <li>Project-Based Learning</li>
                <li>Industry-Oriented Curriculum</li>
                <li>Mentorship & Career Guidance</li>
                <li>Hands-On Real Projects</li>
              </ul>
            </div>

          </div>
        </section>

        {/* WHY TRUST US */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Why Clients Trust Us
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Transparent Communication
              </h3>
              <p className="text-gray-700">
                We maintain clear communication throughout the project lifecycle,
                ensuring no surprises and full clarity.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Quality-Driven Development
              </h3>
              <p className="text-gray-700">
                Clean code, best practices, testing, and documentation are part
                of every solution we deliver.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                On-Time Delivery
              </h3>
              <p className="text-gray-700">
                We respect your time and consistently deliver projects within
                agreed timelines.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                Long-Term Support
              </h3>
              <p className="text-gray-700">
                Our relationship doesn’t end at delivery—we provide ongoing
                support and improvements.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <footer className="bg-indigo-600 rounded-3xl text-center text-white p-12">
          <h2 className="text-3xl font-bold mb-4">
            Let’s Build Reliable Solutions Together
          </h2>
          <p className="max-w-3xl mx-auto text-indigo-100 mb-6">
            Partner with DarshanTech Innovations for technology solutions you can
            trust—designed for growth, performance, and long-term success.
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

export default Solutions;
