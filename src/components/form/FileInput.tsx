import { Button, FileUpload, type FileUploadRootProps } from "@chakra-ui/react";
import { Upload } from "lucide-react";

type FileInputProps = {
  onUpload: (file: File) => void;
  loading?: boolean;
} & FileUploadRootProps;

export default function FileInput({
  onUpload,
  loading,
  ...props
}: FileInputProps) {
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
      {...props}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm" loading={loading}>
          <Upload /> Upload file
        </Button>
      </FileUpload.Trigger>
    </FileUpload.Root>
  );
}
