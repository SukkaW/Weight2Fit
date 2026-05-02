import * as stylex from '@stylexjs/stylex';
import { IconGitHub, IconShield } from './icons';
import { ThemeToggle } from './theme-toggle';

const styles = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: {
      default: '40px',
      '@media (max-width: 540px)': '28px'
    },
    rowGap: '16px',
    columnGap: '16px',
    marginBottom: '12px'
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    columnGap: '5px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    rowGap: '9px',
    columnGap: '9px'
  },
  logoMark: {
    width: '28px',
    height: '28px',
    backgroundColor: 'var(--fg)',
    borderRadius: '7px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--bg)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '-0.3px',
    fontFamily: 'var(--font-dm-mono), monospace',
    flexShrink: 0
  },
  logoName: {
    fontSize: '18px',
    fontWeight: 600,
    letterSpacing: '-0.4px',
    color: 'var(--fg)'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    rowGap: '8px',
    columnGap: '8px',
    flexShrink: 0
  },
  github: {
    display: 'inline-flex',
    alignItems: 'center',
    rowGap: '6px',
    columnGap: '6px',
    fontSize: '12.5px',
    color: {
      default: 'var(--fg-muted)',
      ':hover': 'var(--fg)'
    },
    textDecoration: 'none',
    paddingBlock: '6px',
    paddingInline: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: {
      default: 'var(--line)',
      ':hover': 'var(--fg-muted)'
    },
    borderRadius: '99px',
    transition: 'border-color 0.15s, color 0.15s',
    whiteSpace: 'nowrap'
  },
  meta: {
    display: 'flex',
    alignItems: 'flex-start',
    rowGap: '8px',
    columnGap: '8px',
    fontSize: '13px',
    color: 'var(--accent)',
    backgroundColor: 'var(--accent-soft)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'oklch(52% 0.18 240 / 0.15)',
    borderRadius: '10px',
    paddingBlock: '10px',
    paddingInline: '14px',
    marginBottom: '26px'
  },
  meta_icon: {
    flexShrink: 0,
    marginTop: '1px',
    color: 'var(--accent)',
    height: '18px',
    width: '18px'
  }
});

export function Header() {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.brand)}>
          <div {...stylex.props(styles.logo)}>
            <div {...stylex.props(styles.logoMark)}>W2</div>
            <span {...stylex.props(styles.logoName)}>Weight2Fit</span>
          </div>
        </div>
        <div {...stylex.props(styles.actions)}>
          <ThemeToggle />
          <a {...stylex.props(styles.github)} href="https://github.com/SukkaW/Weight2Fit" target="_blank" rel="noopener noreferrer">
            <IconGitHub size={14} />
            Source Code
          </a>
        </div>
      </header>
      <div {...stylex.props(styles.meta)}>
        <IconShield {...stylex.props(styles.meta_icon)} />
        <span>
          In-browser only — no data ever leaves your browser. You can audit the source code on GitHub or deploy your own instance.
        </span>
      </div>
    </>
  );
}
