import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { Detector } from "react-detect-offline";

type Action = {
  type: string;
  payload?: any;
  key?: string | number | symbol | any;
  value?: any;
  meta?: any;
};

export { autoMergeLevel2, Detector, Action };
