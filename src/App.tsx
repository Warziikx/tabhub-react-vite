import frFR from 'antd/locale/fr_FR';

import { BrowserRouter, Routes, Route, Navigate, RouteProps } from "react-router-dom";
import "@/utils/axiosInterceptor";
import "antd/dist/reset.css";
import "./App.css";

/* PAGES */
import { Accueil } from "@/pages/Accueil";
import { Trash } from "@/pages/Trash";
import { CollectionPage } from "@/pages/CollectionPage";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";

/* UTILS */
import { APP_ROUTES } from "@/utils/constant";
import ProtectedRoute, { ProtectedRouteProps } from "@/utils/ProtectedRoute";

/* CONTEXT */
import useTabhubContext, { AuthProvider } from "@/lib/context/TabhubContext";
import { CollectionProvider } from "@/lib/context/CollectionContext";

/* COMPONENTS */
import { TabHubLayout } from "@/components/layout/TabhubLayout";
import { ConfigProvider, notification } from "antd";

function Router() {
	const { tokens } = useTabhubContext();
	const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
		isAuthenticated: !!tokens,
		authenticationPath: APP_ROUTES.LOG_IN,
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<ProtectedRoute
						{...defaultProtectedRouteProps}
						outlet={
							<CollectionProvider>
								<TabHubLayout />
							</CollectionProvider>
						}
					/>
				}
			>
				<Route index element={<Accueil />} />
				<Route path="collection/:collectionId" element={<CollectionPage />} />
				<Route path={APP_ROUTES.TRASH} element={<Trash />} />
			</Route>

			<Route
				//exact
				path={APP_ROUTES.LOG_IN}
				element={<Login />}
			/>
			<Route
				//exact
				path={APP_ROUTES.REGISTER}
				element={<Register />}
			/>
		</Routes>
	);
}

function App() {
	const [contextHolder] = notification.useNotification();
	return (
		<ConfigProvider theme={{ token: { colorPrimary: '#91AE8D' } }} locale={frFR}>
			<BrowserRouter>
				<AuthProvider>
					<Router />

				</AuthProvider>
			</BrowserRouter>
		</ConfigProvider>

	);
}

export default App;
