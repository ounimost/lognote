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
      </div>
    </main>
  );
};

export default Help;
