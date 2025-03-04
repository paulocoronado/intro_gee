var images = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
    .filterDate("2024-01-01", "2024-12-31") // Filter by date
    .filterBounds(geometry) // Filter by region
    .filterMetadata("CLOUDY_PIXEL_PERCENTAGE", "less_than", 30)

var image = images.sort("CLOUD_COVER").first();

// Visualizar imagen
Map.addLayer(image, {
    min: 150,
    max: 1200,
    gamma: 0.5,
    bands: ["B2", "B3", "B4"]
}, "Análisis de Cobertura");

var palette = [
    "FFFFFF", "CE7E45", "DF923D", "F1B555", "FCD163", "99B718",
    "749901", "66A000", "529400", "3E8601", "207401", "056201",
    "004C44", "023B01", "012E01", "011D01", "011301"
];

var ndvi = image.expression("(B8 - B4) / (B8 + B4)", {
    "B8": image.select("B8"), // NIR
    "B4": image.select("B4")  // Red
});



Map.addLayer(ndvi, { min: -1, max: 1, palette: palette }, "NDVI");