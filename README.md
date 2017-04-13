A custom **FunnelD3** item allows you to render a funnel chart using the [D3Funnel](https://github.com/jakezatecky/d3-funnel/blob/master/README.md) JS library.

![image](https://cloud.githubusercontent.com/assets/17986517/25003741/907a39e0-2059-11e7-8540-312534ec2bad.png)

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

## License

This extension is distributed under the **MIT** license (free and open-source), but can only be used with a commercial DevExpress Dashboard software product. You can [review the license terms](https://www.devexpress.com/Support/EULAs/NetComponents.xml) or [download a free trial version](https://go.devexpress.com/DevExpressDownload_UniversalTrial.aspx) of the Dashboard suite at [DevExpress.com](https://www.devexpress.com).

## Support & Feedback

* Follow [this guideline](https://www.devexpress.com/Support/Center/Question/Details/T491859) for general information about a custom extension.
* To learn how to create a custom item, see the following [KB article](https://www.devexpress.com/Support/Center/Question/Details/T491984).
* To address questions regarding the Web Dashboard and JavaScript API, use [DevExpress Support Center](https://www.devexpress.com/Support/Center).
