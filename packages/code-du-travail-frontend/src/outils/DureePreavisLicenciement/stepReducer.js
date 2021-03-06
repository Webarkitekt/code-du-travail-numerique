import { StepIntro } from "./steps/Introduction";
import { StepInfoCCn } from "./steps/InfosCCn";
import { StepResult } from "./steps/Result";
import { StepInformations } from "./steps/Informations";
import { StepStatus } from "./steps/Status";
import { isNotYetProcessed } from "../common/situations.utils";
import data from "@cdt/data...simulateurs/preavis-licenciement.data.json";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: StepIntro,
      name: "intro",
      label: "Introduction",
    },
    {
      component: StepStatus,
      name: "situation",
      label: "Situation du salarié",
    },
    {
      component: StepInfoCCn,
      name: "info_cc",
      label: "Convention collective",
    },
    {
      component: StepInformations,
      name: "infos",
      label: "Informations complémentaires",
      skip: (values) =>
        !values.ccn ||
        (values.ccn && isNotYetProcessed(data.situations, values.ccn.num)),
    },
    {
      component: StepResult,
      name: "results",
      label: "Durée du préavis",
    },
  ],
};

export function stepReducer(state, { type, payload }) {
  switch (type) {
    case "reset": {
      return { ...initialState };
    }
    case "setStepIndex": {
      return { stepIndex: payload, steps: state.steps };
    }
    default:
      console.warn("action unknow", type);
      return state;
  }
}
