import { Feature, Geometry, FeatureCollection, Position } from 'geojson';

/**
 * Winding order. By default, this uses the RFC7946 order,
 * which is what is in the GeoJSON standard.
 *
 * You can also choose to wind in the d3 order.
 */
export type Winding = 'RFC7946' | 'd3';

export function rewindGeometry(geometry: Geometry, outer = false): Geometry {
  switch (geometry.type) {
    case 'Polygon': {
      if (!geometry.coordinates) return geometry;
      return {
        ...geometry,
        coordinates: rewindRings(geometry.coordinates, outer),
      };
    }
    case 'MultiPolygon': {
      if (!geometry.coordinates) return geometry;
      return {
        ...geometry,
        coordinates: geometry.coordinates.map((polygon) =>
          rewindRings(polygon, outer)
        ),
      };
    }
    case 'GeometryCollection': {
      return {
        ...geometry,
        geometries: geometry.geometries.map((geometry) => {
          return rewindGeometry(geometry, outer);
        }),
      };
    }
    default: {
      return geometry;
    }
  }
}

function rewindRings(rings: Position[][], outer: boolean): Position[][] {
  if (rings.length === 0) return rings;

  const rewound: Position[][] = [];

  for (let i = 0; i < rings.length; i++) {
    rewound.push(rewindRing(rings[i], i === 0 ? outer : !outer));
  }

  return rewound;
}

/**
 * Compute the area of a ring to decide whether to wind it
 * clockwise or not.
 */
function rewindRing(ring: Position[], dir: boolean): Position[] {
  let area = 0;
  let err = 0;
  for (let i = 0, len = ring.length, j = len - 1; i < len; j = i++) {
    const k = (ring[i][0] - ring[j][0]) * (ring[j][1] + ring[i][1]);
    const m = area + k;
    err += Math.abs(area) >= Math.abs(k) ? area - m + k : k - m + area;
    area = m;
  }
  if (area + err >= 0 !== !!dir) return ring.slice().reverse();
  return ring;
}

/**
 * # Wind the rings of polygons and multipolygons.
 *
 * This creates a copy of the input.
 *
 * - outer as false is the default, which is the GeoJSON RFC way.
 * - outer as true is for d3-geo.
 */
export function rewindFeature(
  feature: Feature,
  winding: Winding = 'RFC7946'
): Feature {
  const geometry = feature.geometry;
  if (!geometry) return feature;
  const geometryRewound = rewindGeometry(geometry, winding === 'd3');
  if (geometryRewound === geometry) {
    return feature;
  }

  return {
    ...feature,
    geometry: geometryRewound,
  };
}

export function rewindFeatureCollection(
  featureCollection: FeatureCollection,
  outer: Winding = 'RFC7946'
) {
  return {
    ...featureCollection,
    features: featureCollection.features.map((feature) =>
      rewindFeature(feature, outer)
    ),
  };
}
