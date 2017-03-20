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