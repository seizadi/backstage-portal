# cmdb

Welcome to the cmdb plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/cmdb](http://localhost:3000/cmdb).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

## Proxy Settings

Reference [Backstage proxy configuration](https://backstage.io/docs/plugins/proxying)

```yaml
# in app-config.yaml
proxy:
  '/cmdb-api':
    target: http://localhost:8080
    headers:
      Content-Type: 'application/json'
      Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50SUQiOjF9.GsXyFDDARjXe1t9DPo2LIBKHEal3O7t3vLI3edA7dGU',
```
