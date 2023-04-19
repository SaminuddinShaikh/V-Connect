export const checkImage = (file) => {
  let err = "";
  err = !file
    ? "File dose not exist."
    : file.size > 1024 * 1024
    ? "This largest image size is 1mb"
    : file.type !== "image/jpeg" && file.type !== "image/png"
    ? "Image format is correct"
    : "";
  return err;
};
