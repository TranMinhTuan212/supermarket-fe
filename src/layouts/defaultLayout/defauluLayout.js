import classNames from "classnames/bind";
import styles from "./defaultLayout.module.scss";
import SideBar from "~/components/sideBar";
import Content from "~/components/content";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userKey } from "~/key";
import { pages } from "~/config";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const navigate = useNavigate();

  const [max, setWidth] = useState(true);

  function handleSetWidthSidebar() {
    setWidth((width) => !width);
  }

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem(userKey))
    if(!user){
      navigate(pages.login)
    }
  }, [])

  return (
    <div className={cx("wapper")}>
      <div
        style={max === true ? { width: "20%" } : { width: "5%" }}
        className={cx("side-bar")}
      >
        <SideBar onWidth={handleSetWidthSidebar} width={max} />
      </div>

      <div className={cx("content")}>
        <Content>{children}</Content>
      </div>
    </div>
  );
}

export default DefaultLayout;
