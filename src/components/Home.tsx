import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getLogPosts, logPost } from "../firebase";
import AddCard from "./AddCard";
import LogCard from "./LogCard";

export let gRenderDate = "";
export const setRenderDate = (date: string) => {
  gRenderDate = date;
};

const Home = ({ isAuth }: { isAuth: boolean }) => {
  const [logList, setLogList] = useState<logPost[]>([]);
  const [editId, setEditId] = useState<string>("");
  const [editPost, setEditPost] = useState<logPost>({
    id: "",
    title: "",
    log: "",
    date: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    const getPosts = async () => {
      const result = await getLogPosts();
      setLogList(result);
    };
    getPosts();
  }, []);

  if (!isAuth)
    return (
      <main className="bg-gray-300">
        <div className="bg-white max-w-sm m-auto p-4 min-h-screen">
          ログインしてください。
        </div>
      </main>
    );

  // タブのデータ
  const data = [
    {
      label: "今日",
      value: "today",
    },
    {
      label: "昨日",
      value: "yesterday",
    },

    {
      label: "今週",
      value: "week",
    },

    {
      label: "今月",
      value: "month",
    },

    {
      label: "すべて",
      value: "all",
    },
  ];

  const today = new Date();
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const getDateFromStr = (
    str: string,
    yearDif: number,
    monthDif: number,
    dayDif: number
  ) => {
    const tmpDateArr = str.split("-");
    const tmpDate = new Date(
      parseInt(tmpDateArr[0]) - yearDif,
      parseInt(tmpDateArr[1]) - 1 - monthDif,
      parseInt(tmpDateArr[2]) - dayDif
    );
    return tmpDate;
  };

  const getDateFromLog = (post: logPost) => {
    const tmpDateArr = post.date.split("-");
    const tmpTimeArr = post.start.split(":");
    const tmpDate = new Date(
      parseInt(tmpDateArr[0]),
      parseInt(tmpDateArr[1]) - 1,
      parseInt(tmpDateArr[2]),
      parseInt(tmpTimeArr[0]),
      parseInt(tmpTimeArr[1])
    );
    return tmpDate;
  };

  const sortDate = (a: logPost, b: logPost) => {
    const dateA = getDateFromLog(a);
    const dateB = getDateFromLog(b);
    if (dateA < dateB) return 1;
    return -1;
  };

  const sortDateDown = (a: logPost, b: logPost) => {
    const dateA = getDateFromLog(a);
    const dateB = getDateFromLog(b);
    if (dateA < dateB) return -1;
    return 1;
  };

  gRenderDate = "";

  return (
    <main className="bg-gray-300">
      <div className="bg-white max-w-sm m-auto py-4 min-h-screen">
        <div className="flex">
          <Tabs value={"today"} className="w-96">
            <TabsHeader>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-xs">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <TabPanel key="today" value="today">
                <AddCard />
                {logList
                  .filter((log) => {
                    const tmpDate = getDateFromStr(log.date, 0, 0, 0);
                    return tmpDate.getTime() == todayDate.getTime();
                  })
                  .sort(sortDateDown)
                  .map((log) =>
                    LogCard(
                      log,
                      editId,
                      setEditId,
                      editPost,
                      setEditPost,
                      "today"
                    )
                  )}
              </TabPanel>
              <TabPanel key="yesterday" value="yesterday">
                {logList
                  .filter((log) => {
                    const tmpDate = getDateFromStr(log.date, 0, 0, -1);
                    return tmpDate.getTime() == todayDate.getTime();
                  })
                  .sort(sortDateDown)
                  .map((log) =>
                    LogCard(
                      log,
                      editId,
                      setEditId,
                      editPost,
                      setEditPost,
                      "yesterday"
                    )
                  )}
              </TabPanel>
              <TabPanel key="week" value="week">
                {logList
                  .filter((log) => {
                    const tmpDate = getDateFromStr(log.date, 0, 0, -7);
                    return tmpDate > todayDate;
                  })
                  .sort(sortDate)
                  .map((log) =>
                    LogCard(
                      log,
                      editId,
                      setEditId,
                      editPost,
                      setEditPost,
                      "week"
                    )
                  )}
              </TabPanel>
              <TabPanel key="month" value="month">
                {logList
                  .filter((log) => {
                    const tmpDate = getDateFromStr(log.date, 0, -1, 0);
                    return tmpDate > todayDate;
                  })
                  .sort(sortDate)
                  .map((log) =>
                    LogCard(
                      log,
                      editId,
                      setEditId,
                      editPost,
                      setEditPost,
                      "month"
                    )
                  )}
              </TabPanel>
              <TabPanel key="all" value="all">
                {logList
                  .sort(sortDate)
                  .map((log) =>
                    LogCard(
                      log,
                      editId,
                      setEditId,
                      editPost,
                      setEditPost,
                      "all"
                    )
                  )}
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Home;
