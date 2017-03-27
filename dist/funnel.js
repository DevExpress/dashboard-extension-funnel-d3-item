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

var FUNNEL_D3_ICON = '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="' + funnelMeta.icon + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	            viewBox="4 -4 24 24" style="enable-background:new 4 -4 24 24;" xml:space="preserve">        <style type="text/css">	        .dx_ruby{fill:#FA7864;}        </style>        <polygon class="dx_ruby" points="4,-2 14,12 14,17 18,17 18,12 28,-2" />    </svg>';
// Third party libraries: 
// "d3js" component from https://d3js.org/ [Copyright(c) 2017 Mike Bostock]
// "d3-funnel" component from https://jakezatecky.github.io/d3-funnel/ [Copyright(c) 2017 Jake Zatecky]

var funnelD3Item = (function(_base) {
    // Overriden Methods
    __extends(funnelD3Item, _base);

    // Constructor:
    // * item: CustomItem instance
    // * $container: CustomItem viewer container
    // * options: CustomItem viewer base item internal options
    function funnelD3Item(model, $container, options) {
        _base.call(this, model, $container, options);

        this.funnelSettings = undefined;
        this.funnelViewer = null;
        this.selectionValues = [];
        this._subscribeProperties();
    }

    funnelD3Item.prototype.setSize = function(width, height) {
        _base.prototype.setSize.call(this, width, height);
        this._update(null, { chart: { width: this.contentWidth(), height: this.contentHeight() } });
    };
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
            this._update(data);
        } else {
            $element.empty();
            this.funnelViewer = null;
        }
    };
    funnelD3Item.prototype.clearSelection = function() {
        _base.prototype.clearSelection.call(this);
        this._update(this._getDataSource());
    };
    funnelD3Item.prototype.allowExportSingleItem = function() {
        return true;
    };
    funnelD3Item.prototype.getExportInfo = function() {
        var svg = $('#' + this._getFunnelId()).children()[0];
        return {
            image: this._getImageBase64(svg, this.contentWidth(), this.contentHeight())
        };
    };
    funnelD3Item.prototype._getDataSource = function() {
        var _this = this;
        var bindingValues = this.getBindingValue('Values');
        if(bindingValues.length == 0)
            return undefined;
        var data = [];
        this.model.iterateData(function(dataRow) {
            var values = dataRow.getValue('Values');
            var valueStr = dataRow.getDisplayText('Values');
            if(_this._hasArguments()) {
                var labelText = dataRow.getDisplayText('Arguments').join(' - ') + ': ' + valueStr, color = dataRow.getColor('Values', 0); //0 - 'layer' index
                data.push([{ data: dataRow, text: labelText, color: color }].concat(values));
            } else {
                data = values.map(function (value, index) { return [{ text: bindingValues[index].displayName() + ': ' + valueStr[index], color: dataRow.getColor('Values', index) }, value]; });
            }
        });
        return data.length > 0 ? data : undefined;
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
                        width: this.contentWidth(),
                        height: this.contentHeight(),
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
        this.funnelSettings.options.block.highlight = this.allowDrillDown() || this.allowSetMasterFilter();
        return this.funnelSettings;
    };
    funnelD3Item.prototype._getFunnelId = function() {
        return 'dx-d3-funnel-' + this.model.componentName();
    };
    funnelD3Item.prototype._onClick = function(e) {
        if(!this._hasArguments() || !e.label)
            return;
        var row = e.label.raw.data;
        if (this.allowDrillDown(row))
            this.drillDown(row);
        else if (this.allowSetMasterFilter(row)) {
            this.setMasterFilter(row);
            this._update();
        }
    };
    funnelD3Item.prototype._subscribeProperties = function() {
        var _this = this;
        this.subscribeProperty('IsCurved', function(isCurved) { return _this._update(null, { chart: { curve: { enabled: isCurved } } }); });
        this.subscribeProperty('IsDynamicHeight', function(isDynamicHeight) { return _this._update(null, { block: { dynamicHeight: isDynamicHeight } }); });
        this.subscribeProperty('PinchCount', function(count) { return _this._update(null, { chart: { bottomPinch: count } }); });
        this.subscribeProperty('FillType', function(type) { return _this._update(null, { block: { fill: { type: type.toLowerCase() } } }); });
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
        }
    };
    funnelD3Item.prototype._hasArguments = function() {
        return this.getBindingValue('Arguments').length > 0;
    };
    funnelD3Item.prototype._getImageBase64 = function(svg, width, height) {
        var canvas = $('<canvas>')[0], str = new XMLSerializer().serializeToString(svg), encodedData = 'data:image/svg+xml;base64,' + window.btoa(str);
        var image = new Image();
        image.src = encodedData;
        canvas['width'] = width;
        canvas['height'] = height;
        canvas['getContext']('2d').drawImage(image, 0, 0);
        return canvas['toDataURL']().replace('data:image/png;base64,', '');
    };
    return funnelD3Item;
} (DevExpress.Dashboard.customViewerItem));
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