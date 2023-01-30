const cloudName = "dlwoimstk";
const apiKey = "378278351497316";

const fileInput = document.querySelector("#file-field");
const publishForm = document.querySelector("#publish-form");
const imageDisplay = document.querySelector("#image-display");
const imagePlaceholder = document.querySelector("#image-placeholder");

publishForm.addEventListener("submit", handleSubmit);
fileInput.addEventListener("change", handleFileChange);

function handleFileChange(e) {
  const file = e.srcElement.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    imagePlaceholder.remove();
    imageDisplay.src = reader.result;
  };
  reader.readAsDataURL(file);
}

async function uploadImage() {
  const signatureResponse = await axios.get("/api/v1/upload/signature");

  const uploadData = new FormData();
  uploadData.append("api_key", apiKey);
  uploadData.append("file", fileInput.files[0]);
  uploadData.append("signature", signatureResponse.data.signature);
  uploadData.append("timestamp", signatureResponse.data.timestamp);

  const cloudinaryResponse = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    uploadData,
    {
      onUploadProgress: handleUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  const imageData = {
    version: cloudinaryResponse.data.version,
    public_id: cloudinaryResponse.data.public_id,
    signature: cloudinaryResponse.data.signature,
  };
  return imageData;
}

async function handleSubmit(e) {
  e.preventDefault();
  const imageData = await uploadImage();
  console.log(imageData);
  axios.post("/do-something-with-photo", photoData);
}

function handleUploadProgress(e) {
  console.log(e.loaded / e.total);
}
