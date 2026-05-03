'use client';

import { useDeferredValue, useMemo } from 'react';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import type { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { DateTimePicker } from 'react-datetime-picker';
import type { FormValues, Unit } from '@/lib/types';
import { calcBMI, bmiInfo } from '@/lib/bmi';
import { IconChevronRight } from './icons';
import { useLocalStorage } from 'foxact/use-local-storage';

import 'react-datetime-picker/dist/DateTimePicker.css';
// eslint-disable-next-line import-x/no-unresolved -- fuck eslint-plugin-import-x
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './datetime-picker.css';

const styles = stylex.create({
  pageTitle: {
    fontSize: {
      default: '26px',
      '@media (max-width: 540px)': '22px'
    },
    fontWeight: 600,
    letterSpacing: '-0.6px',
    marginBottom: '8px',
    color: 'var(--fg)'
  },
  pageSub: {
    fontSize: '14px',
    color: 'var(--fg-muted)',
    marginBottom: '36px',
    fontWeight: 300
  },
  sectionHeading: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color: 'var(--fg-subtle)',
    marginBottom: '20px',
    marginTop: '36px'
  },
  sectionHeadingFlush: {
    marginTop: '0',
    marginBottom: '0'
  },
  rowHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px'
  },
  rowHeaderSpaced: {
    marginTop: '32px'
  },
  field: {
    display: 'flex',
    alignItems: 'baseline',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: {
      default: 'var(--line)',
      ':focus-within': 'var(--line-focus)'
    },
    paddingTop: '14px',
    paddingBottom: '13px',
    transition: 'border-color 0.15s'
  },
  fieldLabel: {
    fontSize: {
      default: '13.5px',
      '@media (max-width: 540px)': '13px'
    },
    color: 'var(--fg-muted)',
    fontWeight: 400,
    flexShrink: 0,
    transition: 'color 0.15s',
    display: 'flex',
    alignItems: 'center',
    rowGap: '6px',
    columnGap: '6px',
    paddingRight: '4px'
  },
  fieldInputWrap: {
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%',
    display: 'flex',
    alignItems: 'baseline',
    rowGap: '6px',
    columnGap: '6px'
  },
  input: {
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    outlineStyle: 'none',
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '14px',
    color: 'var(--fg)',
    textAlign: 'right',
    minWidth: '0',
    padding: '0',
    '::placeholder': {
      color: 'var(--fg-subtle)'
    },
    '::-webkit-inner-spin-button': {
      WebkitAppearance: 'none'
    },
    '::-webkit-outer-spin-button': {
      WebkitAppearance: 'none'
    }
  },
  unit: {
    fontSize: '12px',
    color: 'var(--fg-subtle)',
    fontFamily: 'var(--font-mono), monospace',
    flexShrink: 0
  },
  badgeAuto: {
    fontSize: '9.5px',
    fontWeight: 700,
    letterSpacing: '0.06em',
    color: 'var(--accent)',
    backgroundColor: 'var(--accent-soft)',
    paddingBlock: '1px',
    paddingInline: '5px',
    borderRadius: '4px',
    fontFamily: 'var(--font-mono), monospace'
  },
  bmiVal: {
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '14px',
    fontWeight: 500,
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%',
    textAlign: 'right'
  },
  bmiLabel: {
    fontSize: '12px',
    color: 'var(--fg-subtle)'
  },
  bmiEmpty: {
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '14px',
    color: 'var(--fg-subtle)',
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%',
    textAlign: 'right'
  },
  unitToggle: {
    display: 'flex',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--line)',
    borderRadius: '99px',
    padding: '3px',
    rowGap: '2px',
    columnGap: '2px'
  },
  unitBtn: {
    backgroundColor: 'transparent',
    borderStyle: 'none',
    paddingBlock: '3px',
    paddingInline: '10px',
    borderRadius: '99px',
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '11.5px',
    fontWeight: 500,
    color: 'var(--fg-subtle)',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s'
  },
  unitBtnOn: {
    backgroundColor: 'var(--fg)',
    color: 'var(--bg)'
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    rowGap: '7px',
    columnGap: '7px',
    backgroundColor: 'var(--fg)',
    color: 'var(--bg)',
    borderStyle: 'none',
    borderRadius: '99px',
    paddingBlock: '11px',
    paddingInline: '22px',
    fontFamily: 'var(--font-dm-sans), -apple-system, sans-serif',
    fontSize: '13.5px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'opacity 0.15s, transform 0.1s',
    letterSpacing: '-0.1px',
    opacity: {
      default: null,
      ':hover': 0.85
    },
    transform: {
      default: null,
      ':active': 'scale(0.98)'
    }
  },
  btnDisabled: {
    opacity: 0.3,
    cursor: 'not-allowed'
  },
  btnRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    rowGap: '8px',
    columnGap: '8px',
    marginTop: '48px'
  }
});

function Field({ label, badge, children }: { label: string, badge?: string, children: ReactNode }) {
  return (
    <div {...stylex.props(styles.field)}>
      <div {...stylex.props(styles.fieldLabel)}>
        {label}
        {badge && <span {...stylex.props(styles.badgeAuto)}>{badge}</span>}
      </div>
      <div {...stylex.props(styles.fieldInputWrap)}>{children}</div>
    </div>
  );
}

function BmiDisplay({ unit }: { unit: Unit }) {
  const weight = useWatch({ name: 'weight', defaultValue: '0' });
  const height = useWatch({ name: 'height', defaultValue: '0' });

  const deferredWeight = useDeferredValue(weight);
  const deferredHeight = useDeferredValue(height);

  const bmi = useMemo(() => calcBMI(deferredWeight, deferredHeight, unit), [deferredWeight, deferredHeight, unit]);
  const bmiI = bmiInfo(bmi);

  return (
    <Field label="BMI" badge="AUTO CALCULATED">
      {bmi
        ? (
          <>
            <span {...stylex.props(styles.bmiVal)} style={{ color: bmiI?.color }}>{bmi}</span>
            <span {...stylex.props(styles.bmiLabel)}>{bmiI?.label}</span>
          </>
        )
        : (
          <span {...stylex.props(styles.bmiEmpty)}>—</span>
        )}
    </Field>
  );
}

interface Step1Props {
  onNext: (values: FormValues, unit: Unit) => void
}

// Read a localStorage entry, falling back to '' when running on the server or when the key is absent
function lsGet(key: string): string {
  if (typeof window === 'undefined') return '';

  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

// Persist a value; remove the key entirely when the value is empty
function lsSet(key: string, value: string) {
  if (typeof window === 'undefined') return;

  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    // Ignore errors
  }
}

export function Step1({ onNext }: Step1Props) {
  // Unit preference lives directly in localStorage — no useState wrapper needed
  const [storedUnit, setStoredUnit] = useLocalStorage<string | null>('w2f:unit', 'metric', { raw: true });
  const unit: Unit = storedUnit === 'imperial' ? 'imperial' : 'metric';

  const wU = unit === 'metric' ? 'kg' : 'lbs';
  const hU = unit === 'metric' ? 'cm' : 'in';

  const form = useForm<FormValues>({
    mode: 'onChange',
    // Async defaultValues lets us read localStorage once on mount without any effects
    defaultValues(): Promise<FormValues> {
      return Promise.resolve({
        timestamp: new Date(),
        weight: '',
        height: lsGet('w2f:height'),
        bodyFat: '',
        boneMass: lsGet('w2f:boneMass'),
        muscleMass: '',
        bodyWater: '',
        visceralFat: lsGet('w2f:visceralFat'),
        metabolicAge: lsGet('w2f:metabolicAge')
      });
    }
  });
  const { register, handleSubmit, formState: { isValid }, control } = form;

  function handleFormSubmit(values: FormValues) {
    // Persist rarely-changing fields only on a successful submit
    lsSet('w2f:height', values.height);
    lsSet('w2f:boneMass', values.boneMass);
    lsSet('w2f:visceralFat', values.visceralFat);
    lsSet('w2f:metabolicAge', values.metabolicAge);

    onNext(values, unit);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div {...stylex.props(styles.pageTitle)}>Body Measurements</div>
        <p {...stylex.props(styles.pageSub)}>Enter your measurements. Only weight is required.</p>

        <div {...stylex.props(styles.rowHeader)}>
          <div {...stylex.props(styles.sectionHeading, styles.sectionHeadingFlush)}>Date &amp; Time</div>
        </div>
        <Field label="Timestamp">
          <Controller
            name="timestamp"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                format="yyyy-MM-dd HH:mm"
                calendarProps={{
                  calendarType: 'gregory'
                }}
                clearIcon={null}
              />
            )}
          />
        </Field>

        <div {...stylex.props(styles.rowHeader, styles.rowHeaderSpaced)}>
          <div {...stylex.props(styles.sectionHeading, styles.sectionHeadingFlush)}>Basic</div>
          <div {...stylex.props(styles.unitToggle)}>
            <button type="button" {...stylex.props(styles.unitBtn, unit === 'metric' && styles.unitBtnOn)} onClick={() => setStoredUnit('metric')}>kg</button>
            <button type="button" {...stylex.props(styles.unitBtn, unit === 'imperial' && styles.unitBtnOn)} onClick={() => setStoredUnit('imperial')}>lbs</button>
          </div>
        </div>

        <Field label="Weight *">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('weight', { required: true })} min="0" step="0.1" />
          <span {...stylex.props(styles.unit)}>{wU}</span>
        </Field>

        <Field label="Height">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('height')} min="0" step="0.5" />
          <span {...stylex.props(styles.unit)}>{hU}</span>
        </Field>

        <BmiDisplay unit={unit} />

        <div {...stylex.props(styles.sectionHeading)}>Body Composition</div>

        <Field label="Body Fat">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('bodyFat')} min="0" max="100" step="0.1" />
          <span {...stylex.props(styles.unit)}>%</span>
        </Field>
        <Field label="Bone Mass">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('boneMass')} min="0" step="0.1" />
          <span {...stylex.props(styles.unit)}>{wU}</span>
        </Field>
        <Field label="Skeletal Muscle Mass">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('muscleMass')} min="0" step="0.1" />
          <span {...stylex.props(styles.unit)}>{wU}</span>
        </Field>
        <Field label="Body Water">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('bodyWater')} min="0" max="100" step="0.1" />
          <span {...stylex.props(styles.unit)}>%</span>
        </Field>

        <div {...stylex.props(styles.sectionHeading)}>Advanced</div>

        <Field label="Visceral Fat">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('visceralFat')} min="1" max="254" step="1" />
          <span {...stylex.props(styles.unit)}>rating</span>
        </Field>
        <Field label="Metabolic Age">
          <input {...stylex.props(styles.input)} type="number" placeholder="—" {...register('metabolicAge')} min="0" step="1" />
          <span {...stylex.props(styles.unit)}>yrs</span>
        </Field>

        <div {...stylex.props(styles.btnRow)}>
          <button type="submit" {...stylex.props(styles.btn, !isValid && styles.btnDisabled)} disabled={!isValid}>
            Continue <IconChevronRight size={16} />
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
