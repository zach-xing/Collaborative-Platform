import React from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import CloudDocument from "../../../components/CloudDocument";
import useLocalStorage from "../../../hooks/use-localStorage";

/**
 * 编辑的文档
 */
const CloudDocumentPage = () => {
  const [user, _] = useLocalStorage("user", {} as any);

  const hocuspocusProvider = React.useMemo(() => {
    return new HocuspocusProvider({
      url: "ws://localhost:8889",
      name: user.id,
      token: (user && user.access_token) || "read-public",
      parameters: {
        userId: user && user.id,
        docType: "file-Zeekg",
      },
      maxAttempts: 1,
      // onAwarenessUpdate: throttle(({ states }) => {
      //   const users = states.map((state) => ({
      //     clientId: state.clientId,
      //     user: state.user,
      //   }));
      //   if (deepEqual(user, lastAwarenessRef.current)) {
      //     return;
      //   }
      //   onAwarenessUpdate && onAwarenessUpdate(users);
      //   lastAwarenessRef.current = users;
      // }, 200),
      // onAuthenticationFailed() {
      //   toggleLoading(false);
      //   setError(new Error("鉴权失败！暂时无法提供服务"));
      // },
      // onSynced() {
      //   toggleLoading(false);
      // },
      // onStatus({ status }) {
      //   setStatus(status);
      // },
    } as any);
  }, [user]);

  return (
    <>
      <CloudDocument hocuspocusProvider={hocuspocusProvider} />
    </>
  );
};

export default CloudDocumentPage;
