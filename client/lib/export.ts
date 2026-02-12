import { BiologicalSolution } from "@shared/organisms";

/**
 * Generate a comprehensive formatted PDF report
 * Uses HTML/CSS which can be printed to PDF via browser
 */
export async function generatePDFReport(
  challenge: string,
  solution: BiologicalSolution,
  variant: number
): Promise<void> {
  const selectedVariant = solution.designVariants[variant];

  // Create HTML report
  const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BioMimicry Solution Report - ${solution.organism}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
      background: white;
    }
    
    .page {
      max-width: 8.5in;
      height: 11in;
      margin: 0 auto;
      padding: 40px;
      background: white;
      page-break-after: always;
    }
    
    .header {
      border-bottom: 3px solid #2d9e6f;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #2d9e6f;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #666;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin: 20px 0 10px;
    }
    
    .section {
      margin-bottom: 25px;
    }
    
    .section-title {
      font-size: 16px;
      font-weight: bold;
      color: #2d9e6f;
      border-left: 4px solid #2d9e6f;
      padding-left: 10px;
      margin-bottom: 12px;
      text-transform: uppercase;
      font-size: 13px;
      letter-spacing: 1px;
    }
    
    .section-content {
      color: #555;
      font-size: 13px;
      line-height: 1.7;
    }
    
    .info-box {
      background: #f0f8f5;
      border-left: 4px solid #2d9e6f;
      padding: 12px;
      margin: 12px 0;
      border-radius: 4px;
    }
    
    .info-label {
      font-weight: bold;
      color: #2d9e6f;
      font-size: 12px;
    }
    
    .info-value {
      color: #333;
      font-size: 13px;
      margin-top: 4px;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin: 15px 0;
    }
    
    .metric-card {
      background: #f5f5f5;
      padding: 12px;
      border-radius: 4px;
      text-align: center;
    }
    
    .metric-value {
      font-size: 22px;
      font-weight: bold;
      color: #2d9e6f;
    }
    
    .metric-label {
      font-size: 11px;
      color: #666;
      margin-top: 4px;
      text-transform: uppercase;
    }
    
    .variants-list {
      margin: 12px 0;
    }
    
    .variant-item {
      background: #fafafa;
      padding: 10px;
      margin: 8px 0;
      border-radius: 4px;
      border-left: 3px solid #4a9d6f;
    }
    
    .variant-name {
      font-weight: bold;
      color: #2d9e6f;
      font-size: 12px;
    }
    
    .variant-desc {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    
    .specs {
      font-size: 11px;
      color: #888;
      margin-top: 6px;
      padding-left: 12px;
    }
    
    .specs li {
      list-style: none;
      margin: 2px 0;
      padding: 2px 0;
    }
    
    .specs li:before {
      content: "• ";
      color: #2d9e6f;
      font-weight: bold;
      margin-right: 6px;
    }
    
    .advantage-list {
      margin: 12px 0;
    }
    
    .advantage-list li {
      list-style: none;
      margin: 8px 0;
      padding-left: 20px;
      font-size: 13px;
      color: #555;
      position: relative;
    }
    
    .advantage-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #2d9e6f;
      font-weight: bold;
    }
    
    .footer {
      text-align: center;
      font-size: 11px;
      color: #999;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }
    
    .page-break {
      page-break-after: always;
      height: 0;
      margin: 0;
    }
    
    .divider {
      border-bottom: 1px solid #eee;
      margin: 15px 0;
    }
    
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .page {
        margin: 0;
        padding: 40px;
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <!-- Page 1: Cover & Challenge -->
  <div class="page">
    <div class="header">
      <div class="logo">🌿 BioMimicry Architect AI</div>
      <div class="subtitle">Nature-Inspired Engineering Solutions</div>
    </div>
    
    <div class="title">${solution.organism}</div>
    <div style="color: #2d9e6f; font-weight: 600; margin-bottom: 20px;">
      ${solution.scientificName}
    </div>
    
    <div class="section">
      <div class="section-title">Engineering Challenge</div>
      <div class="info-box">
        <div class="info-value" style="font-size: 14px; font-weight: 500;">
          "${challenge}"
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">Solution Category</div>
      <div class="section-content">${solution.category}</div>
    </div>
    
    <div class="section">
      <div class="section-title">About This Organism</div>
      <div class="section-content">
        <p>
          This report outlines how ${solution.organism} naturally solves the challenge of 
          "${solution.challenge.toLowerCase()}" and how these principles can be applied to modern engineering.
        </p>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="section">
      <div class="section-title">Report Generated</div>
      <div class="section-content">
        ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
      </div>
    </div>
    
    <div class="footer">
      BioMimicry Architect AI - Applying Nature's Wisdom to Engineering
    </div>
  </div>
  
  <!-- Page 2: Mechanism & Advantages -->
  <div class="page">
    <div class="header">
      <div style="font-size: 14px; color: #2d9e6f; font-weight: bold;">
        ${solution.organism}
      </div>
    </div>
    
    <div class="title">How Nature Solves It</div>
    
    <div class="section">
      <div class="section-title">Biological Mechanism</div>
      <div class="section-content">
        ${solution.mechanism}
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="section">
      <div class="section-title">Key Advantages</div>
      <ul class="advantage-list">
        <li>${solution.advantage.split(".")[0]}</li>
        <li>Proven in nature over billions of years</li>
        <li>Sustainable and environmentally friendly</li>
        <li>Applicable to modern engineering challenges</li>
      </ul>
    </div>
    
    <div class="divider"></div>
    
    <div class="section">
      <div class="section-title">Implementation Guidance</div>
      <div class="section-content">
        ${solution.implementation}
      </div>
    </div>
    
    <div class="footer">
      Page 2 of 3
    </div>
  </div>
  
  <!-- Page 3: Design Variants & Metrics -->
  <div class="page">
    <div class="header">
      <div style="font-size: 14px; color: #2d9e6f; font-weight: bold;">
        ${solution.organism} - Design Specifications
      </div>
    </div>
    
    <div class="title">Selected Design Variant</div>
    
    <div class="section">
      <div class="variant-item">
        <div class="variant-name">${selectedVariant.name}</div>
        <div class="variant-desc">${selectedVariant.description}</div>
        <ul class="specs">
          ${selectedVariant.specs.map((spec) => `<li>${spec}</li>`).join("")}
        </ul>
      </div>
    </div>
    
    <div class="divider"></div>
    
    <div class="section">
      <div class="section-title">Performance Metrics</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">${Math.round(solution.metrics.efficiency * 100)}%</div>
          <div class="metric-label">Efficiency</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${Math.round(solution.metrics.sustainability * 100)}%</div>
          <div class="metric-label">Sustainability</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${Math.round(solution.metrics.manufacturability * 100)}%</div>
          <div class="metric-label">Manufacturability</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">Estimated Impact</div>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">35%</div>
          <div class="metric-label">Cost Savings</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">92%</div>
          <div class="metric-label">Environmental Impact</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">8/10</div>
          <div class="metric-label">Feasibility</div>
        </div>
      </div>
    </div>
    
    <div class="footer">
      Page 3 of 3 - BioMimicry Architect AI
    </div>
  </div>
</body>
</html>
  `;

  // Create blob and download
  const blob = new Blob([reportHTML], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `biomimicry-report-${solution.id}-${Date.now()}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Optional: Show print dialog
  setTimeout(() => {
    const printWindow = window.open(url, "_blank");
    if (printWindow) {
      printWindow.print();
    }
  }, 100);
}

/**
 * Generate detailed STL file for 3D printing
 */
export function generateSTLModel(
  organism: string,
  designName: string
): ArrayBuffer {
  // Create more sophisticated STL based on organism
  const triangles: Array<{
    normal: [number, number, number];
    vertices: [[number, number, number], [number, number, number], [number, number, number]];
  }> = [];

  if (organism.includes("Termite")) {
    // Termite spiral structure
    for (let i = 0; i < 30; i++) {
      const angle1 = (i / 30) * Math.PI * 4;
      const angle2 = ((i + 1) / 30) * Math.PI * 4;

      const x1 = Math.cos(angle1) * 2;
      const z1 = Math.sin(angle1) * 2;
      const y1 = (i / 30) * 4 - 2;

      const x2 = Math.cos(angle2) * 2;
      const z2 = Math.sin(angle2) * 2;
      const y2 = ((i + 1) / 30) * 4 - 2;

      triangles.push({
        normal: [0, 1, 0],
        vertices: [[x1, y1, z1], [x2, y2, z2], [x1 + 0.2, y1 + 0.2, z1]],
      });
    }
  } else if (organism.includes("Gecko")) {
    // Gecko bristle structure
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 4;
      const z = (Math.random() - 0.5) * 4;

      triangles.push({
        normal: [0, 0.8, 0.2],
        vertices: [
          [x, 0, z],
          [x + 0.15, 1.5, z],
          [x - 0.15, 1.5, z],
        ],
      });

      triangles.push({
        normal: [0.8, 0.8, 0],
        vertices: [
          [x, 0, z],
          [x - 0.15, 1.5, z],
          [x, 1.5, z - 0.15],
        ],
      });
    }
  } else if (organism.includes("Whale")) {
    // Whale blade with tubercles
    const vertices = [];
    for (let x = -3; x <= 3; x += 0.5) {
      for (let y = -1; y <= 1; y += 0.5) {
        vertices.push([x, y, 0]);
        vertices.push([x, y, 0.3]);
      }
    }

    // Add tubercle triangles
    for (let i = 0; i < vertices.length - 2; i++) {
      if (Math.random() > 0.7) {
        triangles.push({
          normal: [0, 0, 1],
          vertices: [
            vertices[i] as [number, number, number],
            vertices[i + 1] as [number, number, number],
            vertices[i + 2] as [number, number, number],
          ],
        });
      }
    }
  } else {
    // Default cube structure
    const vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];

    const faces = [
      [0, 1, 2],
      [0, 2, 3],
      [4, 6, 5],
      [4, 7, 6],
      [0, 4, 5],
      [0, 5, 1],
      [2, 6, 7],
      [2, 7, 3],
      [0, 3, 7],
      [0, 7, 4],
      [1, 5, 6],
      [1, 6, 2],
    ];

    faces.forEach((face) => {
      triangles.push({
        normal: [0, 0, 0],
        vertices: [
          vertices[face[0]] as [number, number, number],
          vertices[face[1]] as [number, number, number],
          vertices[face[2]] as [number, number, number],
        ],
      });
    });
  }

  // Build STL binary file
  const triangleCount = Math.max(triangles.length, 1);
  const totalSize = 80 + 4 + triangleCount * 50;
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  // Header
  const headerStr = `BioMimicry STL - ${organism} ${designName}`.padEnd(80);
  for (let i = 0; i < headerStr.length && i < 80; i++) {
    view.setUint8(i, headerStr.charCodeAt(i));
  }

  // Triangle count
  view.setUint32(80, triangleCount, true);

  // Triangles
  let offset = 84;
  triangles.forEach((tri) => {
    // Normal
    view.setFloat32(offset, tri.normal[0], true);
    offset += 4;
    view.setFloat32(offset, tri.normal[1], true);
    offset += 4;
    view.setFloat32(offset, tri.normal[2], true);
    offset += 4;

    // Vertices
    tri.vertices.forEach((v) => {
      view.setFloat32(offset, v[0], true);
      offset += 4;
      view.setFloat32(offset, v[1], true);
      offset += 4;
      view.setFloat32(offset, v[2], true);
      offset += 4;
    });

    // Attribute byte count
    view.setUint16(offset, 0, true);
    offset += 2;
  });

  return buffer;
}

/**
 * Download STL file for 3D printing
 */
export function downloadSTL(
  organism: string,
  designName: string
): void {
  const stlBuffer = generateSTLModel(organism, designName);
  const blob = new Blob([stlBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${organism.replace(/\s+/g, "-")}-${designName.replace(/\s+/g, "-")}-${Date.now()}.stl`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generate shareable link with solution details
 */
export function generateShareLink(
  challenge: string,
  solutionId: string
): string {
  const params = new URLSearchParams({
    challenge: challenge,
    solution: solutionId,
    timestamp: Date.now().toString(),
  });

  return `${window.location.origin}?${params.toString()}`;
}

/**
 * Copy link to clipboard
 */
export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}
