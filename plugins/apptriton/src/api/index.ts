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

import { createApiRef, DiscoveryApi } from '@backstage/core';

export type ApptritonApplication = {
  id: string;
  name: string;
};

export type ApptritonApplications = {
  applications: ApptritonApplication[];
};

export const apptritonApiRef = createApiRef<ApptritonApi>({
  id: 'plugin.apptriton.service',
  description: 'Used by the Apptriton plugin to make requests',
});

const DEFAULT_PROXY_PATH_BASE = '/apptriton/api';

type Options = {
  discoveryApi: DiscoveryApi;
  /**
   * Path to use for requests via the proxy, defaults to /newrelic
   */
  proxyPathBase?: string;
};

export interface ApptritonApi {
  getApplications(): Promise<ApptritonApplications>;
}

export class ApptritonClient implements ApptritonApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly proxyPathBase: string;

  constructor(options: Options) {
    this.discoveryApi = options.discoveryApi;
    this.proxyPathBase = options.proxyPathBase ?? DEFAULT_PROXY_PATH_BASE;
  }

  async getApplications(): Promise<ApptritonApplications> {
    const url = await this.getApiUrl('applications?_order_by=name&_fields=id,name');
    const response = await fetch(url);
    let responseJson;

    try {
      responseJson = await response.json();
    } catch (e) {
      responseJson = [];
    }

    if (response.status !== 200) {
      throw new Error(
        `Error communicating with Apptriton Server: ${
          responseJson?.error?.title || response.statusText
        }`,
      );
    }

    return responseJson.results || [];
  }

  private async getApiUrl( path: string) {
    const proxyUrl = await this.discoveryApi.getBaseUrl('proxy');
    return `${proxyUrl}${this.proxyPathBase}/v1/${path}`;
  }
}
