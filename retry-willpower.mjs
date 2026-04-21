import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "fs";

const AUDIT = () => {
  document.querySelectorAll('[style*="opacity:0"]').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
  function parseColor(s) {
    if (!s) return null;
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (m) { const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number); const [r,g,b,a=1] = p; return {r,g,b,a}; }
    if (s.startsWith('oklab') || s.startsWith('oklch')) {
      const aM = s.match(/\/\s*([\d.]+)\s*\)/); const a = aM ? parseFloat(aM[1]) : 1;
      const t = document.createElement('div'); t.style.color = s; document.body.appendChild(t);
      const c = getComputedStyle(t).color; document.body.removeChild(t);
      const m2 = c.match(/rgba?\(([^)]+)\)/);
      if (m2) { const p = m2[1].split(/[\s,/]+/).filter(Boolean).map(Number); return {r:p[0],g:p[1],b:p[2],a}; }
    }
    return null;
  }
  function lum({r,g,b}) { const t = v => { v/=255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4); }; return 0.2126*t(r)+0.7152*t(g)+0.0722*t(b); }
  function blend(fg,bg) { const a=fg.a; return {r:fg.r*a+bg.r*(1-a),g:fg.g*a+bg.g*(1-a),b:fg.b*a+bg.b*(1-a),a:1}; }
  function contrast(fg,bg) { if(!fg||!bg) return null; const f=fg.a<1?blend(fg,bg):fg; const l1=lum(f),l2=lum(bg); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); }
  function hasFixed(el) { let c=el; while(c){ const p=getComputedStyle(c).position; if(p==='fixed'||p==='sticky') return true; c=c.parentElement; } return false; }
  function effBg(el) { let c=el; while(c){ const bg=getComputedStyle(c).backgroundColor; const p=parseColor(bg); if(p&&p.a>0.01) return p; const i=getComputedStyle(c).backgroundImage; if(i&&i!=='none') return {r:128,g:128,b:128,a:1,note:'bg-img'}; c=c.parentElement; } return {r:255,g:255,b:255,a:1}; }
  const issues=[],seen=new Set();
  for (const el of document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,label,button,li,strong,em,small')) {
    if (![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())) continue;
    const cs=getComputedStyle(el);
    if (cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)<0.3) continue;
    const r=el.getBoundingClientRect();
    if (r.width<10||r.height<5) continue;
    if (hasFixed(el)) continue;
    const fg=parseColor(cs.color),bg=effBg(el),ratio=contrast(fg,bg);
    if (ratio===null||bg.note==='bg-img') continue;
    const fs=parseFloat(cs.fontSize);
    const large=fs>=24||(fs>=18.66&&parseFloat(cs.fontWeight)>=700);
    const th=large?3:4.5;
    if (ratio<th) { const text=el.textContent.trim().slice(0,60); const key=`${cs.color}|${text}`; if(seen.has(key)) continue; seen.add(key);
      issues.push({ratio:+ratio.toFixed(2),th,fg:cs.color,bg:`rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,text,tag:el.tagName.toLowerCase(),classes:(el.className||'').toString().slice(0,100),fs}); }
  }
  const fonts=new Set();
  document.querySelectorAll('h1,h2,h3,p,button').forEach(el=>fonts.add(getComputedStyle(el).fontFamily));
  return {total:issues.length,issues:issues.slice(0,30),fonts:[...fonts].slice(0,8),broken:[]};
};

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
try {
  await page.goto("http://localhost:3023/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(2000);
  const result = await page.evaluate(AUDIT);
  const all = JSON.parse(readFileSync("/tmp/smb-qa/all-reports.json", "utf8"));
  const idx = all.findIndex(r => r.slug === "willpower-electric-llc");
  all[idx] = { slug: "willpower-electric-llc", port: 3023, ...result };
  writeFileSync("/tmp/smb-qa/all-reports.json", JSON.stringify(all, null, 2));
  console.log(`willpower-electric-llc: ${result.total} contrast issues`);
} catch (e) { console.log("err:", e.message); }
await b.close();
