import { FormValues } from '@/app/quote/page';
import getDistance from 'geolib/es/getDistance';

type PriceDetails = {
  description: string;
  price: number;
};

const PRICES: Record<FormValues['service'], number[]> = {
  fashion: [300, 400, 550, 780],
  event: [400, 500, 650, 980],
  food: [250, 350, 500, 750],
  product: [250, 350, 500, 750],
  wedding: [998, 1199, 1299, 1899],
};

const SETTINGS_COST: Record<'indoor' | 'outdoor' | 'studio', number> = {
  indoor: 0,
  outdoor: 50,
  studio: 100,
};

const TRAVEL_FEES: Record<number, [number, number]> = {
  1: [0, 50000],
  2: [50001, 150000],
  3: [150001, 300000],
  4: [300001, 1000000],
  5: [1000001, Infinity],
};

const TRAVEL_COSTS: Record<number, number> = {
  1: 0,
  2: 50,
  3: 100,
  4: 300,
  5: 800,
};

function getTravelCost(coordinates: [number, number]): number {
  const [longitude, latitude] = coordinates;
  const distance = getDistance(
    { latitude: 43.62505, longitude: 3.862038 },
    { latitude, longitude },
    1000 // accuracy: 1km
  );

  for (const [range, [min, max]] of Object.entries(TRAVEL_FEES)) {
    if (distance >= min && distance <= max) {
      return TRAVEL_COSTS[Number(range)];
    }
  }

  return 0;
}

export function getPriceQuote(props: FormValues): PriceDetails[] {
  const { material, service, unit, editing, setting, coordinates } = props;

  const travelCost = getTravelCost(coordinates);
  let basePrice = 0;
  let description = `${service} service with `;

  if (material.includes('photos') && material.includes('videos')) {
    basePrice = PRICES[service][3] * unit;
    description += 'photos and videos, ';
  } else if (material.includes('videos')) {
    basePrice = PRICES[service][editing ? 2 : 1] * unit;
    description += 'videos, ';
  } else if (material.includes('photos')) {
    basePrice = PRICES[service][editing ? 0 : 0] * unit; // Simplified as both cases are identical
    description += 'photos, ';
  }

  description += editing ? 'with editing, ' : 'without editing, ';

  const settingCost = setting.reduce((total, type) => total + SETTINGS_COST[type], 0);
  description += `and settings (${setting.join(', ')}).`;

  const totalPrice = basePrice + settingCost + travelCost;

  return [
    { description: 'Base Service', price: basePrice },
    { description: 'Setting Cost', price: settingCost },
    { description: 'Travel Cost', price: travelCost },
    { description: 'Total', price: totalPrice },
  ];
}