/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  AlertDisplay,
  createApp,
  createRouteRef,
  FlatRoutes,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core';
import { Router as CatalogRouter } from '@backstage/plugin-catalog';
import { CatalogImportPage } from '@backstage/plugin-catalog-import';
import { ExplorePage } from '@backstage/plugin-explore';
import { Router as GraphiQLRouter } from '@backstage/plugin-graphiql';
import { Router as LighthouseRouter } from '@backstage/plugin-lighthouse';
import { Router as RegisterComponentRouter } from '@backstage/plugin-register-component';
import { Router as TechRadarRouter } from '@backstage/plugin-tech-radar';
import { Router as DocsRouter } from '@backstage/plugin-techdocs';
import { Router as SettingsRouter } from '@backstage/plugin-user-settings';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Navigate, Route } from 'react-router';
import { apis } from './apis';
import { EntityPage } from './components/catalog/EntityPage';
import Root from './components/Root';
import { providers } from './identityProviders';
import * as plugins from './plugins';
import { ApptritonPage } from 'plugin-Apptriton';

const app = createApp({
  apis,
  plugins: Object.values(plugins),
  components: {
    SignInPage: props => {
      return (
        <SignInPage
          {...props}
          providers={['guest', 'custom', ...providers]}
          title="Select a sign-in method"
          align="center"
        />
      );
    },
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();
const deprecatedAppRoutes = app.getRoutes();

const catalogRouteRef = createRouteRef({
  path: '/catalog',
  title: 'Service Catalog',
});

const routes = (
  <FlatRoutes>
    <Navigate key="/" to="/catalog" />
    <Route path="/catalog-import" element={<CatalogImportPage />} />
    <Route
      path={`${catalogRouteRef.path}`}
      element={<CatalogRouter EntityPage={EntityPage} />}
    />
    <Route path="/docs" element={<DocsRouter />} />
    <Route path="/explore" element={<ExplorePage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarRouter width={1500} height={800} />}
    />
    <Route path="/graphiql" element={<GraphiQLRouter />} />
    <Route path="/lighthouse" element={<LighthouseRouter />} />
    <Route
      path="/register-component"
      element={<RegisterComponentRouter catalogRouteRef={catalogRouteRef} />}
    />
    <Route path="/settings" element={<SettingsRouter />} />
    {...deprecatedAppRoutes}
    <Route path="/Apptriton" element={<ApptritonPage />}/>
  </FlatRoutes>
);

const App = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </AppProvider>
);

export default hot(App);
