var funnelD3ItemExtension = function(dashboardControl) {
    dashboardControl.registerIcon(FUNNEL_D3_ICON);

    return {
        name: FUNNEL_D3_EXTENSION_NAME,
        metaData: funnelMeta,
        createViewerItem: function(model, $element, content, args) {
            if(model.customItemType() === FUNNEL_D3_EXTENSION_NAME) {
                args.viewerItem = new funnelD3Item(model, $element, content);
            }
        }
    }
}