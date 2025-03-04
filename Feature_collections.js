// Feature Collection

var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var roi = countries.filter(ee.Filter.eq('country_na', 'Zambia'));
print(roi);

// Random Samples
var randomPoints = ee.FeatureCollection.randomPoints(roi, 50);
print(randomPoints);

var visParams = {'color': 'red'};
Map.addLayer(randomPoints, visParams, 'Random Points');
Map.addLayer(roi, {}, 'ROI');
Map.centerObject(roi, 7);
