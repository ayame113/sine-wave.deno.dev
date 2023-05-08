import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact";

export default function EarAgeChecker() {
  const [enabled, setEnabled] = useState(false);
  const [frequency, setFrequency] = useState(400);
  const [gain, setGain] = useState(0);
  useAudio(enabled, frequency, gain);

  return (
    <div>
      <Form
        label="frequency"
        unit="Hz"
        value={frequency}
        min={0}
        max={24000}
        step={1}
        onInput={(e) => setFrequency(+e.currentTarget.value)}
      />
      <Form
        label="volume"
        unit=""
        value={gain}
        min={0}
        max={0.5}
        step={0.001}
        onInput={(e) => (setEnabled(true), setGain(+e.currentTarget.value))}
      />
      <div class="text-center">
        <button
          class="p-1 mx-4 my-2 bg-green-200 rounded shadow text-lg active:bg-green-100"
          onClick={() => (setEnabled(true), setGain(0.03))}
        >
          ▶ Start
        </button>
        <button
          class="p-1 mx-4 my-2 bg-red-200 rounded shadow text-lg active:bg-red-100"
          onClick={() => setGain(0)}
        >
          ■ Stop
        </button>
      </div>
    </div>
  );
}

interface FormProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onInput(event: JSX.TargetedEvent<HTMLInputElement, Event>): void;
}

function Form(props: FormProps) {
  return (
    <div class="flex my-2">
      <div class="w-[5em]">{props.label}:</div>
      <input
        aria-label={props.label}
        class="flex-grow"
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step}
        onInput={props.onInput}
      />
      <div class="w-[7em]">
        <input
          aria-label="frequency"
          class="w-[4em] text-right bg-gray-200 rounded-md mx-2 focus:bg-white"
          type="number"
          min={props.min}
          max={props.max}
          value={props.value}
          step={props.step}
          onInput={props.onInput}
        />
        {props.unit}
      </div>
    </div>
  );
}

function useAudio(enabled: boolean, frequency: number, gain: number) {
  const [oscillatorNode, setOscillatorNode] = useState<OscillatorNode>();
  const [gainNode, setGainNode] = useState<GainNode>();

  useEffect(() => {
    if (!enabled) {
      return;
    }
    console.log("initialize Web Audio API");
    // https://github.com/mdn/webaudio-examples/blob/main/violent-theremin/scripts/app.js

    // create web audio api context
    const audioCtx = new AudioContext();

    // create Oscillator and gain node
    const oscillatorNode = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // connect oscillator to gain node to speakers
    oscillatorNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillatorNode.start(0);

    oscillatorNode.frequency.value = frequency;
    gainNode.gain.value = gain;

    setOscillatorNode(oscillatorNode);
    setGainNode(gainNode);
    return () => {
      oscillatorNode.stop();
      audioCtx.close();
    };
  }, [enabled]);

  useEffect(() => {
    if (oscillatorNode) {
      oscillatorNode.frequency.value = frequency;
    }
  }, [frequency]);
  useEffect(() => {
    if (gainNode) {
      gainNode.gain.value = gain;
    }
  }, [gain]);
}
