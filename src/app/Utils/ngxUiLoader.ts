import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER} from "ngx-ui-loader";

export const ngxUiLoaderConfig: NgxUiLoaderConfig ={
  text:"Veilliez patienter...",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  pbColor: "white",
  bgsColor:"white",
  fgsColor:"white",
  fgsType: SPINNER.threeStrings,
  fgsSize:100,
  hasProgressBar:false,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5

};
