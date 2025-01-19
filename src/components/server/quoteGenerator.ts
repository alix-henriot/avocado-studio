"use server"
import { FormData } from '@/app/quote/page';

// Define price constants
const BASE_HOUR_COST = 100; // Base hourly cost for any type of service
const PHOTO_COST_PER_HOUR = 50; // Additional cost per hour for photos
const VIDEO_COST_PER_HOUR = 75; // Additional cost per hour for videos
const COEFFICIENTS = {
  fashion: 1.5,
  business: 1.2,
  food: 1.3,
  product: 1.1,
};

const SETTING_COSTS = {
  indoor: 0,
  outdoor: 100, // outdoor shoots are more expensive
  studio: 200, // studio costs more
};

const OPTION_COSTS = {
  editing: 50, // editing is an additional cost
  'location-search': 75, // location search is an additional cost
  'hotel-booking': 150, // hotel booking is an additional cost
};

// Distance sectors (example distance range in kilometers and associated travel costs)
const SECTORS = [
  { range: [0, 50], travelCost: 0 }, // Montpellier and nearby
  { range: [51, 150], travelCost: 100 }, // Medium distance
  { range: [151, 300], travelCost: 200 }, // Long distance
  { range: [301, Infinity], travelCost: 400 }, // Very long distance
];

// Function to calculate the distance from Montpellier and return the sector
function getTravelCost(city: string): number {
  // Sample distance calculation (You can replace it with a real API or algorithm)
  const distance = Math.random() * 400; // Arbitrary distance between 0 and 400 km

  for (const sector of SECTORS) {
    if (distance >= sector.range[0] && distance <= sector.range[1]) {
      return sector.travelCost;
    }
  }

  return 0;
}

// Define the Server Action function that generates the quote
export async function quoteGenerator(formData: FormData) {
  // Default empty arrays if undefined
  const settings = formData.setting || [];
  const options = formData.options || [];

  // Calculate service base price
  let basePrice = BASE_HOUR_COST;

  // Apply the service type coefficient
  const serviceCoefficient = COEFFICIENTS[formData.service];
  basePrice *= serviceCoefficient;

  // Add cost for shooting setting
  const settingCost = settings.reduce((total, setting) => total + SETTING_COSTS[setting], 0);

  // Add cost for selected options
  const optionsCost = options.reduce((total, option) => total + OPTION_COSTS[option], 0);

  // Calculate total hours worked (start time to end time)
  const startTime = formData.from.hour * 60 + formData.from.minute;
  const endTime = formData.to.hour * 60 + formData.to.minute;
  const totalHours = (endTime - startTime) / 60;

  // Calculate travel cost based on distance to the city
  const travelCost = getTravelCost(formData.city);

  // Calculate total cost
  const totalAmount = (BASE_HOUR_COST * totalHours + settingCost + optionsCost + travelCost);

  // Create the response object with prices for each element and total cost
  const quote = {
    basePrice: BASE_HOUR_COST * totalHours,
    settingCost,
    optionsCost,
    travelCost,
    totalAmount,
  };

  return quote;
}