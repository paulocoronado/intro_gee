var l8raw = ee.ImageCollection('LANDSAT/LC08/C02/T1');

var cloudyImage = l8raw.filterBounds(aoi).filterDate('2020-01-01', '2020-12-01');

var cloudFree = ee.Algorithms.Landsat.simpleComposite({
    collection: cloudyImage,
    asFloat: true
});

var cloudFreeVis = { min: 0, max: 0.5, bands: ['B4', 'B3', 'B2'] };
var cloudyVis = { min: 0, max: 30000, bands: ['B4', 'B3', 'B2'] };

Map.centerObject(aoi, 7);
Map.addLayer(cloudFree, cloudFreeVis, 'Cloud Free');
Map.addLayer(cloudyImage, cloudyVis, 'Cloudy Image');
