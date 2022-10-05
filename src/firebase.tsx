import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  updateDoc,
} from "firebase/firestore";
import { isLocalStorage } from "./App";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export interface logPost {
  id: string;
  title: string;
  log: string;
  date: string;
  start: string;
  end: string;
}

//----------------------------------------------------
// Logを作成する
//----------------------------------------------------
const createLog = async (post: logPost) => {
  console.log("create log start");

  if (isLocalStorage) {
    // 現在のリストを取得する
    const postStr = localStorage.getItem("posts");
    let posts = [];
    if (postStr) posts = JSON.parse(postStr);

    // リストの最後の要素に追加して、登録する
    const now = new Date();
    post.id = now.getTime().toString();
    posts[posts.length] = post;
    localStorage.setItem("posts", JSON.stringify(posts));
    return;
  }

  // DBに登録
  await addDoc(collection(db, "posts"), {
    title: post.title,
    log: post.log,
    date: post.date,
    start: post.start,
    end: post.end,
  });
  //console.log("create log finished");
};

//----------------------------------------------------
// Logを更新する
//----------------------------------------------------
const updateLog = async (post: logPost) => {
  if (isLocalStorage) {
    // 現在のリストを取得する
    const postStr = localStorage.getItem("posts");
    let posts = [];
    if (postStr) posts = JSON.parse(postStr);

    // idが一致する要素を削除して、更新する要素を追加する
    posts = posts.filter(function (x: logPost) {
      return !(x.id === post.id);
    });
    posts[posts.length] = post;
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  await updateDoc(doc(db, "posts", post.id), {
    title: post.title,
    log: post.log,
    date: post.date,
    start: post.start,
    end: post.end,
  });

  //console.log("update log");
};

//----------------------------------------------------
// Logを削除する
//----------------------------------------------------
const deleteLog = async (post_id: string) => {
  if (isLocalStorage) {
    // 現在のリストを取得する
    const postStr = localStorage.getItem("posts");
    let posts = [];
    if (postStr) posts = JSON.parse(postStr);

    // idが一致する要素を削除して、保存する
    posts = posts.filter(function (x: logPost) {
      return !(x.id === post_id);
    });
    localStorage.setItem("posts", JSON.stringify(posts));
  }

  await deleteDoc(doc(db, "posts", post_id));
  //console.log("delete log");
};

//----------------------------------------------------
// Logを取得する
//----------------------------------------------------
// Firestore のドキュメントと log オブジェクトの型変換を行います。
const logConverter: FirestoreDataConverter<logPost> = {
  toFirestore(logPost: logPost): DocumentData {
    // id は Firestore のパスで表現されるのでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return {
      title: logPost.title,
      log: logPost.log,
      updatedAt: serverTimestamp(),
    };
  },

  // Firestore ドキュメントデータを log オブジェクトへ変換します。
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): logPost {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      log: data.log,
      date: data.date,
      start: data.start,
      end: data.end,
    };
  },
};
const getLogPosts = async () => {
  if (isLocalStorage) {
    const postStr = localStorage.getItem("posts");
    let posts = [];
    if (postStr) posts = JSON.parse(postStr);
    return posts;
  }

  const collRef = collection(db, "/posts").withConverter(logConverter);
  const snapshot = await getDocs(collRef);

  const result = snapshot.docs.sort(function (a, b) {
    return a.data().start < b.data().start ? -1 : 1; //オブジェクトの昇順ソート
  });

  return result.map((doc) => doc.data());
};

export { auth, provider, createLog, updateLog, deleteLog, getLogPosts };
