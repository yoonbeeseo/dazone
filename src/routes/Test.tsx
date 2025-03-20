import { storage } from "../lib/firebase";
import { getDownloadURL } from "firebase/storage";

const Test = () => {
  const increase = async () => {
    const uid = "KvpX0lWPDlSATP8jq6a7P1hJ0682";
    const id = "0603f0b3-4643-4290-862e-09051761341f";
    const ref = storage.ref(`${uid}/products/img1`);
    console.log(ref);

    const url = await getDownloadURL(ref);

    console.log(url);
  };
  return (
    <div>
      {/* <h1>{count}</h1> */}
      <button onClick={increase}>Increase</button>
    </div>
  );
};

export default Test;
