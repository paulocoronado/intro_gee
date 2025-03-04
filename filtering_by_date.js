  // Define the location: Plaza de Bolívar, Bogotá, Colombia
  var plazaBolivar = ee.Geometry.Point([-74.0772, 4.5981]);
  
  // Landsat 8 TOA image collection filtered by location
  var col = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
    .filterBounds(plazaBolivar);
  
  // Filter the collection by date using date strings.
  print('2020 images', col.filterDate('2020', '2021'));
  print('July images, 2020', col.filterDate('2020-07', '2020-08'));
  print('Early July images, 2020', col.filterDate('2020-07-01', '2020-07-10'));
  print('Include time (13 hours, July 7, 2020)',
        col.filterDate('2020-07-07T06:34:46', '2020-07-07T19:34:46'));
  
  // Use milliseconds since Unix epoch.
  print('Milliseconds inputs', col.filterDate(1593967014062, 1595349419611));
  
  // Use ee.Date objects.
  print('ee.Date inputs', col.filterDate(ee.Date('2020'), ee.Date('2021')));
  
  // Use an ee.DateRange object.
  var dateRange = ee.DateRange('2020-07-01', '2020-07-10');
  print('ee.DateRange input', col.filterDate(dateRange));
