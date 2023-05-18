import React, { Component } from "react";
import axios from "axios";

const SIGNATURE = 'https://www.albedosunrise.com/images/getSignature';
const SAVEIMG = 'https://www.albedosunrise.com/images'

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "dq415fvzp"; // replace with your own cloud name
    const uploadPreset = "signed-image"; // replace with your own upload preset

  axios.get(SIGNATURE)
      .then(response => {
        const uploadSignature = response.data.signature;
        const uploadSignatureTimestamp = response.data.timestamp;

        var myWidget = window.cloudinary.createUploadWidget(
          {
            api_key : '587219262524673',
            cloudName,
            uploadPreset,
            uploadSignature,
            uploadSignatureTimestamp,
            multiple: false,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done! Here is the image info: ", result.info);

              const imgDataPost = {
                publicId: result.info.public_id,
                height: result.info.height,
                width: result.info.width,
                version: result.info.version,
                signature: result.info.signature,
              };

              this.props.setPublicId(imgDataPost.publicId);

              axios.post(SAVEIMG, imgDataPost)
                .then(response => {
                  console.log(response);
                  this.props.getImage();
                })
                .catch(error => {
                  console.log(error);
                })
            }
          }
        );
        document.getElementById("upload_widget").addEventListener(
          "click",
          function () {
            myWidget.open();
          },
          false
        );
      });

    // Remove the comments from the code below to add
    // additional functionality.
    // Note that these are only a few examples, to see
    // the full list of possible parameters that you
    // can add see:
    //   https://cloudinary.com/documentation/upload_widget_reference
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
