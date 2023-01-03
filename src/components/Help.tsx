import React from "react";

const Help = () => {
  return (
    <main className="bg-gray-300">
      <div className="bg-white max-w-sm m-auto p-10 min-h-screen">
        <h2 className="text-lg font-extrabold">logNoteについて</h2>
        <p className="mt-2 text-sm">
          logNoteは、日々の作業ログを簡単に残せるWebアプリです。
          <br />
          ログの作成・編集・削除などを簡単に行えます。
          また、１日ごと・１週ごと・１月ごとにログを閲覧できます。
        </p>
        <h2 className="mt-8 text-lg font-extrabold">データ保存について</h2>
        <p className="mt-2 text-sm">
          ログデータは、ブラウザに保存されます。個人的なログデータが外部に共有されたり、保存されたりすることはありませんので、安心してお使いいただけます。
          <br />
          ただし、複数のデバイス間でデータを共有することはできません。
          <br />
          将来、サーバーに保存する機能を提供予定です。
        </p>
        <h2 className="mt-8 text-lg font-extrabold">更新履歴</h2>
        <h3 className="mt-2 font-bold">ver. 0.2.0</h3>
        <p className="text-sm">ログ内のURLをオートリンクさせるようにしました</p>
        <h3 className="mt-2 font-bold">ver. 0.1.0</h3>
        <p className="text-sm">公開しました</p>
        <h2 className="mt-8 text-lg font-extrabold">開発について</h2>
        <p className="mt-2 text-sm">
          以下に開発情報を載せています。
          <br />
          <a
            href="https://ouni.jp/works/lognote"
            type="button"
            className="py-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
          >
            logNoteの開発情報
          </a>
        </p>
      </div>
    </main>
  );
};

export default Help;
