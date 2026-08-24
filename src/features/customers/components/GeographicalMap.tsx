import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { useGetGeographical } from '../api/hooks/useGetGeographical';
import SkeletonLoader from '@/components/SkeletonLoader';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from '@vnedyalk0v/react19-simple-maps';
import geoData from '@/assets/json/countries-110m.json';

type Longitude = number & { __brand: 'longitude' };
type Latitude = number & { __brand: 'latitude' };
type Coordinates = [Longitude, Latitude];

type GeographyFeature = {
  rsmKey: string;
  properties?: Record<string, unknown>;
  geometry?: Record<string, unknown>;
  type?: string;
  [key: string]: unknown;
};

const regionCoordinates = {
  'SE Asia': [115.0, 5.0],
  'North America': [-100.0, 45.0],
  Europe: [15.0, 50.0],
  'South Asia': [78.0, 22.0],
  'Middle East': [45.0, 25.0],
  Africa: [20.0, 0.0],
  'Latin America': [-60.0, -15.0],
} as unknown as Record<string, Coordinates>;

export default function GeographicalMap() {
  const { data, isLoading } = useGetGeographical();

  return (
    <Card variant="variant-2">
      <p className="text-xl font-medium">Geographical Map</p>

      <Card variant="variant-1" className="my-4 p-0!">
        <ComposableMap
          projectionConfig={{ scale: 140 }}
          width={800}
          height={400}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={geoData}>
            {({ geographies }: { geographies: GeographyFeature[] }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#3F3F46"
                  stroke="#27272A"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {data &&
            data.map((v) => {
              const coordinates = regionCoordinates[v.region];
              if (!coordinates) return null;

              return (
                <Marker key={v.id} coordinates={coordinates}>
                  <circle r={14} fill={v.color} opacity={0.3} />
                  <circle r={5} fill={v.color} />
                </Marker>
              );
            })}
        </ComposableMap>
      </Card>

      {isLoading ? (
        <SkeletonLoader />
      ) : data ? (
        <>
          {data.map((v, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row justify-between w-full gap-1 mt-2"
            >
              <p className="flex flex-1 text-xs text-body-text-muted items-center">
                {v.region}
              </p>
              <div className="flex flex-1 w-full items-center gap-2">
                <ProgressBar min={v.percentage} max={100} color={v.color} />
                <span className="text-sm min-w-7.5">{v.percentage}%</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-center text-sm text-body-text-muted">
          No geographical data available.
        </p>
      )}
    </Card>
  );
}
