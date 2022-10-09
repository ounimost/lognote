import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Card, Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { createLog, logPost } from "../firebase";
import { baseUrl } from "../App";

// inputに設定するための今日の日付を文字列で取得する
const getTodayStr = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = ("0" + (today.getMonth() + 1)).slice(-2);
  const dd = ("0" + today.getDate()).slice(-2);
  return yyyy + "-" + mm + "-" + dd;
};

const AddCard = () => {
  // 現在の時間
  const today = new Date();
  const hour = today.getHours();
  const minute = today.getMinutes();
  let hh = hour.toString();
  if (hour < 10) hh = "0" + hh;
  let mm = (Math.trunc(minute / 15) * 15).toString();
  if (mm === "0") mm = "0" + mm;
  const defaultTime = hh + ":" + mm;

  const [isInput, setIsInput] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<logPost>({
    id: "",
    title: "",
    log: "",
    date: getTodayStr(),
    start: defaultTime,
    end: defaultTime,
  });
  const [isNg, setIsNg] = useState(false);

  // ログを登録する
  const registLog = async () => {
    // 入力チェック
    let cancelRegist = false;
    if (newPost.title.length < 1) cancelRegist = true;
    if (newPost.log.length < 1) cancelRegist = true;
    if (newPost.date.split("-").length !== 3) cancelRegist = true;
    if (newPost.start.split(":").length !== 2) cancelRegist = true;
    if (newPost.end.split(":").length !== 2) cancelRegist = true;
    setIsNg(cancelRegist);
    if (cancelRegist) return;

    // log投稿
    await createLog(newPost);

    // 再読み込み
    window.location.href = baseUrl;
  };

  // 時間の配列を用意しておく
  const timeArr = [];
  for (let i = 0; i < 4 * 24; i++) {
    const tt = Math.trunc(i / 4);
    let ttt = tt.toString();
    if (tt < 10) ttt = "0" + ttt;
    const mm = (i % 4) * 15;
    let mmm = mm.toString();
    if (mm === 0) mmm = "0" + mmm;
    const timeStr = ttt + ":" + mmm;
    timeArr.push(timeStr);
  }

  return (
    <Card className="my-4 p-4">
      {!isInput ? (
        <Button
          color="gray"
          variant="text"
          className="m-0 p-0"
          onClick={() => {
            setIsInput(true);
          }}
        >
          <FontAwesomeIcon className="" icon={faPlus} />
        </Button>
      ) : (
        <div>
          <div className="flex flex-row-reverse">
            <Button
              className="p-0 text-xs"
              color="gray"
              variant="text"
              onClick={() => {
                setIsInput(false);
              }}
            >
              <FontAwesomeIcon className="" icon={faXmark} />
            </Button>
          </div>
          <Input
            variant="standard"
            className=""
            label="Title"
            onChange={(e) => {
              const tmpPost = newPost;
              tmpPost.title = e.target.value;
              setNewPost(tmpPost);
            }}
          />
          <div className="my-4 flex">
            <div>
              <div className="text-gray-500 text-xs">Date</div>
              <input
                onChange={(e) => {
                  const tmpPost = newPost;
                  tmpPost.date = e.target.value;
                  setNewPost(tmpPost);
                }}
                className="p-1 border rounded text-xs"
                defaultValue={getTodayStr()}
                type="date"
              ></input>
            </div>
            <div className="ml-8 mr-2">
              <div className="text-gray-500 text-xs">Start Time</div>
              <input
                className="p-1 w-20 border rounded text-xs"
                type="time"
                step="300"
                defaultValue={defaultTime}
                onChange={(e) => {
                  const tmpPost = newPost;
                  tmpPost.start = e.target.value;
                  setNewPost(tmpPost);
                }}
              ></input>
            </div>
            <div className="">
              <div className="text-gray-500 text-xs">End Time</div>
              <input
                className="p-1 w-20 border rounded text-xs"
                type="time"
                step="300"
                defaultValue={defaultTime}
                onChange={(e) => {
                  const tmpPost = newPost;
                  tmpPost.end = e.target.value;
                  setNewPost(tmpPost);
                }}
              ></input>
            </div>
          </div>
          <Textarea
            label="Log"
            onChange={(e) => {
              const tmpPost = newPost;
              tmpPost.log = e.target.value;
              setNewPost(tmpPost);
            }}
          />
          <Alert
            className="my-4"
            show={isNg}
            dismissible={{
              onClose: () => setIsNg(false),
            }}
          >
            データが入力されていない箇所があります。
          </Alert>
          <Button onClick={registLog}>登録</Button>
        </div>
      )}
    </Card>
  );
};

export default AddCard;
