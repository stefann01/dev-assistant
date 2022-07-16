import React from "react";
import NavItem from "../components/NavItem/NavItem";
import NavSectionTitle from "../components/NavSectionTitle/NavSectionTitle";
import styles from "./SideBar.module.scss";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../assets/svg/left-arrow.svg";
import { ReactComponent as RightArrow } from "../assets/svg/right-arrow.svg";
import { ReactComponent as DataModel } from "../assets/svg/dataModel.svg";
import { ReactComponent as ColorConvertor } from "../assets/svg/colorConvertor.svg";
import { ReactComponent as Gradient } from "../assets/svg/gradient.svg";
import { ReactComponent as BorderRadius } from "../assets/svg/borderRadius.svg";
import { ReactComponent as Shadow } from "../assets/svg/shadow.svg";
import { ReactComponent as ReactLogo } from "../assets/svg/react.svg";
import { ReactComponent as Animation } from "../assets/svg/animation.svg";
import { ReactComponent as DevAssistantLogo } from "../assets/svg/DevAssistantLogo.svg";

export default function SideBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div
      className={`${styles.sidebarContainer} ${
        isOpen ? styles.expandedContainer : styles.collapsedContainer
      }`}
    >
      <div className={styles.logoContainer}>
        {isOpen && <DevAssistantLogo onClick={() => navigate("/")} />}

        <div
          className={styles.hideArrow}
          onClick={() => setIsOpen(!isOpen)}
          style={{ marginLeft: isOpen ? "10px" : "" }}
        >
          {isOpen ? (
            <LeftArrow width={16} height={16} />
          ) : (
            <RightArrow width={16} height={16} />
          )}
        </div>
      </div>

      <NavSectionTitle title={isOpen ? "Code" : "C"} />
      <div className={styles.codeItemsContainer}>
        <NavItem
          title={"Data model"}
          onClick={() => navigate("/class-generator")}
          icon={<DataModel width={18} height={18} />}
          isCollapsed={!isOpen}
        />

        {/* <NavItem
          title="Rems & pixels"
          onClick={() => navigate("/rems-pixels")}
          icon={"RP"}
          isCollapsed={!isOpen}
        /> */}
      </div>

      <NavSectionTitle title={isOpen ? "React" : "R"} />
      <div className={styles.codeItemsContainer}>
        <NavItem
          title="React Component"
          onClick={() => navigate("/react-component")}
          isCollapsed={!isOpen}
          icon={<ReactLogo width={18} height={18} />}
        />
        <NavItem
          title="React Context"
          onClick={() => navigate("/react-context")}
          isCollapsed={!isOpen}
          icon={<ReactLogo width={18} height={18} />}
        />

        <NavItem
          title="React Reducer"
          onClick={() => navigate("/react-reducer")}
          isCollapsed={!isOpen}
          icon={<ReactLogo width={18} height={18} />}
        />

        <NavItem
          title="React Cool Hooks & Tricks"
          onClick={() => navigate("/react-cool-hooks")}
          isCollapsed={!isOpen}
          icon={<ReactLogo width={18} height={18} />}
        />
      </div>

      <NavSectionTitle title={isOpen ? "Angular" : "A"} />
      <div className={styles.codeItemsContainer}>
        <NavItem
          title="Angular Component"
          onClick={() => navigate("/angular-component")}
          isCollapsed={!isOpen}
          icon={<ReactLogo width={18} height={18} />}
        />
        <NavItem
          title="Angular Service"
          onClick={() => navigate("/angular-service")}
          isCollapsed={!isOpen}
          icon={<ReactLogo width={18} height={18} />}
        />
        <NavItem
          title="Angular Directive"
          onClick={() => navigate("/angular-directive")}
          isCollapsed={!isOpen}
          icon={<ReactLogo width={18} height={18} />}
        />
      </div>

      <NavSectionTitle title="UI" />

      <div className={styles.codeItemsContainer}>
        <NavItem
          title="Color convertor"
          onClick={() => navigate("/color-convertor")}
          icon={<ColorConvertor width={18} height={18} />}
          isCollapsed={!isOpen}
        />
        <NavItem
          title="Gradient generator"
          onClick={() => navigate("/gradient-generator")}
          isCollapsed={!isOpen}
          icon={<Gradient width={18} height={18} />}
        />
        <NavItem
          title="Radius generator"
          onClick={() => navigate("/radius-generator")}
          isCollapsed={!isOpen}
          icon={<BorderRadius width={18} height={18} />}
        />
        <NavItem
          title="Shadow generator"
          onClick={() => navigate("/shadow-generator")}
          isCollapsed={!isOpen}
          icon={<Shadow width={18} height={18} />}
        />
        <NavItem
          title="Animation generator"
          onClick={() => navigate("/animation-generator")}
          isCollapsed={!isOpen}
          icon={<Animation width={18} height={18} />}
        />
      </div>
    </div>
  );
}
