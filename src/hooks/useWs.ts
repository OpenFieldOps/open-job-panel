import type { Treaty } from "@elysiajs/eden";
import type { EdenWS } from "@elysiajs/eden/treaty";
import { useEffect, useEffectEvent } from "react";

export function useWs<Ws extends EdenWS<object>, Payload>(
  connect: () => Ws,
  onMessage: (payload: Payload) => void
) {
  const onMessageEvent = useEffectEvent(
    (message: Treaty.OnMessage<Payload>) => {
      onMessage(message.data);
    }
  );

  const connectEvent = useEffectEvent(() => {
    return connect().on(
      "message",
      onMessageEvent as (event: Treaty.OnMessage<unknown>) => void
    );
  });

  useEffect(() => {
    const subscription = connectEvent();

    return () => {
      const ws = subscription.ws;

      if (ws.readyState === WebSocket.OPEN) {
        subscription.close();
        return;
      }

      if (ws.readyState === WebSocket.CONNECTING) {
        const handleOpen = () => {
          subscription.close();
        };
        ws.addEventListener("open", handleOpen, { once: true });
        return;
      }
    };
  }, []);
}
