import { Button, FileUpload } from "@chakra-ui/react";
import { Upload } from "lucide-react";

type FileInputProps = {
  onUpload: (file: File) => void;
};

export default function FileInput({ onUpload }: FileInputProps) {
  const onFileAccept = (file: File[]) => {
    const first = file.pop();
    if (!first) return;
    onUpload(first);
  };
  return (
    <FileUpload.Root
      onFileChange={(file) => onFileAccept(file.acceptedFiles)}
      maxFiles={10}
      w={"fit"}
      accept={["image/png"]}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <Upload /> Upload file
        </Button>
      </FileUpload.Trigger>
    </FileUpload.Root>
  );
}
