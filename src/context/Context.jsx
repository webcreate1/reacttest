import { useReducer, createContext, useContext } from "react";

const ChatContext = createContext();
const initialState = {
  chat: {
    chat1: { id: "chat1", message: [] },
    chat2: { id: "chat1", message: [] },
  },
  activeId: "newChat",
};

function reducer(state, action) {
  let ID = Date.now();
  switch (action.type) {
    case "NewChat":
      return {
        ...state,
        chat: { ...state.chat, [ID]: { id: [ID], message: [] } },
        activeId: ID,
      };
    case "NewMsg":
      return {
        ...state,
        chat: {
          ...state.chat,
          [state.activeId]: {
            ...state.chat[state.activeId],
            messages: [...state.chat[state.activeId].message, action.playload],
          },
        },
      };
    case "SET_ACTIVE":
      return { ...state, activeId: action.playload };
    default:
      return state;
  }
}
export const ChatProvider = ({ Children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {Children}
    </ChatContext.Provider>
  );
};

export const ChatDetails = () => {
  return useContext(ChatContext);
};
