var funnelD3ItemExtension = function(dashboardControl) {
    dashboardControl.registerIcon(FUNNEL_D3_ICON);

    return {
        name: FUNNEL_D3_EXTENSION_NAME,
        metaData: funnelMeta,
        createViewerItem: function (model, $element, content) {
            return new funnelD3Item(model, $element, content);
        }
    }
}