import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

//APIを処理して成功、失敗時のメッセージ(toast)を出すカスタムフック
//showMessage関数を返す
export const useMessage = () => {
  const toast = useToast(); //toastの初期化

  const showMessage = useCallback(
    //titleとstatusのpropsを受け取り、toastにオブジェクトを渡すことでポップアップを出す
    (props: Props) => {
      const { title, status } = props;

      toast({
        title,
        status,
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    },
    [toast] //toastの内容が変わったときだけ再レンダリング
  );
  return { showMessage };
};
