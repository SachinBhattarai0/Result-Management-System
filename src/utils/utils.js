exports.downloadFromBlob = (blob, name = "marksheet") => {
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = name + ".pdf";
  a.click();
};

// fetching using javascript fetch api and not axios
exports.fetchWithJwt = async (url, data) => {
  const jwtToken = localStorage.getItem("jwtToken");
  return await fetch("http://localhost:8000/api" + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwtToken,
    },
    body: JSON.stringify(data),
    method: "POST",
  });
};
