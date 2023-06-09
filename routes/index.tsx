import { Head } from "$fresh/runtime.ts";
import EarAgeChecker from "../islands/EarAgeChecker.tsx";
import Wave from "../islands/Wave.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ear Age Checker</title>
        <meta
          name="description"
          content="Outputs sine wave audio using Web Audio API."
        />
        <meta name="theme-color" content="#333333" />
        <meta property="og:title" content="Ear Age Checker" />
        <meta
          property="og:description"
          content="Outputs sine wave audio using Web Audio API."
        />
        <meta property="og:url" content="https://sine-wave.deno.dev/" />
        <meta property="og:image" content="https://favi.deno.dev/🔊.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_ayame113_" />
        <link rel="icon" type="image/png" href="https://favi.deno.dev/🔊.png" />
        <link rel="apple-touch-icon" href="https://favi.deno.dev/🔊.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          {...{ crossorigin: "" }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c&amp;display=swap"
          rel="media"
          as="style"
          {...{ onload: "this.rel='stylesheet'" }}
        />
      </Head>
      <div class="relative">
        <div class="absolute h-screen w-full">
          <Wave />
        </div>
        <div class="absolute h-screen w-full flex items-center">
          <div class="p-4 mx-auto max-w-screen-md text-xl">
            <p class="my-6">
              Outputs sine wave audio using{" "}
              <a
                class="text-blue-500 hover:underline"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
                target="_brank"
              >
                Web Audio API
              </a>. You can adjust frequency and volume.{" "}
              <span class="text-sm">
                [<a
                  class="text-blue-500 hover:underline"
                  href="https://github.com/ayame113/sine-wave.deno.dev"
                  target="_brank"
                >
                  GitHub
                </a>]
              </span>
            </p>
            <EarAgeChecker />
          </div>
        </div>
      </div>
    </>
  );
}
