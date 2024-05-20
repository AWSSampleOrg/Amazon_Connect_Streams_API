import "amazon-connect-streams";
import * as Logger from "./logger";

const onRefresh: connect.ContactCallback = (contact) => {
  Logger.log({ func: "contact.onRefresh" });

  const conns = contact.getConnections();
  Logger.log({
    conns: conns.map((c) => ({
      contactId: c.contactId,
      connectionId: c.connectionId,
    })),
  });

  if (contact.getActiveInitialConnection()?.isOnHold()) {
    Logger.log("isOnHold!");
  }
};

const onConnecting: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "onConnecting",
    contactId: contact.getContactId(),
  });
  if (contact.isInbound()) {
    Logger.log({
      func: "isInbound",
      contactId: contact.getContactId(),
    });
  }
};
const onIncoming: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "contact.onIncoming",
    contactId: contact.getContactId(),
  });
};
const onAccepted: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "contact.onAccepted",
    contactId: contact.getContactId(),
  });
};
const onMissed: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "contact.onMissed",
    contactId: contact.getContactId(),
  });
};
const onEnded: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "contact.onEnded",
    contactId: contact.getContactId(),
  });
};
const onDestroy: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "contact.onDestroy",
    contactId: contact.getContactId(),
  });
};
const onACW: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "contact.onACW",
    contactId: contact.getContactId(),
  });
};
const onConnected: connect.ContactCallback = (contact) => {
  Logger.log({
    func: "contact.onConnected",
    contactId: contact.getContactId(),
  });
};
const onError: connect.ContactCallback = (contact) => {
  Logger.warn({
    func: "contact.onError",
    contactId: contact.getContactId(),
  });
};

export const contactCallback: connect.ContactCallback = (contact) => {
  const conn = contact.getActiveInitialConnection();
  if (!conn) {
    Logger.info({
      func: contactCallback.name,
      message: "activeInitialConnection can't be gotten",
    });
    return;
  }

  const message = {
    func: contactCallback.name,
    queueName: contact.getQueue().name,
    connType: conn.getType(),
    waitingSeconds:
      (new Date().getTime() - contact.getQueueTimestamp().getTime()) / 1000,
  };

  if (contact.getType() === connect.ContactType.VOICE) {
    Logger.info({
      ...message,
      phoneNumber: conn.getEndpoint().phoneNumber,
    });
  } else {
    Logger.info(message);
  }

  contact.onRefresh(onRefresh);
  contact.onIncoming(onIncoming);
  contact.onConnecting(onConnecting);
  contact.onAccepted(onAccepted);
  contact.onMissed(onMissed);
  contact.onEnded(onEnded);
  contact.onDestroy(onDestroy);
  contact.onACW(onACW);
  contact.onConnected(onConnected);
  contact.onError(onError);
};
