function applyScaleFactors(image) {
    var opticalBands = image.select('SR_B.*').multiply(0.0000275).add(-0.2);
    var thermalBands = image.select('SR_B.*').multiply(0.00341802).add(149.0);
    return image.addBands(opticalBands, null, true).addBands(thermalBands, null, true);
}



var image = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
    .filterDate('2022-01-01', '2023-01-01')
    .map(applyScaleFactors);


/*
Uses bands B4 (Red), B3 (Green), and B2 (Blue) for a true color composite.
min: 0.0, max: 0.3 adjusts the brightness and contrast.
*/
var visualization = {
    bands: ['SR_B4', 'SR_B3', 'SR_B2'],  // True color (RGB)
    min: 0.0,
    max: 0.3
};