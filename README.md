A custom **FunnelD3** item allows you to render a funnel chart using the [D3Funnel](https://github.com/jakezatecky/d3-funnel/blob/master/README.md) JS library.

This dashboard item supports the following capabilities:

- [Master-Filtering](https://documentation.devexpress.com/#Dashboard/CustomDocument117060)
- [Drill-Down](https://documentation.devexpress.com/#Dashboard/CustomDocument117061)
- [Exporting](https://documentation.devexpress.com/#Dashboard/CustomDocument116694)
- Appearance Customization

## Installation

To add a custom Funnel3D item extension to the Web Dashboard, follow the steps below. 

1. Attach both the D3.js v4.x and D3Funnel scripts to the project. You can find these libraries here: [D3](https://github.com/d3/d3) and [D3Funnel](https://github.com/jakezatecky/d3-funnel).

```xml
<script src="/path/to/d3.v4.js"></script>
<script src="/path/to/dist/d3-funnel.js"></script>
```

2. Register the custom item extension in the Web Dashboard's [BeforeRender](https://documentation.devexpress.com/#Dashboard/DevExpressDashboardWebScriptsASPxClientDashboard_BeforeRendertopic) event.

```javascript
function onBeforeRender(sender) {
  var dashboardControl = sender.getDesigner();
  dashboardControl.registerExtension(funnelD3ItemExtension(dashboardControl));
}
```


## Settings
The **FunnelD3** dashboard item supports the following settings that you can configure in the Wed Dashboard UI:
* **Fill Type** - Specifies the funnel chart's *solid* or *gradient* fill type.
* **Curved** - Specifies whether the funnel is curved.
* **Dynamic Height** - Specifies whether the height of blocks are proportional to their weight.
* **Pinch Count** - Specifies how many blocks to pinch at the bottom to create a funnel "neck".
