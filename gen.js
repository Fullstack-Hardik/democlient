const fs=require('fs'),f='components/ui/blackhole-hero-section.tsx',a=s=>fs.appendFileSync(f,s,'utf8');fs.writeFileSync(f,'','utf8');
a("\"use client\";\n\nimport * as React from \"react\";\nimport { useEffect, useRef } from \"react\";\n\n");
a("export interface BlackHoleHeroSectionProps\n  extends React.HTMLAttributes<HTMLDivElement> {\n  distance?: number;\n  elevation?: number;\n  azimuth?: number;\n  orbitSpeed?: number;\n  roll?: number;\n  fov?: number;\n  diskInner?: number;\n  diskOuter?: number;\n");
a("  diskThickness?: number;\n  diskDensity?: number;\n  brightness?: number;\n  spinSpeed?: number;\n  grain?: number;\n  doppler?: number;\n  hotColor?: string;\n  midColor?: string;\n  coolColor?: string;\n  starBrightness?: number;\n");
