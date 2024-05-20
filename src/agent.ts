import "amazon-connect-streams";
import * as Logger from "./logger";

const onRefresh: connect.AgentCallback = () => {
  Logger.log("agent.onRefresh");
};
const onAfterCallWork: connect.AgentCallback = () => {
  Logger.log({ func: "agent.onAfterCallWork" });
};
const onError: connect.AgentCallback = () => {
  Logger.error({ func: "agent.onError" });
};
const onWebSocketConnectionLost: connect.AgentCallback = () => {
  Logger.error({ func: "agent.onWebSocketConnectionLost" });
};
const onWebSocketConnectionGained: connect.AgentCallback = () => {
  Logger.info({ func: "agent.onWebSocketConnectionGained" });
};
const onSoftphoneError: connect.SoftphoneErrorCallback = (error) => {
  Logger.error({ func: "agent.onSoftphoneError", error });
};
const onMuteToggle: connect.AgentMutedStatusCallback = (agentMutedStatus) => {
  Logger.log({ func: "agent.onMuteToggle", agentMutedStatus });
};
const onNotRoutable: connect.AgentCallback = () => {
  Logger.log({ func: "agent.onNotRoutable" });
};
const onOffline: connect.AgentCallback = () => {
  Logger.log({ func: "agent.onOffline" });
};
const onRoutable: connect.AgentCallback = () => {
  Logger.log({ func: "agent.onRoutable" });
};
const onSpeakerDeviceChanged: connect.UserMediaDeviceChangeCallback = (
  userMediaDeviceChange
) => {
  Logger.log({
    func: "agent.onSpeakerDeviceChanged",
    userMediaDeviceChange,
  });
};
const onStateChange: connect.AgentStateChangeCallback = (agentStateChange) => {
  Logger.log({ func: "agent.onStateChange", agentStateChange });
};

export const agentCallBack: connect.AgentCallback = (agent: connect.Agent) => {
  const routingProfile = agent.getRoutingProfile();

  Logger.log({
    func: agentCallBack.name,
    routingProfileName: routingProfile.name,
    routingProfileQueues: routingProfile.queues,
    defaultOutboundQueue: routingProfile.defaultOutboundQueue,
    name: agent.getName(),
    extension: agent.getExtension(),
  });

  agent.onRefresh(onRefresh);
  agent.onStateChange(onStateChange);
  agent.onRoutable(onRoutable);
  agent.onNotRoutable(onNotRoutable);
  agent.onOffline(onOffline);
  agent.onError(onError);
  agent.onWebSocketConnectionLost(onWebSocketConnectionLost);
  agent.onWebSocketConnectionGained(onWebSocketConnectionGained);
  agent.onSoftphoneError(onSoftphoneError);
  agent.onAfterCallWork(onAfterCallWork);
  agent.onMuteToggle(onMuteToggle);
  agent.onSpeakerDeviceChanged(onSpeakerDeviceChanged);
};
