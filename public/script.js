function copyToClipboard() {
  const input = document.getElementById("image-url");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
  showToast("Link copiado!", "success");
}

function showFileName(input) {
  const span = document.getElementById("file-name");
  if (input.files.length > 0) {
    span.textContent = input.files[0].name;
  }
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
