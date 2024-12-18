import ImagePicker from "@/app/create/_components/ImagePicker";
import { Input } from "@/components/Input";
import useNFTMarket from "@/hooks/useNFTMarket";
import useWalletStore from "@/stores/walletStore";
import { showErrorPopUp, showSuccessPopUp } from "@/utils";
import { useRef, useState } from "react";

export type CreationValues = {
  name: string;
  description: string;
  image: File;
};

const CreationForm = () => {
  const [profileImage, setProfileImage] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { createNFT } = useNFTMarket();
  const { signer } = useWalletStore();

  const createNFTAction = async (event: FormData) => {
    const name = event.get("name") as string | undefined;
    const description = event.get("description") as string | undefined;
    const image = event.get("image") as File | undefined;

    if (!signer) {
      showErrorPopUp("ウォレットを接続してください");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setProfileImage(null);
      return;
    }
    if (!name || !description || !image) {
      showErrorPopUp("未入力の箇所があります。");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setProfileImage(null);
      return;
    }

    try {
      await createNFT({
        name,
        description,
        image,
      });

      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setProfileImage(null);
      showSuccessPopUp("NFTを作成しました。");
    } catch {
      showErrorPopUp("NFTの作成に失敗しました。");
    }
  };

  return (
    <form action={createNFTAction} className="mx-auto w-[500px]">
      <div className="p-8">
        <ImagePicker
          profileImage={profileImage}
          inputRef={inputRef}
          setProfileImage={setProfileImage}
        />
      </div>
      <div className="pb-8">
        <Input className="w-full" placeholder="タイトル" name="name" />
      </div>
      <div className="pb-8">
        <textarea
          placeholder="概要"
          name="description"
          className="block h-[100px] w-full resize-none rounded border border-gray-400 p-2 outline-none focus:border-black"
        />
      </div>

      <div className="pb-8">
        <button
          type="submit"
          className="block w-full rounded bg-black p-2 text-white hover:opacity-50"
        >
          NFT作成
        </button>
      </div>
    </form>
  );
};

export default CreationForm;
