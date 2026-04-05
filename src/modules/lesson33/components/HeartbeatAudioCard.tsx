import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

function pulseGain(
  audioContext: AudioContext,
  oscillator: OscillatorNode,
  startTime: number,
  duration: number,
  peak: number,
) {
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(peak, startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gainNode);
  return gainNode;
}

function scheduleHeartbeat(audioContext: AudioContext, startTime: number) {
  const destination = audioContext.destination;
  const pulses = [
    { at: 0, duration: 0.11, frequency: 88, gain: 0.32 },
    { at: 0.18, duration: 0.08, frequency: 62, gain: 0.24 },
  ];

  pulses.forEach((pulse) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(pulse.frequency, startTime + pulse.at);
    oscillator.frequency.exponentialRampToValueAtTime(
      pulse.frequency * 0.82,
      startTime + pulse.at + pulse.duration,
    );

    const gainNode = pulseGain(
      audioContext,
      oscillator,
      startTime + pulse.at,
      pulse.duration,
      pulse.gain,
    );

    gainNode.connect(destination);
    oscillator.start(startTime + pulse.at);
    oscillator.stop(startTime + pulse.at + pulse.duration + 0.02);
  });
}

export default function HeartbeatAudioCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cycle, setCycle] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  const stopPlayback = async () => {
    setIsPlaying(false);

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (audioContextRef.current) {
      await audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const startPlayback = async () => {
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    await audioContext.resume();

    const playBeat = () => {
      const now = audioContext.currentTime + 0.02;
      scheduleHeartbeat(audioContext, now);
      setCycle((current) => current + 1);
    };

    playBeat();
    intervalRef.current = window.setInterval(playBeat, 900);
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await stopPlayback();
      return;
    }

    await startPlayback();
  };

  return (
    <section className="grid gap-6 rounded-[32px] border border-[#E0F0FF] bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8FF] bg-[#F5FBFF] px-4 py-2 text-sm font-bold text-[#0369A1]">
          <Volume2 className="h-4 w-4" />
          Audio tương tác
        </div>
        <h3 className="text-3xl font-black text-[#0F172A]">Nhịp tim minh họa</h3>
        <p className="max-w-2xl text-base leading-7 text-[#475569]">
          Bấm phát để nghe một nhịp tim mô phỏng. Âm thanh này giúp phần bài học có thêm
          yếu tố nghe nhìn, đồng thời liên hệ trực tiếp với hoạt động co bóp của tim và
          dòng máu được bơm đi khắp cơ thể.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              void togglePlayback();
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#0EA5E9] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#0EA5E9]/20 transition hover:bg-[#0284C7]"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            {isPlaying ? "Dừng âm thanh" : "Phát âm thanh"}
          </button>
          <div className="rounded-2xl border border-[#D7E8FF] bg-[#F8FCFF] px-4 py-3 text-sm font-semibold text-[#334155]">
            Chu kỳ đã phát: {cycle}
          </div>
        </div>
      </div>

      <div className="rounded-[28px] bg-[linear-gradient(135deg,#082F49,#0EA5E9_55%,#E0F2FE)] p-6 text-white">
        <div className="grid h-full gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
              Gợi ý sử dụng
            </p>
            <p className="mt-3 text-lg font-bold">
              Mở âm thanh khi demo phần tim co bóp hoặc khi chuyển sang mô phỏng tuần hoàn.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm font-semibold text-white/75">Liên hệ kiến thức</p>
              <p className="mt-2 text-sm leading-6 text-white">
                Nhịp tim tạo lực đẩy để máu đi qua động mạch, mao mạch rồi quay về tĩnh mạch.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="text-sm font-semibold text-white/75">Mục tiêu trải nghiệm</p>
              <p className="mt-2 text-sm leading-6 text-white">
                Bổ sung thêm một lớp media âm thanh để bài học gần với yêu cầu sản phẩm cuối kỳ hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
