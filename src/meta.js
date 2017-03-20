
var FUNNEL_D3_EXTENSION_NAME = 'FunnelD3';
DevExpress.JS.Dashboard.itemTypesMap[FUNNEL_D3_EXTENSION_NAME] = {
    type: DevExpress.JS.Dashboard.CustomItem,
    customItemType: FUNNEL_D3_EXTENSION_NAME,
    bindings: [{
            propertyName: 'Values',
            dataItemType: 'Measure',
            array: true,
            slice: 'data',
            displayName: 'DashboardWebCustomItemStringId.Values',
            placeholder: 'DashboardWebCustomItemStringId.SetValue',
            configurePlaceholder: 'DashboardWebCustomItemStringId.ConfigureValue'
        }, {
            propertyName: 'Arguments',
            dataItemType: 'Dimension',
            array: true,
            slice: 'data',
            interactivityEnabled: true,
            coloringEnabled: true,
            displayName: 'DashboardWebCustomItemStringId.Arguments',
            placeholder: 'DashboardWebCustomItemStringId.SetArgument',
            configurePlaceholder: 'DashboardWebCustomItemStringId.ConfigureArgument'
        }],
    properties: [{
            propertyName: 'FillType',
            editor: DevExpress.JS.Dashboard.Metadata.editorTemplates.buttonGroup,
            displayName: "DashboardWebCustomItemStringId.FillType",
            sectionName: 'DashboardWebCustomItemStringId.SectionName',
            values: {
                Solid: "DashboardWebCustomItemStringId.FillTypeSolid",
                Gradient: "DashboardWebCustomItemStringId.FillTypeGradient"
            },
            defaultVal: 'Solid'
        }, {
            propertyName: 'IsCurved',
            editor: DevExpress.JS.Dashboard.Metadata.editorTemplates.boolYesNo,
            displayName: 'DashboardWebCustomItemStringId.IsCurved',
            sectionName: 'DashboardWebCustomItemStringId.SectionName',
            defaultVal: false
        }, {
            propertyName: 'IsDynamicHeight',
            editor: DevExpress.JS.Dashboard.Metadata.editorTemplates.boolYesNo,
            displayName: 'DashboardWebCustomItemStringId.IsDynamicHeight',
            sectionName: 'DashboardWebCustomItemStringId.SectionName',
            defaultVal: true
        }, {
            propertyName: 'PinchCount',
            editor: DevExpress.JS.Dashboard.Metadata.editorTemplates.numeric,
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
    groupName: "custom",
    groupTitle: 'DashboardWebCustomItemStringId.ToolBoxCustomItemCaption',
    title: 'DashboardWebCustomItemStringId.DefaultNameFunnelD3',
    index: 3
};
