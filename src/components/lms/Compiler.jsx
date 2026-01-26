import React from "react";
import OnlineCompiler from "./OnlineCompilers";
import Header from "./Header";
import LmsFooter from "./LMSFooter";

const Compiler = () => {
  return (
    <>
    <Header/>
    <section className="bg-gray-50 text-gray-800">
      <div className="max-w-7xl lg:mx-auto lg:px-6 py-16">

        {/* HERO SECTION */}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Online Code Compiler
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
            Practice, learn, and execute code directly in your browser with the{" "}
            <span className="font-semibold text-indigo-600">
              DarshanTech Innovations Compiler
            </span>
            . Built for students, developers, and professionals.
          </p>
        </header>

        {/* COMPILER PREVIEW */}
        <section className="bg-white rounded-3xl shadow-md p-10 mb-24">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Interactive Coding Environment
            </h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              This compiler allows you to write, run, and test code without
              installing any software. Perfect for hands-on learning and quick
              experimentation.
            </p>
          </div>
       
</section>
   <OnlineCompiler/>
        {/* FEATURES */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Compiler Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Multi-Language Support
              </h3>
              <p className="text-gray-600">
                Practice popular languages like C, C++, Java, Python, and
                JavaScript from one platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                No Setup Required
              </h3>
              <p className="text-gray-600">
                Start coding instantly without installing any compilers or IDEs.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Secure Execution
              </h3>
              <p className="text-gray-600">
                Code runs in isolated environments to ensure safety and
                performance.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Learning Focused
              </h3>
              <p className="text-gray-600">
                Designed specifically for students, trainers, and educators.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                Real-Time Output
              </h3>
              <p className="text-gray-600">
                View output and errors instantly for faster learning.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                LMS Integration
              </h3>
              <p className="text-gray-600">
                Seamlessly integrated with courses, assignments, and quizzes.
              </p>
            </div>

          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="bg-indigo-50 rounded-3xl p-12 text-center mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Built for Real Learning
          </h2>
          <p className="text-gray-700 max-w-4xl mx-auto">
            Our compiler is being developed with real classroom needs in mind.
            Stability, security, and simplicity are our top priorities.
          </p>
        </section>

        {/* CTA */}
        <footer className="bg-indigo-600 rounded-3xl text-center text-white p-12">
          <h2 className="text-3xl font-bold mb-4">
            Want Early Access?
          </h2>
          <p className="max-w-3xl mx-auto text-indigo-100 mb-6">
            Join our platform and be among the first to experience the integrated
            online compiler.
          </p>
          <button onClick={()=>alert("DarshanTech Innovation Notify when Online Compiler is ready for the real use")} className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
            Get Notified
          </button>
        </footer>

      </div>
    </section>
    <LmsFooter/>
    </>
  );
};

export default Compiler;
