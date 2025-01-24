import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { Link, useGetIdentity } from "@refinedev/core";
import {
  Avatar,
  Layout as AntdLayout,
  Space,
  Switch,
  theme,
  Typography,
  Menu,
} from "antd";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    // flexDirection: "column", // Allow vertical stacking
    padding: "0px 24px",
    // width: "100%",
  };

  const menuStyles: React.CSSProperties = {
    width: "100%",
    marginRight: "8px",
    borderRadius: "10px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const categories = [
    "Main Headlines",
    "Nation",
    "Kenya News",
    "World News",
    "Politics",
    "Sports",
    "Business",
    "Eve Woman",
    "Magazines",
    "Agriculture",
  ];

  return (
    <AntdLayout.Header style={headerStyles}>
      <Menu mode="horizontal" style={menuStyles}>
        {categories.map((category) => (
          <Menu.Item key={category}>
            <Link to={`/rss-feeds/${encodeURIComponent(category)}`}>{category}</Link>
          </Menu.Item>
        ))}
      </Menu>

      <Space style={{ justifyContent: "space-between", alignItems: "center" }}>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.name && <Text strong>{user.name}</Text>}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
