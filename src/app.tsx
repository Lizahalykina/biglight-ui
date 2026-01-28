import { useMemo, useState } from 'preact/hooks'
import type { ComponentChildren } from 'preact'
import { Button } from './components/Button/Button'
import { Card } from './components/Card/Card'
import { cardExamples } from './components/Card/Card.examples'
import { Input } from './components/Input/Input'
import { LoginDrawer } from './components/LoginDrawer/LoginDrawer'
import { Dropdown } from './components/Dropdown/Dropdown'
import { dropdownExamples } from './components/Dropdown/Dropdown.examples'
import { ComponentAnnotation } from './components/ComponentAnnotation/ComponentAnnotation'
import { ThemeProvider } from './theme/ThemeProvider'
import { previewLayout } from './layout/previewLayout'
import { PreviewSection } from './components/PreviewSection/PreviewSection'

export function App() {
  const [componentTheme, setComponentTheme] = useState<'brandA' | 'brandB'>('brandA')

  const componentThemeOptions = useMemo(
    () => [
      { label: 'Brand A (components)', value: 'brandA' },
      { label: 'Brand B (components)', value: 'brandB' },
    ],
    []
  )

  return (
    <>
      <main class="min-h-screen w-full bg-[#F3F4F6] text-[color:var(--bl-fg)]">
        <div class={previewLayout.containerClass}>
          <div class={previewLayout.headerRowClass}>
            <div>
              <div class="text-sm font-medium text-[color:var(--bl-muted)]">Biglight UI</div>
              <h1 class="mt-1 text-3xl font-semibold tracking-tight">Component gallery</h1>
            </div>
            <div class="w-full sm:w-[calc(var(--bl-scale-3000)+var(--bl-scale-2500))]">
              <Dropdown
                label="Component theme"
                value={componentTheme}
                options={componentThemeOptions}
                onChange={(v) => setComponentTheme(v as typeof componentTheme)}
              />
            </div>
          </div>

          <ThemeProvider key={componentTheme} initialTheme={componentTheme}>
            <div class={previewLayout.mainGridClass}>
              <PreviewSection title="Buttons" class="overflow-x-auto" dataNodeId="19:1219">
                <div class={previewLayout.buttons.minWidthClass}>
                  <div>
                    <div class="grid bl-preview-buttons-grid gap-x-4">
                    <div />
                    <div class="rounded-[var(--bl-border-radius-md)] bg-[color:var(--bl-surface-colour-action-secondary)] px-10 py-4">
                      <div class="text-[length:var(--bl-font-size-body-lg)] font-medium leading-[1.2] text-[color:var(--bl-text-colour-action-inverse)]">
                        Primary
                      </div>
                    </div>
                    <div class="rounded-[var(--bl-border-radius-md)] bg-[color:var(--bl-surface-colour-action-secondary)] px-10 py-4">
                      <div class="text-[length:var(--bl-font-size-body-lg)] font-medium leading-[1.2] text-[color:var(--bl-text-colour-action-inverse)]">
                        Secondary
                      </div>
                    </div>
                    <div class="rounded-[var(--bl-border-radius-md)] bg-[color:var(--bl-surface-colour-action-secondary)] px-10 py-4">
                      <div class="text-[length:var(--bl-font-size-body-lg)] font-medium leading-[1.2] text-[color:var(--bl-text-colour-action-inverse)]">
                        Tertiary
                      </div>
                    </div>
                    </div>

                    <div class="mt-8 grid bl-preview-buttons-grid gap-x-4">
                    <div class="pt-7">
                      <ComponentAnnotation label="Default" direction="Right" />
                    </div>
                    <div class="col-span-3 row-span-3 rounded-[var(--bl-border-radius-md)] border border-dashed border-[color:var(--bl-border-colour-disabled)] p-5">
                      <div class="grid grid-cols-3 gap-x-4">
                        <div class="space-y-7">
                          <div class="flex items-center gap-6">
                            <Button variant="primary" size="md">
                              Button label
                            </Button>
                            <Button variant="primary" size="sm">
                              Button label
                            </Button>
                          </div>
                          <div class="flex items-center gap-6">
                            <Button variant="primary" size="md" forceState="hover">
                              Button label
                            </Button>
                            <Button variant="primary" size="sm" forceState="hover">
                              Button label
                            </Button>
                          </div>
                          <div class="flex items-center gap-6">
                            <Button variant="primary" size="md" disabled>
                              Button label
                            </Button>
                            <Button variant="primary" size="sm" disabled>
                              Button label
                            </Button>
                          </div>
                        </div>

                        <div class="space-y-7">
                          <div class="flex items-center gap-6">
                            <Button variant="secondary" size="md">
                              Button label
                            </Button>
                            <Button variant="secondary" size="sm">
                              Button label
                            </Button>
                          </div>
                          <div class="flex items-center gap-6">
                            <Button variant="secondary" size="md" forceState="hover">
                              Button label
                            </Button>
                            <Button variant="secondary" size="sm" forceState="hover">
                              Button label
                            </Button>
                          </div>
                          <div class="flex items-center gap-6">
                            <Button variant="secondary" size="md" disabled>
                              Button label
                            </Button>
                            <Button variant="secondary" size="sm" disabled>
                              Button label
                            </Button>
                          </div>
                        </div>

                        <div class="space-y-7">
                          <div class="flex items-center gap-6">
                            <Button variant="tertiary" size="md">
                              Button label
                            </Button>
                            <Button variant="tertiary" size="sm">
                              Button label
                            </Button>
                          </div>
                          <div class="flex items-center gap-6">
                            <Button variant="tertiary" size="md" forceState="hover">
                              Button label
                            </Button>
                            <Button variant="tertiary" size="sm" forceState="hover">
                              Button label
                            </Button>
                          </div>
                          <div class="flex items-center gap-6">
                            <Button variant="tertiary" size="md" disabled>
                              Button label
                            </Button>
                            <Button variant="tertiary" size="sm" disabled>
                              Button label
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="pt-7">
                      <ComponentAnnotation label="Hovered" direction="Right" />
                    </div>

                    <div class="pt-7">
                      <ComponentAnnotation label="Disabled" direction="Right" />
                    </div>
                    </div>
                  </div>
                </div>
              </PreviewSection>

              <PreviewSection title="Cards">
                <div class="mt-5">
                  <CardSectionFrame>
                    <CardSectionItem>
                      <Card {...cardExamples.Medium} class="w-full" />
                    </CardSectionItem>
                    <CardSectionItem>
                      <Card {...cardExamples.Small} class="w-full" />
                    </CardSectionItem>
                  </CardSectionFrame>
                </div>
              </PreviewSection>

              <div class="grid grid-cols-1 gap-3">
                <PreviewSection title="Inputs and dropdowns" class="min-w-0 overflow-visible">
                  <div class="mt-5 mb-20 grid grid-cols-1 gap-6 2xl:grid-cols-2">
                    <div class="min-w-0">
                      <div class="flex h-[calc(var(--bl-scale-1300)+var(--bl-border-width-lg))] items-center rounded-[var(--bl-border-radius-md)] bg-[color:var(--bl-surface-colour-action-secondary)] px-[var(--bl-scale-1000)] py-[var(--bl-scale-400)]">
                        <div class="text-[length:var(--bl-font-size-body-lg)] font-medium leading-[1.2] text-[color:var(--bl-text-colour-action-inverse)]">
                          Dropdowns
                        </div>
                      </div>

                      <div class="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-4 overflow-visible">
                        <div class="overflow-visible p-5">
                          <div class="space-y-14">
                            <ComponentAnnotation label="Default" direction="Right" class="mt-[4px]" />
                            <ComponentAnnotation label="Active" direction="Right" class="mt-[4px]" />
                            <ComponentAnnotation label="Filled" direction="Right" class="mt-[4px]" />
                            <ComponentAnnotation label="Disabled" direction="Right" class="mt-[4px]" />
                            <ComponentAnnotation label="Opened" direction="Right" class="mt-[4px]" />
                          </div>
                        </div>

                        <div class="min-w-0 overflow-visible rounded-[var(--bl-border-radius-md)] border border-dashed border-[color:var(--bl-border-colour-disabled)] bg-[color:var(--bl-surface-colour-secondary)]">
                          <div class="p-5">
                            <div class="space-y-5">
                              <Dropdown {...dropdownExamples.Default} />
                              <Dropdown {...dropdownExamples.Active} />
                              <Dropdown {...dropdownExamples.Filled} />
                              <Dropdown {...dropdownExamples.Disabled} />
                              <Dropdown {...dropdownExamples.Opened} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="min-w-0">
                      <div class="flex h-[calc(var(--bl-scale-1300)+var(--bl-border-width-lg))] items-center rounded-[var(--bl-border-radius-md)] bg-[color:var(--bl-surface-colour-action-secondary)] px-[var(--bl-scale-1000)] py-[var(--bl-scale-400)]">
                        <div class="text-[length:var(--bl-font-size-body-lg)] font-medium leading-[1.2] text-[color:var(--bl-text-colour-action-inverse)]">
                          Input fields
                        </div>
                      </div>

                      <div class="mt-6 grid grid-cols-[minmax(0,1fr)_auto] gap-4 overflow-visible">
                        <div class="min-w-0 overflow-visible rounded-[var(--bl-border-radius-md)] border border-dashed border-[color:var(--bl-border-colour-disabled)] bg-[color:var(--bl-surface-colour-secondary)]">
                          <div class="p-5">
                            <div class="space-y-5">
                              <Input
                                label="Default"
                                variant="default"
                                placeholder="Type something…"
                                value=""
                                required
                                requiredText="required"
                              />
                              <Input
                                label="Focus"
                                variant="focus"
                                placeholder="Type something…"
                                value=""
                                required
                                requiredText="required"
                              />
                              <Input label="Filled" variant="filled" value="Liza" required requiredText="required" />
                              <Input
                                label="Disabled"
                                variant="disabled"
                                placeholder="Type something…"
                                value=""
                                required
                                requiredText="required"
                              />
                              <Input label="Error" variant="error" value="liza@" required requiredText="required" />
                              <Input
                                label="Success"
                                variant="success"
                                value="liza@biglight.com"
                                required
                                requiredText="required"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="overflow-visible p-5">
                          <div class="space-y-14">
                            <ComponentAnnotation label="Default" direction="Left" class="mt-[4px]" />
                            <ComponentAnnotation label="Focus" direction="Left" class="mt-[4px]" />
                            <ComponentAnnotation label="Filled" direction="Left" class="mt-[4px]" />
                            <ComponentAnnotation label="Disabled" direction="Left" class="mt-[4px]" />
                            <ComponentAnnotation label="Error" direction="Left" class="mt-[4px]" />
                            <ComponentAnnotation label="Success" direction="Left" class="mt-[4px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PreviewSection>

                <PreviewSection title="Log in - Drawer" class="min-w-0 overflow-visible" dataNodeId="4300:19992" contentClass="p-0">
                  <div class="px-[var(--bl-scale-1000)] pb-[var(--bl-scale-1000)] pt-[var(--bl-scale-1600)]">
                    <div class="flex h-[calc(var(--bl-scale-1300)+var(--bl-border-width-lg))] items-center rounded-[var(--bl-border-radius-md)] bg-[color:var(--bl-surface-colour-action-secondary)] px-[var(--bl-scale-1000)] py-[var(--bl-scale-400)]">
                      <div class="text-[length:var(--bl-font-size-body-lg)] font-medium leading-[1.2] text-[color:var(--bl-text-colour-inverse)]">
                        Log in Magic Link
                      </div>
                    </div>

                    <div class="mt-[var(--bl-scale-1600)]">
                      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
                        <div class="relative h-[calc(var(--bl-scale-1300)+var(--bl-border-width-lg))]">
                          <ComponentAnnotation label="Desktop" direction="Down" class="absolute left-0 top-0" />
                        </div>
                        <div class="relative h-[calc(var(--bl-scale-1300)+var(--bl-border-width-lg))]">
                          <ComponentAnnotation label="Mobile" direction="Down" class="absolute left-0 top-0" />
                        </div>
                      </div>

                      <div class="mt-2 inline-flex w-full flex-nowrap items-start gap-5 rounded-[var(--bl-border-radius-md)] border border-dashed border-[color:var(--bl-border-colour-disabled)] p-4 lg:gap-10">
                        <div class="grid w-full grid-cols-1 gap-10 lg:items-start lg:grid-cols-[minmax(0,1fr)_390px]">
                          <div class="w-full min-w-0">
                            <LoginDrawer open={true} onClose={() => {}} variant="desktop" mode="embedded" class="w-full" />
                          </div>
                          <div class="w-full min-w-0">
                            <LoginDrawer
                              open={true}
                              onClose={() => {}}
                              variant="mobile"
                              mode="embedded"
                              class="mx-0 w-[390px] max-w-[390px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </PreviewSection>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </main>
    </>
  )
}

function CardSectionFrame(props: { children: ComponentChildren }) {
  return (
    <div class="m-[var(--bl-scale-600)] w-full max-w-[calc(var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000)+var(--bl-scale-3000))] mx-auto rounded-[var(--bl-border-radius-md)] border border-dashed border-[color:var(--bl-border-colour-disabled)] p-[var(--bl-spacing-2xl)]">
      <div class="grid grid-cols-1 gap-[var(--bl-spacing-xl)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)]">
        {props.children}
      </div>
    </div>
  )
}

function CardSectionItem(props: { children: ComponentChildren }) {
  return <div class="min-w-0">{props.children}</div>
}
