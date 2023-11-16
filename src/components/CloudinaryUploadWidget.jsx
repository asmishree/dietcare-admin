import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImages: [], // Store uploaded image links in an array
    };
  }

  componentDidMount() {
    const cloudName = "dyun4cr6u";
    const uploadPreset = "fzpei2zj";

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const secureUrl = result.info.secure_url;

          // Check if the current number of uploaded images is less than the limit
          if (this.state.uploadedImages.length < this.props.imageLimit) {
            // Check if the URL is not already in the state
            if (!this.state.uploadedImages.includes(secureUrl)) {
              this.setState(
                (prevState) => ({
                  uploadedImages: [...prevState.uploadedImages, secureUrl], // Add the uploaded link to the array
                }),
                () => {
                  // Invoke the callback function with the updated array of image links
                  this.props.onImageUpload(this.state.uploadedImages);
                }
              );
            }
          } else {
            alert(`You have reached the maximum limit of ${this.props.imageLimit} images.`);
          }
        }
      }
    );

    document.getElementById("upload_widget").addEventListener("click", () => {
      myWidget.open();
    });
  }

  render() {
    return (
      <div>
        <div id="upload_widget" className="cloudinary-button">
          Upload Media
        </div>
      </div>
    );
  }
}

export default CloudinaryUploadWidget;
