import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp, BackTop } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import LandingPage from "./pages/landing-page/LandingPage";
import AdComponents from "./components/ads/Ads";
import { useEffect } from "react";
import usePageTracking from "./pages/google-analytics/usePageTracking";

function App() {
  usePageTracking();
  useEffect(() => {
    document.title = "Gazeti News";
  }, []);

  return (
    <RefineKbarProvider>
      <ColorModeContextProvider>
        <AntdApp>
          {/* <DevtoolsProvider> */}
          <Refine
            dataProvider={dataProvider("https://www.standardmedia.co.ke/rss")}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            resources={[]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "hruyUA-PNrke3-1w8ugX",
              title: { text: "Gazeti News", icon: <AppIcon /> },
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayoutV2
                    Header={() => <Header sticky />}
                    Sider={() => null}
                  >
                    <Outlet />
                    <AdComponents />
                    {/* <BackTop /> */}
                  </ThemedLayoutV2>
                }
              >


                <Route path="/" element={<LandingPage />} />
                <Route path="/rss-feeds/:category" element={<LandingPage />} />


                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          {/* <DevtoolsPanel /> */}
          {/* </DevtoolsProvider> */}
        </AntdApp>
      </ColorModeContextProvider>
    </RefineKbarProvider>
  );
}

export default App;
