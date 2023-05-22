import { Component } from "react";
import axios from "axios";

const SIGNATURE = 'https://www.albedosunrise.com/images/getSignature';
const SAVEIMAGE = 'https://www.albedosunrise.com/images';
const GETROOMVIEW = 'https://www.albedosunrise.com/images/getRoomViews/';

class CloudinaryUploadWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    }
  }

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

              const imageDataPost = {
                publicId: result.info.public_id,
                height: result.info.height,
                width: result.info.width,
                version: result.info.version,
                signature: result.info.signature,
                paintingWidth: this.state.width,
                paintingHeight: this.state.height,
              };

              axios.post(SAVEIMAGE, imageDataPost)
                .then(response => {
                  console.log(response);
                  
                  axios.get(GETROOMVIEW + imageDataPost.publicId)
                    .then(response => {
                      this.props.setRoomview(response.data);
                      this.setState({
                        height: 0,
                        width: 0,
                      });
                })
                })
                .catch(error => {
                  console.log(error);
                });
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
    const handleChangeHeight = (event) => {
      this.setState({
        height: +event.target.value,
        width: this.state.width,
      });
    };
  
    const handleChangeWidth = (event) => {
      this.setState({
        height: this.state.height,
        width: +event.target.value,
      });
    };

    return (
      <>
        <label>
          Height:
          <input
            type="text"
            name="height"
            value={this.state.height}
            onChange={handleChangeHeight}
          />
        </label>

        <label>
          Width:
          <input
            type="text"
            name="width"
            value={this.state.width}
            onChange={handleChangeWidth}
          />
        </label>

        <button id="upload_widget" className="cloudinary-button">
          Upload
        </button>
      </>
    );
  }
}

export default CloudinaryUploadWidget;
