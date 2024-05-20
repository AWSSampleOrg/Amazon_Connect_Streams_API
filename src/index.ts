import "./style.css";
import "amazon-connect-streams";
import { agentCallBack } from "./agent";
import { contactCallback } from "./contact";

const appElement = document.querySelector<HTMLElement>("#app");
const INSTANCE_URL = import.meta.env.VITE_INSTANCE_URL;
const AWS_REGION = import.meta.env.VITE_AWS_REGION;

if (appElement) {
  connect.core.initCCP(appElement, {
    ccpUrl: INSTANCE_URL,
    loginPopup: true, // optional, defaults to `true`
    loginPopupAutoClose: true, // optional, defaults to `false`
    loginOptions: {
      // optional, if provided opens login in new window
      autoClose: true, // optional, defaults to `false`
      height: 600, // optional, defaults to 578
      width: 400, // optional, defaults to 433
      top: 0, // optional, defaults to 0
      left: 0, // optional, defaults to 0
    },
    region: AWS_REGION, // REQUIRED for `CHAT`, optional otherwise
    softphone: {
      // optional, defaults below apply if not provided
      allowFramedSoftphone: true, // optional, defaults to false
      // disableRingtone: false, // optional, defaults to false
      // ringtoneUrl: "[your-ringtone-filepath].mp3", // optional, defaults to CCP’s default ringtone if a falsy value is set
      // allowFramedVideoCall: true, // optional, default to false
      // allowEarlyGum: true, //optional, default to true
    },
    // task: {
    //   disableRingtone: false, // optional, defaults to false
    //   ringtoneUrl: "[your-ringtone-filepath].mp3", // optional, defaults to CCP's default ringtone if a falsy value is set
    // },
    // pageOptions: {
    //   enableAudioDeviceSettings: false, //optional, defaults to 'false'
    //   enableVideoDeviceSettings: false, //optional, defaults to 'false'
    //   enablePhoneTypeSettings: true, //optional, defaults to 'true'
    // },
    ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
    ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
    ccpLoadTimeout: 10000, //optional, defaults to 5000 (ms)
  });
  connect.agent(agentCallBack);
  connect.contact(contactCallback);
  connect.onWebsocketInitFailure(() => {});
}
