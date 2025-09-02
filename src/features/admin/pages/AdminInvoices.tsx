import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import { useTranslation } from "react-i18next";

export default function AdminInvoices() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageTitleWithToolbar title={t("adminInvoices.title")} />
    </PageContainer>
  );
}
