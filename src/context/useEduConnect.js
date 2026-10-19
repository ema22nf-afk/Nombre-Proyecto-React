import { useContext } from "react";
import { EduConnectContext } from "./EduConnectContextDef";

export const useEduConnect = () => {
  const context = useContext(EduConnectContext);
  if (!context) {
    throw new Error("useEduConnect debe ser usado dentro de EduConnectProvider");
  }
  return context;
};
