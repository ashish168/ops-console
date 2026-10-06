import { Component, computed, input } from '@angular/core'
import { DEMAND, type Status } from '../data/estate'

@Component({
  selector: 'app-status-dot',
  template: `<span class="inline-block h-2 w-2 shrink-0 rounded-full" [style.background]="colour()"></span>`,
  host: { class: 'inline-flex items-center' },
})
export class StatusDot {
  status = input.required<Status>()
  colour = computed(() => ({ ok: '#2F6F4E', warning: '#9A6B00', fault: '#A32F25', offline: '#9AA4A6' }[this.status()]))
}

@Component({
  selector: 'app-tile',
  template: `
    <div class="border border-line bg-panel px-4 py-3">
      <p class="text-xs text-mute">{{ label() }}</p>
      <p class="mt-1 font-mono text-2xl leading-none text-ink">
        {{ value() }}<span class="ml-1 text-sm text-mute">{{ unit() }}</span>
      </p>
      @if (note()) { <p class="mt-1.5 text-xs" [class]="noteClass()">{{ note() }}</p> }
    </div>
  `,
})
export class Tile {
  label = input.required<string>()
  value = input.required<string | number>()
  unit = input('')
  note = input('')
  tone = input<'neutral' | 'warn' | 'fault'>('neutral')
  noteClass = computed(() => ({ neutral: 'text-mute', warn: 'text-warn', fault: 'text-fault' }[this.tone()]))
}

/**
 * Demand over the last 24 hours. Drawn rather than charted — one series, no
 * interaction needed, and a charting library would be larger than the console.
 */
@Component({
  selector: 'app-demand',
  template: `
    <svg viewBox="0 0 240 64" class="block h-16 w-full" role="img"
         aria-label="Electrical demand over the last 24 hours">
      <polyline [attr.points]="area()" fill="#2F6F4E" fill-opacity="0.08" stroke="none" />
      <polyline [attr.points]="line()" fill="none" stroke="#2F6F4E" stroke-width="1.5"
                stroke-linejoin="round" vector-effect="non-scaling-stroke" />
    </svg>
  `,
})
export class Demand {
  private pts = computed(() => {
    const max = Math.max(...DEMAND)
    return DEMAND.map((v, i) => [(i / (DEMAND.length - 1)) * 240, 60 - (v / max) * 52])
  })
  line = computed(() => this.pts().map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '))
  area = computed(() => `0,64 ${this.line()} 240,64`)
}
