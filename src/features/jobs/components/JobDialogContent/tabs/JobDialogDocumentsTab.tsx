import {
  Card,
  DownloadTrigger,
  Heading,
  HStack,
  Input,
  Spinner,
} from "@chakra-ui/react";
import type { FileModel } from "backend/modules/models/FileModel";
import { Download } from "lucide-react";
import { useState } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import FormTemplate from "@/components/block/FormTemplate";
import { OutlineIconButton } from "@/components/buttons/Button";
import { ListWrapper } from "@/components/container/EmptyWrapper";
import VerticalScrollArea from "@/components/container/VScrollArea";
import FileInput from "@/components/form/FileInput";
import { OutlineTrashIconButton } from "@/components/icons-button/Trash";
import { toaster } from "@/components/ui/contants";
import { WithRole } from "@/features/guard/WithRole";
import { useJobDocuments } from "@/features/jobs/hooks/useJobDocument";
import {
  apiClient,
  apiQueryCacheListAdd,
  apiQueryCacheListDelete,
  ok,
} from "@/lib/apiClient";

function deleteJobFile(jobId: number, fileId: string) {
  apiClient.job["delete-document"]
    .delete({
      fileId,
      jobId,
    })
    .then((res) => {
      if (ok(res)) {
        apiQueryCacheListDelete([QueryCacheKey.JobDocuments, jobId], fileId);
      }
    });
}

function DocumentCard({
  fileName,
  id,
  jobId,
}: FileModel.DbFile & { jobId: number }) {
  const data = async () => {
    const res = await apiClient.file({ id }).get();

    if (ok(res)) {
      const fetchResult = await fetch(res.data as string);
      if (ok(fetchResult)) {
        return fetchResult.blob();
      }
    }
    toaster.error({ title: "unable to download the file" });
    return undefined as never;
  };
  return (
    <Card.Root w={"full"} size="sm">
      <Card.Body color="fg.muted">
        <HStack gap={4} justify={"space-between"}>
          {fileName}
          <HStack gap={2}>
            <WithRole.admin>
              <OutlineTrashIconButton
                onClick={() => deleteJobFile(jobId, id)}
              />
            </WithRole.admin>
            <DownloadTrigger
              data={data}
              fileName={fileName}
              mimeType="image/jpeg"
              asChild
            >
              <OutlineIconButton>
                <Download />
              </OutlineIconButton>
            </DownloadTrigger>
          </HStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}

export function JobDialogDocumentsTab({ jobId }: { jobId: number }) {
  const { documents, isLoading } = useJobDocuments({ jobId });

  const [search, setSearch] = useState("");

  if (isLoading) return <Spinner />;

  const onUploadFile = (file: File) => {
    apiClient.job
      .documents({ jobId })
      .post({ file })
      .then((res) => {
        if (ok(res)) {
          apiQueryCacheListAdd<FileModel.DbFile>(
            [QueryCacheKey.JobDocuments, jobId],
            res.data as FileModel.DbFile
          );
        }
      });
  };

  const filteredDocuments = documents?.filter((doc) =>
    doc.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FormTemplate trigger={<FileInput mt={2} onUpload={onUploadFile} />}>
      <Input
        id="job-documents-search"
        placeholder="Search documents"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <VerticalScrollArea maxH="47vh" gap={2}>
        <ListWrapper
          list={filteredDocuments}
          render={(el) => (
            <DocumentCard
              key={el.id}
              jobId={jobId}
              fileName={el.fileName}
              id={el.id}
            />
          )}
        >
          <Heading size={"lg"}>No documents found.</Heading>
        </ListWrapper>
      </VerticalScrollArea>
    </FormTemplate>
  );
}
