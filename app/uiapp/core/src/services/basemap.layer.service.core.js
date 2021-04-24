(function() {
    'use strict';

      angular.module('app.core')
        .factory('BaseMapLayerServiceCore',['$q', '$log', '_', 'leafletData', BaseMapLayerServiceCore]);

    /* @ngInject */
    function BaseMapLayerServiceCore($q, $log, _, leafletData) {

        function Layer(mapid) {

            var that = this;
            this.mapid = mapid ? mapid : 'layer_canvas';
            this._map = null;
            this._tile = null;

            this.addLayer = function(options) {

                leafletData.getMap(that.mapid).then(function(currentMap) {
                    that._map = currentMap;

                    // Remove Exisiting IF
                    if (that._tile) {
                        currentMap.eachLayer(function (layer) {
                            if (layer.name == that._tile.name) 
                                 currentMap.removeLayer(layer);
                        });
                        that._tile = null;
                    }

                    that._tile = L.tileLayer.siteforge(options.url, options.layerOptions);
                    that._tile.name = options.name;
                    currentMap.addLayer(that._tile);
                    that._tile.bringToBack();

                    // var container = angular.element(that._tile._container);
                    // container.addClass('leaflet-google-tile-container');
                    //
                    // // Add GreyScale IF
                    // var container = angular.element(currentMap._container);
                    // if (options.layerOptions.greyscale) {
                    //     container.addClass('greyscale');
                    // } else {
                    //     container.removeClass('greyscale');
                    // }
                });
            };

            this.init = function () {
                var options = this.baseLayers.googleRoadmap;
                this.addLayer(options);
            };

            this.changeLayer = function(item) {
                var key = 'googleRoadmap';
                switch (item) {
                    case 'Terrain':
                        key = 'googleTerrain';
                        break;
                    case 'Satellite':
                        key = 'googleSatellite';
                        break;
                    case 'Streets Gray Scale':
                        key = 'googleRoadmapGrey';
                        break;
                    case 'Hybrid':
                        key = 'googleHybrid';
                        break;
                    default:
                        key = 'googleRoadmap';
                }
                var options = this.baseLayers[key];
                if (!options) return false;
                this.addLayer(options);
            };


            this.baseLayers = {
                googleRoadmapGrey: {
                    name: 'Google Streets Grey',
                    url: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                    layerOptions: {
                        maxZoom: 18,
                        detectRetina: true,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                        greyscale: true
                    }
                },
                googleRoadmap: {
                    name: 'Google Streets',
                    url: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                    layerOptions: {
                        maxZoom: 18,
                        detectRetina: true,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                        greyscale: false
                    }
                },
                googleTerrain: {
                    name: 'Google Terrain',
                    url: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
                    layerOptions: {
                        maxZoom: 18,
                        detectRetina: true,
                        showOnSelector: false,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                        greyscale: false
                    }
                },
                googleSatellite: {
                    name: 'Google Hybrid',
                    url: 'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
                    layerOptions: {
                        maxZoom: 18,
                        detectRetina: true,
                        showOnSelector: false,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                        greyscale: false
                    }
                },
                googleHybrid: {
                    name: 'Google Hybrid',
                    url: 'https://{s}.google.com/vt/lyrs=y,h&x={x}&y={y}&z={z}',
                    layerOptions: {
                        maxZoom: 18,
                        detectRetina: true,
                        showOnSelector: false,
                        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                        greyscale: false
                    }
                }
            };

            this.init();

        }

        return Layer;
    }
})();



