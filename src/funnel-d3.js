
var funnelD3ItemExtension = function(dashboardControl) {
    dashboardControl.registerIcon(FUNNEL_D3_ICON);
    return {
        name: "dxdde-funnel-d3",
        createViewerItem: function (item, $element, content, args) {
            if (item.customItemType && item.customItemType() === FUNNEL_D3_EXTENSION_NAME) {
                args.viewerItem = new funnelD3Item(item, $element, content);
            }
        }
    };
}
