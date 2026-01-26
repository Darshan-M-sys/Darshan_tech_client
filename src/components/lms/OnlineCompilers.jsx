import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

/* ================= DEFAULT CODE ================= */
const DEFAULT_CODE = {
  javascript: `// JavaScript Example
console.log("Hello World");
`,
  python: `# Python Example
print("Hello World")
`,
  c: `// C Example
#include <stdio.h>

int main() {
    printf("Hello World");
    return 0;
}
`,
  cpp: `// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}
`
};

const OnlineCompiler = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(DEFAULT_CODE["python"]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= RUN CODE ================= */
  const runCode = async () => {
    setLoading(true);
    setOutput("");
     const API_URL="https://darshantechinnvations.shop";
    try {
      const res = await axios.post(`${API_URL}/run`, {
        source_code: code,
        language: language,
      });

      setOutput(res.data.output || "No output");
    } catch (err) {
      setOutput("Execution Error");
    }

    setLoading(false);
  };

  return (
    <div className="lg:min-h-screen bg-gray-100 px-1 py-6 sm:px-6 lg:px-10">
      
      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Online Compiler
      </h1>

      {/* CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <select
          className="w-full sm:w-60 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={language}
          onChange={(e) => {
            const lang = e.target.value;
            setLanguage(lang);
            setCode(DEFAULT_CODE[lang]);
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </select>

        <button
          onClick={runCode}
          disabled={loading}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      {/* EDITOR */}
      <div className="rounded-lg overflow-hidden border">
        <Editor
          height="300px"
          className="sm:h-[400px] lg:h-[500px]"
          language={language}
          value={code}
          theme="vs-dark"
          onChange={(value) => setCode(value || "")}
        />
      </div>

      {/* OUTPUT */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Output</h2>
        <pre className="bg-black text-green-400 p-4 rounded-lg min-h-[120px] max-h-[300px] overflow-auto text-sm">
          {output || "Output will appear here"}
        </pre>
      </div>
    </div>
  );
};

export default OnlineCompiler;
