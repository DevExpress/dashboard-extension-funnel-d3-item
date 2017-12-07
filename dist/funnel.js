DevExpress.Localization.addCultureInfo({ 
    messages: {
        // Binding Panel
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
    }
});

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
        defaultVal: false,
        from: DevExpress.Dashboard.Metadata.parseBool
    }, {
        propertyName: 'IsDynamicHeight',
        editor: DevExpress.Dashboard.Metadata.editorTemplates.boolYesNo,
        displayName: 'DashboardWebCustomItemStringId.IsDynamicHeight',
        sectionName: 'DashboardWebCustomItemStringId.SectionName',
        defaultVal: true,
        from: DevExpress.Dashboard.Metadata.parseBool
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

var FUNNEL_D3_ICON = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 21.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="' + funnelMeta.icon + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">	.dx_red{fill:#E25454;}	.dx_blue{fill:#579ADD;}	.dx_green{fill:#39A866;}</style><polygon class="dx_green" points="2,1 22,1 16,8 8,8 "/><polygon class="dx_blue" points="8,9 16,9 14,15 10,15 "/><polygon class="dx_red" points="10,16 14,16 13,23 11,23 "/></svg>';

// Third party libraries: 
// "d3js" component from https://d3js.org/ [Copyright(c) 2017 Mike Bostock]
// "d3-funnel" component from https://jakezatecky.github.io/d3-funnel/ [Copyright(c) 2017 Jake Zatecky]

var funnelD3Item = (function(_base) {
    // Overriden Methods
    __extends(funnelD3Item, _base);

    function funnelD3Item(model, $container, options) {
        _base.call(this, model, $container, options);

        this.funnelSettings = undefined;
        this.funnelViewer = null;
        this.selectionValues = [];
        this.exportingImage = new Image();
        this._subscribeProperties();
    }

    funnelD3Item.prototype.renderContent = function($element, changeExisting) {
        var data = this._getDataSource();
        var funnelId = this._getFunnelId();
        if(!this._ensureFunnelLibrary($element))
            return;
        if(!!data) {
            if(!changeExisting || !this.funnelViewer) {
                $element.empty();
                $element.append($('<div/>').attr('id', funnelId));
                this.funnelViewer = new D3Funnel('#' + funnelId);
            }
            this._update(data, this._getFunnelSizeOptions());
        } else {
            $element.empty();
            this.funnelViewer = null;
        }
    };
    funnelD3Item.prototype.setSize = function (width, height) {
        _base.prototype.setSize.call(this, width, height);
        this._update(null, this._getFunnelSizeOptions());
    };
    funnelD3Item.prototype.clearSelection = function() {
        _base.prototype.clearSelection.call(this);
        this._update(this._getDataSource());
    };
    funnelD3Item.prototype.allowExportSingleItem = function() {
        return true;
    };
    funnelD3Item.prototype.getExportInfo = function () {
        return {
            image: this._getImageBase64()
        };
    };
    funnelD3Item.prototype._getFunnelSizeOptions = function () {
        return { chart: { width: this.contentWidth(), height: this.contentHeight() } };
    };
    funnelD3Item.prototype._getDataSource = function() {
        var _this = this;
        var bindingValues = this.getBindingValue('Values');
        if(bindingValues.length == 0)
            return undefined;
        var data = [];
        this.iterateData(function(dataRow) {
            var values = dataRow.getValue('Values');
            var valueStr = dataRow.getDisplayText('Values');
            var color = dataRow.getColor('Values');
            if(_this._hasArguments()) {
                var labelText = dataRow.getDisplayText('Arguments').join(' - ') + ': ' + valueStr; 
                data.push([{ data: dataRow, text: labelText, color: color[0] }].concat(values));//0 - 'layer' index for color value
            } else {
                data = values.map(function(value, index) { return [{ text: bindingValues[index].displayName() + ': ' + valueStr[index], color: color[index] }, value]; });
            }
        });
        return data.length > 0 ? data : undefined;
    };
    funnelD3Item.prototype.clearSelection = function () {
        _base.prototype.clearSelection.call(this);
        this._update(this._getDataSource());
    };
    funnelD3Item.prototype._ensureFunnelLibrary = function($element) {
        if(!window['D3Funnel']) {
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
    funnelD3Item.prototype._ensureFunnelSettings = function() {
        var _this = this;
        var getSelectionColor = function(hexColor) { return _this.funnelViewer.colorizer.shade(hexColor, -0.5); };
        if(!this.funnelSettings) {
            this.funnelSettings = {
                data: undefined,
                options: {
                    chart: {
                        bottomPinch: this.getPropertyValue('PinchCount'),
                        curve: { enabled: this.getPropertyValue('IsCurved') }
                    },
                    block: {
                        dynamicHeight: this.getPropertyValue('IsDynamicHeight'),
                        fill: {
                            scale: function(index) {
                                var obj = _this.funnelSettings.data[index][0];
                                return obj.data && _this.isSelected(obj.data) ? getSelectionColor(obj.color) : obj.color;
                            },
                            type: this.getPropertyValue('FillType').toLowerCase()
                        }
                    },
                    label: {
                        format: function(label, value) {
                            return label.text;
                        }
                    },
                    events: {
                        click: { block: function(e) { return _this._onClick(e); } }
                    }
                }
            };
        }
        this.funnelSettings.options.block.highlight = this.canDrillDown() || this.canMasterFilter();
        return this.funnelSettings;
    };
    funnelD3Item.prototype._getFunnelId = function() {
        return 'dx-d3-funnel-' + this.getName();
    };
    funnelD3Item.prototype._onClick = function(e) {
        if(!this._hasArguments() || !e.label)
            return;
        var row = e.label.raw.data;
        if (this.canDrillDown(row))
            this.drillDown(row);
        else if (this.canMasterFilter(row)) {
            this.setMasterFilter(row);
            this._update();
        }
    };
    funnelD3Item.prototype._subscribeProperties = function() {
        var _this = this;
        this.subscribe('IsCurved', function(isCurved) { return _this._update(null, { chart: { curve: { enabled: isCurved } } }); });
        this.subscribe('IsDynamicHeight', function(isDynamicHeight) { return _this._update(null, { block: { dynamicHeight: isDynamicHeight } }); });
        this.subscribe('PinchCount', function(count) { return _this._update(null, { chart: { bottomPinch: count } }); });
        this.subscribe('FillType', function(type) { return _this._update(null, { block: { fill: { type: type.toLowerCase() } } }); });
    };
    funnelD3Item.prototype._update = function(data, options) {
        this._ensureFunnelSettings();
        if(!!data) {
            this.funnelSettings.data = data;
        }
        if(!!options) {
            $.extend(true, this.funnelSettings.options, options);
        }
        if(!!this.funnelViewer) {
            this.funnelViewer.draw(this.funnelSettings.data, this.funnelSettings.options);
            this._updateExportingImage();
        }
    };
    funnelD3Item.prototype._updateExportingImage = function () {
        var svg = $('#' + this._getFunnelId()).children()[0],
            str = new XMLSerializer().serializeToString(svg),
            encodedData = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(str)));
        this.exportingImage.src = encodedData;
    };
    funnelD3Item.prototype._hasArguments = function() {
        return this.getBindingValue('Arguments').length > 0;
    };
    funnelD3Item.prototype._getImageBase64 = function () {
        var canvas = $('<canvas>')[0];
        canvas['width'] = this.contentWidth();
        canvas['height'] = this.contentHeight();
        canvas['getContext']('2d').drawImage(this.exportingImage, 0, 0);
        return canvas['toDataURL']().replace('data:image/png;base64,', '');
    };
    return funnelD3Item;
} (DevExpress.Dashboard.customViewerItem));
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