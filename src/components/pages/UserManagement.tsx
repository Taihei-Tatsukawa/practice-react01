import { Center, Spinner, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect } from "react";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useLoginUser } from "../../hooks/useLoginUser";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserCard } from "../organisms/user/UserCard";
import { UserDetailModal } from "../organisms/user/UserDetailModal";

//ユーザー一覧のコンポーネント
export const UserManagement: FC = memo(() => {
  // APIからデータを取得して、stateに設定する関数と、usersとloadingというstateを設定
  const { getUsers, users, loading } = useAllUsers();

  const { isOpen, onOpen, onClose } = useDisclosure(); //Modal用のstateと関数

  const { onSelectUser, selectedUser } = useSelectUser();

  const { loginUser } = useLoginUser();

  useEffect(() => getUsers(), [getUsers]); //useEffectで初回のみgetUsersを実行(初回の画面読み込み時だけで良いため)

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  ); //propsに渡すので、useCallbackの中に入れてあげる

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
                  id={user.id}
                  imageUrl={`https://picsum.photos/200/300?random=${i}`}
                  userName={user.username}
                  fullName={user.name}
                  onClick={onClickUser}
                />
              </WrapItem>
            )
          )}
        </Wrap>
      )}
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
      />
    </>
  );
});
