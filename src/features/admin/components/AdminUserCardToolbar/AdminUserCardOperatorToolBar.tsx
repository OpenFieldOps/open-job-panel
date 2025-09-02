import { TriggeredDialog } from "@/components/dialog/ButtonDialog";
import { Button, Heading } from "@chakra-ui/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import AdminOperatorJobsModal from "../AdminOperatorJobsModal";

function UserMapDialogContent() {
  return (
    <MapContainer
      style={{
        width: "400px",
        height: "400px",
      }}
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

function OperatorLocationDialog() {
  return (
    <TriggeredDialog
      trigger={<Button>View Map</Button>}
      dialogRootProps={{
        size: "full",
      }}
      dialogContentprops={{
        height: "100%",
        width: "100%",
      }}
    >
      <Heading size="md" mb={4}>
        Operator Location
      </Heading>
      <UserMapDialogContent />
    </TriggeredDialog>
  );
}

type UserCardProps = {
  userId: number;
};

export function AdminUserCardOperatorToolBar({ userId }: UserCardProps) {
  return (
    <>
      <AdminOperatorJobsModal operatorId={userId}>
        <Button variant={"outline"} colorPalette={"blue"}>
          View Active Jobs
        </Button>
      </AdminOperatorJobsModal>
      <OperatorLocationDialog />
    </>
  );
}
