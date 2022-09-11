import { Center, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useEffect } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserCard } from "../organisms/user/UserCard";

//ユーザー一覧のコンポーネント
export const UserManagement: FC = memo(() => {
  // APIからデータを取得して、stateに設定する関数と、usersとloadingというstateを設定
  const { getUsers, users, loading } = useAllUsers();

  useEffect(() => getUsers(), []); //useEffectで初回のみgetUsersを実行(初回の画面読み込み時だけで良いため)

  return (
    <>
      {loading ? ( //loading中の処理
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        //loading中ではないときの処理
        <Wrap p={{ base: 4, md: 10 }} justify="center">
          {users.map(
            //取得したuserオブジェクトの配列をmap関数で展開して配列にする
            (user, i) => (
              <WrapItem key={user.id}>
                <UserCard
                  imageUrl={`https://picsum.photos/200/300?random=${i}`}
                  userName={user.username}
                  fullName={user.name}
                />
              </WrapItem>
            )
          )}
        </Wrap>
      )}
    </>
  );
});
