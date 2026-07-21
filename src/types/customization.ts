export interface CustomizationDetails {
  embroideryText: string;
  babyName: string;
  babyAge: string;
  fontStyle: string;
  embroideryColor: string;
  giftWrap: boolean;
  giftMessage: string;
  specialNotes: string;
}

export const EMPTY_CUSTOMIZATION: CustomizationDetails = {
  babyName: "",
  babyAge: "",
  fontStyle: "Classic Script",
  embroideryColor: "Dusty Rose",
  giftWrap: false,
  giftMessage: "",
  specialNotes: "",
  embroideryText: ""
};
