import { Component, computed, input, output } from '@angular/core'
import { DEVICES, type Device, type Floor } from '../data/estate'

/**
 * The characteristic object of a building operations console is the plan.
 * Rooms are drawn from the floor's own geometry and devices are plotted on it
 * by position, coloured by status — so a fault is located, not just listed.
 */
@Component({
  selector: 'app-floor-plan',
  host: { class: 'block' },
  template: `
    <svg viewBox="0 0 100 100" preserveAspectRatio="none"
         class="block h-full w-full" role="img"
         [attr.aria-label]="'Plan of ' + floor().name + ' showing ' + devices().length + ' devices'">
      <rect width="100" height="100" fill="#FFFFFF" />

      @for (r of floor().rooms; track r.label) {
        <g>
          <rect [attr.x]="r.x" [attr.y]="r.y" [attr.width]="r.w" [attr.height]="r.h"
                fill="#F7F8F7" stroke="#DFE4E3" stroke-width="0.3" vector-effect="non-scaling-stroke" />
        </g>
      }
    </svg>
  `,
})
export class FloorPlanSvg {
  floor = input.required<Floor>()
  devices = computed(() => DEVICES.filter((d) => d.floorId === this.floor().id))
}

/** Plan plus device pins. Pins sit in HTML so they can be focusable buttons. */
@Component({
  selector: 'app-plan',
  imports: [FloorPlanSvg],
  host: { class: 'block' },
  template: `
    <div class="relative aspect-[16/10] w-full border border-line bg-panel">
      <app-floor-plan [floor]="floor()" class="absolute inset-0" />

      @for (r of floor().rooms; track r.label) {
        <span class="pointer-events-none absolute text-[0.6rem] leading-none text-mute"
              [style.left.%]="r.x + 1" [style.top.%]="r.y + 2">{{ r.label }}</span>
      }

      @for (d of devices(); track d.id) {
        <button type="button"
                (click)="select.emit(d)"
                [attr.aria-label]="d.label + ', ' + d.status + ', ' + d.value + d.unit"
                [attr.aria-pressed]="selectedId() === d.id"
                class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-panel transition-transform hover:scale-125 focus-visible:scale-125"
                [class.h-3.5]="selectedId() !== d.id" [class.w-3.5]="selectedId() !== d.id"
                [class.h-5]="selectedId() === d.id" [class.w-5]="selectedId() === d.id"
                [class.ring-2]="selectedId() === d.id"
                [class.ring-ink]="selectedId() === d.id"
                [style.left.%]="d.x" [style.top.%]="d.y"
                [style.background]="colour(d)"></button>
      }
    </div>
  `,
})
export class Plan {
  floor = input.required<Floor>()
  selectedId = input<string | null>(null)
  select = output<Device>()

  devices = computed(() => DEVICES.filter((d) => d.floorId === this.floor().id))

  colour(d: Device) {
    return { ok: '#2F6F4E', warning: '#9A6B00', fault: '#A32F25', offline: '#9AA4A6' }[d.status]
  }
}
