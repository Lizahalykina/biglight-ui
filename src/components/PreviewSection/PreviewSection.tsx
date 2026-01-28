import type { ComponentChildren } from 'preact'
import { previewLayout } from '../../layout/previewLayout'
import { cx } from '../../utils/cx'

export type PreviewSectionProps = {
  title: string
  children?: ComponentChildren
  class?: string
  contentClass?: string

  dataNodeId?: string
}

export function PreviewSection(props: PreviewSectionProps) {
  return (
    <div
      class={cx('overflow-hidden rounded-[var(--bl-border-radius-md)] bg-[#F9FAFB]', props.class)}
      data-node-id={props.dataNodeId}
    >
      <div class={cx(previewLayout.buttons.headerClass, 'bg-white')}>
        <div class="text-[length:var(--bl-font-size-heading-h6)] font-normal leading-[1.2] text-[color:var(--bl-text-colour-headings)]">
          {props.title}
        </div>
      </div>

      <div class={cx(previewLayout.buttons.contentClass, props.contentClass)}>{props.children}</div>
    </div>
  )
}


