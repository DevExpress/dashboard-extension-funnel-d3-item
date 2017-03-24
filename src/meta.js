 var FUNNEL_D3_EXTENSION_NAME = 'FunnelD3';

 var funnelMeta = {
    bindings: [{
        propertyName: 'Values',
        dataItemType: 'Measure',
        array: true,
        enableColoring: true,
        displayName: 'DashboardWebCustomItemStringId.Values',
        emptyPlaceholder: 'DashboardWebCustomItemStringId.SetValue',
        selectedPlaceholder: 'DashboardWebCustomItemStringId.ConfigureValue'
    }, {
        propertyName: 'Arguments',
        dataItemType: 'Dimension',
        array: true,
        enableInteractivity: true,
        enableColoring: true,
        displayName: 'DashboardWebCustomItemStringId.Arguments',
        emptyPlaceholder: 'DashboardWebCustomItemStringId.SetArgument',
        selectedPlaceholder: 'DashboardWebCustomItemStringId.ConfigureArgument'
    }],
    properties: [{
        propertyName: 'FillType',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.buttonGroup,
        displayName: "DashboardWebCustomItemStringId.FillType",
        sectionName: 'DashboardWebCustomItemStringId.SectionName',
        values: {
            Solid: "DashboardWebCustomItemStringId.FillTypeSolid",
            Gradient: "DashboardWebCustomItemStringId.FillTypeGradient"
        },
        defaultVal: 'Solid'
    }, {
        propertyName: 'IsCurved',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.boolYesNo,
        displayName: 'DashboardWebCustomItemStringId.IsCurved',
        sectionName: 'DashboardWebCustomItemStringId.SectionName',
        defaultVal: false
    }, {
        propertyName: 'IsDynamicHeight',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.boolYesNo,
        displayName: 'DashboardWebCustomItemStringId.IsDynamicHeight',
        sectionName: 'DashboardWebCustomItemStringId.SectionName',
        defaultVal: true
    }, {
        propertyName: 'PinchCount',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.numeric,
        editorOptions: { min: 0 },
        displayName: 'DashboardWebCustomItemStringId.PinchCount',
        sectionName: 'DashboardWebCustomItemStringId.SectionName',
        defaultVal: 0
    }],
    interactivity: {
        filter: true,
        drillDown: true
    },
    icon: FUNNEL_D3_EXTENSION_NAME,
    title: 'DashboardWebCustomItemStringId.DefaultNameFunnelD3',
    index: 3
};
