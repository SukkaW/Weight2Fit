'use client';

import Image from 'next/image';
import * as stylex from '@stylexjs/stylex';

import screenshotSignIn from '@/screenshots/sign-in-to-garmin-connect.png';
import screenshotSelectFile from '@/screenshots/select-fit-file-generate-by-weight2fit.png';
import screenshotUpload from '@/screenshots/garmin-connect-fit-upload.png';
import screenshotHealthStats from '@/screenshots/find-health-stats-weight.png';

const styles = stylex.create({
  instrList: {
    display: 'flex',
    flexDirection: 'column'
  },
  instrItem: {
    display: 'flex',
    rowGap: '20px',
    columnGap: '20px',
    alignItems: 'flex-start',
    paddingBlock: '24px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'var(--line)',
    borderTopWidth: {
      default: null,
      ':first-child': '1px'
    },
    borderTopStyle: {
      default: null,
      ':first-child': 'solid'
    },
    borderTopColor: {
      default: null,
      ':first-child': 'var(--line)'
    }
  },
  instrNum: {
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '12px',
    color: 'var(--fg-subtle)',
    fontWeight: 500,
    minWidth: '24px',
    paddingTop: '2px'
  },
  instrBody: {
    flexGrow: '1',
    flexShrink: '1',
    flexBasis: '0%'
  },
  instrTitle: {
    fontSize: '14.5px',
    fontWeight: 600,
    marginBottom: '5px',
    letterSpacing: '-0.2px'
  },
  instrDesc: {
    fontSize: '13.5px',
    color: 'var(--fg-muted)',
    lineHeight: 1.6
  },
  instrDescLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: {
      default: 'oklch(52% 0.18 240 / 0.3)',
      ':hover': 'var(--accent)'
    }
  },
  instrDescCode: {
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '12.5px',
    backgroundColor: 'var(--code-bg)',
    paddingBlock: '1px',
    paddingInline: '5px',
    borderRadius: '4px'
  },
  screenshot: {
    marginTop: '14px'
  },
  screenshot_image: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--line)',
    overflow: 'hidden',
    backgroundColor: 'var(--code-bg)'
  },
  doneArea: {
    marginTop: '40px',
    paddingTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '6px',
    columnGap: '6px'
  },
  doneTitle: {
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '-0.4px'
  },
  doneDesc: {
    fontSize: '13.5px',
    color: 'var(--fg-muted)',
    lineHeight: 1.6,
    maxWidth: '380px'
  }
});

export function Step3Instructions() {
  return (
    <>
      <div {...stylex.props(styles.instrList)}>
        <div {...stylex.props(styles.instrItem)}>
          <div {...stylex.props(styles.instrNum)}>01</div>
          <div {...stylex.props(styles.instrBody)}>
            <div {...stylex.props(styles.instrTitle)}>Open Garmin Connect</div>
            <div {...stylex.props(styles.instrDesc)}>
              Navigate to{' '}
              <a {...stylex.props(styles.instrDescLink)} href="https://connect.garmin.com" target="_blank" rel="noopener noreferrer">
                connect.garmin.com
              </a>{' '}
              and sign in to your account.
            </div>
            <div {...stylex.props(styles.screenshot)}>
              <Image {...stylex.props(styles.screenshot_image)} src={screenshotSignIn} alt="Sign in to Garmin Connect" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.instrItem)}>
          <div {...stylex.props(styles.instrNum)}>02</div>
          <div {...stylex.props(styles.instrBody)}>
            <div {...stylex.props(styles.instrTitle)}>Go to Health Stats</div>
            <div {...stylex.props(styles.instrDesc)}>
              On the top right of the page, find the &ldquo;Cloud Upload&rdquo; icon button. You may just navigate directly with <a {...stylex.props(styles.instrDescLink)} href="https://connect.garmin.com/modern/health-stats/upload" target="_blank" rel="noopener noreferrer">this link</a>.
            </div>
            <div {...stylex.props(styles.screenshot)}>
              <Image {...stylex.props(styles.screenshot_image)} src={screenshotUpload} alt="Garmin Connect Health Stats" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.instrItem)}>
          <div {...stylex.props(styles.instrNum)}>03</div>
          <div {...stylex.props(styles.instrBody)}>
            <div {...stylex.props(styles.instrTitle)}>Import the file</div>
            <div {...stylex.props(styles.instrDesc)}>
              Drag your <code {...stylex.props(styles.instrDescCode)}>.fit</code> file into the dialog or click Browse to select it.
            </div>
            <div {...stylex.props(styles.screenshot)}>
              <Image {...stylex.props(styles.screenshot_image)} src={screenshotSelectFile} alt="Select .fit file to import" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.instrItem)}>
          <div {...stylex.props(styles.instrNum)}>04</div>
          <div {...stylex.props(styles.instrBody)}>
            <div {...stylex.props(styles.instrTitle)}>Check</div>
            <div {...stylex.props(styles.instrDesc)}>
              Now go to the &ldquo;Health Stats - Weight&rdquo; in the left sidebar and check if your data is there.
            </div>
            <div {...stylex.props(styles.screenshot)}>
              <Image {...stylex.props(styles.screenshot_image)} src={screenshotHealthStats} alt="Confirm data in Garmin Connect" style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </div>

      <div {...stylex.props(styles.doneArea)}>
        <h3 {...stylex.props(styles.doneTitle)}>You&rsquo;re all set.</h3>
        <p {...stylex.props(styles.doneDesc)}>Your body composition data is now in Garmin Connect and will sync to your device on the next connection.</p>
      </div>
    </>
  );
}
