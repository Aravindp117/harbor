export type DisasterType = 'earthquake' | 'flood' | 'hurricane' | 'wildfire' | 'extreme-heat';

export interface DisasterEvent {
  id: string;
  type: DisasterType;
  title: string;
  location: string;
  lat: number;
  lng: number;
  date: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  frequency: string;
}

export const disasterColors: Record<DisasterType, string> = {
  earthquake: '#ef4444',
  flood: '#3b82f6',
  hurricane: '#8b5cf6',
  wildfire: '#f59e0b',
  'extreme-heat': '#f97316',
};

export const mockDisasters: DisasterEvent[] = [
  { id: '1', type: 'earthquake', title: 'M6.2 Earthquake', location: 'Santiago, Chile', lat: -33.45, lng: -70.67, date: '2026-02-06', severity: 'High', frequency: '12 events/year' },
  { id: '2', type: 'hurricane', title: 'Typhoon Mara', location: 'Manila, Philippines', lat: 14.6, lng: 120.98, date: '2026-02-05', severity: 'Critical', frequency: '8 events/year' },
  { id: '3', type: 'flood', title: 'Severe Flooding', location: 'Dhaka, Bangladesh', lat: 23.81, lng: 90.41, date: '2026-02-04', severity: 'High', frequency: '15 events/year' },
  { id: '4', type: 'wildfire', title: 'Forest Fire', location: 'New South Wales, Australia', lat: -33.87, lng: 151.21, date: '2026-02-03', severity: 'Moderate', frequency: '6 events/year' },
  { id: '5', type: 'extreme-heat', title: 'Extreme Heat Wave', location: 'New Delhi, India', lat: 28.61, lng: 77.21, date: '2026-02-02', severity: 'High', frequency: '10 events/year' },
  { id: '6', type: 'earthquake', title: 'M5.4 Earthquake', location: 'Tokyo, Japan', lat: 35.68, lng: 139.69, date: '2026-02-01', severity: 'Moderate', frequency: '20 events/year' },
  { id: '7', type: 'flood', title: 'River Flooding', location: 'Cologne, Germany', lat: 50.94, lng: 6.96, date: '2026-01-30', severity: 'Low', frequency: '3 events/year' },
  { id: '8', type: 'hurricane', title: 'Hurricane Delta', location: 'Miami, USA', lat: 25.76, lng: -80.19, date: '2026-01-28', severity: 'High', frequency: '5 events/year' },
  { id: '9', type: 'wildfire', title: 'Brush Fire', location: 'Cape Town, South Africa', lat: -33.93, lng: 18.42, date: '2026-01-25', severity: 'Moderate', frequency: '4 events/year' },
  { id: '10', type: 'earthquake', title: 'M4.8 Earthquake', location: 'Istanbul, Turkey', lat: 41.01, lng: 28.98, date: '2026-01-22', severity: 'Low', frequency: '8 events/year' },
];

export interface AidResource {
  id: string;
  name: string;
  type: 'shelter' | 'food' | 'medical' | 'evacuation';
  lat: number;
  lng: number;
  address: string;
  distance: string;
}

export const aidColors: Record<AidResource['type'], string> = {
  shelter: '#3b82f6',
  food: '#22c55e',
  medical: '#ef4444',
  evacuation: '#f59e0b',
};

export const mockAidResources: AidResource[] = [
  { id: 'a1', name: 'Central Emergency Shelter', type: 'shelter', lat: 14.58, lng: 120.97, address: '123 Main St, Manila', distance: '1.2 km' },
  { id: 'a2', name: 'Food Distribution Center', type: 'food', lat: 14.62, lng: 121.0, address: '456 Relief Ave, Quezon City', distance: '3.5 km' },
  { id: 'a3', name: 'Red Cross Medical Station', type: 'medical', lat: 14.55, lng: 120.99, address: '789 Health Blvd, Manila', distance: '2.1 km' },
  { id: 'a4', name: 'City Evacuation Center', type: 'evacuation', lat: 14.63, lng: 120.96, address: '321 Safety Rd, Manila', distance: '4.0 km' },
  { id: 'a5', name: 'Community Food Bank', type: 'food', lat: 14.59, lng: 121.02, address: '555 Hope St, Pasig', distance: '5.2 km' },
  { id: 'a6', name: 'Municipal Shelter', type: 'shelter', lat: 14.57, lng: 120.95, address: '111 Shelter Lane, Manila', distance: '1.8 km' },
  { id: 'a7', name: 'Field Hospital', type: 'medical', lat: 14.61, lng: 120.98, address: '222 Care Dr, Manila', distance: '2.9 km' },
  { id: 'a8', name: 'School Evacuation Point', type: 'evacuation', lat: 14.56, lng: 121.01, address: '333 School Ave, Makati', distance: '3.7 km' },
];
