var roi = ee.Geometry.Point([-111.2005, 36.1398]);

var image = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
    .filterDate('2022-01-01', '2022-03-01')  // Filter by date
    .filterBounds(roi)  // Filter by location (ROI)
    .sort('CLOUD_COVER')  // Sort by least cloud cover
    .first(); 

print(image);

Map.addLayer(image, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 0, max: 20000}, 'True Color (432)');


Map.addLayer(image, {bands: ['SR_B5', 'SR_B4', 'SR_B3'], min: 0, max: 20000}, 'False Color (543)');


Map.centerObject(image, 8);
