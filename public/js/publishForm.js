const cloudName = "dlwoimstk";
const apiKey = "378278351497316";

function handleUploadProgress(e) {
  console.log(e.loaded / e.total);
}

async function handleSubmit(e) {
  e.preventDefault();
  console.log("massa");

  // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
  const signatureResponse = await axios.get("/api/v1/upload/signature");
  console.log(signatureResponse);

  const data = new FormData();
  data.append("file", document.querySelector("#file-field").files[0]);
  data.append("api_key", apiKey);
  data.append("signature", signatureResponse.data.signature);
  data.append("timestamp", signatureResponse.data.timestamp);

  const cloudinaryResponse = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: handleUploadProgress,
    }
  );
  console.log(cloudinaryResponse.data);

  // send the image info back to our server
  const photoData = {
    version: cloudinaryResponse.data.version,
    public_id: cloudinaryResponse.data.public_id,
    signature: cloudinaryResponse.data.signature,
  };

  axios.post("/do-something-with-photo", photoData);
}

document.querySelector("#upload-form").addEventListener("submit", handleSubmit);
