export type payloadType = {
  USER_LOGIN: { user: { login: string; isLogined: boolean } };
  USER_EXTERNAL_LOGOUT: { user: { login: string; isLogined: boolean } };
  USER_EXTERNAL_LOGIN: { user: { login: string; isLogined: boolean } };
  USER_ACTIVE: { users: [] };
  USER_INACTIVE: { users: [] };
  USER_LOGOUT: { user: { login: string; isLogined: boolean } };
  MSG_SEND: {
    message: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
  MSG_FROM_USER: {
    messages: {
      id: string;
      from: string;
      to: string;
      text: string;
      datetime: number;
      status: {
        isDelivered: boolean;
        isReaded: boolean;
        isEdited: boolean;
      };
    };
  };
  MSG_DELIVER: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
  MSG_DELETE: {
    message: {
      id: string;
      status: {
        isDeleted: boolean;
      };
    };
  };
  MSG_EDIT: {
    message: {
      id: string;
      text: string;
      status: {
        isEdited: boolean;
      };
    };
  };
  MSG_READ: {
    message: {
      id: string;
      status: {
        isReaded: boolean;
      };
    };
  };
  ERROR: {
    error: string;
  };
};

export type ServerMessage<T extends keyof payloadType = keyof payloadType> = {
  id: string; // null?
  type: T;
  payload: payloadType[T];
};
