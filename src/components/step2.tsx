'use client';

import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import type { FormValues, Unit } from '@/lib/types';
import { generateWeightFit } from '@/lib/generate-fit';
import type { BodyCompositionData } from '@/lib/generate-fit';
import { calcBMI } from '@/lib/bmi';
import { IconChevronRight, IconChevronLeft, IconDownload, IconCheck } from './icons';

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
  summary: {
    display: 'grid',
    gridTemplateColumns: {
      default: '1fr 1fr',
      '@media (max-width: 540px)': '1fr'
    },
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: 'var(--line)'
  },
  summaryItem: {
    paddingBlock: '14px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'var(--line)'
  },
  summaryItemOdd: {
    paddingRight: '24px'
  },
  summaryItemEven: {
    paddingLeft: {
      default: '24px',
      '@media (max-width: 540px)': '0'
    },
    borderLeftWidth: {
      default: '1px',
      '@media (max-width: 540px)': '0'
    },
    borderLeftStyle: 'solid',
    borderLeftColor: 'var(--line)'
  },
  summaryLbl: {
    fontSize: '11.5px',
    color: 'var(--fg-subtle)',
    marginBottom: '3px'
  },
  summaryVal: {
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--fg)'
  },
  summaryUnit: {
    fontSize: '11px',
    color: 'var(--fg-subtle)',
    marginLeft: '2px'
  },
  generateArea: {
    marginTop: '40px',
    paddingBlock: '36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: '12px',
    columnGap: '12px'
  },
  generateTitle: {
    fontSize: '17px',
    fontWeight: 600,
    letterSpacing: '-0.3px'
  },
  generateDesc: {
    fontSize: '13.5px',
    color: 'var(--fg-muted)',
    lineHeight: 1.6,
    maxWidth: '380px'
  },
  generateDescCode: {
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '12.5px',
    backgroundColor: 'var(--code-bg)',
    paddingBlock: '1px',
    paddingInline: '5px',
    borderRadius: '4px'
  },
  success: {
    display: 'flex',
    alignItems: 'center',
    rowGap: '8px',
    columnGap: '8px',
    fontSize: '15px',
    color: 'var(--success)',
    fontWeight: 500
  },
  successIcon: {
    width: '20px',
    height: '20px',
    backgroundColor: 'var(--success)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0
  },
  retryText: {
    fontSize: '13.5px',
    color: '#d97706'
  },
  retryLink: {
    color: '#d97706',
    textDecoration: 'underline',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderStyle: 'none',
    padding: '0',
    fontFamily: 'inherit',
    fontSize: 'inherit'
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
  btnSecondary: {
    backgroundColor: 'transparent',
    color: {
      default: 'var(--fg-muted)',
      ':hover': 'var(--fg)'
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: 'var(--line)',
      ':hover': 'var(--fg-muted)'
    }
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

interface Step2Props {
  form: FormValues,
  unit: Unit,
  onBack: () => void,
  onNext: () => void
}

export function Step2({ form, unit, onBack, onNext }: Step2Props) {
  const [generated, setGenerated] = useState(false);

  function handleGenerate() {
    const isImperial = unit === 'imperial';
    const toKg = (v: string) => {
      const n = Number.parseFloat(v);
      return isImperial ? n / 2.20462 : n;
    };

    const data: BodyCompositionData = {
      timestamp: new Date(form.timestamp),
      weight: toKg(form.weight)
    };
    if (form.bodyFat) data.percentFat = Number.parseFloat(form.bodyFat);
    if (form.bodyWater) data.percentHydration = Number.parseFloat(form.bodyWater);
    if (form.boneMass) data.boneMass = toKg(form.boneMass);
    if (form.muscleMass) data.muscleMass = toKg(form.muscleMass);
    if (form.visceralFat) data.visceralFatRating = Math.max(1, Math.min(59, Number.parseInt(form.visceralFat, 10)));
    if (form.metabolicAge) data.metabolicAge = Number.parseInt(form.metabolicAge, 10);

    const bytes = generateWeightFit(data);
    const blob = new Blob([bytes], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'body_data.fit';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setGenerated(true);
  }

  const wU = unit === 'metric' ? 'kg' : 'lbs';
  const bmi = calcBMI(form.weight, form.height, unit);

  const summaryFields = [
    { label: 'Timestamp', value: form.timestamp ? new Date(form.timestamp).toLocaleString() : null, unit: undefined },
    { label: 'Weight', value: form.weight || null, unit: wU },
    { label: 'BMI', value: bmi, unit: undefined },
    { label: 'Body Fat', value: form.bodyFat || null, unit: '%' },
    { label: 'Bone Mass', value: form.boneMass || null, unit: wU },
    { label: 'Muscle Mass', value: form.muscleMass || null, unit: wU },
    { label: 'Body Water', value: form.bodyWater || null, unit: '%' },
    { label: 'Visceral Fat', value: form.visceralFat || null, unit: 'rating' },
    { label: 'Metabolic Age', value: form.metabolicAge || null, unit: 'yrs' }
  ].filter(f => f.value !== null);

  return (
    <div>
      <div {...stylex.props(styles.pageTitle)}>Review &amp; Generate</div>
      <p {...stylex.props(styles.pageSub)}>Confirm your data, then generate the .fit file.</p>

      <div {...stylex.props(styles.summary)}>
        {summaryFields.map((f, i) => (
          <div key={f.label} {...stylex.props(styles.summaryItem, i % 2 === 0 ? styles.summaryItemOdd : styles.summaryItemEven)}>
            <div {...stylex.props(styles.summaryLbl)}>{f.label}</div>
            <div {...stylex.props(styles.summaryVal)}>
              {f.value}
              {f.unit && <span {...stylex.props(styles.summaryUnit)}> {f.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      <div {...stylex.props(styles.generateArea)}>
        {generated
          ? (
            <>
              <div {...stylex.props(styles.success)}>
                <div {...stylex.props(styles.successIcon)}><IconCheck size={11} /></div>
                <span><strong>body_data.fit</strong> downloaded successfully</span>
              </div>
              <p {...stylex.props(styles.retryText)}>
                Failed to download the .fit file?{' '}
                <button type="button" {...stylex.props(styles.retryLink)} onClick={handleGenerate}>
                  Click here and try again
                </button>
              </p>
            </>
          )
          : (
            <>
              <div {...stylex.props(styles.generateTitle)}>Ready to generate</div>
              <p {...stylex.props(styles.generateDesc)}>
                Creates a Garmin-compatible <code {...stylex.props(styles.generateDescCode)}>.fit</code> file locally in your browser.
                Nothing is sent to any server.
              </p>
              <button type="button" {...stylex.props(styles.btn)} onClick={handleGenerate}>
                <IconDownload size={16} />
                Generate &amp; Download .fit
              </button>
            </>
          )}
      </div>

      <div {...stylex.props(styles.btnRow)}>
        <button type="button" {...stylex.props(styles.btn, styles.btnSecondary)} onClick={onBack}>
          <IconChevronLeft size={16} /> Back
        </button>
        {generated && (
          <button type="button" {...stylex.props(styles.btn)} onClick={onNext}>
            Upload Instructions <IconChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
