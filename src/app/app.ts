import { Component, computed, signal } from '@angular/core'
import { Plan } from './components/floor-plan'
import { Demand, StatusDot, Tile } from './components/bits'
import { ALERTS, BUILDINGS, DEVICES, FLOORS, KIND_LABEL, type Alert, type Device, type Status } from './data/estate'

@Component({
  selector: 'app-root',
  imports: [Plan, Tile, StatusDot, Demand],
  templateUrl: './app.html',
})
export class App {
  readonly buildings = BUILDINGS
  readonly kindLabel = KIND_LABEL

  floorId = signal(FLOORS[0].id)
  selected = signal<Device | null>(null)
  statusFilter = signal<Status | 'all'>('all')
  acknowledged = signal<Set<string>>(new Set(ALERTS.filter((a) => a.acknowledged).map((a) => a.id)))

  floor = computed(() => FLOORS.find((f) => f.id === this.floorId())!)
  floorsOf = (buildingId: string) => FLOORS.filter((f) => f.buildingId === buildingId)

  devices = computed(() => DEVICES.filter((d) => d.floorId === this.floorId()))

  visibleDevices = computed(() => {
    const f = this.statusFilter()
    return f === 'all' ? this.devices() : this.devices().filter((d) => d.status === f)
  })

  counts = computed(() => {
    const c = { ok: 0, warning: 0, fault: 0, offline: 0 }
    for (const d of this.devices()) c[d.status]++
    return c
  })

  /** Alerts for this floor, unacknowledged first, then most recent. */
  alerts = computed(() => {
    const ids = new Set(this.devices().map((d) => d.id))
    const ack = this.acknowledged()
    return ALERTS.filter((a) => ids.has(a.deviceId))
      .map((a) => ({ ...a, acknowledged: ack.has(a.id) }))
      .sort((a, b) => Number(a.acknowledged) - Number(b.acknowledged) || b.raised.localeCompare(a.raised))
  })

  openAlerts = computed(() => this.alerts().filter((a) => !a.acknowledged).length)

  occupancyPct = computed(() => Math.round((this.floor().occupancy / this.floor().capacity) * 100))

  demandNow = computed(() =>
    this.devices().filter((d) => d.kind === 'meter').reduce((s, d) => s + d.value, 0).toFixed(1))

  deviceOf = (id: string) => DEVICES.find((d) => d.id === id)!

  pick(floorId: string) {
    this.floorId.set(floorId)
    this.selected.set(null)
    this.statusFilter.set('all')
  }

  acknowledge(a: Alert) {
    this.acknowledged.update((s) => new Set(s).add(a.id))
  }

  statusLabel(s: Status) {
    return { ok: 'Normal', warning: 'Warning', fault: 'Fault', offline: 'Offline' }[s]
  }

  /** Difference from setpoint, where the device has one. */
  deviation(d: Device) {
    if (d.setpoint === undefined || d.status === 'offline') return null
    return +(d.value - d.setpoint).toFixed(1)
  }
}
