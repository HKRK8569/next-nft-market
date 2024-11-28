import Image from "next/image";
import { RefObject } from "react";

type Props = {
  profileImage: string | null | undefined;
  inputRef: RefObject<HTMLInputElement>;
  setProfileImage: (value: string | null | undefined) => void;
};
const ImagePicker = ({ profileImage, inputRef, setProfileImage }: Props) => {
  return (
    <div>
      {!profileImage ? (
        <div
          onClick={() => {
            inputRef.current?.click();
          }}
          role="button"
          className="mx-auto flex size-[300px] items-center justify-center rounded border border-gray-400 hover:bg-gray-50"
        >
          <p>ファイルを選択</p>
        </div>
      ) : (
        <Image
          src={profileImage}
          width={300}
          height={300}
          className="mx-auto size-[300px] rounded border border-gray-400"
          alt="image"
        />
      )}
      <input
        ref={inputRef}
        name="image"
        type="file"
        className="hidden"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          const fileObject = e.target.files[0];
          setProfileImage(window.URL.createObjectURL(fileObject));
        }}
        accept="image/*"
      />
    </div>
  );
};

export default ImagePicker;
