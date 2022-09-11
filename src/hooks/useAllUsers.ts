import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

// APIからデータを取得、失敗したらエラー通知、成功したら取得した値をstateに設定する関数を返すカスタムフック
// getUsersで取得したuserのstateとloadingのstateを返す
export const useAllUsers = () => {
  const [loading, setLoading] = useState(false); //loadingのstate
  const [users, setUsers] = useState<Array<User>>([]); //ユーザーのstate

  const { showMessage } = useMessage(); //メッセージ(toast)を出す関数を設定、インポート

  // ユーザーのデータを取得して失敗したらメッセージを出す関数
  // useAllUsers()でpropsに渡される関数なので、再レンダリングを防ぐためにuseCallbackを使う(関数のメモ化)
  const getUsers = useCallback(() => {
    setLoading(true); //loadingをtrueにする

    // APIからaxiosを使用して、データを取得
    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data)) //取得が成功したらユーザーのstateに設定
      .catch(() => {
        //取得が失敗したらshowMessage関数(カスタムフック)で失敗したと表示
        showMessage({ title: "ユーザー取得に失敗しました", status: "error" });
      })
      .finally(() => {
        // 成功しても失敗してもloadingにfalseを渡す = loadingの処理を終了
        setLoading(false);
      });
  }, [showMessage]); //showMessageの内容が変わったときだけ再レンダリング

  return { getUsers, loading, users }; //関数とstateを返す
};
