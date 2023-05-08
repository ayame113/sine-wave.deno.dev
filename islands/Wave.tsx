import { useEffect, useRef } from "preact/hooks";

export default function Wave() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    let diff = 0;

    // const abortController = new AbortController();
    // globalThis.addEventListener("mousemove", () => {
    //   console.log("a");
    //   abortController.abort();
    //   render();
    // }, { signal: abortController.signal });

    // function render() {
    //   if (!ctx) {
    //     return;
    //   }
    //   diff++;
    //   diff %= 360;
    //   renderWave(ctx, diff);
    //   animationFrameId = requestAnimationFrame(render);
    // }

    let animationFrameId = requestAnimationFrame(function render() {
      if (!ctx) {
        return;
      }
      diff++;
      diff %= 360;
      renderWave(ctx, diff);
      animationFrameId = requestAnimationFrame(render);
    });

    // if (ctx) {
    //   renderWave(ctx, diff);
    // }

    // let animationFrameId: number | undefined;
    // requestIdleCallbackPolyfill(() => {
    //   animationFrameId = requestAnimationFrame(function render() {
    //     if (!ctx) {
    //       return;
    //     }
    //     diff++;
    //     diff %= 360;
    //     renderWave(ctx, diff);
    //     animationFrameId = requestAnimationFrame(render);
    //   });
    // });

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  return <canvas class="w-full h-full" width="1000" height="500" ref={ref} />;
}

function renderWave(ctx: CanvasRenderingContext2D, diff: number) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "lemonchiffon";
  ctx.beginPath();
  ctx.moveTo(0, ctx.canvas.height);
  for (let x = 0; x < ctx.canvas.width + 5; x += 5) {
    const radians = (Math.PI / 180) * (x - diff);
    const y = Math.sin(radians) * 10 + ctx.canvas.height * 3 / 4;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
  ctx.closePath();
  ctx.fill();
}

function requestIdleCallbackPolyfill(callback: () => void) {
  if (typeof globalThis.requestIdleCallback === "function") {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1000);
  }
}
