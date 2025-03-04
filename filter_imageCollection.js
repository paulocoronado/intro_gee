// Filtering Image Collection

var roi = ee.Geometry.Point([30.68, -1.195]);

// Applies scaling factors.
function applyScaleFactors(image) {
    var opticalBands = image.select('SR_B.*').multiply(0.0000275).add(-0.2);
    var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
    return image.addBands(opticalBands, null, true)
                .addBands(thermalBands, null, true);
}

var l9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
    .map(applyScaleFactors);
print(l9.size());

// Apply all the filters together
// Use the . notation to apply all the filters together
var filtered = l9.filterMetadata('CLOUD_COVER', 'less_than', 10)
    .filter(ee.Filter.date('2022-01-01', '2022-03-01'))
    .filter(ee.Filter.bounds(roi));
print(filtered.size());
