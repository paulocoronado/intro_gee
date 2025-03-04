// Define the location: Plaza de Bolívar, Bogotá, Colombia
var plazaBolivar = ee.Geometry.Point([-74.0772, 4.5981]);

// Load Landsat 9 data and filter by date, location, and cloud cover
var image = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
    .filterDate('2024-01-01', '2025-01-01')
    .filterBounds(plazaBolivar)
    .sort('CLOUD_COVER')
    .first(); // Select the least cloudy image

// Print image details
print("Selected Landsat 9 Image:", image);

// Select visualization bands and apply scaling factors
var visualization = {
    bands: ["SR_B4", "SR_B3", "SR_B2"], // True Color (Red, Green, Blue)
    min: 0,
    max: 30000,
    gamma: 1.4
};

// Add image to the map
Map.centerObject(plazaBolivar, 12); // Center map on Plaza de Bolívar
Map.addLayer(image, visualization, "Landsat 9 (True Color)");

// Add a point marker for Plaza de Bolívar
Map.addLayer(plazaBolivar, {color: "red"}, "Plaza de Bolívar");



//For Colombia
// Define Colombia's geometry from FAO GAUL dataset
var col = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level0')
  .filter(ee.Filter.eq('ADM0_NAME', 'Colombia'));

Map.centerObject(col, 6); // Center the map on Colombia
Map.addLayer(col, {}, 'Colombia Boundary');


var colBounds = ee.Geometry.Rectangle([-79.0, -4.0, -66.0, 13.0]); 
Map.centerObject(colBounds, 6);
Map.addLayer(colBounds, {color: 'red'}, 'Colombia BBox');

// Load Sentinel-2 images filtered by date and Colombia's boundary
var s2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterBounds(col)
    .filterDate('2023-01-01', '2023-12-31')  // Year 2023
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)) // Less than 10% clouds
    .median(); // Get median composite

// Visualization parameters
var visParams = {
  bands: ['B4', 'B3', 'B2'], // True color (RGB)
  min: 0,
  max: 3000,
  gamma: 1.4
};

// Add to map
Map.addLayer(s2, visParams, 'Sentinel-2 RGB');

Map.setCenter(-74.2973, 4.5709, 6); // Center on Colombia

Export.image.toDrive({
    image: s2,
    description: 'Colombia_Sentinel2',
    scale: 30, // Resolution in meters
    region: col.geometry(), 
    fileFormat: 'GeoTIFF'
  });

  //Using landsat 9

  var landsat = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
    .filterBounds(col)
    .filterDate('2023-01-01', '2023-12-31')
    .filter(ee.Filter.lt('CLOUD_COVER', 10))
    .median();

Map.addLayer(landsat, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 0, max: 3000, gamma: 1.4}, 'Landsat 9');
