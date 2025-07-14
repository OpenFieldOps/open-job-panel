import { Card, Separator } from "@chakra-ui/react";
import { Heading } from "lucide-react";

type DashboardBlockProps = {
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
};

export function DashboardBlock({
  title,
  content,
  actions,
}: DashboardBlockProps) {
  return (
    <Card.Root>
      <Card.Header>
        <Heading size="md">{title}</Heading>
        <Separator />
      </Card.Header>
      <Card.Body>{content}</Card.Body>
      <Card.Footer>{actions}</Card.Footer>
    </Card.Root>
  );
}
