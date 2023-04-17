import React from "react";
import digital_design_cover from "./BookCover/digital_design_cover.png";
import sadiku_cover from "./BookCover/sadiku_cover.png";
import probability_cover from "./BookCover/probability_cover.png";
import Auth from "./Auth";

// React Bootstrap page for selecting and reading pdf files
export default function ELibrary(props) {
  return (
    <>
      {props.auth === false ? (
        <Auth />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={digital_design_cover}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Digital Design</h5>
                <p className="lead">With an Introduction to the Verilog HDL</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">5th Edition</li>
                <li className="list-group-item">
                  M. Morris-Mano and Michael D. Ciletti
                </li>
                <li className="list-group-item">CSE</li>
              </ul>
              <div className="card-body">
                <a href="/" className="card-link">
                  Read Online
                </a>
                <a href="/" className="card-link">
                  Request
                </a>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <img src={sadiku_cover} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Fundamentals of</h5>
                <p className="lead">Electric Circuits</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">6th Edition</li>
                <li className="list-group-item">
                  Charles K. Alexander and Matthew N. O. Sadiku
                </li>
                <li className="list-group-item">EEE</li>
              </ul>
              <div className="card-body">
                <a href="/" className="card-link">
                  Read Online
                </a>
                <a href="/" className="card-link">
                  Request
                </a>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <img src={probability_cover} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Probability and Statistics</h5>
                <p className="lead">for Engineers and Scientists</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">4th Edition</li>
                <li className="list-group-item">Anthony Hayter</li>
                <li className="list-group-item">Math</li>
              </ul>
              <div className="card-body">
                <a href="/" className="card-link">
                  Read Online
                </a>
                <a href="/" className="card-link">
                  Request
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={digital_design_cover}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Digital Design</h5>
                <p className="lead">With an Introduction to the Verilog HDL</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">5th Edition</li>
                <li className="list-group-item">
                  M. Morris-Mano and Michael D. Ciletti
                </li>
                <li className="list-group-item">CSE</li>
              </ul>
              <div className="card-body">
                <a href="/" className="card-link">
                  Read Online
                </a>
                <a href="/" className="card-link">
                  Request
                </a>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <img src={sadiku_cover} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Fundamentals of</h5>
                <p className="lead">Electric Circuits</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">6th Edition</li>
                <li className="list-group-item">
                  Charles K. Alexander and Matthew N. O. Sadiku
                </li>
                <li className="list-group-item">EEE</li>
              </ul>
              <div className="card-body">
                <a href="/" className="card-link">
                  Read Online
                </a>
                <a href="/" className="card-link">
                  Request
                </a>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <img src={probability_cover} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Probability and Statistics</h5>
                <p className="lead">for Engineers and Scientists</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">4th Edition</li>
                <li className="list-group-item">Anthony Hayter</li>
                <li className="list-group-item">Math</li>
              </ul>
              <div className="card-body">
                <a href="/" className="card-link">
                  Read Online
                </a>
                <a href="/" className="card-link">
                  Request
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
