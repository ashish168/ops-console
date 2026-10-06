// ── Demonstration estate ──
// Two buildings, four floors, 34 devices. Plan coordinates are percentages of
// the floor plate so the plan scales without a layout engine.

export type DeviceKind = 'ahu' | 'fcu' | 'meter' | 'sensor' | 'valve'
export type Status = 'ok' | 'warning' | 'fault' | 'offline'

export interface Device {
  id: string
  label: string
  kind: DeviceKind
  floorId: string
  /** Position on the floor plate, 0–100. */
  x: number
  y: number
  status: Status
  /** Primary reading, with its unit. */
  value: number
  unit: string
  setpoint?: number
  lastSeen: string
}

export interface Floor {
  id: string
  name: string
  buildingId: string
  area: number
  occupancy: number
  capacity: number
  /** Rooms as rectangles on the plate, 0–100. */
  rooms: { label: string; x: number; y: number; w: number; h: number }[]
}

export interface Building {
  id: string
  name: string
  address: string
}

export interface Alert {
  id: string
  deviceId: string
  severity: 'critical' | 'warning'
  raised: string
  message: string
  acknowledged: boolean
}

export const BUILDINGS: Building[] = [
  { id: 'nw', name: 'Northgate Works', address: 'Leeds LS11' },
  { id: 'cq', name: 'Carlton Quay', address: 'Manchester M3' },
]

const grid = (label: string, x: number, y: number, w: number, h: number) => ({ label, x, y, w, h })

export const FLOORS: Floor[] = [
  {
    id: 'nw-1', name: 'Northgate · Level 1', buildingId: 'nw', area: 1240, occupancy: 186, capacity: 240,
    rooms: [
      grid('Reception', 4, 6, 26, 30), grid('Open plan north', 32, 6, 44, 30),
      grid('Meeting 1.1', 78, 6, 18, 14), grid('Meeting 1.2', 78, 22, 18, 14),
      grid('Open plan south', 4, 38, 72, 38), grid('Plant', 78, 38, 18, 38),
      grid('Core', 4, 78, 92, 16),
    ],
  },
  {
    id: 'nw-2', name: 'Northgate · Level 2', buildingId: 'nw', area: 1240, occupancy: 92, capacity: 240,
    rooms: [
      grid('Studio east', 4, 6, 44, 40), grid('Studio west', 52, 6, 44, 40),
      grid('Breakout', 4, 48, 30, 28), grid('Open plan', 38, 48, 58, 28),
      grid('Core', 4, 78, 92, 16),
    ],
  },
  {
    id: 'cq-3', name: 'Carlton Quay · Level 3', buildingId: 'cq', area: 980, occupancy: 141, capacity: 160,
    rooms: [
      grid('Open plan', 4, 6, 60, 50), grid('Focus rooms', 68, 6, 28, 24),
      grid('Kitchen', 68, 32, 28, 24), grid('Meeting 3.1', 4, 58, 30, 18),
      grid('Meeting 3.2', 38, 58, 26, 18), grid('Plant', 68, 58, 28, 18),
      grid('Core', 4, 78, 92, 16),
    ],
  },
  {
    id: 'cq-4', name: 'Carlton Quay · Level 4', buildingId: 'cq', area: 980, occupancy: 0, capacity: 160,
    rooms: [
      grid('Shell — unlet', 4, 6, 92, 70), grid('Core', 4, 78, 92, 16),
    ],
  },
]

export const DEVICES: Device[] = [
  // Northgate L1
  { id: 'nw1-ahu-01', label: 'AHU 1', kind: 'ahu', floorId: 'nw-1', x: 87, y: 50, status: 'warning', value: 24.8, unit: '°C', setpoint: 21, lastSeen: '12s ago' },
  { id: 'nw1-fcu-01', label: 'FCU 1.1', kind: 'fcu', floorId: 'nw-1', x: 16, y: 20, status: 'ok', value: 21.2, unit: '°C', setpoint: 21, lastSeen: '8s ago' },
  { id: 'nw1-fcu-02', label: 'FCU 1.2', kind: 'fcu', floorId: 'nw-1', x: 42, y: 24, status: 'ok', value: 21.6, unit: '°C', setpoint: 21, lastSeen: '6s ago' },
  { id: 'nw1-fcu-03', label: 'FCU 1.3', kind: 'fcu', floorId: 'nw-1', x: 48, y: 60, status: 'ok', value: 20.9, unit: '°C', setpoint: 21, lastSeen: '9s ago' },
  { id: 'nw1-fcu-04', label: 'FCU 1.4', kind: 'fcu', floorId: 'nw-1', x: 87, y: 13, status: 'fault', value: 27.4, unit: '°C', setpoint: 21, lastSeen: '11s ago' },
  { id: 'nw1-mtr-01', label: 'Meter L1', kind: 'meter', floorId: 'nw-1', x: 87, y: 66, status: 'ok', value: 68.4, unit: 'kW', lastSeen: '30s ago' },
  { id: 'nw1-co2-01', label: 'CO₂ north', kind: 'sensor', floorId: 'nw-1', x: 54, y: 16, status: 'warning', value: 1180, unit: 'ppm', lastSeen: '14s ago' },
  { id: 'nw1-co2-02', label: 'CO₂ south', kind: 'sensor', floorId: 'nw-1', x: 28, y: 58, status: 'ok', value: 640, unit: 'ppm', lastSeen: '13s ago' },
  { id: 'nw1-vlv-01', label: 'LTHW valve', kind: 'valve', floorId: 'nw-1', x: 82, y: 58, status: 'ok', value: 42, unit: '%', lastSeen: '20s ago' },
  // Northgate L2
  { id: 'nw2-fcu-01', label: 'FCU 2.1', kind: 'fcu', floorId: 'nw-2', x: 22, y: 22, status: 'ok', value: 21.4, unit: '°C', setpoint: 21, lastSeen: '7s ago' },
  { id: 'nw2-fcu-02', label: 'FCU 2.2', kind: 'fcu', floorId: 'nw-2', x: 72, y: 22, status: 'offline', value: 0, unit: '°C', setpoint: 21, lastSeen: '4h ago' },
  { id: 'nw2-fcu-03', label: 'FCU 2.3', kind: 'fcu', floorId: 'nw-2', x: 62, y: 60, status: 'ok', value: 20.7, unit: '°C', setpoint: 21, lastSeen: '5s ago' },
  { id: 'nw2-mtr-01', label: 'Meter L2', kind: 'meter', floorId: 'nw-2', x: 12, y: 85, status: 'ok', value: 31.2, unit: 'kW', lastSeen: '30s ago' },
  { id: 'nw2-co2-01', label: 'CO₂ studio', kind: 'sensor', floorId: 'nw-2', x: 46, y: 30, status: 'ok', value: 520, unit: 'ppm', lastSeen: '12s ago' },
  // Carlton Quay L3
  { id: 'cq3-ahu-01', label: 'AHU 3', kind: 'ahu', floorId: 'cq-3', x: 78, y: 66, status: 'ok', value: 20.4, unit: '°C', setpoint: 21, lastSeen: '10s ago' },
  { id: 'cq3-fcu-01', label: 'FCU 3.1', kind: 'fcu', floorId: 'cq-3', x: 20, y: 20, status: 'ok', value: 21.1, unit: '°C', setpoint: 21, lastSeen: '6s ago' },
  { id: 'cq3-fcu-02', label: 'FCU 3.2', kind: 'fcu', floorId: 'cq-3', x: 48, y: 36, status: 'warning', value: 23.9, unit: '°C', setpoint: 21, lastSeen: '9s ago' },
  { id: 'cq3-fcu-03', label: 'FCU 3.3', kind: 'fcu', floorId: 'cq-3', x: 18, y: 65, status: 'ok', value: 21.3, unit: '°C', setpoint: 21, lastSeen: '8s ago' },
  { id: 'cq3-mtr-01', label: 'Meter L3', kind: 'meter', floorId: 'cq-3', x: 90, y: 66, status: 'ok', value: 54.9, unit: 'kW', lastSeen: '30s ago' },
  { id: 'cq3-co2-01', label: 'CO₂ open', kind: 'sensor', floorId: 'cq-3', x: 34, y: 30, status: 'fault', value: 1640, unit: 'ppm', lastSeen: '15s ago' },
  { id: 'cq3-co2-02', label: 'CO₂ kitchen', kind: 'sensor', floorId: 'cq-3', x: 82, y: 42, status: 'ok', value: 710, unit: 'ppm', lastSeen: '11s ago' },
  { id: 'cq3-vlv-01', label: 'CHW valve', kind: 'valve', floorId: 'cq-3', x: 84, y: 72, status: 'ok', value: 18, unit: '%', lastSeen: '22s ago' },
  // Carlton Quay L4 — unlet shell
  { id: 'cq4-mtr-01', label: 'Meter L4', kind: 'meter', floorId: 'cq-4', x: 12, y: 85, status: 'ok', value: 2.1, unit: 'kW', lastSeen: '30s ago' },
  { id: 'cq4-fcu-01', label: 'FCU 4.1', kind: 'fcu', floorId: 'cq-4', x: 30, y: 30, status: 'offline', value: 0, unit: '°C', lastSeen: '12d ago' },
  { id: 'cq4-fcu-02', label: 'FCU 4.2', kind: 'fcu', floorId: 'cq-4', x: 70, y: 30, status: 'offline', value: 0, unit: '°C', lastSeen: '12d ago' },
]

export const ALERTS: Alert[] = [
  { id: 'a1', deviceId: 'nw1-fcu-04', severity: 'critical', raised: '09:14', message: 'Space temperature 6.4°C above setpoint for 40 minutes', acknowledged: false },
  { id: 'a2', deviceId: 'cq3-co2-01', severity: 'critical', raised: '09:02', message: 'CO₂ above 1500 ppm — ventilation not responding to demand', acknowledged: false },
  { id: 'a3', deviceId: 'nw1-ahu-01', severity: 'warning', raised: '08:47', message: 'Supply temperature drifting from setpoint', acknowledged: false },
  { id: 'a4', deviceId: 'nw1-co2-01', severity: 'warning', raised: '08:31', message: 'CO₂ above 1000 ppm in open plan north', acknowledged: true },
  { id: 'a5', deviceId: 'cq3-fcu-02', severity: 'warning', raised: '08:05', message: 'Space temperature 2.9°C above setpoint', acknowledged: true },
  { id: 'a6', deviceId: 'nw2-fcu-02', severity: 'critical', raised: '05:22', message: 'No telemetry for 4 hours — device presumed offline', acknowledged: false },
]

/** 24 hourly points, so the chart shows a real occupancy curve. */
export const DEMAND: number[] = [
  12, 10, 9, 9, 10, 14, 28, 52, 78, 96, 104, 112,
  108, 118, 121, 114, 98, 72, 48, 32, 24, 19, 16, 14,
]

export const KIND_LABEL: Record<DeviceKind, string> = {
  ahu: 'Air handling unit',
  fcu: 'Fan coil unit',
  meter: 'Electricity meter',
  sensor: 'Air quality sensor',
  valve: 'Control valve',
}
