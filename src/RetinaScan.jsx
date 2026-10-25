import { useEffect, useRef } from "react";

// A stylised, procedurally drawn OCT B-scan: retinal layers with a foveal pit,
// speckle texture, and a sweeping scan line that reports a "confidence" band.
export default function RetinaScan() {
  const ref = useRef(null);
  const readout = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, base = null;

    // Layer profiles: offset from centre line, thickness, brightness
    const layers = [
      { y: -0.30, t: 0.030, b: 0.95 }, // RNFL
      { y: -0.24, t: 0.050, b: 0.45 }, // GCL
      { y: -0.17, t: 0.035, b: 0.70 }, // IPL
      { y: -0.11, t: 0.040, b: 0.30 }, // INL
      { y: -0.05, t: 0.035, b: 0.60 }, // OPL
      { y:  0.03, t: 0.070, b: 0.18 }, // ONL
      { y:  0.12, t: 0.012, b: 0.80 }, // ELM
      { y:  0.16, t: 0.018, b: 1.00 }, // EZ
      { y:  0.21, t: 0.032, b: 1.00 }, // RPE
      { y:  0.27, t: 0.090, b: 0.40 }, // choroid
    ];

    const profile = (x, i) => {
      const cx = x - 0.5;
      const pit = Math.exp(-(cx * cx) / 0.006) * (i < 6 ? 0.16 * (1 - i / 7) : 0.01);
      const curve = cx * cx * 0.35;
      const wobble = Math.sin(x * 9 + i) * 0.006;
      return curve + wobble + pit * (i < 6 ? 1 : 0) ;
    };

    const render = () => {
      const img = ctx.createImageData(w, h);
      const d = img.data;
      const mid = h * 0.5;
      for (let px = 0; px < w; px++) {
        const x = px / w;
        const offs = layers.map((L, i) => mid + (L.y + profile(x, i)) * h);
        for (let py = 0; py < h; py++) {
          let v = 0.04;
          for (let i = 0; i < layers.length; i++) {
            const L = layers[i];
            const dy = (py - offs[i]) / (L.t * h);
            v += L.b * Math.exp(-dy * dy * 2.2);
          }
          if (py > offs[9]) v *= Math.exp(-(py - offs[9]) / (h * 0.12));
          const speckle = 0.55 + Math.random() * 0.9;
          v = Math.min(1, v * speckle);
          const g = Math.pow(v, 0.9) * 235;
          const k = (py * w + px) * 4;
          d[k] = g * 0.96; d[k + 1] = g * 0.98; d[k + 2] = g; d[k + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      base = ctx.getImageData(0, 0, w, h);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.max(200, Math.floor(r.width * dpr * 0.6));
      h = Math.max(120, Math.floor(r.height * dpr * 0.6));
      canvas.width = w; canvas.height = h;
      render();
    };

    let start = performance.now();
    const tick = (now) => {
      if (!base) return;
      ctx.putImageData(base, 0, 0);
      const period = 7000;
      const p = ((now - start) % period) / period;
      const x = p * w;
      // shaded band behind scan line
      const grad = ctx.createLinearGradient(x - w * 0.12, 0, x, 0);
      grad.addColorStop(0, "rgba(233,162,59,0)");
      grad.addColorStop(1, "rgba(233,162,59,0.22)");
      ctx.fillStyle = grad;
      ctx.fillRect(x - w * 0.12, 0, w * 0.12, h);
      ctx.fillStyle = "rgba(233,162,59,0.95)";
      ctx.fillRect(x, 0, Math.max(1, dpr), h);
      // confidence: dips near the fovea, where pathology lives
      const cx = p - 0.5;
      const conf = 0.97 - 0.35 * Math.exp(-(cx * cx) / 0.01) + Math.sin(now / 300) * 0.01;
      if (readout.current) {
        readout.current.textContent =
          `x=${String(Math.round(p * 512)).padStart(3, "0")}  p̂=${conf.toFixed(2)}  ${conf < 0.8 ? "ABSTAIN → review" : "confident"}`;
        readout.current.dataset.low = conf < 0.8 ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    if (reduce) {
      if (readout.current) readout.current.textContent = "x=256  p̂=0.62  ABSTAIN → review";
    } else {
      raf = requestAnimationFrame(tick);
    }
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(resize, 150); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <figure className="scan" aria-label="Animated illustration of a retinal OCT B-scan with a model confidence readout">
      <div className="scan-head">
        <span>OCT · B-scan 64/128 · OD</span>
        <span className="dot" />
      </div>
      <canvas ref={ref} />
      <figcaption>
        <span ref={readout} className="readout">x=000  p̂=0.97  confident</span>
      </figcaption>
    </figure>
  );
}
