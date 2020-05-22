import React, { Component } from "react";

import imageCompression from "browser-image-compression";

import arrowImg from "../../assets/arrow.png";

import "./img-compressor.style.css";

class ImgCompressor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compressedLink:
        "https://images.pexels.com/photos/1410226/pexels-photo-1410226.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1640",
      originalImg: "",
      originalLink: "",
      clicked: false,
      uploadImg: false,
    };
  }

  handleChange = (e) => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImg: imageFile,
      outputFileName: imageFile.name,
      uploadImg: true,
    });
  };

  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  click = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.originalImg.size / 1024) {
      alert("Image Is Too Small, It Can Not Be Compressed!");
      return 0;
    }

    let output;
    imageCompression(this.state.originalImg, options).then((x) => {
      output = x;

      const downloadLink = URL.createObjectURL(output);
      this.setState({
        compressedLink: downloadLink,
      });
    });

    this.setState({ clicked: true });
    return 1;
  };

  render() {
    return (
      <div className="img-compressor">
        <div className="info">
          <h1 className="main">Follow These 3 Simple Steps</h1>
          <div className="arrow">
            {" "}
            <img className="arrow-img" src={arrowImg} alt="" />
          </div>
          <h2 className="info-title">Upload Image</h2>
          <h2 className="info-title">Click On Compress</h2>
          <h2 className="info-title">Download Compressed Image</h2>
        </div>
        <div className="details">
          {this.state.uploadImg ? (
            <div className="img">
              {" "}
              <img src={this.state.originalLink} alt="" />
            </div>
          ) : (
            <div className="img">
              <img
                src="https://images.pexels.com/photos/1410226/pexels-photo-1410226.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1640"
                alt=""
              />
            </div>
          )}
          <div className="input">
            <div className="file">
              <input
                type="file"
                accept="image/*"
                className="custom-file-input"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            {this.state.outputFileName ? (
              <button
                type="button"
                className="btn"
                onClick={(e) => this.click(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
            <div className="download">
              {this.state.clicked ? (
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="btn download-btn"
                >
                  Download
                </a>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImgCompressor;
