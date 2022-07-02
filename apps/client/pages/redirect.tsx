import React from "react";
import { useRouter } from "next/router";

interface IProps {
  url: string;
}

/**
 * 重定向
 */
const Redirect: React.FC<IProps> = (props) => {
  const router = useRouter();

  React.useEffect(() => {
    router.replace(props.url);
  }, [props.url, router]);

  // TODO: 重定向组件加个SVG
  return <h1>正在重定向。。。</h1>;
};

export default Redirect;
