import { Button, Card, Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { deleteLog, logPost, updateLog } from "../firebase";
import { gRenderDate, setRenderDate } from "./Home";
import { baseUrl } from "../App";

const LogCard = (
  post: logPost,
  editId: string,
  setEditId: (arg: string) => void,
  editPost: logPost,
  setEditPost: (arg: logPost) => void,
  tab: string
) => {
  // ログ削除
  const handleDelete = async (post_id: string) => {
    await deleteLog(post_id);
    window.location.href = baseUrl;
  };

  const handleUpdate = async (editPost: logPost) => {
    await updateLog(editPost);
    window.location.href = baseUrl;
  };

  const isEdit = post.id === editId;

  if (isEdit && post.title !== editPost.title) {
    const tmpPost = post;
    setEditPost(tmpPost);
  }

  let isRenderDate = false;
  if (gRenderDate !== post.date) {
    isRenderDate = true;
    setRenderDate(post.date);
  }

  return !isEdit ? (
    <div key={"div" + tab + post.id}>
      {isRenderDate ? (
        <div
          key={tab + post.date + post.id}
          className="text-sm text-gray-500 font-extrabold mt-8 mb-2"
        >
          {post.date}
        </div>
      ) : (
        <></>
      )}
      <Card key={tab + post.id} className="p-4 mb-4">
        <div className="flex justify-between">
          <div className="font-bold">{post.title}</div>
          <div className="flex">
            <Button
              className="p-1"
              color="gray"
              variant="text"
              onClick={() => handleDelete(post.id)}
            >
              <FontAwesomeIcon className="" icon={faTrash} />
            </Button>
            <Button className="p-1" color="gray" variant="text">
              <FontAwesomeIcon
                className=""
                icon={faPen}
                onClick={() => setEditId(post.id)}
              />
            </Button>
          </div>
        </div>
        <div className="ml-auto text-xs text-gray-400 mb-2">
          {post.start}-{post.end}
        </div>
        <div className="text-gray-700 text-sm whitespace-pre-wrap">
          {post.log}
        </div>
      </Card>
    </div>
  ) : (
    <Card key={tab + post.id} className="p-4 mb-4">
      <div>
        <div className="flex flex-row-reverse">
          <Button
            className="p-0 w-6 text-right text-xs"
            color="gray"
            variant="text"
            onClick={() => {
              setEditId("");
            }}
          >
            <FontAwesomeIcon className="" icon={faXmark} />
          </Button>
        </div>
        <Input
          variant="standard"
          className=""
          label="Title"
          defaultValue={editPost.title}
          onChange={(e) => {
            const tmpPost = editPost;
            tmpPost.title = e.target.value;
            setEditPost(tmpPost);
          }}
        />
        <div className="my-4 flex">
          <div>
            <div className="text-gray-500 text-xs">Date</div>
            <input
              defaultValue={editPost.date}
              onChange={(e) => {
                const tmpPost = editPost;
                tmpPost.date = e.target.value;
                setEditPost(tmpPost);
              }}
              className="p-1 w-20 border rounded text-xs"
              type="date"
            ></input>
          </div>
          <div className="ml-8 mr-2">
            <div className="text-gray-500 text-xs">Start Time</div>
            <input
              className="p-1 w-20 border rounded text-xs"
              type="time"
              step="300"
              defaultValue={editPost.start}
              onChange={(e) => {
                const tmpPost = editPost;
                tmpPost.start = e.target.value;
                setEditPost(tmpPost);
              }}
            ></input>
          </div>
          <div className="">
            <div className="text-gray-500 text-xs">End Time</div>
            <input
              className="p-1 border rounded text-xs"
              type="time"
              step="300"
              defaultValue={editPost.end}
              onChange={(e) => {
                const tmpPost = editPost;
                tmpPost.end = e.target.value;
                setEditPost(tmpPost);
              }}
            ></input>
          </div>
        </div>
        <Textarea
          label="Log"
          defaultValue={editPost.log}
          onChange={(e) => {
            const tmpPost = editPost;
            tmpPost.log = e.target.value;
            setEditPost(tmpPost);
          }}
        />
        <Button
          onClick={() => {
            handleUpdate(editPost);
            setEditId("");
          }}
        >
          更新
        </Button>
      </div>
    </Card>
  );
};

export default LogCard;
