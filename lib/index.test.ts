import { describe, it, expect } from 'vitest';
import { rewindFeatureCollection, rewindGeometry } from './index';

describe('rewind', () => {
  it('collection', () => {
    expect(
      rewindFeatureCollection({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [102.0, 0.5],
            },
            properties: {
              prop0: 'value0',
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [102.0, 0.0],
                [103.0, 1.0],
                [104.0, 0.0],
                [105.0, 1.0],
              ],
            },
            properties: {
              prop0: 'value0',
              prop1: 0.0,
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [100.0, 0.0],
                  [101.0, 0.0],
                  [101.0, 1.0],
                  [100.0, 1.0],
                  [100.0, 0.0],
                ],
              ],
            },
            properties: {
              prop0: 'value0',
              prop1: {
                this: 'that',
              },
            },
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [100.0, 0.0],
                  [101.0, 0.0],
                  [101.0, 1.0],
                  [100.0, 1.0],
                  [100.0, 0.0],
                ],
                [
                  [100.2, 0.2],
                  [100.8, 0.2],
                  [100.8, 0.8],
                  [100.2, 0.8],
                  [100.2, 0.2],
                ],
              ],
            },
            properties: {
              prop0: 'value0',
              prop1: {
                this: 'that',
              },
            },
          },
        ],
      })
    ).toEqual({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [102, 0.5],
          },
          properties: {
            prop0: 'value0',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [102, 0],
              [103, 1],
              [104, 0],
              [105, 1],
            ],
          },
          properties: {
            prop0: 'value0',
            prop1: 0,
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [100, 0],
                [101, 0],
                [101, 1],
                [100, 1],
                [100, 0],
              ],
            ],
          },
          properties: {
            prop0: 'value0',
            prop1: {
              this: 'that',
            },
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [100, 0],
                [101, 0],
                [101, 1],
                [100, 1],
                [100, 0],
              ],
              [
                [100.2, 0.2],
                [100.2, 0.8],
                [100.8, 0.8],
                [100.8, 0.2],
                [100.2, 0.2],
              ],
            ],
          },
          properties: {
            prop0: 'value0',
            prop1: {
              this: 'that',
            },
          },
        },
      ],
    });
  });

  it('near-zero', () => {
    expect(
      rewindGeometry({
        type: 'Polygon',
        coordinates: [
          [
            [7.396768398983337, 43.72260793482001],
            [7.396784857564814, 43.722607191112004],
            [7.396784857564812, 43.722607191112004],
            [7.396768398983337, 43.72260793482001],
          ],
        ],
      })
    ).toEqual({
      type: 'Polygon',
      coordinates: [
        [
          [7.396768398983337, 43.72260793482001],
          [7.396784857564814, 43.722607191112004],
          [7.396784857564812, 43.722607191112004],
          [7.396768398983337, 43.72260793482001],
        ],
      ],
    });
  });
  it('flip', () => {
    expect(
      rewindGeometry({
        type: 'Polygon',
        coordinates: [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0],
          ],
          [
            [100.2, 0.2],
            [100.2, 0.8],
            [100.8, 0.8],
            [100.8, 0.2],
            [100.2, 0.2],
          ],
        ],
      })
    ).toEqual({
      type: 'Polygon',
      coordinates: [
        [
          [100, 0],
          [101, 0],
          [101, 1],
          [100, 1],
          [100, 0],
        ],
        [
          [100.2, 0.2],
          [100.2, 0.8],
          [100.8, 0.8],
          [100.8, 0.2],
          [100.2, 0.2],
        ],
      ],
    });
  });
});
