import React from "react";
import "../CSS/UrduQA.css";
import Feed from "./Feed";
import Navbar from "./Navbar";

function UrduQA() {
  return (
    <div className="urduqa">
      <Navbar />
      <div className="urduqa_content">
        <Feed />
      </div>
    </div>
  );
}

export default UrduQA;
