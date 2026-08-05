export interface CustomizationDetails {
  embroideryText: string;
  babyName: string;
  babyAge: string;
  size: string;
  romperName: string;
  capName: string;
  bow: string;
  designImageName: string;
  fontStyle: string;
  embroideryColor: string;
  giftWrap: boolean;
  giftMessage: string;
  specialNotes: string;
  contactNumber: string;
}

export const EMPTY_CUSTOMIZATION: CustomizationDetails = {
  babyName: "",
  babyAge: "",
  size: "",
  romperName: "",
  capName: "",
  bow: "",
  designImageName: "",
  fontStyle: "Classic Script",
  embroideryColor: "Dusty Rose",
  giftWrap: false,
  giftMessage: "",
  specialNotes: "",
  embroideryText: "",
  contactNumber: "",
};
