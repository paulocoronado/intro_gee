/*
FÓRMULAS 

NDVI:
(NIR-RED)/(NIR+RED)

SAVI
Float(((NIR-RED)/(NIR+RED+L))*(1+L))

NDWI
(NIR-SWIR)/(NIR+SWIR)

Colores:
'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
'74A901', '66A000','529400','3E8601','207401','056201','004C44',
'023B01','012E01','011D01','011301'
*/

// Load Landsat 9 data and filter by date, location, and cloud cover
var landsat_8 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
    .filterDate("2024-01-01", "2024-12-25") // Filtro por fecha
    .filterMetadata("CLOUD_COVER", "Less_than", 30) // Filtro por nubosidad
    .filterBounds(geometry) // Filtro por geometría

print(landsat_8);

// Seleccionar imagen
var img_L8 = landsat_8.sort("CLOUD_COVER").first();
print(img_L8);

// Cortar imagen
var img_L8_C = img_L8.clip(geometry);
print(img_L8_C);

// Visualizar imagen
Map.addLayer(img_L8_C, {
    min: 150,
    max: 1200,
    gamma: 0.5,
    bands: ["SR_B6", "SR_B5", "SR_B4"]
}, "Análisis de Cobertura");

var viss = {
    min: 0.2,
    max: 0.8,
    palette: [
        "FFFFFF", "CE7E45", "DF923D", "F1B555", "FCD163", "99B718",
        "749901", "66A000", "529400", "3E8601", "207401", "056201",
        "004C44", "023B01", "012E01", "011D01", "011301"
    ]
};

// CÁLCULO DE NDVI
// ANÁLISIS DE VEGETACIÓN PARA IDENTIFICACIÓN DE ESTADO FOTOSINTÉTICO, ANÁLISIS DE RIESGOS POR INCENDIO

var NDVI = img_L8_C.expression("(NIR-RED)/(NIR+RED)", {
    "NIR": img_L8_C.select("SR_B5"),
    "RED": img_L8_C.select("SR_B4")
});

var SAVI = img_L8_C.expression("float(((NIR - RED) / (NIR + RED + L)) * (1 + L))", {
    "L": 0.5, // medio 0-1
    "NIR": img_L8_C.select("SR_B5"),
    "RED": img_L8_C.select("SR_B4")
});

var NDWI = img_L8_C.expression("(NIR-SWIR)/(NIR+SWIR)", {
    "NIR": img_L8_C.select("SR_B5"),
    "SWIR": img_L8_C.select("SR_B6")
});

Map.addLayer(NDVI, viss, "NDVI");
Map.addLayer(SAVI, viss, "SAVI");
Map.addLayer(NDWI, viss, "NDWI");