import React from "react";

const Help = () => {
  return (
    <main className="bg-gray-300">
      <div className="bg-white max-w-sm m-auto p-10 min-h-screen">
        <h2 className="text-xl font-extrabold">logNoteについて</h2>
        <p className="my-4">
          logNoteは、日々の作業ログを簡単に残せるWebアプリです。
          <br />
          ログの作成・編集・削除などを簡単に行えます。
          <br />
          また、作業ログから、１日のふりかえり、週のふりかえり、月のふりかえりが簡単に行えるようになっています。
        </p>
        <h2 className="text-xl font-extrabold">データ保存について</h2>
        <p className="my-4">
          ログデータは、ブラウザに保存されます。個人的なログデータが外部に共有されたり、保存されたりすることはありませんので、安心してお使いいただけます。ただし、複数のデバイス間でデータを共有することはできません。サーバーに保存する機能を用意していますが、現在そちらの機能を公開する予定はありません。
        </p>
        <h2 className="text-xl font-extrabold">開発について</h2>
        <p className="my-4">
          以下のURLに開発情報を載せています。
          <br />
          <a
            href="https://ouni.work/works/lognote"
            type="button"
            className="py-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
          >
            logNoteの開発情報
          </a>
        </p>
      </div>
    </main>
  );
};

export default Help;
