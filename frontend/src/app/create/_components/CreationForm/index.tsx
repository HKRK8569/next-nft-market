import ImagePicker from "@/app/create/_components/ImagePicker";
import { Input } from "@/components/Input";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const CreationForm = () => {
  const [profileImage, setProfileImage] = useState<string | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  const createNFTAction = (event: FormData) => {
    const title = event.get("title");
    const description = event.get("description");
    if (!title || !description || !profileImage) {
      toast.error("未入力の箇所があります。", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setProfileImage(null);
    toast("mint", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <form action={createNFTAction} className="w-[500px] mx-auto">
      <div className="p-8">
        <ImagePicker
          profileImage={profileImage}
          inputRef={inputRef}
          setProfileImage={setProfileImage}
        />
      </div>
      <div className="pb-8">
        <Input className="w-full " placeholder="タイトル" name="title" />
      </div>
      <div className="pb-8">
        <textarea
          placeholder="概要"
          name="description"
          className="w-full h-[100px] block border border-gray-400 p-2 rounded focus:border-black outline-none resize-none"
        />
      </div>

      <div className="pb-8">
        <button
          type="submit"
          className="w-full p-2 hover:opacity-50 rounded bg-black block text-white"
        >
          NFT作成
        </button>
      </div>
    </form>
  );
};

export default CreationForm;
