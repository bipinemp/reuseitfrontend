import { TAppliance, TElectronics } from "@/types/postTypes";

type hello = {
  name: keyof TAppliance | keyof TElectronics;
};
