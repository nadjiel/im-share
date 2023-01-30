const cloudName = "dlwoimstk";
const apiKey = "378278351497316";

const fileInput = document.querySelector("#file-field");
const publishForm = document.querySelector("#publish-form");
const imageDisplay = document.querySelector("#image-display");
const imagePlaceholder = document.querySelector("#image-placeholder");

const versionInput = document.querySelector("#version-input");
const publicIdInput = document.querySelector("#publicId-input");
const signatureInput = document.querySelector("#signature-input");

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

  const uploadRes = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    uploadData,
    {
      onUploadProgress: handleUploadProgress,
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return uploadRes;
}

async function handleSubmit(e) {
  e.preventDefault();

  const uploadRes = await uploadImage();
  console.log(uploadRes);

  versionInput.value = uploadRes.data.version;
  publicIdInput.value = uploadRes.data.public_id;
  signatureInput.value = uploadRes.data.signature;

  publishForm.submit();
}

function handleUploadProgress(e) {
  console.log(e.loaded / e.total);
}
