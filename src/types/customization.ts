export interface CustomizationDetails {
  embroideryText: string;
  babyName: string;
  babyAge: string;
  size: string;
  romperName: string;
  capName: string;
  bow: string;
  designImageName: string;
  designImageUrl: string;
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
  designImageUrl: "",
  fontStyle: "Classic Script",
  embroideryColor: "Dusty Rose",
  giftWrap: false,
  giftMessage: "",
  specialNotes: "",
  embroideryText: "",
  contactNumber: "",
};
