// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB25UbGCOTcOUfYbqGkB-kiD7tbl5hNzZo",
  authDomain: "trust-6a7dd.firebaseapp.com",
  projectId: "trust-6a7dd",
  storageBucket: "trust-6a7dd.appspot.com",
  messagingSenderId: "851682891031",
  appId: "1:851682891031:web:991562db673cf78c141352"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//auth
const auth = getAuth(app);

async function registerUser(user) {
  let ok = false;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password)
    console.log(userCredential)
    const userUid = userCredential.user.uid
    createUserDB(userUid, user)
    ok = true
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    ok = false
  }
  return ok
}

async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    console.log('Inicio de sesión exitoso')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error al iniciar sesión: ', error)
    return { success: false, error: error.message }
  }
}

async function logOut() {
  try {
    await signOut(auth)
    console.log("sesion cerrada con exito")
    window.location.reload()
    return { success: true, error: null }
  } catch (error) {
    console.error("Error al cerrar sesion", error)
    return { success: false, error: error }
  }
}

//databse

const db = getFirestore(app)

async function createUserDB(id, user) {

  const data = {
    id: id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accountType: user.accountType
  }

  try {
    await setDoc(doc(db, "users", id), data)
    console.log("Usuario añadido a la base de datos")
  } catch (error) {
    console.log("Error: ", error)
  }
}

async function updateUserDB(id, data) {
  const userRef = doc(db, 'users', id)
  await updateDoc(userRef, data)
}

async function getUserDB(id) {
  const userRef = doc(db, "users", id)
  const userSnapshot = await getDoc(userRef)
  if (userSnapshot.exists()) {
    return userSnapshot.data()
  } else console.log("User doesn't exist")
}

async function deleteUserDB() {

}

async function getUser(id) {
  const uid = id
  try {
    const user = await getUserDB(uid)
    return user
  } catch (error) {
    console.log('Error: ', error)
  }
}

async function updateUser(id, data) {
  try {
    await updateUserDB(id, data)
  } catch (error) {
    console.log('Error', error)
  }
}

async function createPost(data) {
  try {
    const res = await addDoc(collection(db, 'posts'), data)
    return res
  } catch (error) {
    console.log(error)
  }
}

async function getPosts() {
  try {
    const postsRef = collection(db, "posts")
    const postsSnapshot = await getDocs(postsRef)

    const posts = []
    postsSnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    })
    return posts
  } catch (error) {
    console.error('Error: ', error)
  }
}

async function getPostsByUserId(id) {
  try {

    if (!id) {
      console.error("UserId is undefined or null");
      return [];
    }

    const postsRef = collection(db, "posts")
    const userPostsQuery = query(postsRef, where("userId", "==", id))
    const postsSnapshot = await getDocs(userPostsQuery)

    const userPosts = []
    postsSnapshot.forEach((doc) => {
      userPosts.push({ id: doc.id, ...doc.data() });
    });
    return userPosts
  } catch (error) {
    console.log('Error: ', error)
  }
}

async function getPostbyId(postId) {

  try {
    const postRef = doc(db, 'posts', postId)
    const postSnapshot = await getDoc(postRef)
    if (postSnapshot.exists()) {
      return postSnapshot.data()
    }
    else console.log('Post doesnt exist')
  } catch (error) {
    console.log(error)
  }

}

async function updatePost(postId, postData) {
  try {
    const postRef = doc(db, 'posts', postId)
    await updateDoc(postRef, postData)
  } catch (error) {
    console.log(error)
  }
}

async function deletePost(postId) {
  try {
    const postRef = doc(db, 'posts', postId)
    await deletePostPhotos(postId)
    await deleteDoc(postRef)
  } catch (error) {
    console.log(error)
  }
}

async function createJobRequest(data) {
  try {
    const res = await addDoc(collection(db, 'jobRequests'), data)
    //console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

async function getRequestsByClientId(clientId) {
  try {
    const requestsRef = collection(db, 'jobRequests')
    const reqQuery = query(requestsRef, where('clientId', '==', clientId))
    const snapshot = await getDocs(reqQuery)
    const requests = []
    snapshot.forEach(doc => requests.push({requestId: doc.id, ...doc.data()}))
    return requests
  } catch (error) {
    console.log(error)
  }
}

async function getRequestsByWorkerId(workerId) {
  try {
    const requestsRef = collection(db, 'jobRequests')
    const reqQuery = query(requestsRef, where('workerId', '==', workerId))
    const snapshot = await getDocs(reqQuery)
    const requests = []
    snapshot.forEach(doc => requests.push({requestId: doc.id, ...doc.data()}))
    return requests
  } catch (error) {
    console.log(error)
  }
}

async function updateRequest(reqId, data){
  try {
    const postRef = doc(db, 'jobRequests', reqId)
    await updateDoc(postRef, data)
  } catch (error) {
    console.log(error)
  }
}



//storage

const storage = getStorage(app)

async function uploadProfilePhoto(userId, file) {
  const photosRef = ref(storage, `users/profilePhotos/${userId}.png`)
  const metadata = {
    contentType: 'image/png',
  };

  try {
    await uploadBytes(photosRef, file, metadata)
    const url = await getDownloadURL(photosRef)
    return url
  } catch (error) {
    console.log(error)
  }


}

async function uploadPostPhotos(postId, files) {

  const metadata = {
    contentType: 'image/png',
  }

  const urls = []

  try {
    for (const file of files) {
      const postStorageRef = ref(storage, `posts/${postId}/${file.name}`)
      await uploadBytes(postStorageRef, file, metadata)
      const url = await getDownloadURL(postStorageRef)
      urls.push(url)
    }
    return urls
  } catch (error) {
    console.log(error)
  }
}

async function deletePostPhotos(postId) {
  try {
    const folderRef = ref(storage, `posts/${postId}`)
    const photos = await listAll(folderRef)
    const deletePhotos = photos.items.map(async photoRef => await deleteObject(photoRef))
    //await deleteObject(folderRef)
  } catch (error) {
    console.log(error)
  }
}

export { 
  auth, 
  createJobRequest, 
  createPost, 
  deletePost, 
  getPostbyId, 
  getPosts, 
  getPostsByUserId, 
  getRequestsByClientId,
  getRequestsByWorkerId, 
  getUser, 
  logOut, 
  loginUser, 
  registerUser, 
  updatePost, 
  updateUser,
  updateRequest, 
  uploadPostPhotos, 
  uploadProfilePhoto 
};
