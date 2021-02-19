/*
 * Copyright 2021 Spotify AB
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
import {createApiFactory, createPlugin, createRoutableExtension, discoveryApiRef} from '@backstage/core';

import { rootRouteRef } from './routes';
import {cmdbApiRef, CmdbClient} from "./api";

export const cmdbPlugin = createPlugin({
  id: 'cmdb',
  apis: [
    createApiFactory({
      api: cmdbApiRef,
      deps: { discoveryApi: discoveryApiRef },
      factory: ({ discoveryApi }) => new CmdbClient({ discoveryApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const CmdbPage = cmdbPlugin.provide(
  createRoutableExtension({
    component: () =>
      import('./components/CmdbComponent').then(m => m.CmdbComponent),
    mountPoint: rootRouteRef,
  }),
);
