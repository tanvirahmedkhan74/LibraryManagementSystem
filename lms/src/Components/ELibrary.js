import React from "react";

import digital_design_cover from './digital_design_cover.png';

// React Bootstrap page for selecting and reading pdf files
export default function ELibrary() {
  return (
    <>
      <div className="card" style={{width: "18rem"}}>
        <img src={digital_design_cover} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Digital Design</h5>
          <p className="lead">
            With an Introduction to the Verilog HDL
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">5th Edition</li>
          <li className="list-group-item">M. Morris-Mano  and Michael D. Ciletti</li>
          <li className="list-group-item">CSE</li>
        </ul>
        <div className="card-body">
          <a href="/" className="card-link">
            Card link
          </a>
          <a href="/" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </>
  );
}
