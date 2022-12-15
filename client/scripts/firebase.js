import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBCqqPWhqNj1cuwd-G964ReMbs4GM5g3Us",
  authDomain: "auth-ae4ba.firebaseapp.com",
  projectId: "auth-ae4ba",
  storageBucket: "auth-ae4ba.appspot.com",
  messagingSenderId: "422928431156",
  appId: "1:422928431156:web:366d367431969057f5b261",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage();
console.log(app, storage);

const userimginput = document.querySelector("#userimginput");
userimginput.addEventListener("change", (e) => {
  console.log(e.target.files[0]);
  handleUplaod(e.target.files[0]);
});

function handleUplaod(file) {
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        document.querySelector("#user_avt").setAttribute("src", downloadURL);
      });
    }
  );
}
