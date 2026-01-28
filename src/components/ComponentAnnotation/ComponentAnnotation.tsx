import { cx } from '../../utils/cx';

export type ComponentAnnotationProps = {
  label: string;

  direction?: 'Left' | 'Right' | 'Up' | 'Down';
  class?: string;
};

export function ComponentAnnotation(props: ComponentAnnotationProps) {
  const direction = props.direction ?? 'Left';
  const isRight = direction === 'Right';

  if (direction === 'Up' || direction === 'Down') {
    const isUp = direction === 'Up';
    return (
      <div
        class={cx(
          'flex h-[calc(var(--bl-scale-1300)+var(--bl-border-width-sm)+var(--bl-border-width-sm))] items-center',
          isUp ? 'flex-col-reverse' : 'flex-col',
          props.class
        )}
      >
        <div class="shrink-0 rounded-[calc(var(--bl-component-annotation-radius)*2)] border border-[color:var(--bl-component-annotation-line)] bg-[color:var(--bl-component-annotation-line)] px-[var(--bl-scale-200)] py-[var(--bl-scale-100)]">
          <div class="text-center text-[length:var(--bl-font-size-body-md)] font-normal leading-[1.4] text-[color:var(--bl-component-annotation-fg)]">
            {props.label}
          </div>
        </div>
        <div class="min-h-0 flex-1 w-[var(--bl-border-width-lg)] bg-[color:var(--bl-component-annotation-line)]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div class={cx('flex w-[var(--bl-scale-2700)] flex-col items-start justify-center gap-[var(--bl-scale-200)]', props.class)}>
      <div class={cx('flex w-full items-center', isRight && 'flex-row-reverse')}>
        <div class="h-[var(--bl-border-width-lg)] flex-1 bg-[color:var(--bl-component-annotation-line)]" />
        <div class="shrink-0 rounded-[calc(var(--bl-component-annotation-radius)*2)] border border-[color:var(--bl-component-annotation-line)] bg-[color:var(--bl-component-annotation-line)] px-[var(--bl-scale-200)] py-[var(--bl-scale-100)]">
          <div class="text-right text-[length:var(--bl-font-size-body-md)] font-normal leading-[1.4] text-[color:var(--bl-component-annotation-fg)]">
            {props.label}
          </div>
        </div>
      </div>
    </div>
  );
}


