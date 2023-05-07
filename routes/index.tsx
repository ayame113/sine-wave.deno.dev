import { Head } from "$fresh/runtime.ts";
import EarAgeChecker from "../islands/EarAgeChecker.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ear Age Checker</title>
      </Head>
      <div class="h-screen flex items-center">
        <div class="p-4 mx-auto max-w-screen-md text-xl">
          <p class="my-6">
            Outputs sine wave audio using{" "}
            <a
              class="text-blue-500"
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
            >
              Web Audio API
            </a>. You can adjust frequency and volume.
            <a
              class="text-sm"
              href="https://github.com/ayame113/sine-wave.deno.dev"
            >
              GitHub
            </a>
          </p>
          <EarAgeChecker />
        </div>
      </div>
    </>
  );
}
