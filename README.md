# Weight2Fit

https://w2fit.skk.moe

Convert body composition data into a Garmin-compatible `.fit` file — entirely in your browser, with no server involved.

## Why I built this

I have a **Xiaomi Body Composition Scale S400** and want to import its measurements into Garmin Connect to keep all my health data in one place.

The problem: most third-party sync tools either require you to disable Garmin Connect's two-factor authentication, or relay your data through their own servers. I didn't want any of that.

So I built this instead. It uses the [official Garmin JavaScript FIT SDK](https://www.npmjs.com/package/@garmin/fitsdk) to generate a `.fit` weight-scale file directly in your browser. Yes, you will have to manually type in your measurements, download the file, and manually import it into Garmin Connect website. But you will not give any untrusted code access to both your Garmin account and Xiaomi account.

## How it works

1. **Enter your body composition data** — weight is required; body fat %, bone mass, muscle mass, body water %, visceral fat rating, and metabolic age are optional.
2. **Generate & download** — the app encodes everything into a standard Garmin FIT weight-scale file using the official SDK, running entirely client-side.
3. **Import into Garmin Connect** — go to [connect.garmin.com](https://connect.garmin.com), navigate to Health Stats → Body Composition, and use the import button to upload the `.fit` file.

## Tech stack

- Next.js 16 with Static Export, no server
- React 19
- [StyleX](https://stylexjs.com/) (Facebook's AoT atomic CSS-in-JS)
- [@garmin/fitsdk](https://www.npmjs.com/package/@garmin/fitsdk) — official Garmin JavaScript SDK
- [react-hook-form](https://react-hook-form.com/) for form handling
- [foxact](https://foxact.skk.moe/) · [foxts](https://github.com/SukkaW/foxts)

## Running locally

**Development**

```bash
pnpm install
pnpm dev
```

**Production**

```bash
pnpm install
pnpm build
```

You will find the static files in the `out/` directory, which you can serve with any static hosting service.

## License

[Apache License 2.0](LICENSE)

----

**weight2fit** © [Sukka](https://github.com/SukkaW), Released under the [Apache License 2.0](LICENSE) License.
Authored and maintained by Sukka with help from contributors ([list](https://github.com/SukkaW/weight2fit/graphs/contributors)).

> [Personal Website](https://skk.moe) · [Blog](https://blog.skk.moe) · GitHub [@SukkaW](https://github.com/SukkaW) · Telegram Channel [@SukkaChannel](https://t.me/SukkaChannel) · Mastodon [@sukka@acg.mn](https://acg.mn/@sukka) · Twitter [@isukkaw](https://twitter.com/isukkaw) · BlueSky [@skk.moe](https://bsky.app/profile/skk.moe)

<p align="center">
  <a href="https://github.com/sponsors/SukkaW/">
    <img src="https://sponsor.cdn.skk.moe/sponsors.svg"/>
  </a>
</p>

