
DevExpress.JS.Localization.addCultureInfo({ messages: {
    // Binding Panel
    'DashboardWebCustomItemStringId.ToolBoxCustomItemCaption': "Custom Items",
    'DashboardWebCustomItemStringId.DefaultNameFunnelD3': "Funnel D3",
    'DashboardWebCustomItemStringId.Values': "Values",
    'DashboardWebCustomItemStringId.SetValue': "Set Value",
    'DashboardWebCustomItemStringId.ConfigureValue': "Configure Value",
    'DashboardWebCustomItemStringId.Arguments': "Arguments",
    'DashboardWebCustomItemStringId.SetArgument': "Set Argument",
    'DashboardWebCustomItemStringId.ConfigureArgument': "Configure Argument",
    // Options
    'DashboardWebCustomItemStringId.IsCurved': 'Curved',
    'DashboardWebCustomItemStringId.IsDynamicHeight': 'Dynamic Height',
    'DashboardWebCustomItemStringId.PinchCount': 'Pinch Count',
    'DashboardWebCustomItemStringId.FillType': "Fill Type",
    'DashboardWebCustomItemStringId.FillTypeSolid': "Solid",
    'DashboardWebCustomItemStringId.FillTypeGradient': "Gradient",
    'DashboardWebCustomItemStringId.SectionName': 'Settings'
}() });


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

var FUNNEL_D3_ICON = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <svg version=\"1.1\" id=\"" + FUNNEL_D3_EXTENSION_NAME +"\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t            viewBox=\"4 -4 24 24\" style=\"enable-background:new 4 -4 24 24;\" xml:space=\"preserve\">\n        <style type=\"text/css\">\n\t        .dx_violet{fill:#8080C0;}\n\t        .dx_gray{fill:#7B7B7B;}\n\t        .dx_darkgray{fill:#414141;}\n        </style>\n        <path class=\"dx_darkgray\" d=\"M24.9-2h-9.8C14.5-2,14-1.5,14-0.9V4h5v6h5.9c0.6,0,1.1-0.5,1.1-1.1v-9.8C26-1.5,25.5-2,24.9-2z\"/>\n        <path class=\"dx_gray\" d=\"M20.9,2h-9.8C10.5,2,10,2.5,10,3.1V8h6v6h4.9c0.6,0,1.1-0.5,1.1-1.1V3.1C22,2.5,21.5,2,20.9,2z\"/>\n        <path class=\"dx_violet\" d=\"M16.9,18H7.1C6.5,18,6,17.5,6,16.9V7.1C6,6.5,6.5,6,7.1,6h9.8C17.5,6,18,6.5,18,7.1v9.8\n\t        C18,17.5,17.5,18,16.9,18z\"/>\n    </svg>";

var funnelD3Item = (function (_base) {
    // Overriden Methods
    __extends(funnelD3Item, _base);
    // Constructor:
    // * item: CustomItem instance
    // * $container: CustomItem viewer container
    // * options: CustomItem viewer base item internal options
    function funnelD3Item(item, $container, options) {
        _base.call(this, $container, options);
        this.item = item;
        this.funnelSettings = undefined;
        this.funnelViewer = null;
        this.selectionValues = [];
        this._subscribeProperties();
    }
    funnelD3Item.prototype.setSize = function (width, height) {
        _base.prototype.setSize.call(this, width, height);
        this._update({ options: { chart: { width: this.contentWidth(), height: this.contentHeight() } } });
    };
    funnelD3Item.prototype.renderContent = function ($element, changeExisting) {
        var data = this._getDataSource();
        var funnelId = this._getFunnelId();
        if (!this._ensureFunnelLibrary($element) || !data)
            return;
        if (!changeExisting) {
            $element.empty();
            $element.append($('<div/>').attr('id', funnelId));
            this.funnelViewer = new D3Funnel('#' + funnelId);
        }
        this._update({ data: data }, false);
    };
    funnelD3Item.prototype.clearSelection = function () {
        _base.prototype.clearSelection.call(this);
        this._update({ data: this._getDataSource() }, false);
    };
    // Specific Methods
    funnelD3Item.prototype._getDataSource = function () {
        var _this = this;
        var data = [];
        this.item.iterateData(function (dataRow) {
            var values = dataRow.getValue('Values');
            if (_this._hasArguments()) {
                data.push([{ data: dataRow, property: 'Arguments' }].concat(values));
            }
            else {
                data = values.map(function (value, index) { return [_this.item['Values']()[index].dataItem().displayName(), value]; });
            }
        }, 'data');
        return (data.length > 0 && data[0].length > 1) ? data : undefined;
    };
    funnelD3Item.prototype._ensureFunnelLibrary = function ($element) {
        if (!window['D3Funnel']) {
            $element.empty();
            $element.append($('<div/>', {
                css: {
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '95%',
                    color: '#CF0F2E',
                    'text-align': 'center'
                }
            }).html("'D3Funnel' cannot be displayed. You should include 'd3.v3.min.js' and 'd3-funnel.js' libraries."));
            return false;
        }
        return true;
    };
    funnelD3Item.prototype._ensureFunnelSettings = function () {
        var _this = this;
        var getSelectionColor = function (hexColor) { return _this.funnelViewer.colorizer.shade(hexColor, -0.5); };
        if (!this.funnelSettings) {
            this.funnelSettings = {
                data: undefined,
                options: {
                    chart: {
                        bottomPinch: this.item['PinchCount'](),
                        curve: { enabled: this.item['IsCurved']() }
                    },
                    block: {
                        dynamicHeight: this.item['IsDynamicHeight'](),
                        highlight: ko.computed(function () { return (_this.item.isFilterAllowed() && _this.item.isMasterFilter()) || (_this.item.isDrillDownAllowed() && _this.item.isDrillDownEnabled()); }),
                        fill: {
                            scale: function (index) {
                                var obj = _this.funnelSettings.data[index][0];
                                if (!obj || !obj.data)
                                    return '#5F8195';
                                var color = obj.data.getColor(obj.property);
                                return _this.item.isSelected(obj.data) ? getSelectionColor(color) : color;
                            },
                            type: this.item['FillType']().toLowerCase()
                        }
                    },
                    label: {
                        format: function (label, value) {
                            if (!label.data)
                                return label;
                            var labelText = label.data.getDisplayText(label.property);
                            return (Array.isArray(labelText) ? labelText.join(' - ') : labelText) + ': ' + value;
                        }
                    },
                    events: {
                        click: { block: function (e) { return _this._onClick(e); } }
                    }
                }
            };
        }
        return this.funnelSettings;
    };
    funnelD3Item.prototype._getFunnelId = function () {
        return 'dx-d3-funnel-' + this.item.componentName();
    };
    funnelD3Item.prototype._onClick = function (e) {
        if (!this._hasArguments() || !e.label)
            return;
        var row = e.label.raw.data;
        if (this.item.isMasterFilter() && !this.item.isSelected(row)) {
            this.item.setMasterFilter(this, row);
            this._update();
        }
        else if (this.item.isDrillDownEnabled())
            this.item.drillDown(this, row);
    };
    funnelD3Item.prototype._subscribeProperties = function () {
        var _this = this;
        this.item['IsCurved'].subscribe(function (isCurved) { return _this._update({ options: { chart: { curve: { enabled: isCurved } } } }); });
        this.item['IsDynamicHeight'].subscribe(function (isDynamicHeight) { return _this._update({ options: { block: { dynamicHeight: isDynamicHeight } } }); });
        this.item['PinchCount'].subscribe(function (count) { return _this._update({ options: { chart: { bottomPinch: count } } }); });
        this.item['FillType'].subscribe(function (type) { return _this._update({ options: { block: { fill: { type: type.toLowerCase() } } } }); });
    };
    funnelD3Item.prototype._update = function (options, deep) {
        if (options === void 0) { options = {}; }
        if (deep === void 0) { deep = true; }
        if (!!this.funnelViewer) {
            this._ensureFunnelSettings();
            deep ? $.extend(true, this.funnelSettings, options) : $.extend(this.funnelSettings, options);
            this.funnelViewer.draw(this.funnelSettings.data, this.funnelSettings.options);
        }
    };
    funnelD3Item.prototype._hasArguments = function () {
        return this.item['Arguments']().length > 0;
    };
    funnelD3Item.prototype.getInfo = function () {
        var svg = $('#' + this._getFunnelId()).children()[0];
        return $.extend(true, _base.prototype.getInfo.call(this), {
            customItemExportInfo: {
                image: this._getImageBase64(svg, this.contentWidth(), this.contentHeight())
            }
        });
    };
    funnelD3Item.prototype._getImageBase64 = function (svg, width, height) {
        var canvas = $('<canvas>')[0], str = new XMLSerializer().serializeToString(svg), encodedData = 'data:image/svg+xml;base64,' + window.btoa(str);
        var image = new Image();
        image.src = encodedData;
        canvas['width'] = width;
        canvas['height'] = height;
        canvas['getContext']('2d').drawImage(image, 0, 0);
        return canvas['toDataURL']().replace('data:image/png;base64,', '');
    };
    return funnelD3Item;
}(DevExpress.dashboard.viewerItems.customItem));

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
