import {
  Card,
  DownloadTrigger,
  HStack,
  Input,
  Spinner,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import type { FileModel } from "backend/modules/models/FileModel";
import { Download, Edit, Folder, SquareCheck, Trash } from "lucide-react";
import { useState } from "react";
import { QueryCacheKey } from "@/app/queryClient";
import { useUserRole } from "@/atoms/userAtom";
import FormTemplate from "@/components/block/FormTemplate";
import { OutlineIconButton } from "@/components/buttons/Button";
import FileInput from "@/components/form/FileInput";
import { toaster } from "@/components/ui/contants";
import OperatorJobEditForm from "@/features/operator/components/OperatorJobEdit";
import {
  apiClient,
  apiQueryCacheListAdd,
  apiQueryCacheListDelete,
  ok,
} from "@/lib/apiClient";
import { useJobDocuments } from "../hooks/useJobDocument";
import { JobEditForm } from "./JobEditForm";

type JobDialogContantProps = {
  jobId: number;
  onSave: () => void;
};

export default function JobDialogContent({
  jobId,
  onSave,
}: JobDialogContantProps) {
  const role = useUserRole();
  return (
    <Tabs.Root lazyMount defaultValue="edit" w={"full"}>
      <Tabs.List justifyContent={"center"}>
        <Tabs.Trigger value="edit">
          <Edit />
          Edit
        </Tabs.Trigger>
        <Tabs.Trigger value="documents">
          <Folder />
          Documents
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          <SquareCheck />
          Tasks
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="edit" justifyContent={"center"}>
        {role === "admin" ? (
          <JobEditForm jobId={jobId} onSave={onSave} />
        ) : (
          <OperatorJobEditForm jobId={jobId} />
        )}
      </Tabs.Content>
      <Tabs.Content value="documents">
        <DocumentsTab jobId={jobId} />
      </Tabs.Content>
      <Tabs.Content value="tasks">
        <TasksTab />
      </Tabs.Content>
    </Tabs.Root>
  );
}

function TasksTab() {
  return <FormTemplate confirmText="Add"></FormTemplate>;
}

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
  const role = useUserRole();
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
            {role === "admin" && (
              <OutlineIconButton onClick={() => deleteJobFile(jobId, id)}>
                <Trash />
              </OutlineIconButton>
            )}
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

type DocumentsListProps = {
  documents?: FileModel.DbFile[] | null;
  jobId: number;
};

function DocumentsList({ documents, jobId }: DocumentsListProps) {
  if (documents?.length) {
    return documents.map((el) => (
      <DocumentCard
        key={el.id}
        jobId={jobId}
        fileName={el.fileName}
        id={el.id}
      />
    ));
  }
  return <p>No documents found.</p>;
}

function DocumentsTab({ jobId }: { jobId: number }) {
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
    <FormTemplate trigger={<FileInput onUpload={onUploadFile} />}>
      <Input
        placeholder="Search documents"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <VStack overflowY={"scroll"} maxH={"55vh"} w={"full"} gap={2}>
        <DocumentsList jobId={jobId} documents={filteredDocuments} />
      </VStack>
    </FormTemplate>
  );
}
