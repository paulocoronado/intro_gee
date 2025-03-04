// Load Sentinel Image
var dataset = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(roi)
    .filterMetadata('CLOUD_COVERAGE_ASSESSMENT', 'LESS_THAN', 20)
    .filterDate('2022-01-01', '2022-06-01')
    .select(['B4', 'B3', 'B2'])
    .median();

var rescale = dataset.divide(10000);
var clipImage = rescale.clip(roi);

Map.addLayer(rescale, 'R');



// Load Sentinel Image
var dataset = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(roi)
    .filterMetadata('CLOUD_COVERAGE_ASSESSMENT', 'LESS_THAN', 20)
    .filterDate('2022-01-01', '2022-06-01')
    .select(['B4', 'B3', 'B2'])
    .median();

var rescale = dataset.divide(10000);
var clipImage = rescale.clip(roi);

var visParam = {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.4};

Map.addLayer(rescale, visParam, 'Raw Sentinel Image');
Map.addLayer(clipImage, visParam, 'Clipped Sentinel Image');
Map.centerObject(roi, 12);

// Export to Google Drive
Export.image.toDrive({
    image: clipImage.visualize(visParam),
    description: 'Sentinel_Paris',
    scale: 10,
    region: roi
});