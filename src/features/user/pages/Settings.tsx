import PageTitleWithToolbar from "@/components/block/PageTitleWithToolbar";
import PageContainer from "@/components/container/PageContainer";
import { Field, NativeSelect, Separator } from "@chakra-ui/react";
import { useTranslation as useTypedTranslation } from "@/hooks/useTranslation";

import { useTranslation } from "react-i18next";

export default function Settings() {
  const { i18n } = useTranslation();
  const { t } = useTypedTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  };
  return (
    <PageContainer card>
      <PageTitleWithToolbar title={t("settings.title")} />
      <Separator my={4} />
      <Field.Root>
        <Field.Label>{t("settings.language")}</Field.Label>
        <NativeSelect.Root size="sm" width="240px">
          <NativeSelect.Field
            value={i18n.language}
            onChange={handleChange}
            placeholder={t("settings.selectLanguage")}
          >
            <option value="en">{t("settings.english")}</option>
            <option value="fr">{t("settings.french")}</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    </PageContainer>
  );
}
