import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route, Navigate, RouteProps } from "react-router-dom";
import "@/utils/axiosInterceptor";
import "antd/dist/reset.css";
import "./App.css";

/* PAGES */
import { Accueil } from "@/pages/Accueil";
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
	return (
		<BrowserRouter>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
