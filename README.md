# geojson-rewind

_geojson-rewind development is supported by 🌎 [placemark.io](https://placemark.io/)_

Fix the winding order of rings in GeoJSON.

## Install

This package is [`@placemarkio/geojson-rewind`](https://www.npmjs.com/package/@placemarkio/geojson-rewind)

## [📕 API Documentation](https://placemark.github.io/geojson-rewind/)

## Lineage

This is an update of [geojson-rewind](https://github.com/mapbox/geojson-rewind.git) from
the same original author. The changes include:

- Includes TypeScript types
- ES Module build included
- Does **not** mutate its inputs: this returns a shallowly-cloned
  feature when necessary.

## Let's talk about winding

- [My previous writing on polygon winding](https://macwright.com/2015/03/23/geojson-second-bite.html#winding)
