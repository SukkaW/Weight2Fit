import * as stylex from '@stylexjs/stylex';

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
    fontFamily: 'var(--font-dm-mono), monospace',
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
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '12.5px',
    backgroundColor: 'var(--code-bg)',
    paddingBlock: '1px',
    paddingInline: '5px',
    borderRadius: '4px'
  },
  screenshot: {
    marginTop: '14px',
    height: '110px',
    borderRadius: '8px',
    backgroundImage: 'repeating-linear-gradient(-45deg, var(--screenshot-a), var(--screenshot-a) 6px, var(--screenshot-b) 6px, var(--screenshot-b) 12px)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--line)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    rowGap: '4px',
    columnGap: '4px'
  },
  screenshotLabel: {
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '10.5px',
    color: 'var(--fg-subtle)',
    letterSpacing: '0.04em'
  },
  screenshotSub: {
    fontFamily: 'var(--font-dm-mono), monospace',
    fontSize: '9.5px',
    color: 'var(--fg-subtle)',
    letterSpacing: '0.04em'
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
              <span {...stylex.props(styles.screenshotLabel)}>SCREENSHOT</span>
              <span {...stylex.props(styles.screenshotSub)}>garmin-connect-login.png</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.instrItem)}>
          <div {...stylex.props(styles.instrNum)}>02</div>
          <div {...stylex.props(styles.instrBody)}>
            <div {...stylex.props(styles.instrTitle)}>Go to Health Stats</div>
            <div {...stylex.props(styles.instrDesc)}>
              In the left sidebar, select &ldquo;Health Stats&rdquo;, then &ldquo;Body Composition&rdquo;.
            </div>
            <div {...stylex.props(styles.screenshot)}>
              <span {...stylex.props(styles.screenshotLabel)}>SCREENSHOT</span>
              <span {...stylex.props(styles.screenshotSub)}>garmin-health-stats.png</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.instrItem)}>
          <div {...stylex.props(styles.instrNum)}>03</div>
          <div {...stylex.props(styles.instrBody)}>
            <div {...stylex.props(styles.instrTitle)}>Import the file</div>
            <div {...stylex.props(styles.instrDesc)}>
              Click the import button (top-right). Drag your <code {...stylex.props(styles.instrDescCode)}>.fit</code> file into the dialog or click Browse to select it.
            </div>
            <div {...stylex.props(styles.screenshot)}>
              <span {...stylex.props(styles.screenshotLabel)}>SCREENSHOT</span>
              <span {...stylex.props(styles.screenshotSub)}>garmin-import-dialog.png</span>
            </div>
          </div>
        </div>

        <div {...stylex.props(styles.instrItem)}>
          <div {...stylex.props(styles.instrNum)}>04</div>
          <div {...stylex.props(styles.instrBody)}>
            <div {...stylex.props(styles.instrTitle)}>Confirm</div>
            <div {...stylex.props(styles.instrDesc)}>
              Garmin Connect previews the imported metrics. Click Import to confirm — data appears in your history immediately.
            </div>
            <div {...stylex.props(styles.screenshot)}>
              <span {...stylex.props(styles.screenshotLabel)}>SCREENSHOT</span>
              <span {...stylex.props(styles.screenshotSub)}>garmin-confirm.png</span>
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
