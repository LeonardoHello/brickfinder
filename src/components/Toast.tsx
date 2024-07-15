import { Toast as ToastComponent, useToastState } from "@tamagui/toast";
import { YStack } from "tamagui";

export default function Toast() {
  const currentToast = useToastState();
  if (!currentToast || currentToast.isHandledNatively) return null;

  return (
    <ToastComponent
      theme={"blue"}
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: 25 }}
      exitStyle={{ opacity: 0, scale: 1, y: 20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <ToastComponent.Title>{currentToast.title}</ToastComponent.Title>

        {!!currentToast.message && (
          <ToastComponent.Description>
            {currentToast.message}
          </ToastComponent.Description>
        )}
      </YStack>
    </ToastComponent>
  );
}
