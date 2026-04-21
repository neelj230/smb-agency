import { chromium } from "playwright";

const ports = [
  [5001, "ants-auto-repair-and-tow"],
  [5002, "barbershop-denim"],
  [5003, "bellish-nail-lounge"],
  [5004, "queen-nails-spa"],
  [5005, "amandas-mvp-grooming-llc"],
  [5006, "boss-plumbing-heating"],
  [5007, "lauras-laundramutt-grooming-llc"],
  [5008, "house-of-paws"],
  [5009, "oteris-italian-bakery"],
  [5010, "durans-landscaping-llc"],
  [5011, "marcos-plumbing"],
  [5012, "creative-vases"],
  [5013, "june-the-barber"],
  [5014, "rockwellfoto"],
  [5015, "mai-lashes-nail-spa"],
  [5016, "jazzys-doggy-spaw"],
  [5017, "the-bakeshop-on-twentieth"],
  [5018, "precious-angels-llc"],
  [5019, "pattys-little-minions-childcare-llc"],
  [5020, "no-ka-oi-tiki-tattoo"],
  [5021, "kens-automotive"],
  [5022, "major-league-cuts"],
  [5023, "willpower-electric-llc"],
  [5024, "cozy-cottage-child-care"],
  [5025, "studio-49-photography"],
  [5026, "current-electric"],
  [5027, "laugh-learn-childcare"],
  [5028, "oregon-coast-childcare"],
  [5029, "momas-care-cleaning"],
  [5030, "nails-to-tails-doggie-solutions-llc-pet-care-center"],
];

const AUDIT = () => {
  document.querySelectorAll('[style*="opacity:0"]').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  function parseColor(s) {
    if (!s) return null;
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      const [r, g, b, a = 1] = p;
      return { r, g, b, a };
    }
    if (s.startsWith('oklab') || s.startsWith('oklch') || s.startsWith('color(')) {
      const alphaM = s.match(/\/\s*([\d.]+)\s*\)/);
      const a = alphaM ? parseFloat(alphaM[1]) : 1;
      const tmp = document.createElement('div');
      tmp.style.color = s;
      document.body.appendChild(tmp);
      const computed = getComputedStyle(tmp).color;
      document.body.removeChild(tmp);
      const m2 = computed.match(/rgba?\(([^)]+)\)/);
      if (m2) {
        const p = m2[1].split(/[\s,/]+/).filter(Boolean).map(Number);
        return { r: p[0], g: p[1], b: p[2], a: a };
      }
      return null;
    }
    return null;
  }
  function lum({r,g,b}) { const t = v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }; return 0.2126*t(r)+0.7152*t(g)+0.0722*t(b); }
  function blend(fg, bg) { const a = fg.a; return { r: fg.r*a+bg.r*(1-a), g: fg.g*a+bg.g*(1-a), b: fg.b*a+bg.b*(1-a), a: 1 }; }
  function contrast(fg, bg) { if (!fg || !bg) return null; const f = fg.a < 1 ? blend(fg, bg) : fg; const l1 = lum(f), l2 = lum(bg); return (Math.max(l1,l2)+0.05) / (Math.min(l1,l2)+0.05); }
  function hasFixed(el) { let c = el; while (c) { const p = getComputedStyle(c).position; if (p === 'fixed' || p === 'sticky') return true; c = c.parentElement; } return false; }
  function effBg(el) { let c = el; while (c) { const bg = getComputedStyle(c).backgroundColor; const p = parseColor(bg); if (p && p.a > 0.01) return p; const img = getComputedStyle(c).backgroundImage; if (img && img !== 'none') return { r:128, g:128, b:128, a:1, note:'bg-img' }; c = c.parentElement; } return { r:255, g:255, b:255, a:1 }; }

  const issues = [], seen = new Set();
  for (const el of document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,label,button,li,strong,em,small')) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.3) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 10 || r.height < 5) continue;
    if (hasFixed(el)) continue;
    const fg = parseColor(cs.color), bg = effBg(el), ratio = contrast(fg, bg);
    if (ratio === null || bg.note === 'bg-img') continue;
    const fs = parseFloat(cs.fontSize);
    const large = fs >= 24 || (fs >= 18.66 && parseFloat(cs.fontWeight) >= 700);
    const th = large ? 3 : 4.5;
    if (ratio < th) {
      const text = el.textContent.trim().slice(0, 60);
      const key = `${cs.color}|${text}`;
      if (seen.has(key)) continue;
      seen.add(key);
      issues.push({
        ratio: +ratio.toFixed(2), th,
        fg: cs.color,
        bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
        text, tag: el.tagName.toLowerCase(),
        classes: (el.className || '').toString().slice(0, 100),
        fs,
      });
    }
  }
  const fonts = new Set();
  document.querySelectorAll('h1,h2,h3,p,button').forEach(el => fonts.add(getComputedStyle(el).fontFamily));
  const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => ({ src: i.src.split('/').pop(), alt: i.alt?.slice(0, 30) }));
  return { total: issues.length, issues: issues.slice(0, 30), fonts: [...fonts].slice(0, 8), broken: broken.slice(0, 10) };
};

const browser = await chromium.launch();

const audit = async (port, slug) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  try {
    await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(500);
    const result = await page.evaluate(AUDIT);
    return { slug, port, ...result };
  } catch (e) {
    return { slug, port, error: e.message };
  } finally {
    await ctx.close();
  }
};

const results = await Promise.all(ports.map(([p, s]) => audit(p, s)));
await browser.close();

import { writeFileSync } from "fs";
writeFileSync("/tmp/smb-qa/all-reports.json", JSON.stringify(results, null, 2));

const summary = results.map(r => {
  if (r.error) return `${r.slug}: ERROR — ${r.error}`;
  return `${r.slug}: ${r.total} contrast issues, ${r.broken.length} broken imgs, ${r.fonts.length} font families`;
}).join("\n");
console.log(summary);
console.log(`\nTotal: ${results.reduce((a,r) => a+(r.total||0), 0)} contrast issues across ${results.length} sites`);