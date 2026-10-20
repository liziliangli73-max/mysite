/* ============================================================================
 * iPhone 17 · 3D Teardown Lab
 * 仅使用 Three.js + 原生 HTML / CSS / JavaScript。
 * 所有几何体、屏幕内容、电路纹理、标注与动画均由代码实时生成。
 * ========================================================================== */

(() => {
  'use strict';

  /* --------------------------------------------------------------------------
   * 0. 数据
   * ------------------------------------------------------------------------ */

  const PART_DEFS = [
    {
      id: 'glass',
      no: '01',
      name: '超瓷晶面板 2',
      en: 'CERAMIC SHIELD 2',
      accent: '#62e5ff',
      metric: '0.52 MM · 纳米陶瓷',
      face: 'front',
      labelSide: 'left',
      labelShift: -4,
      labelMetric: 'CERAMIC SHIELD 2 · 0.52 MM',
      desc: '覆盖在屏幕最外层的透明防护层。纳米级陶瓷晶体嵌入玻璃矩阵，在保持高透光率的同时显著提升抗跌落与抗刮擦能力。',
      specs: [
        ['材质', '纳米晶体陶瓷玻璃'],
        ['厚度', '0.52 mm'],
        ['抗刮擦', '3× 提升'],
        ['透光率', '92%'],
      ],
      tags: ['Ceramic Shield', 'Ion Exchange', 'IP68'],
      note: '// 陶瓷晶体在玻璃内部形成互锁网络，裂纹扩展路径被有效分散。',
      base: [0, 0, 0],
      desktopOffset: [-2.42, 0.92, 0.85],
      mobileOffset: [-1.0, 1.3, 1.15],
      rotation: [0.02, 0.2, -0.035],
      anchor: [-1.08, 1.55, 0.15],
      camera: 'front',
    },
    {
      id: 'display',
      no: '02',
      name: '超视网膜 XDR 显示屏',
      en: 'SUPER RETINA XDR DISPLAY',
      accent: '#6f9dff',
      metric: '6.3″ · 120HZ',
      face: 'front',
      labelSide: 'left',
      labelShift: 0,
      labelMetric: '6.3″ · 2622 × 1206 · 120 HZ',
      desc: '6.3 英寸 OLED 全面屏，支持 ProMotion 自适应刷新率与全天候显示。像素级亮度控制带来更纯净的黑场与更准确的色彩。',
      specs: [
        ['尺寸', '6.3 英寸 OLED'],
        ['分辨率', '2622 × 1206'],
        ['刷新率', '1–120 Hz 自适应'],
        ['峰值亮度', '3000 尼特'],
      ],
      tags: ['ProMotion', 'Always-On', 'HDR10'],
      note: '// 驱动芯片与显示面板层叠封装，排线由底部弯折接入主板。',
      base: [0, 0, 0],
      desktopOffset: [-1.98, 0.12, 0.48],
      mobileOffset: [-0.62, 0.7, 0.62],
      rotation: [0.01, 0.12, -0.02],
      anchor: [-1.08, 0.55, 0.14],
      camera: 'front',
    },
    {
      id: 'frame',
      no: '03',
      name: '7000 系铝金属中框',
      en: 'AEROSPACE ALUMINUM FRAME',
      accent: '#b9c8d6',
      metric: '7.95 MM · IP68',
      face: 'frame',
      labelSide: 'right',
      labelShift: 20,
      labelMetric: 'CNC ALUMINUM · 7.95 MM',
      desc: '整块 7000 系铝金属经 CNC 精密切削成型，兼作天线与结构承力件。中框内部布置了缓冲结构与防水密封胶条。',
      specs: [
        ['材质', '7000 系铝合金'],
        ['机身厚度', '7.95 mm'],
        ['整机重量', '177 g'],
        ['防护等级', 'IP68'],
      ],
      tags: ['CNC Unibody', 'Antenna Band', 'Recycled'],
      note: '// 中框同时承担天线功能，注塑断点用于隔离不同频段。',
      base: [0, 0, 0],
      desktopOffset: [0.05, 0.02, 0.02],
      mobileOffset: [0, 0, 0],
      rotation: [0, 0, 0],
      anchor: [1.1, -0.2, 0.06],
      camera: 'front',
    },
    {
      id: 'board',
      no: '04',
      name: 'A19 主板与芯片',
      en: 'A19 LOGIC BOARD',
      accent: '#66f4b2',
      metric: '3NM · 6 核 CPU',
      face: 'front',
      labelSide: 'right',
      labelShift: -12,
      labelMetric: 'A19 · 3 NM · 8 GB',
      desc: '双层堆叠主板集成 A19 仿生芯片、统一内存、5G 调制解调器与电源管理单元。更短的信号路径带来更高能效。',
      specs: [
        ['芯片', 'A19 仿生 · 3 nm'],
        ['CPU', '6 核'],
        ['GPU', '5 核'],
        ['神经网络', '16 核'],
        ['统一内存', '8 GB'],
      ],
      tags: ['3nm', 'Neural Engine', '5G'],
      note: '// A19 芯片与统一内存采用封装内互连，显著降低数据搬运功耗。',
      base: [0.4, 1.22, -0.005],
      desktopOffset: [0.7, 1.68, -0.08],
      mobileOffset: [0.55, 1.55, -0.2],
      rotation: [0, -0.06, 0.015],
      anchor: [0.68, 0.78, 0.06],
      camera: 'front',
    },
    {
      id: 'battery',
      no: '05',
      name: '高密度锂离子电池',
      en: 'HIGH-DENSITY LI-ION CELL',
      accent: '#ffbd68',
      metric: '3692 MAH · 14.3 WH',
      face: 'front',
      labelSide: 'left',
      labelShift: 6,
      labelMetric: '3692 MAH · 40 W',
      desc: 'L 形高密度电芯充分利用内部空间，配合定制电源管理芯片实现更长的续航与更低的充电发热。',
      specs: [
        ['容量', '3692 mAh'],
        ['标称电压', '3.87 V'],
        ['能量', '14.3 Wh'],
        ['快充', '40 W 有线'],
      ],
      tags: ['L-Shape Cell', 'USB-C', 'MagSafe'],
      note: '// 电芯采用多极耳卷绕结构，降低内阻并改善高功率充电时的温升。',
      base: [0, -0.82, -0.015],
      desktopOffset: [-0.45, -1.62, 0.18],
      mobileOffset: [-0.35, -1.35, 0.2],
      rotation: [0, 0.04, 0.02],
      anchor: [-0.7, -0.56, 0.1],
      camera: 'front',
    },
    {
      id: 'camera',
      no: '06',
      name: '4800 万双摄模组',
      en: 'DUAL FUSION CAMERA',
      accent: '#a88cff',
      metric: '48 MP · F/1.6',
      face: 'both',
      labelSide: 'right',
      labelShift: -10,
      labelMetric: '48 MP ×2 · F/1.6',
      desc: '一枚 4800 万像素融合式主摄与一枚 4800 万像素超广角镜头，共享计算摄影管线。蓝宝石玻璃覆盖每片镜片。',
      specs: [
        ['主摄', '48 MP · f/1.6'],
        ['超广角', '48 MP · f/2.2'],
        ['变焦', '2× 光学品质'],
        ['视频', '4K 60 Dolby Vision'],
      ],
      tags: ['Fusion', 'Sapphire', 'Sensor Shift'],
      note: '// 传感器位移式防抖以像素级精度移动感光元件，抵消手持抖动。',
      base: [-0.55, 1.45, -0.15],
      desktopOffset: [2.08, 1.28, -1.3],
      mobileOffset: [1.05, 0.7, -1.35],
      rotation: [0.03, Math.PI + 0.08, -0.03],
      anchor: [0.5, 0.26, -0.16],
      camera: 'front',
    },
    {
      id: 'rear',
      no: '07',
      name: '哑光玻璃背板',
      en: 'MATTE GLASS BACK',
      accent: '#8ba0b3',
      metric: 'MAGSAFE · 25 W',
      face: 'both',
      labelSide: 'right',
      labelShift: 18,
      labelMetric: 'MAGSAFE · 25 W',
      desc: '带哑光蚀刻质感的玻璃背板，内嵌 MagSafe 磁吸阵列与无线充电线圈。Apple 标志由整块玻璃精密成型。',
      specs: [
        ['表面', '哑光蚀刻玻璃'],
        ['无线充电', 'MagSafe 25 W'],
        ['磁吸阵列', '16 颗磁体'],
        ['防护', 'IP68'],
      ],
      tags: ['MagSafe', 'Qi2', 'Matte Glass'],
      note: '// 磁吸阵列与充电线圈共面布局，磁通路径经过优化以减少涡流损耗。',
      base: [0, 0, -0.145],
      desktopOffset: [2.0, -1.52, -1.52],
      mobileOffset: [1.2, -1.3, -1.15],
      rotation: [0.02, -0.24, 0.04],
      anchor: [1.08, -0.72, -0.03],
      camera: 'front',
    },
    {
      id: 'haptic',
      no: '08',
      name: 'X 轴线性触感引擎',
      en: 'TAPTIC ENGINE',
      accent: '#ff9b6b',
      metric: '0.4 CC · 0.6 MS',
      face: 'front',
      labelSide: 'left',
      labelShift: 8,
      labelMetric: 'LINEAR ACTUATOR · 0.4 CC',
      desc: '体积更小的第二代线性马达，通过水平方向的高频往复运动模拟清脆、细腻的触感反馈。',
      specs: [
        ['类型', 'X 轴线性马达'],
        ['响应', '0.6 ms'],
        ['体积', '0.4 cc'],
        ['材质', '钕铁硼磁体'],
      ],
      tags: ['Haptic', 'Linear', 'NdFeB'],
      note: '// 定制驱动波形与系统触感引擎配合，可按场景输出不同频率与振幅。',
      base: [-0.73, -1.78, -0.015],
      desktopOffset: [-2.1, -1.04, 0.78],
      mobileOffset: [-1.1, -1.8, 0.6],
      rotation: [0, -0.1, -0.03],
      anchor: [-0.26, 0, 0.08],
      camera: 'front',
    },
    {
      id: 'speaker',
      no: '09',
      name: '立体声扬声器',
      en: 'STEREO SPEAKER',
      accent: '#76e0c3',
      metric: 'SPATIAL AUDIO',
      face: 'front',
      labelSide: 'right',
      labelShift: 8,
      labelMetric: 'DOLBY ATMOS · SPATIAL',
      desc: '底部主扬声器与顶部听筒组成立体声系统，配合空间音频算法，在横屏观影时形成更宽广的声场。',
      specs: [
        ['系统', '立体声双扬声器'],
        ['音频', '空间音频'],
        ['解码', 'Dolby Atmos'],
        ['腔体', '独立密封音腔'],
      ],
      tags: ['Stereo', 'Dolby Atmos', 'Spatial'],
      note: '// 独立密封音腔与防尘网结构在提升低频响度的同时保持 IP68 防护。',
      base: [0.78, -1.86, -0.015],
      desktopOffset: [1.82, -1.54, 0.72],
      mobileOffset: [1.05, -2.0, 0.55],
      rotation: [0, 0.1, 0.03],
      anchor: [0.26, 0, 0.08],
      camera: 'front',
    },
  ];

  const TOTAL_PARTS = PART_DEFS.length;
  const FOV = 38;
  const PHONE_W = 2.36;
  const PHONE_H = 4.94;
  const PHONE_D = 0.26;
  const PHONE_R = 0.46;

  /* --------------------------------------------------------------------------
   * 1. 状态与 DOM
   * ------------------------------------------------------------------------ */

  const state = {
    exploded: false,
    selected: null,
    hovered: null,
    labels: true,
    autoRotate: false,
    guideOpen: false,
    coachDismissed: false,
    dragging: false,
    ready: false,
  };

  const dom = {
    canvas: document.getElementById('scene'),
    loader: document.getElementById('loader'),
    loaderBar: document.getElementById('loaderBar'),
    loaderPct: document.getElementById('loaderPct'),
    loaderStatus: document.getElementById('loaderStatus'),
    partsList: document.getElementById('partsList'),
    partsPanel: document.getElementById('partsPanel'),
    partsToggle: document.getElementById('partsToggle'),
    partsClose: document.getElementById('partsClose'),
    inspectorPanel: document.getElementById('inspectorPanel'),
    inspectorClose: document.getElementById('inspectorClose'),
    inspectorBody: document.getElementById('inspectorBody'),
    inspectorIndex: document.getElementById('inspectorIndex'),
    partCount: document.getElementById('partCount'),
    explodeBtn: document.getElementById('explodeBtn'),
    explodeLabel: document.getElementById('explodeLabel'),
    viewBtn: document.getElementById('viewBtn'),
    viewLabel: document.getElementById('viewLabel'),
    viewState: document.getElementById('viewState'),
    rotateBtn: document.getElementById('rotateBtn'),
    labelsBtn: document.getElementById('labelsBtn'),
    resetBtn: document.getElementById('resetBtn'),
    statusDot: document.getElementById('statusDot'),
    systemState: document.getElementById('systemState'),
    localClock: document.getElementById('localClock'),
    fpsValue: document.getElementById('fpsValue'),
    meshValue: document.getElementById('meshValue'),
    coordX: document.getElementById('coordX'),
    coordY: document.getElementById('coordY'),
    coordZ: document.getElementById('coordZ'),
    annotationLayer: document.getElementById('annotationLayer'),
    leaderSvg: document.getElementById('leaderSvg'),
    hoverTip: document.getElementById('hoverTip'),
    hoverTipText: document.getElementById('hoverTipText'),
    guideBtn: document.getElementById('guideBtn'),
    guideModal: document.getElementById('guideModal'),
    guideClose: document.getElementById('guideClose'),
    guideStart: document.getElementById('guideStart'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    brandHome: document.getElementById('brandHome'),
    coachmark: document.getElementById('coachmark'),
    coachClose: document.getElementById('coachClose'),
    toast: document.getElementById('toast'),
    webglError: document.getElementById('webglError'),
  };

  /* --------------------------------------------------------------------------
   * 2. 通用工具
   * ------------------------------------------------------------------------ */

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const damp = (current, target, lambda, dt) => THREE.MathUtils.damp(current, target, lambda, dt);
  const rand = (a, b) => a + Math.random() * (b - a);
  const smoothstep = (t) => t * t * (3 - 2 * t);

  function isCompact() {
    return window.innerWidth <= 980 || window.innerWidth / window.innerHeight < 0.82;
  }

  function isSheetLayout() {
    return window.innerWidth <= 980;
  }

  function makeCanvas(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }

  function canvasTexture(canvas, srgb = true) {
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return texture;
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function hexToRgba(hex, alpha) {
    const value = hex.replace('#', '');
    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function formatClock() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  /* --------------------------------------------------------------------------
   * 3. 程序化纹理
   * ------------------------------------------------------------------------ */

  let renderer = null;
  let scene = null;
  let camera = null;
  let device = null;
  let clock = null;

  let glowTexture = null;
  let contactShadowTexture = null;

  const textures = {};

  function buildScreenTexture() {
    const canvas = makeCanvas(1024, 2048);
    const ctx = canvas.getContext('2d');

    // 深空底色
    const base = ctx.createLinearGradient(0, 0, 0, 2048);
    base.addColorStop(0, '#02060b');
    base.addColorStop(0.42, '#04111a');
    base.addColorStop(1, '#010307');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 1024, 2048);

    // 极光色块
    const blobs = [
      [800, 410, 660, 'rgba(104,76,255,0.34)'],
      [240, 1200, 720, 'rgba(24,183,236,0.26)'],
      [860, 1690, 560, 'rgba(255,107,74,0.14)'],
      [460, 820, 520, 'rgba(49,143,255,0.12)'],
    ];
    for (const [x, y, r, color] of blobs) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, color);
      g.addColorStop(0.5, color.replace(/[\d.]+\)$/, '0.09)'));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1024, 2048);
    }

    // 环绕光线
    ctx.save();
    ctx.translate(512, 1030);
    ctx.rotate(-0.34);
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.ellipse(0, 0, 560 + i * 58, 255 + i * 30, 0.05, Math.PI * 0.15, Math.PI * 1.3);
      ctx.strokeStyle = `rgba(${90 + i * 8}, ${214 - i * 8}, 255, ${0.075 - i * 0.007})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
    ctx.restore();

    // 斜向高光
    ctx.save();
    ctx.translate(210, 1550);
    ctx.rotate(-0.72);
    const streak = ctx.createLinearGradient(0, 0, 0, 460);
    streak.addColorStop(0, 'rgba(112,240,255,0)');
    streak.addColorStop(0.5, 'rgba(112,240,255,0.075)');
    streak.addColorStop(1, 'rgba(112,240,255,0)');
    ctx.fillStyle = streak;
    ctx.fillRect(-180, -230, 1020, 460);
    ctx.restore();

    // 巨型 17 字标
    const numberGradient = ctx.createLinearGradient(220, 1080, 860, 1490);
    numberGradient.addColorStop(0, 'rgba(228,252,255,0.92)');
    numberGradient.addColorStop(0.42, 'rgba(118,232,255,0.58)');
    numberGradient.addColorStop(1, 'rgba(118,151,255,0.16)');
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 510px "SF Pro Display", "Helvetica Neue", "Noto Sans SC", sans-serif';
    ctx.shadowColor = 'rgba(71,205,255,0.45)';
    ctx.shadowBlur = 72;
    ctx.fillStyle = numberGradient;
    ctx.fillText('17', 512, 1334);
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(164,243,255,0.22)';
    ctx.strokeText('17', 512, 1334);
    ctx.restore();

    // 品牌小字
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(207,242,255,0.58)';
    ctx.font = '500 27px "SF Pro Display", "Helvetica Neue", sans-serif';
    ctx.fillText('iPhone 17', 512, 1140);

    // 时间
    ctx.save();
    ctx.fillStyle = 'rgba(240,252,255,0.97)';
    ctx.font = '300 208px "SF Pro Display", "Helvetica Neue", "Noto Sans SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.shadowColor = 'rgba(189,242,255,0.22)';
    ctx.shadowBlur = 30;
    ctx.fillText('9:41', 512, 590);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(200,231,245,0.64)';
    ctx.font = '400 30px "PingFang SC", "Noto Sans SC", sans-serif';
    ctx.fillText('10月20日  星期一', 512, 652);

    // 状态栏
    ctx.fillStyle = 'rgba(235,249,255,0.82)';
    ctx.font = '500 30px "SF Pro Display", "Helvetica Neue", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('9:41', 76, 112);

    // 信号
    for (let i = 0; i < 4; i += 1) {
      const h = 10 + i * 7;
      ctx.fillRect(842 + i * 13, 106 - h, 7, h);
    }
    // Wi-Fi
    ctx.save();
    ctx.strokeStyle = 'rgba(235,249,255,0.82)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(916, 110, 7 + i * 11, Math.PI * 1.21, Math.PI * 1.79);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(916, 108, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(235,249,255,0.82)';
    ctx.fill();
    ctx.restore();

    // 电池
    ctx.strokeStyle = 'rgba(235,249,255,0.55)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(955, 87, 45, 23);
    ctx.fillStyle = 'rgba(120,244,183,0.8)';
    ctx.fillRect(959, 91, 31, 15);
    ctx.fillStyle = 'rgba(235,249,255,0.55)';
    ctx.fillRect(1001, 94, 3, 9);

    // 锁屏底部按钮
    const drawLockButton = (x, y, kind) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 41, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15,27,37,0.55)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(194,234,249,0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(226,247,255,0.7)';
      ctx.fillStyle = 'rgba(226,247,255,0.7)';
      ctx.lineWidth = 3;
      if (kind === 'camera') {
        ctx.strokeRect(x - 13, y - 8, 26, 18);
        ctx.beginPath();
        ctx.arc(x, y + 1, 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - 4, y - 8);
        ctx.lineTo(x - 1, y - 13);
        ctx.lineTo(x + 6, y - 13);
        ctx.lineTo(x + 9, y - 8);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y - 16);
        ctx.lineTo(x, y + 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - 8, y - 3);
        ctx.lineTo(x, y + 4);
        ctx.lineTo(x + 8, y - 3);
        ctx.stroke();
      }
      ctx.restore();
    };
    drawLockButton(150, 1836, 'flashlight');
    drawLockButton(874, 1836, 'camera');

    // 底部提示
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(196,231,245,0.34)';
    ctx.font = '400 22px "SF Pro Display", "Helvetica Neue", sans-serif';
    ctx.fillText('向上轻扫以解锁', 512, 1950);

    // Home indicator
    ctx.fillStyle = 'rgba(239,252,255,0.86)';
    roundRectPath(ctx, 390, 1992, 244, 8, 4);
    ctx.fill();

    // 暗角
    const vignette = ctx.createRadialGradient(512, 1024, 180, 512, 1024, 1080);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(0.72, 'rgba(0,0,0,0.08)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.48)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, 1024, 2048);

    return canvasTexture(canvas);
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function buildGlareTexture() {
    const canvas = makeCanvas(512, 1024);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 1024);
    ctx.save();
    ctx.translate(256, 512);
    ctx.rotate(-0.56);
    const bands = [
      [-330, 70, 0.23],
      [-70, 190, 0.12],
      [270, 45, 0.17],
      [390, 110, 0.05],
    ];
    for (const [x, w, alpha] of bands) {
      const g = ctx.createLinearGradient(x - w, 0, x + w, 0);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.42, `rgba(196,245,255,${alpha})`);
      g.addColorStop(0.55, `rgba(255,255,255,${alpha * 0.8})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - w, -800, w * 2, 1600);
    }
    ctx.restore();

    // 零星反光点
    const dots = [
      [83, 315, 1.8, 0.18],
      [436, 672, 1.2, 0.12],
      [132, 786, 2.4, 0.1],
      [382, 210, 1.5, 0.14],
    ];
    for (const [x, y, r, a] of dots) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 14);
      g.addColorStop(0, `rgba(230,252,255,${a})`);
      g.addColorStop(1, 'rgba(230,252,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r * 14, y - r * 14, r * 28, r * 28);
    }
    return canvasTexture(canvas);
  }

  function buildPCBTexture() {
    const canvas = makeCanvas(1024, 1536);
    const ctx = canvas.getContext('2d');

    const base = ctx.createLinearGradient(0, 0, 1024, 1536);
    base.addColorStop(0, '#071914');
    base.addColorStop(0.55, '#04110d');
    base.addColorStop(1, '#061711');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 1024, 1536);

    // 细网格
    ctx.strokeStyle = 'rgba(100,181,148,0.055)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1536);
      ctx.stroke();
    }
    for (let y = 0; y < 1536; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // 随机走线
    let seed = 9719;
    const next = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 0; i < 74; i += 1) {
      let x = Math.floor(next() * 1024);
      let y = Math.floor(next() * 1536);
      const horizontal = next() > 0.5;
      const gold = next() > 0.54;
      ctx.beginPath();
      ctx.moveTo(x, y);
      const turns = 3 + Math.floor(next() * 5);
      for (let j = 0; j < turns; j += 1) {
        const len = 30 + next() * 150;
        if (j % 2 === 0) x += horizontal ? len : 0;
        else y += horizontal ? 0 : len;
        if (next() > 0.55) {
          x += (next() - 0.5) * 40;
          y += (next() - 0.5) * 40;
        }
        x = clamp(x, 14, 1010);
        y = clamp(y, 14, 1522);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = gold ? 'rgba(178,144,67,0.34)' : 'rgba(76,188,153,0.21)';
      ctx.lineWidth = 1.1 + next() * 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 3.4, 0, Math.PI * 2);
      ctx.fillStyle = gold ? 'rgba(208,174,89,0.55)' : 'rgba(102,218,180,0.36)';
      ctx.fill();
    }

    // 焊盘与过孔
    for (let i = 0; i < 90; i += 1) {
      const x = 30 + next() * 964;
      const y = 30 + next() * 1476;
      ctx.beginPath();
      ctx.arc(x, y, 2 + next() * 4, 0, Math.PI * 2);
      ctx.fillStyle = next() > 0.4 ? 'rgba(191,158,78,0.28)' : 'rgba(98,196,164,0.2)';
      ctx.fill();
    }

    // 丝印
    ctx.font = '500 22px "SF Mono", "Roboto Mono", monospace';
    ctx.fillStyle = 'rgba(166,207,190,0.28)';
    ctx.fillText('APPLE 2025', 54, 1422);
    ctx.font = '500 18px "SF Mono", "Roboto Mono", monospace';
    ctx.fillStyle = 'rgba(128,180,160,0.24)';
    ctx.fillText('MX17-LOGIC-04  ·  REV C', 54, 1452);
    ctx.fillText('CONFIDENTIAL INTERNAL USE', 596, 1452);
    ctx.fillText('A19 / PMU / 5G', 54, 90);

    // 屏蔽罩区域暗块
    ctx.fillStyle = 'rgba(7,25,20,0.48)';
    roundRectPath(ctx, 610, 90, 300, 210, 18);
    ctx.fill();
    roundRectPath(ctx, 74, 1010, 280, 250, 18);
    ctx.fill();

    return canvasTexture(canvas);
  }

  function buildBatteryTexture() {
    const canvas = makeCanvas(1024, 1024);
    const ctx = canvas.getContext('2d');

    const base = ctx.createLinearGradient(0, 0, 1024, 1024);
    base.addColorStop(0, '#30363d');
    base.addColorStop(0.48, '#252a30');
    base.addColorStop(1, '#1c2025');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 1024, 1024);

    // 表面细纹
    for (let y = 0; y < 1024; y += 5) {
      ctx.fillStyle = y % 10 === 0 ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.022)';
      ctx.fillRect(0, y, 1024, 1);
    }

    // 左上品牌
    ctx.fillStyle = 'rgba(236,246,250,0.84)';
    ctx.font = '600 48px "SF Pro Display", "Helvetica Neue", sans-serif';
    ctx.fillText('iPhone 17', 62, 108);
    ctx.fillStyle = 'rgba(183,202,211,0.46)';
    ctx.font = '400 22px "SF Pro Display", "Helvetica Neue", sans-serif';
    ctx.fillText('Li-ion Polymer Battery', 64, 148);

    // 电池图标
    ctx.strokeStyle = 'rgba(255,231,188,0.75)';
    ctx.lineWidth = 3;
    ctx.strokeRect(760, 72, 168, 78);
    ctx.fillStyle = 'rgba(255,190,104,0.78)';
    ctx.fillRect(766, 78, 132, 66);
    ctx.fillStyle = 'rgba(255,231,188,0.75)';
    ctx.fillRect(932, 94, 7, 34);

    // 大容量数字
    ctx.fillStyle = 'rgba(248,252,255,0.94)';
    ctx.font = '300 162px "SF Pro Display", "Helvetica Neue", sans-serif';
    ctx.fillText('3692', 60, 368);
    ctx.fillStyle = 'rgba(255,191,106,0.92)';
    ctx.font = '500 46px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('mAh', 68, 426);
    ctx.fillStyle = 'rgba(198,218,226,0.5)';
    ctx.font = '400 26px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('RATED CAPACITY  ·  3.87 V  ·  14.3 Wh', 68, 484);

    // 分隔线
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(62, 532);
    ctx.lineTo(962, 532);
    ctx.stroke();

    // 技术参数
    ctx.fillStyle = 'rgba(206,223,231,0.49)';
    ctx.font = '400 23px "SF Mono", "Roboto Mono", monospace';
    const lines = [
      'CELL TYPE        LITHIUM-ION POLYMER',
      'NOMINAL VOLTAGE  3.87 V',
      'CHARGE LIMIT     4.45 V',
      'ENERGY           14.3 Wh',
      'MANUFACTURED    2025 / CN',
    ];
    lines.forEach((line, i) => ctx.fillText(line, 64, 592 + i * 44));

    // 警示三角
    ctx.save();
    ctx.translate(870, 636);
    ctx.beginPath();
    ctx.moveTo(0, -54);
    ctx.lineTo(52, 44);
    ctx.lineTo(-52, 44);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,190,104,0.55)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,190,104,0.62)';
    ctx.font = '500 44px "SF Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('!', 0, 30);
    ctx.restore();

    // 条形码
    let barcodeSeed = 1337;
    const br = () => {
      barcodeSeed = (barcodeSeed * 1103515245 + 12345) >>> 0;
      return barcodeSeed / 4294967296;
    };
    let bx = 64;
    for (let i = 0; i < 78; i += 1) {
      const w = 2 + Math.floor(br() * 7);
      ctx.fillStyle = 'rgba(219,232,237,0.55)';
      if (i % 2 === 0) ctx.fillRect(bx, 882, w, 58);
      bx += w + 3;
      if (bx > 950) break;
    }
    ctx.fillStyle = 'rgba(191,211,220,0.44)';
    ctx.font = '400 20px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('17-3692-A19-2025-CN', 64, 978);

    // 边框
    ctx.strokeStyle = 'rgba(255,255,255,0.11)';
    ctx.lineWidth = 2;
    roundRectPath(ctx, 20, 20, 984, 984, 34);
    ctx.stroke();

    return canvasTexture(canvas);
  }

  function buildChipTexture(label, sub) {
    const canvas = makeCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    const base = ctx.createLinearGradient(0, 0, 512, 512);
    base.addColorStop(0, '#1b2530');
    base.addColorStop(0.5, '#0d141c');
    base.addColorStop(1, '#080c12');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(126,224,255,0.26)';
    ctx.lineWidth = 3;
    ctx.strokeRect(12, 12, 488, 488);

    ctx.strokeStyle = 'rgba(126,224,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 13; i += 1) {
      const y = 70 + i * 27;
      ctx.beginPath();
      ctx.moveTo(48, y);
      ctx.lineTo(464, y);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(211,245,255,0.92)';
    ctx.font = '600 154px "SF Pro Display", "Helvetica Neue", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(82,220,255,0.45)';
    ctx.shadowBlur = 24;
    ctx.fillText(label, 256, 250);
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(124,178,203,0.72)';
    ctx.font = '400 20px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText(sub, 256, 348);

    // 引脚
    ctx.fillStyle = 'rgba(136,185,205,0.34)';
    for (let i = 0; i < 16; i += 1) {
      const x = 40 + i * 28;
      ctx.fillRect(x, 2, 13, 8);
      ctx.fillRect(x, 502, 13, 8);
      const y = 40 + i * 28;
      ctx.fillRect(2, y, 8, 13);
      ctx.fillRect(502, y, 8, 13);
    }

    return canvasTexture(canvas);
  }

  function buildLogoTexture() {
    const canvas = makeCanvas(512, 640);
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(120, 130, 400, 500);
    grad.addColorStop(0, 'rgba(219,231,241,0.78)');
    grad.addColorStop(0.45, 'rgba(165,184,199,0.55)');
    grad.addColorStop(1, 'rgba(100,118,132,0.34)');
    ctx.fillStyle = grad;

    // Apple silhouette (stylised, generated path)
    ctx.beginPath();
    ctx.moveTo(256, 512);
    ctx.bezierCurveTo(178, 512, 86, 451, 78, 347);
    ctx.bezierCurveTo(71, 262, 124, 200, 193, 191);
    ctx.bezierCurveTo(222, 187, 240, 201, 256, 201);
    ctx.bezierCurveTo(272, 201, 288, 188, 315, 191);
    ctx.bezierCurveTo(360, 196, 386, 225, 400, 260);
    ctx.bezierCurveTo(380, 281, 367, 307, 367, 342);
    ctx.bezierCurveTo(367, 385, 390, 421, 424, 444);
    ctx.bezierCurveTo(401, 482, 362, 512, 322, 512);
    ctx.bezierCurveTo(300, 512, 287, 500, 270, 500);
    ctx.bezierCurveTo(263, 500, 258, 507, 256, 512);
    ctx.closePath();
    ctx.fill();

    // Bite
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(437, 298, 76, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Leaf
    ctx.beginPath();
    ctx.moveTo(286, 152);
    ctx.bezierCurveTo(288, 105, 323, 67, 370, 62);
    ctx.bezierCurveTo(370, 108, 335, 147, 286, 152);
    ctx.closePath();
    ctx.fill();

    return canvasTexture(canvas);
  }

  function buildRegulatoryTexture() {
    const canvas = makeCanvas(1024, 180);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 180);
    ctx.fillStyle = 'rgba(198,214,224,0.38)';
    ctx.textAlign = 'center';
    ctx.font = '400 22px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('iPhone 17  ·  Model A3092  ·  Designed by Apple in California', 512, 48);
    ctx.fillText('Assembled in China  ·  Input 5–15V ⎓ 3A  ·  IP68', 512, 84);
    ctx.font = '400 16px "SF Mono", "Roboto Mono", monospace';
    ctx.fillStyle = 'rgba(198,214,224,0.24)';
    ctx.fillText('CMIIT ID: 2025AJ17  ·  Made with 100% recycled aluminium', 512, 122);
    ctx.fillStyle = 'rgba(198,214,224,0.16)';
    ctx.fillRect(312, 148, 400, 1);
    return canvasTexture(canvas);
  }

  function buildGrilleTexture() {
    const canvas = makeCanvas(512, 256);
    const ctx = canvas.getContext('2d');
    const base = ctx.createLinearGradient(0, 0, 0, 256);
    base.addColorStop(0, '#1c2229');
    base.addColorStop(1, '#0a0e13');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 512, 256);

    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 18; col += 1) {
        const x = 28 + col * 26 + (row % 2) * 13;
        const y = 76 + row * 48;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, '#010204');
        g.addColorStop(0.7, '#030609');
        g.addColorStop(1, 'rgba(120,160,180,0.18)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.strokeStyle = 'rgba(136,188,210,0.14)';
    ctx.lineWidth = 2;
    roundRectPath(ctx, 10, 10, 492, 236, 26);
    ctx.stroke();
    return canvasTexture(canvas);
  }


  function buildRearInnerTexture() {
    const canvas = makeCanvas(1024, 2048);
    const ctx = canvas.getContext('2d');
    const base = ctx.createLinearGradient(0, 0, 1024, 2048);
    base.addColorStop(0, '#161d25');
    base.addColorStop(0.48, '#0b1118');
    base.addColorStop(1, '#121821');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 1024, 2048);

    // 石墨内衬纹理
    for (let y = 0; y < 2048; y += 8) {
      ctx.fillStyle = y % 16 === 0 ? 'rgba(255,255,255,0.012)' : 'rgba(0,0,0,0.03)';
      ctx.fillRect(0, y, 1024, 1);
    }
    for (let i = 0; i < 120; i += 1) {
      const x = (i * 173 + 41) % 1024;
      const y = (i * 397 + 83) % 2048;
      ctx.fillStyle = 'rgba(192,221,236,0.035)';
      ctx.fillRect(x, y, 1, 1);
    }

    // 内侧框线
    ctx.strokeStyle = 'rgba(144,186,206,0.12)';
    ctx.lineWidth = 2;
    roundRectPath(ctx, 30, 30, 964, 1988, 76);
    ctx.stroke();

    // 中央 MagSafe 同心结构
    ctx.save();
    ctx.translate(512, 1000);
    ctx.strokeStyle = 'rgba(203,144,88,0.22)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 316, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(134,183,205,0.12)';
    ctx.lineWidth = 1.5;
    [190, 238, 360, 425].forEach((r) => {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2;
      ctx.save();
      ctx.rotate(angle);
      ctx.fillStyle = 'rgba(121,137,150,0.16)';
      roundRectPath(ctx, -28, -286, 56, 92, 12);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();

    // 内部标签
    ctx.fillStyle = 'rgba(200,224,236,0.32)';
    ctx.font = '500 24px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('REAR GLASS ASSEMBLY', 78, 142);
    ctx.fillText('MAGSAFE ARRAY · 16 MAGNETS', 78, 178);
    ctx.fillStyle = 'rgba(200,224,236,0.18)';
    ctx.font = '400 19px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('IPHONE 17 / MX17-BACK-07', 78, 1874);
    ctx.fillText('APPLE INC. · CALIFORNIA', 78, 1910);

    // 内部走线
    ctx.strokeStyle = 'rgba(207,139,80,0.24)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(280, 1260);
    ctx.bezierCurveTo(240, 1560, 330, 1720, 300, 1880);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(744, 1260);
    ctx.bezierCurveTo(784, 1560, 700, 1720, 726, 1880);
    ctx.stroke();

    // 中央暗色铭牌
    ctx.fillStyle = 'rgba(7,11,16,0.5)';
    roundRectPath(ctx, 392, 960, 240, 90, 16);
    ctx.fill();
    ctx.fillStyle = 'rgba(192,220,234,0.28)';
    ctx.font = '400 22px "SF Mono", "Roboto Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MagSafe', 512, 1003);
    ctx.font = '400 15px "SF Mono", "Roboto Mono", monospace';
    ctx.fillStyle = 'rgba(192,220,234,0.16)';
    ctx.fillText('25 W WIRELESS', 512, 1029);
    ctx.textAlign = 'left';

    return canvasTexture(canvas);
  }

  function buildCameraInnerTexture() {
    const canvas = makeCanvas(512, 512);
    const ctx = canvas.getContext('2d');
    const base = ctx.createLinearGradient(0, 0, 512, 512);
    base.addColorStop(0, '#1b2129');
    base.addColorStop(1, '#090d12');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(158,190,206,0.2)';
    ctx.lineWidth = 2;
    roundRectPath(ctx, 18, 18, 476, 476, 42);
    ctx.stroke();

    // 屏蔽罩分割
    ctx.strokeStyle = 'rgba(158,190,206,0.09)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.moveTo(42, 110 + i * 72);
      ctx.lineTo(470, 110 + i * 72);
      ctx.stroke();
    }

    // 铜色排线
    ctx.fillStyle = 'rgba(190,120,74,0.58)';
    roundRectPath(ctx, 62, 344, 240, 28, 6);
    ctx.fill();
    ctx.fillStyle = 'rgba(217,175,97,0.6)';
    roundRectPath(ctx, 62, 382, 130, 22, 5);
    ctx.fill();

    ctx.fillStyle = 'rgba(222,240,247,0.7)';
    ctx.font = '500 23px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('DUAL CAMERA MODULE', 56, 82);
    ctx.fillStyle = 'rgba(168,196,210,0.34)';
    ctx.font = '400 16px "SF Mono", "Roboto Mono", monospace';
    ctx.fillText('MX17-CAM-06 · FUSION SYSTEM', 56, 112);
    ctx.fillText('48 MP / OIS / SAPPHIRE', 56, 140);

    // 内部线圈造型
    ctx.strokeStyle = 'rgba(193,139,88,0.22)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(338, 268, 52 + i * 14, 0, Math.PI * 2);
      ctx.stroke();
    }

    return canvasTexture(canvas);
  }

  function buildGlowTexture() {
    const canvas = makeCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(255,255,255,0.92)');
    g.addColorStop(0.16, 'rgba(255,255,255,0.42)');
    g.addColorStop(0.48, 'rgba(255,255,255,0.12)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return canvasTexture(canvas, false);
  }

  function buildContactShadowTexture() {
    const canvas = makeCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, 'rgba(0,0,0,0.85)');
    g.addColorStop(0.4, 'rgba(0,0,0,0.46)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    return canvasTexture(canvas, false);
  }

  function buildEnvironmentTexture() {
    const canvas = makeCanvas(1024, 512);
    const ctx = canvas.getContext('2d');

    const sky = ctx.createLinearGradient(0, 0, 0, 512);
    sky.addColorStop(0, '#33414d');
    sky.addColorStop(0.34, '#121d27');
    sky.addColorStop(0.52, '#05090d');
    sky.addColorStop(0.72, '#0b151d');
    sky.addColorStop(1, '#020407');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 1024, 512);

    const softPanel = (x, y, w, h, color, blur) => {
      const g = ctx.createLinearGradient(x, y, x + w, y + h);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.35, color);
      g.addColorStop(0.65, color);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x, y, w, h);
      if (blur) {
        ctx.fillStyle = hexToRgba('#ffffff', 0.02);
        ctx.fillRect(x - 30, y - 20, w + 60, h + 40);
      }
    };

    softPanel(95, 70, 280, 90, 'rgba(239,250,255,0.95)');
    softPanel(680, 45, 195, 70, 'rgba(97,213,255,0.6)');
    softPanel(420, 250, 190, 30, 'rgba(208,231,255,0.3)');
    softPanel(800, 290, 130, 110, 'rgba(156,122,255,0.38)');
    softPanel(30, 350, 140, 50, 'rgba(255,157,101,0.22)');

    const horizon = ctx.createLinearGradient(0, 240, 0, 280);
    horizon.addColorStop(0, 'rgba(255,255,255,0)');
    horizon.addColorStop(0.5, 'rgba(176,229,255,0.08)');
    horizon.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = horizon;
    ctx.fillRect(0, 240, 1024, 40);

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  /* --------------------------------------------------------------------------
   * 4. 几何体工具
   * ------------------------------------------------------------------------ */

  function roundedRectShape(w, h, r, clockwise = false) {
    const x = -w / 2;
    const y = -h / 2;
    const radius = clamp(r, 0.001, Math.min(w, h) / 2 - 0.001);
    const shape = new THREE.Shape();

    if (!clockwise) {
      shape.moveTo(x + radius, y);
      shape.lineTo(x + w - radius, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + radius);
      shape.lineTo(x + w, y + h - radius);
      shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      shape.lineTo(x + radius, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);
    } else {
      shape.moveTo(x + radius, y + h);
      shape.lineTo(x + w - radius, y + h);
      shape.quadraticCurveTo(x + w, y + h, x + w, y + h - radius);
      shape.lineTo(x + w, y + radius);
      shape.quadraticCurveTo(x + w, y, x + w - radius, y);
      shape.lineTo(x + radius, y);
      shape.quadraticCurveTo(x, y, x, y + radius);
      shape.lineTo(x, y + h - radius);
      shape.quadraticCurveTo(x, y + h, x + radius, y + h);
    }
    shape.closePath();
    return shape;
  }

  function roundedBoxGeometry(w, h, d, r, curveSegments = 10) {
    const bevel = Math.min(r * 0.4, d * 0.32, 0.034);
    const shape = roundedRectShape(
      Math.max(0.002, w - bevel * 2),
      Math.max(0.002, h - bevel * 2),
      Math.max(0.002, r - bevel),
      false
    );
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.002, d - bevel * 2),
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
      curveSegments,
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedBox(w, h, d, r, material, curveSegments = 10) {
    return new THREE.Mesh(roundedBoxGeometry(w, h, d, r, curveSegments), material);
  }

  function roundedPlaneGeometry(w, h, r, curveSegments = 14) {
    const shape = roundedRectShape(w, h, r, false);
    const geometry = new THREE.ShapeGeometry(shape, curveSegments);
    geometry.computeBoundingBox();
    const pos = geometry.attributes.position;
    const uv = geometry.attributes.uv;
    const box = geometry.boundingBox;
    const width = box.max.x - box.min.x;
    const height = box.max.y - box.min.y;
    for (let i = 0; i < pos.count; i += 1) {
      uv.setXY(
        i,
        (pos.getX(i) - box.min.x) / width,
        (pos.getY(i) - box.min.y) / height
      );
    }
    uv.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedPlane(w, h, r, material, curveSegments = 14) {
    return new THREE.Mesh(roundedPlaneGeometry(w, h, r, curveSegments), material);
  }

  function frameRingGeometry(w, h, r, thickness, depth) {
    const shape = roundedRectShape(w, h, r, false);
    const hole = roundedRectShape(
      w - thickness * 2,
      h - thickness * 2,
      Math.max(0.025, r - thickness),
      true
    );
    shape.holes.push(hole);
    const bevel = 0.011;
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: Math.max(0.01, depth - bevel * 2),
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
      curveSegments: 20,
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedRectLine(w, h, r, z, material) {
    const points = [];
    const segments = 9;
    const corners = [
      [w / 2 - r, h / 2 - r, 0],
      [-w / 2 + r, h / 2 - r, Math.PI / 2],
      [-w / 2 + r, -h / 2 + r, Math.PI],
      [w / 2 - r, -h / 2 + r, Math.PI * 1.5],
    ];
    for (const [cx, cy, start] of corners) {
      for (let i = 0; i <= segments; i += 1) {
        const angle = start + (i / segments) * (Math.PI / 2);
        points.push(new THREE.Vector3(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, z));
      }
    }
    points.push(points[0].clone());
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
  }

  function addMesh(parent, geometry, material, position, rotation) {
    const mesh = new THREE.Mesh(geometry, material);
    if (position) mesh.position.set(position[0], position[1], position[2]);
    if (rotation) mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    parent.add(mesh);
    return mesh;
  }

  function cylinderZ(radiusTop, radiusBottom, height, segments, material) {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  }

  /* --------------------------------------------------------------------------
   * 5. 材质
   * ------------------------------------------------------------------------ */

  const M = {};

  function createMaterials() {
    const standard = (params) =>
      new THREE.MeshStandardMaterial({
        envMapIntensity: 1.12,
        ...params,
      });

    M.aluminum = standard({
      color: 0x9da8b3,
      metalness: 1,
      roughness: 0.28,
    });
    M.aluminumBright = standard({
      color: 0xc4ced7,
      metalness: 1,
      roughness: 0.2,
    });
    M.aluminumDark = standard({
      color: 0x4c545d,
      metalness: 0.96,
      roughness: 0.34,
    });
    M.titanium = standard({
      color: 0x7b8792,
      metalness: 1,
      roughness: 0.25,
    });
    M.steel = standard({
      color: 0x979fa8,
      metalness: 1,
      roughness: 0.3,
    });
    M.darkMetal = standard({
      color: 0x1d232a,
      metalness: 0.86,
      roughness: 0.42,
    });
    M.graphite = standard({
      color: 0x252b32,
      metalness: 0.52,
      roughness: 0.48,
    });
    M.batteryWrap = standard({
      color: 0x2b3037,
      metalness: 0.3,
      roughness: 0.58,
    });
    M.rubber = standard({
      color: 0x05080b,
      metalness: 0.1,
      roughness: 0.92,
    });
    M.pcb = standard({
      color: 0x06130f,
      metalness: 0.16,
      roughness: 0.56,
    });
    M.gold = standard({
      color: 0xd0ad61,
      metalness: 1,
      roughness: 0.28,
    });
    M.copper = standard({
      color: 0xc07445,
      metalness: 0.92,
      roughness: 0.33,
    });
    M.blackGloss = new THREE.MeshPhysicalMaterial({
      color: 0x020407,
      metalness: 0.38,
      roughness: 0.13,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      envMapIntensity: 1.5,
    });
    M.ceramicGlass = new THREE.MeshPhysicalMaterial({
      color: 0x0a1821,
      metalness: 0.08,
      roughness: 0.06,
      transparent: true,
      opacity: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 2.2,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    M.rearGlass = new THREE.MeshPhysicalMaterial({
      color: 0x171c22,
      metalness: 0.23,
      roughness: 0.48,
      clearcoat: 0.55,
      clearcoatRoughness: 0.35,
      envMapIntensity: 0.9,
    });
    M.cameraGlass = new THREE.MeshPhysicalMaterial({
      color: 0x08131b,
      metalness: 0.45,
      roughness: 0.035,
      clearcoat: 1,
      clearcoatRoughness: 0.02,
      envMapIntensity: 2.5,
      iridescence: 0.4,
      iridescenceIOR: 1.38,
    });
    M.sapphire = new THREE.MeshPhysicalMaterial({
      color: 0x0e2830,
      metalness: 0.2,
      roughness: 0.05,
      clearcoat: 1,
      transparent: true,
      opacity: 0.84,
      envMapIntensity: 2,
      side: THREE.DoubleSide,
    });
    M.screen = new THREE.MeshBasicMaterial({
      map: textures.screen,
      toneMapped: false,
    });
    M.glare = new THREE.MeshBasicMaterial({
      map: textures.glare,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    M.rearGlare = new THREE.MeshBasicMaterial({
      map: textures.glare,
      transparent: true,
      opacity: 0.075,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    M.led = new THREE.MeshBasicMaterial({
      color: 0xffe9b2,
      toneMapped: false,
    });
    M.flashGlass = new THREE.MeshPhysicalMaterial({
      color: 0xfff2cf,
      metalness: 0.15,
      roughness: 0.22,
      transparent: true,
      opacity: 0.82,
      clearcoat: 1,
      emissive: 0xffd794,
      emissiveIntensity: 0.25,
    });
    M.screenGlow = new THREE.MeshBasicMaterial({
      color: 0x43cfff,
      transparent: true,
      opacity: 0.11,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    M.logo = new THREE.MeshBasicMaterial({
      map: textures.logo,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    M.magSafe = new THREE.MeshBasicMaterial({
      color: 0x8198aa,
      transparent: true,
      opacity: 0.54,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    M.regulatory = new THREE.MeshBasicMaterial({
      map: textures.regulatory,
      transparent: true,
      opacity: 0.68,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });
    M.grille = new THREE.MeshStandardMaterial({
      map: textures.grille,
      metalness: 0.55,
      roughness: 0.42,
      envMapIntensity: 0.9,
    });
    M.rearInner = new THREE.MeshStandardMaterial({
      map: textures.rearInner,
      metalness: 0.34,
      roughness: 0.58,
      envMapIntensity: 0.8,
    });
    M.cameraInner = new THREE.MeshStandardMaterial({
      map: textures.cameraInner,
      metalness: 0.5,
      roughness: 0.46,
      envMapIntensity: 0.9,
    });
    M.coil = standard({
      color: 0xc07b46,
      metalness: 0.9,
      roughness: 0.36,
    });
    M.batteryLabel = standard({
      map: textures.battery,
      roughness: 0.58,
      metalness: 0.18,
      envMapIntensity: 0.7,
    });
    M.pcbLabel = standard({
      map: textures.pcb,
      color: 0xffffff,
      roughness: 0.48,
      metalness: 0.25,
      emissive: 0x08271d,
      emissiveIntensity: 0.42,
      emissiveMap: textures.pcb,
      envMapIntensity: 0.6,
    });
    M.a19 = new THREE.MeshBasicMaterial({
      map: textures.a19,
      toneMapped: false,
    });
    M.a19Frame = standard({
      color: 0x313b45,
      metalness: 0.88,
      roughness: 0.26,
    });
    M.dust = new THREE.MeshBasicMaterial({
      color: 0x8bdfff,
      transparent: true,
      opacity: 0.65,
      toneMapped: false,
    });
  }

  /* --------------------------------------------------------------------------
   * 6. 场景初始化
   * ------------------------------------------------------------------------ */

  function initRenderer() {
    renderer = new THREE.WebGLRenderer({
      canvas: dom.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.24;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04080c, 0.011);

    camera = new THREE.PerspectiveCamera(
      FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(3, 2.4, 8.6);
    camera.lookAt(0, 0, 0);

    clock = new THREE.Clock();
  }

  function initEnvironment() {
    const envTexture = buildEnvironmentTexture();
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;
    envTexture.dispose();
    pmrem.dispose();

    const hemi = new THREE.HemisphereLight(0xaadfff, 0x030509, 1.45);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xf2fbff, 3.1);
    key.position.set(-6, 8, 8);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x63cfff, 1.9);
    fill.position.set(7, 2, 5);
    scene.add(fill);

    const frontFill = new THREE.DirectionalLight(0xb6e8ff, 1.4);
    frontFill.position.set(2, 3, 10);
    scene.add(frontFill);

    const rim = new THREE.PointLight(0x8b6dff, 18, 22, 2);
    rim.position.set(-5, 1, -6);
    scene.add(rim);

    const warm = new THREE.PointLight(0xff9a65, 10, 16, 2);
    warm.position.set(4, -4, 1);
    scene.add(warm);
  }

  let floorGroup = null;
  let floorRing = null;
  let floorRing2 = null;

  function initFloor() {
    floorGroup = new THREE.Group();
    scene.add(floorGroup);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 2.4),
      new THREE.MeshBasicMaterial({
        map: contactShadowTexture,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        toneMapped: false,
      })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -3.045, 0.1);
    floorGroup.add(shadow);

    const grid = new THREE.GridHelper(26, 32, 0x1b6c8d, 0x0a2f40);
    grid.position.y = -3.06;
    grid.material.transparent = true;
    grid.material.opacity = 0.27;
    grid.material.depthWrite = false;
    floorGroup.add(grid);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x49cfff,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
    });

    floorRing = new THREE.Mesh(new THREE.RingGeometry(3.15, 3.17, 128), ringMaterial);
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -3.035;
    floorGroup.add(floorRing);

    floorRing2 = new THREE.Mesh(
      new THREE.RingGeometry(4.0, 4.012, 128),
      ringMaterial.clone()
    );
    floorRing2.material.color.set(0x9b7fff);
    floorRing2.material.opacity = 0.1;
    floorRing2.rotation.x = -Math.PI / 2;
    floorRing2.position.y = -3.033;
    floorGroup.add(floorRing2);

    const cross = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(5.8, 0.001)),
      new THREE.LineBasicMaterial({
        color: 0x3ad4ff,
        transparent: true,
        opacity: 0.11,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    cross.rotation.x = -Math.PI / 2;
    cross.position.y = -3.03;
    floorGroup.add(cross);
  }

  function initParticles() {
    const count = 520;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorA = new THREE.Color(0x64dcff);
    const colorB = new THREE.Color(0x8b77ff);
    for (let i = 0; i < count; i += 1) {
      const radius = 7 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = rand(-1.6, 11.5);
      positions[i * 3 + 2] = Math.sin(angle) * radius - 3;
      const mix = Math.random();
      const color = colorA.clone().lerp(colorB, mix);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({
      size: 0.036,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.48,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const points = new THREE.Points(geometry, material);
    points.name = 'ambientParticles';
    scene.add(points);
  }

  let orbitRingA = null;
  let orbitRingB = null;

  function initOrbits() {
    const ringMaterialA = new THREE.MeshBasicMaterial({
      color: 0x5bdcff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    orbitRingA = new THREE.Mesh(new THREE.TorusGeometry(3.65, 0.005, 5, 180), ringMaterialA);
    orbitRingA.rotation.set(1.22, 0.24, 0.2);
    orbitRingA.position.y = 0.2;
    scene.add(orbitRingA);

    orbitRingB = new THREE.Mesh(
      new THREE.TorusGeometry(4.35, 0.0045, 5, 180),
      ringMaterialA.clone()
    );
    orbitRingB.material.color.set(0x9a7bff);
    orbitRingB.material.opacity = 0.075;
    orbitRingB.rotation.set(0.54, -0.35, 1.05);
    orbitRingB.position.set(0.2, 0.5, -0.4);
    scene.add(orbitRingB);
  }

  /* --------------------------------------------------------------------------
   * 7. 部件构建
   * ------------------------------------------------------------------------ */

  const parts = [];
  const partMap = new Map();

  function createPart(def, builder) {
    const group = new THREE.Group();
    group.position.set(def.base[0], def.base[1], def.base[2]);
    group.userData.partId = def.id;
    group.userData.isPart = true;

    const entry = {
      def,
      id: def.id,
      group,
      base: new THREE.Vector3(def.base[0], def.base[1], def.base[2]),
      desktopOffset: new THREE.Vector3(...def.desktopOffset),
      mobileOffset: new THREE.Vector3(...def.mobileOffset),
      rotation: new THREE.Vector3(...(def.rotation || [0, 0, 0])),
      outlineSelected: null,
      outlineHover: null,
      localCenter: new THREE.Vector3(),
      size: new THREE.Vector3(1, 1, 1),
      anchor: null,
    };

    builder(group, entry);

    const anchor = new THREE.Object3D();
    anchor.position.set(def.anchor[0], def.anchor[1], def.anchor[2]);
    group.add(anchor);
    entry.anchor = anchor;

    device.add(group);
    parts.push(entry);
    partMap.set(def.id, entry);
    return entry;
  }

  function buildCoverGlass() {
    const group = new THREE.Group();
    const mesh = roundedBox(PHONE_W - 0.018, PHONE_H - 0.018, 0.028, PHONE_R - 0.01, M.ceramicGlass, 16);
    mesh.position.z = 0.147;
    mesh.renderOrder = 2;
    group.add(mesh);

    const glare = new THREE.Mesh(
      new THREE.PlaneGeometry(PHONE_W - 0.22, PHONE_H - 0.2),
      M.glare
    );
    glare.position.z = 0.162;
    glare.renderOrder = 4;
    group.add(glare);

    const edge = roundedRectLine(
      PHONE_W - 0.05,
      PHONE_H - 0.05,
      PHONE_R - 0.025,
      0.154,
      new THREE.LineBasicMaterial({
        color: 0xc9f4ff,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    group.add(edge);

    return group;
  }

  function buildDisplay() {
    const group = new THREE.Group();

    const panel = roundedBox(PHONE_W - 0.08, PHONE_H - 0.08, 0.06, PHONE_R - 0.04, M.blackGloss, 16);
    panel.position.z = 0.1;
    group.add(panel);

    const screenWidth = PHONE_W - 0.175;
    const screenHeight = PHONE_H - 0.175;
    const screen = roundedPlane(screenWidth, screenHeight, PHONE_R - 0.07, M.screen, 18);
    screen.position.z = 0.133;
    group.add(screen);

    const innerEdge = roundedRectLine(
      screenWidth - 0.012,
      screenHeight - 0.012,
      PHONE_R - 0.075,
      0.136,
      new THREE.LineBasicMaterial({
        color: 0x6fe9ff,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    group.add(innerEdge);

    // 灵动岛
    const island = roundedBox(0.535, 0.148, 0.018, 0.074, M.blackGloss, 18);
    island.position.set(0, 1.98, 0.142);
    group.add(island);

    const frontCam = cylinderZ(0.032, 0.032, 0.007, 24, M.cameraGlass);
    frontCam.position.set(0.16, 1.98, 0.153);
    group.add(frontCam);

    const frontCamRim = cylinderZ(0.043, 0.043, 0.004, 24, M.aluminumDark);
    frontCamRim.position.set(0.16, 1.98, 0.150);
    group.add(frontCamRim);

    // 隐藏式 Face ID 传感器层（拆开后可见）
    const sensorBar = roundedBox(0.72, 0.12, 0.045, 0.035, M.darkMetal);
    sensorBar.position.set(0, 2.27, -0.005);
    group.add(sensorBar);
    for (let i = 0; i < 4; i += 1) {
      const dot = cylinderZ(0.021, 0.021, 0.012, 16, M.cameraGlass);
      dot.position.set(-0.22 + i * 0.15, 2.27, 0.021);
      group.add(dot);
    }

    // 底部显示排线
    const flexMaterial = new THREE.MeshStandardMaterial({
      color: 0x9b653f,
      metalness: 0.52,
      roughness: 0.48,
      envMapIntensity: 0.8,
    });
    const flex = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.5, 0.018), flexMaterial);
    flex.position.set(0.16, -2.17, 0.035);
    flex.rotation.z = -0.12;
    group.add(flex);

    const connector = roundedBox(0.16, 0.14, 0.026, 0.025, M.gold);
    connector.position.set(0.16, -2.34, 0.035);
    group.add(connector);

    // 屏幕泛光
    const screenLight = new THREE.PointLight(0x2bc2ff, 2.5, 2.5, 2);
    screenLight.position.set(0, 0.6, 0.5);
    group.add(screenLight);

    return group;
  }

  function buildFrame() {
    const group = new THREE.Group();

    const ring = new THREE.Mesh(
      frameRingGeometry(PHONE_W, PHONE_H, PHONE_R, 0.072, PHONE_D),
      M.aluminum
    );
    group.add(ring);

    const innerRim = new THREE.Mesh(
      frameRingGeometry(PHONE_W - 0.105, PHONE_H - 0.105, PHONE_R - 0.052, 0.045, PHONE_D - 0.03),
      M.aluminumDark
    );
    group.add(innerRim);

    // 天线注塑断点
    const antennaPositions = [
      [-PHONE_W / 2 + 0.01, 1.93, 0.028, 0.035],
      [PHONE_W / 2 - 0.01, -1.57, 0.028, 0.035],
      [-PHONE_W / 2 + 0.01, -1.35, 0.028, 0.027],
      [PHONE_W / 2 - 0.01, 1.52, 0.028, 0.027],
    ];
    antennaPositions.forEach(([x, y, z, h]) => {
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.008, h, PHONE_D * 0.84), M.rubber);
      band.position.set(x, y, z);
      group.add(band);
    });

    // 侧边按键
    const addButton = (x, y, w, h, d, material, side) => {
      const button = roundedBox(w, h, d, Math.min(w, d) * 0.42, material, 8);
      button.position.set(x, y, 0);
      group.add(button);
      if (side === 'right') {
        const line = new THREE.Mesh(new THREE.BoxGeometry(0.003, h * 0.7, 0.008), M.aluminumDark);
        line.position.set(x + w * 0.5 + 0.002, y, 0);
        group.add(line);
      }
      return button;
    };

    addButton(-PHONE_W / 2 - 0.018, 0.97, 0.06, 0.3, 0.1, M.aluminum, 'left');
    addButton(-PHONE_W / 2 - 0.018, 0.5, 0.06, 0.41, 0.1, M.aluminum, 'left');
    addButton(-PHONE_W / 2 - 0.018, 0.05, 0.06, 0.41, 0.1, M.aluminum, 'left');
    addButton(PHONE_W / 2 + 0.018, 0.48, 0.06, 0.68, 0.1, M.aluminum, 'right');

    // 相机控制键
    const cameraButton = addButton(PHONE_W / 2 + 0.018, -0.51, 0.068, 0.34, 0.108, M.aluminum, 'right');
    const cameraButtonGlass = roundedBox(0.006, 0.28, 0.078, 0.025, M.sapphire, 8);
    cameraButtonGlass.position.set(PHONE_W / 2 + 0.051, -0.51, 0);
    group.add(cameraButtonGlass);

    // 底部接口与螺丝
    const port = roundedBox(0.33, 0.058, 0.04, 0.028, M.rubber, 8);
    port.position.set(0, -PHONE_H / 2 + 0.018, 0.02);
    group.add(port);

    const portLip = roundedBox(0.38, 0.026, 0.045, 0.014, M.aluminumDark, 6);
    portLip.position.set(0, -PHONE_H / 2 + 0.041, 0.02);
    group.add(portLip);

    for (const x of [-0.7, 0.7]) {
      const screw = cylinderZ(0.026, 0.026, 0.014, 16, M.steel);
      screw.position.set(x, -PHONE_H / 2 + 0.045, 0.087);
      group.add(screw);
      const star = new THREE.Mesh(new THREE.CircleGeometry(0.011, 5), M.rubber);
      star.position.set(x, -PHONE_H / 2 + 0.045, 0.095);
      group.add(star);
    }

    // 内部固定螺丝
    const internalScrews = [
      [-0.94, 1.95],
      [0.94, 1.95],
      [-0.94, -1.94],
      [0.94, -1.94],
    ];
    internalScrews.forEach(([x, y]) => {
      const screw = cylinderZ(0.031, 0.031, 0.018, 16, M.steel);
      screw.position.set(x, y, 0.1);
      group.add(screw);
      const ringScrew = new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.006, 6, 20), M.aluminumDark);
      ringScrew.position.set(x, y, 0.109);
      group.add(ringScrew);
    });

    // 顶部听筒槽
    const earpiece = roundedBox(0.28, 0.025, 0.012, 0.012, M.rubber, 6);
    earpiece.position.set(0, PHONE_H / 2 - 0.085, 0.115);
    group.add(earpiece);

    return group;
  }

  function buildLogicBoard(entry) {
    const group = new THREE.Group();

    const mainBoard = roundedBox(1.02, 1.96, 0.06, 0.05, M.pcb, 10);
    mainBoard.position.set(0.08, -0.02, 0);
    group.add(mainBoard);

    const wing = roundedBox(0.58, 0.52, 0.06, 0.05, M.pcb, 10);
    wing.position.set(-0.4, 0.78, 0);
    group.add(wing);

    // PCB surface artwork
    const pcbSurface = roundedPlane(0.94, 1.88, 0.035, M.pcbLabel, 8);
    pcbSurface.position.set(0.08, -0.02, 0.033);
    group.add(pcbSurface);

    const pcbWing = roundedPlane(0.5, 0.44, 0.03, M.pcbLabel, 8);
    pcbWing.position.set(-0.4, 0.78, 0.033);
    group.add(pcbWing);

    // A19 substrate and die
    const substrate = roundedBox(0.58, 0.58, 0.025, 0.035, M.a19Frame, 8);
    substrate.position.set(0.15, 0.27, 0.042);
    group.add(substrate);

    const chip = roundedBox(0.44, 0.44, 0.058, 0.03, M.a19Frame, 8);
    chip.position.set(0.15, 0.27, 0.078);
    group.add(chip);

    const chipTop = roundedPlane(0.37, 0.37, 0.018, M.a19, 6);
    chipTop.position.set(0.15, 0.27, 0.109);
    group.add(chipTop);

    // 内存堆叠
    const ram = roundedBox(0.29, 0.16, 0.045, 0.02, M.darkMetal, 8);
    ram.position.set(0.15, -0.13, 0.052);
    group.add(ram);
    const ramTop = new THREE.Mesh(
      new THREE.PlaneGeometry(0.23, 0.1),
      new THREE.MeshBasicMaterial({
        color: 0x6d7b88,
        transparent: true,
        opacity: 0.35,
        toneMapped: false,
      })
    );
    ramTop.position.set(0.15, -0.13, 0.076);
    group.add(ramTop);

    // 芯片与屏蔽罩
    const nand = roundedBox(0.33, 0.24, 0.055, 0.02, M.darkMetal, 8);
    nand.position.set(0.36, -0.57, 0.04);
    group.add(nand);

    const modem = roundedBox(0.27, 0.2, 0.05, 0.02, M.a19Frame, 8);
    modem.position.set(-0.18, -0.66, 0.04);
    group.add(modem);

    const shieldA = roundedBox(0.36, 0.28, 0.035, 0.025, M.steel, 8);
    shieldA.position.set(0.34, 0.74, 0.036);
    group.add(shieldA);

    const shieldB = roundedBox(0.25, 0.32, 0.032, 0.022, M.steel, 8);
    shieldB.position.set(-0.28, 0.23, 0.036);
    group.add(shieldB);

    const shieldC = roundedBox(0.31, 0.2, 0.035, 0.02, M.steel, 8);
    shieldC.position.set(0.3, -0.93, 0.036);
    group.add(shieldC);

    // 电感与阻容
    let boardSeed = 424242;
    const br = () => {
      boardSeed = (boardSeed * 1664525 + 1013904223) >>> 0;
      return boardSeed / 4294967296;
    };
    const smallParts = [];
    for (let i = 0; i < 30; i += 1) {
      const x = -0.32 + br() * 0.88;
      const y = -0.92 + br() * 1.92;
      if (Math.abs(x - 0.15) < 0.32 && Math.abs(y - 0.27) < 0.32) continue;
      if (x < -0.25) continue;
      const w = 0.025 + br() * 0.035;
      const h = 0.018 + br() * 0.025;
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, 0.015 + br() * 0.012),
        br() > 0.5 ? M.aluminumDark : M.gold
      );
      cap.position.set(x, y, 0.047);
      cap.userData.noOutline = true;
      group.add(cap);
      smallParts.push(cap);
    }
    for (let i = 0; i < 9; i += 1) {
      const x = -0.3 + br() * 0.84;
      const y = -0.85 + br() * 1.8;
      const coil = cylinderZ(0.032, 0.032, 0.02, 16, M.darkMetal);
      coil.position.set(x, y, 0.045);
      coil.userData.noOutline = true;
      group.add(coil);
    }

    // 电池 / 屏幕连接器
    const connector = roundedBox(0.2, 0.09, 0.022, 0.015, M.gold, 6);
    connector.position.set(0.06, -0.98, 0.044);
    group.add(connector);

    const boardScrew1 = cylinderZ(0.025, 0.025, 0.012, 12, M.steel);
    boardScrew1.position.set(-0.38, -1.03, 0.045);
    group.add(boardScrew1);
    const boardScrew2 = boardScrew1.clone();
    boardScrew2.position.set(0.5, -1.0, 0.045);
    group.add(boardScrew2);

    // 短排线
    const flex = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.012), M.copper);
    flex.position.set(0.1, -1.24, 0.035);
    flex.rotation.x = -0.22;
    group.add(flex);

    entry.board = group;
    return group;
  }

  function buildBattery() {
    const group = new THREE.Group();

    const main = roundedBox(1.74, 1.98, 0.16, 0.1, M.batteryWrap, 10);
    main.position.set(0, -0.32, 0);
    group.add(main);

    const shoulder = roundedBox(0.92, 0.54, 0.16, 0.08, M.batteryWrap, 10);
    shoulder.position.set(-0.33, 0.77, 0);
    group.add(shoulder);

    // 主标签
    const label = roundedPlane(1.66, 1.9, 0.08, M.batteryLabel, 10);
    label.position.set(0, -0.32, 0.083);
    group.add(label);

    // 肩部微标
    const shoulderLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.78, 0.26),
      new THREE.MeshBasicMaterial({
        color: 0xc6d7df,
        transparent: true,
        opacity: 0.13,
        toneMapped: false,
      })
    );
    shoulderLabel.position.set(-0.33, 0.77, 0.083);
    group.add(shoulderLabel);

    // 电芯分隔
    for (let i = 0; i < 3; i += 1) {
      const divider = new THREE.Mesh(
        new THREE.BoxGeometry(1.62, 0.008, 0.004),
        M.darkMetal
      );
      divider.position.set(0, -0.83 + i * 0.48, 0.086);
      group.add(divider);
    }

    // 顶部保护电路
    const bms = roundedBox(0.62, 0.2, 0.06, 0.035, M.pcb, 8);
    bms.position.set(0.48, 0.97, 0.03);
    group.add(bms);
    const bmsConnector = roundedBox(0.28, 0.09, 0.024, 0.015, M.gold, 6);
    bmsConnector.position.set(0.48, 1.09, 0.06);
    group.add(bmsConnector);

    // 拉手胶条
    for (const x of [-0.38, 0.38]) {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.38, 0.012), M.rubber);
      tab.position.set(x, -1.38, 0.08);
      tab.rotation.x = 0.18;
      group.add(tab);
    }

    return group;
  }

  function addCameraLens(group, x, y, radius) {
    const outer = cylinderZ(radius, radius, 0.1, 48, M.aluminum);
    outer.position.set(x, y, -0.18);
    group.add(outer);

    const outerLip = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.9, 0.018, 10, 48),
      M.aluminumBright
    );
    outerLip.position.set(x, y, -0.231);
    group.add(outerLip);

    const barrel = cylinderZ(radius * 0.8, radius * 0.8, 0.11, 48, M.darkMetal);
    barrel.position.set(x, y, -0.224);
    group.add(barrel);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.63, 0.012, 8, 40),
      M.aluminumDark
    );
    ring1.position.set(x, y, -0.281);
    group.add(ring1);

    const glass = cylinderZ(radius * 0.58, radius * 0.58, 0.018, 48, M.cameraGlass);
    glass.position.set(x, y, -0.291);
    group.add(glass);

    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(radius * 0.36, 0.009, 8, 36),
      M.titanium
    );
    innerRing.position.set(x, y, -0.302);
    group.add(innerRing);

    const pupil = cylinderZ(radius * 0.2, radius * 0.2, 0.01, 32, M.blackGloss);
    pupil.position.set(x, y, -0.311);
    group.add(pupil);

    const glint = new THREE.Mesh(
      new THREE.CircleGeometry(radius * 0.21, 24),
      new THREE.MeshBasicMaterial({
        color: 0xa7efff,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      })
    );
    glint.position.set(x - radius * 0.16, y + radius * 0.14, -0.318);
    group.add(glint);
  }

  function buildCamera() {
    const group = new THREE.Group();

    /* ── iPhone 17 标准版：竖向药丸形模组 ──
       按真机比例换算（机身宽 71.5mm 对应 2.36 单位）：
       药丸 26 × 50mm → 0.86 × 1.66；镜头外环 13mm → 半径 0.205
       圆角 = 半宽 → 完全胶囊；标准版没有 LiDAR */
    const PW = 0.86;
    const PH = 1.66;
    const PR = PW / 2;

    const plate = roundedBox(PW, PH, 0.11, PR, M.aluminum, 20);
    plate.position.z = -0.025;
    group.add(plate);

    const plateau = roundedBox(PW - 0.09, PH - 0.09, 0.13, (PW - 0.09) / 2, M.rearGlass, 20);
    plateau.position.z = -0.09;
    group.add(plateau);

    // 模组边缘高光
    const rim = roundedRectLine(
      PW - 0.09,
      PH - 0.09,
      (PW - 0.09) / 2 - 0.012,
      -0.156,
      new THREE.LineBasicMaterial({
        color: 0xbfe9ff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    group.add(rim);

    // 两枚 4800 万镜头，上下居中排列
    addCameraLens(group, 0, 0.40, 0.205);
    addCameraLens(group, 0, -0.40, 0.205);

    // 闪光灯 —— 药丸外侧右上
    const flashBody = cylinderZ(0.092, 0.092, 0.055, 32, M.aluminumDark);
    flashBody.position.set(0.62, 0.50, -0.15);
    group.add(flashBody);
    const flashRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.084, 0.01, 8, 32),
      M.titanium
    );
    flashRing.position.set(0.62, 0.50, -0.181);
    group.add(flashRing);
    const flash = cylinderZ(0.068, 0.068, 0.02, 32, M.flashGlass);
    flash.position.set(0.62, 0.50, -0.189);
    group.add(flash);

    // 麦克风 —— 药丸外侧右下（标准版没有 LiDAR）
    const micRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.036, 0.008, 6, 20),
      M.aluminumDark
    );
    micRing.position.set(0.62, -0.50, -0.163);
    group.add(micRing);
    const mic = cylinderZ(0.025, 0.025, 0.01, 16, M.rubber);
    mic.position.set(0.62, -0.50, -0.16);
    group.add(mic);

    // 模组内侧屏蔽罩与排线（拆解后从正面可见）
    const innerShield = roundedPlane(0.74, 1.52, 0.37, M.cameraInner, 16);
    innerShield.position.set(0, 0, 0.038);
    group.add(innerShield);
    const innerScrewPositions = [
      [-0.28, 0.64],
      [0.28, 0.64],
      [-0.28, -0.64],
      [0.28, -0.64],
    ];
    innerScrewPositions.forEach(([x, y]) => {
      const screw = cylinderZ(0.024, 0.024, 0.012, 14, M.steel);
      screw.position.set(x, y, 0.048);
      group.add(screw);
    });
    const cameraFlex = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.13, 0.012), M.copper);
    cameraFlex.position.set(-0.16, -0.54, 0.035);
    cameraFlex.rotation.z = -0.08;
    group.add(cameraFlex);

    return group;
  }

  function buildRearGlass() {
    const group = new THREE.Group();

    const glass = roundedBox(PHONE_W - 0.04, PHONE_H - 0.04, 0.045, PHONE_R - 0.02, M.rearGlass, 16);
    group.add(glass);

    // Apple logo（经过镜像补偿，确保从背面观看方向正确）
    const logoMap = textures.logo.clone();
    logoMap.needsUpdate = true;
    logoMap.wrapS = THREE.RepeatWrapping;
    logoMap.repeat.x = -1;
    logoMap.offset.x = 1;
    const logo = new THREE.Mesh(
      new THREE.PlaneGeometry(0.58, 0.72),
      new THREE.MeshBasicMaterial({
        map: logoMap,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      })
    );
    logo.rotation.y = Math.PI;
    logo.position.set(0, 0.08, -0.03);
    group.add(logo);

    // 背板内侧石墨内衬 / MagSafe 结构
    const innerLiner = roundedPlane(2.24, 4.72, 0.42, M.rearInner, 14);
    innerLiner.position.set(0, 0, 0.027);
    group.add(innerLiner);

    // 内侧磁体与线圈
    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2;
      const magnet = new THREE.Mesh(
        new THREE.BoxGeometry(0.065, 0.12, 0.01),
        M.aluminumDark
      );
      magnet.position.set(
        Math.cos(angle) * 0.5,
        -0.15 + Math.sin(angle) * 0.5,
        0.036
      );
      magnet.rotation.z = angle;
      group.add(magnet);
    }
    const innerCoil = new THREE.Mesh(
      new THREE.TorusGeometry(0.46, 0.006, 5, 96),
      M.copper
    );
    innerCoil.position.set(0, -0.15, 0.039);
    group.add(innerCoil);

    // MagSafe 外环
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.59, 0.605, 96), M.magSafe);
    ring.rotation.y = Math.PI;
    ring.position.set(0, -0.15, -0.031);
    group.add(ring);

    const innerRing = new THREE.Mesh(new THREE.RingGeometry(0.235, 0.245, 64), M.magSafe);
    innerRing.rotation.y = Math.PI;
    innerRing.position.set(0, -0.15, -0.031);
    group.add(innerRing);

    // 16 颗磁体
    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2;
      const magnet = new THREE.Mesh(
        new THREE.BoxGeometry(0.07, 0.13, 0.012),
        M.aluminumDark
      );
      magnet.position.set(
        Math.cos(angle) * 0.5,
        -0.15 + Math.sin(angle) * 0.5,
        -0.032
      );
      magnet.rotation.z = angle;
      group.add(magnet);
    }

    // 充电线圈走线
    const coil = new THREE.Mesh(
      new THREE.TorusGeometry(0.46, 0.008, 5, 96),
      M.copper
    );
    coil.position.set(0, -0.15, -0.033);
    group.add(coil);

    // 法规丝印
    const regMap = textures.regulatory.clone();
    regMap.needsUpdate = true;
    regMap.wrapS = THREE.RepeatWrapping;
    regMap.repeat.x = -1;
    regMap.offset.x = 1;
    const regulatory = new THREE.Mesh(
      new THREE.PlaneGeometry(1.36, 0.24),
      new THREE.MeshBasicMaterial({
        map: regMap,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        side: THREE.DoubleSide,
        toneMapped: false,
      })
    );
    regulatory.rotation.y = Math.PI;
    regulatory.position.set(0, -2.13, -0.031);
    group.add(regulatory);

    // 背板高光
    const glare = new THREE.Mesh(
      new THREE.PlaneGeometry(PHONE_W - 0.25, PHONE_H - 0.3),
      M.rearGlare
    );
    glare.rotation.y = Math.PI;
    glare.position.z = -0.034;
    group.add(glare);

    return group;
  }

  function buildHaptic() {
    const group = new THREE.Group();

    const housing = roundedBox(0.54, 0.32, 0.13, 0.07, M.aluminum, 10);
    group.add(housing);

    const core = cylinderZ(0.09, 0.09, 0.055, 32, M.darkMetal);
    core.position.z = 0.078;
    group.add(core);

    const coil = new THREE.Mesh(
      new THREE.TorusGeometry(0.148, 0.032, 10, 40),
      M.copper
    );
    coil.position.z = 0.07;
    group.add(coil);

    const bracket = roundedBox(0.16, 0.1, 0.022, 0.02, M.steel, 6);
    bracket.position.set(0.32, 0.08, 0);
    group.add(bracket);

    const flex = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.07, 0.012), M.gold);
    flex.position.set(0.43, 0.08, 0.015);
    flex.rotation.z = -0.1;
    group.add(flex);

    for (const x of [-0.22, 0.22]) {
      const screw = cylinderZ(0.018, 0.018, 0.01, 12, M.steel);
      screw.position.set(x, 0.12, 0.071);
      group.add(screw);
    }

    return group;
  }

  function buildSpeaker() {
    const group = new THREE.Group();

    const housing = roundedBox(0.56, 0.28, 0.12, 0.055, M.darkMetal, 10);
    group.add(housing);

    const grille = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.23),
      M.grille
    );
    grille.position.z = 0.062;
    group.add(grille);

    const diaphragm = new THREE.Mesh(
      new THREE.TorusGeometry(0.095, 0.024, 8, 32),
      M.copper
    );
    diaphragm.position.set(0, 0, 0.068);
    group.add(diaphragm);

    const dome = cylinderZ(0.062, 0.062, 0.018, 24, M.blackGloss);
    dome.position.z = 0.075;
    group.add(dome);

    const flex = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.055, 0.012), M.copper);
    flex.position.set(0.22, 0.05, 0);
    group.add(flex);

    return group;
  }

  function buildDevice() {
    device = new THREE.Group();
    device.name = 'iPhone17';
    scene.add(device);

    createPart(PART_DEFS[0], (group) => group.add(buildCoverGlass()));
    createPart(PART_DEFS[1], (group) => group.add(buildDisplay()));
    createPart(PART_DEFS[2], (group) => group.add(buildFrame()));
    createPart(PART_DEFS[3], (group, entry) => group.add(buildLogicBoard(entry)));
    createPart(PART_DEFS[4], (group) => group.add(buildBattery()));
    createPart(PART_DEFS[5], (group) => group.add(buildCamera()));
    createPart(PART_DEFS[6], (group) => group.add(buildRearGlass()));
    createPart(PART_DEFS[7], (group) => group.add(buildHaptic()));
    createPart(PART_DEFS[8], (group) => group.add(buildSpeaker()));

    computePartBounds();

    let meshCount = 0;
    device.traverse((object) => {
      if (object.isMesh) meshCount += 1;
    });
    dom.meshValue.textContent = String(meshCount).padStart(3, '0');
  }

  function computePartBounds() {
    device.updateMatrixWorld(true);
    const box = new THREE.Box3();
    const worldCenter = new THREE.Vector3();
    for (const entry of parts) {
      box.setFromObject(entry.group);
      box.getCenter(worldCenter);
      entry.localCenter.copy(entry.group.worldToLocal(worldCenter.clone()));
      box.getSize(entry.size);
    }
  }

  /* --------------------------------------------------------------------------
   * 8. 选中 / 悬停辉光
   * ------------------------------------------------------------------------ */

  let selectionGroup = null;
  let selectedGlow = null;
  let hoverGlow = null;
  let selectedLight = null;
  let hoverLight = null;

  function initSelectionEffects() {
    selectionGroup = new THREE.Group();
    selectionGroup.renderOrder = 6;
    scene.add(selectionGroup);

    selectedGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x63e6ff,
        transparent: true,
        opacity: 0.24,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
        toneMapped: false,
      })
    );
    selectedGlow.scale.set(3, 3, 1);
    selectedGlow.visible = false;
    selectionGroup.add(selectedGlow);

    hoverGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.11,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
        toneMapped: false,
      })
    );
    hoverGlow.scale.set(2.2, 2.2, 1);
    hoverGlow.visible = false;
    selectionGroup.add(hoverGlow);

    selectedLight = new THREE.PointLight(0x63e6ff, 0, 3.2, 2);
    selectionGroup.add(selectedLight);

    hoverLight = new THREE.PointLight(0xffffff, 0, 2.6, 2);
    selectionGroup.add(hoverLight);
  }

  function ensureOutline(entry, kind) {
    const property = kind === 'selected' ? 'outlineSelected' : 'outlineHover';
    if (entry[property]) return entry[property];

    const isSelected = kind === 'selected';
    const color = isSelected
      ? new THREE.Color(entry.def.accent).getHex()
      : 0xcaf6ff;
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: isSelected ? 0.88 : 0.46,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });

    const lines = [];
    entry.group.traverse((object) => {
      if (!object.isMesh || !object.geometry || object.userData.noOutline) return;
      if (!object.geometry.boundingSphere) object.geometry.computeBoundingSphere();
      if (object.geometry.boundingSphere && object.geometry.boundingSphere.radius < 0.028) return;
      if (object.geometry.attributes.position && object.geometry.attributes.position.count > 30000) return;

      let edges;
      try {
        edges = new THREE.EdgesGeometry(object.geometry, 32);
      } catch (error) {
        return;
      }
      const line = new THREE.LineSegments(edges, material);
      line.scale.setScalar(1.0035);
      line.raycast = () => {};
      line.renderOrder = 5;
      line.userData.isOutline = true;
      line.visible = false;
      object.add(line);
      lines.push(line);
    });

    entry[property] = lines;
    return lines;
  }

  function setOutlineVisible(entry, kind, visible) {
    if (!entry) return;
    const lines = ensureOutline(entry, kind);
    for (const line of lines) line.visible = visible;
  }

  let previousSelectedEntry = null;
  let previousHoverEntry = null;

  function updateSelectionVisuals() {
    const selectedEntry = state.selected ? partMap.get(state.selected) : null;
    if (previousSelectedEntry && previousSelectedEntry !== selectedEntry) {
      setOutlineVisible(previousSelectedEntry, 'selected', false);
    }
    if (selectedEntry) {
      setOutlineVisible(selectedEntry, 'selected', true);
      selectedGlow.visible = true;
      selectedGlow.material.color.set(selectedEntry.def.accent);
      selectedLight.color.set(selectedEntry.def.accent);
      selectedLight.intensity = 3.4;
      const worldCenter = selectedEntry.group.localToWorld(selectedEntry.localCenter.clone());
      const scale = Math.max(selectedEntry.size.x, selectedEntry.size.y, 1.1) * 1.55;
      selectedGlow.position.copy(worldCenter);
      selectedGlow.scale.set(scale, scale, 1);
      selectedLight.position.copy(worldCenter).add(new THREE.Vector3(0, 0, 0.55));
    } else {
      selectedGlow.visible = false;
      selectedLight.intensity = 0;
    }
    previousSelectedEntry = selectedEntry;

    const hoverEntry = state.hovered ? partMap.get(state.hovered) : null;
    if (previousHoverEntry && previousHoverEntry !== hoverEntry) {
      setOutlineVisible(previousHoverEntry, 'hover', false);
      if (previousHoverEntry === selectedEntry) {
        setOutlineVisible(previousHoverEntry, 'selected', true);
      }
    }
    if (hoverEntry) {
      setOutlineVisible(hoverEntry, 'hover', true);
      hoverGlow.visible = true;
      hoverGlow.material.opacity = 0.1;
      const worldCenter = hoverEntry.group.localToWorld(hoverEntry.localCenter.clone());
      const scale = Math.max(hoverEntry.size.x, hoverEntry.size.y, 0.8) * 1.35;
      hoverGlow.position.copy(worldCenter);
      hoverGlow.scale.set(scale, scale, 1);
      hoverLight.position.copy(worldCenter).add(new THREE.Vector3(0, 0, 0.35));
      hoverLight.intensity = 1.4;
    } else {
      hoverGlow.visible = false;
      hoverLight.intensity = 0;
    }
    previousHoverEntry = hoverEntry;
  }

  /* --------------------------------------------------------------------------
   * 9. 相机与视角
   * ------------------------------------------------------------------------ */

  const cam = {
    theta: 0.37,
    targetTheta: 0.37,
    phi: 1.32,
    targetPhi: 1.32,
    radius: 9.4,
    targetRadius: 9.4,
    zoom: 1,
    target: new THREE.Vector3(0, 0.05, 0),
  };

  function fitDistance() {
    const compact = isCompact();
    let distance = state.exploded ? (compact ? 14.2 : 13.0) : (compact ? 10.15 : 9.45);
    if (window.innerHeight < 620) distance *= 1.16;
    return distance;
  }

  function updateCameraFit() {
    cam.targetRadius = fitDistance() * cam.zoom;
  }

  function setView(face, notify = false) {
    const back = face === 'back';
    const edgeAngle = state.exploded ? (isCompact() ? 0.92 : 0.64) : 0.37;
    cam.targetTheta = back ? Math.PI - edgeAngle : edgeAngle;
    cam.targetPhi = clamp(cam.targetPhi, 0.95, 1.7);
    state.back = back;
    updateViewUI();
    if (notify) {
      showToast(back ? '视角切换 · 机身背面' : '视角切换 · 机身正面');
    }
  }

  function normalizeAngle(angle) {
    const twoPi = Math.PI * 2;
    return ((angle % twoPi) + twoPi) % twoPi;
  }

  function dampAngle(current, target, lambda, dt) {
    let diff = target - current;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    return current + diff * (1 - Math.exp(-lambda * dt));
  }

  function updateCamera(dt) {
    const isFront = Math.cos(cam.theta) > 0;
    state.back = !isFront;

    if (state.autoRotate && !state.dragging) {
      cam.targetTheta += dt * 0.165;
    }
    cam.theta = dampAngle(cam.theta, cam.targetTheta, state.dragging ? 11 : 6.2, dt);
    cam.phi = damp(cam.phi, cam.targetPhi, 7, dt);
    cam.radius = damp(cam.radius, cam.targetRadius, 4.2, dt);

    if (state.autoRotate) {
      cam.targetTheta = normalizeAngle(cam.targetTheta);
    }

    const sinPhi = Math.sin(cam.phi);
    camera.position.set(
      cam.radius * sinPhi * Math.sin(cam.theta) + cam.target.x,
      cam.radius * Math.cos(cam.phi) + cam.target.y,
      cam.radius * sinPhi * Math.cos(cam.theta) + cam.target.z
    );
    camera.lookAt(cam.target);
    camera.updateMatrixWorld();
  }

  function resetCamera() {
    cam.zoom = 1;
    cam.targetTheta = 0.37;
    cam.targetPhi = 1.32;
    cam.theta = 0.37;
    cam.phi = 1.32;
    cam.target.set(0, 0.05, 0);
    cam.targetRadius = fitDistance();
    cam.radius = cam.targetRadius;
    state.autoRotate = false;
    state.back = false;
    updateCameraFit();
    updateViewUI();
    updateRotationUI();
  }

  /* --------------------------------------------------------------------------
   * 10. 拆解动画
   * ------------------------------------------------------------------------ */

  let explodeValue = 0;

  function updateExplode(dt) {
    const target = state.exploded ? 1 : 0;
    explodeValue = damp(explodeValue, target, 3.1, dt);
    if (Math.abs(explodeValue - target) < 0.001) explodeValue = target;

    const compact = isCompact();
    const tempOffset = new THREE.Vector3();

    for (let i = 0; i < parts.length; i += 1) {
      const entry = parts[i];
      const delay = i * 0.038;
      let local = clamp((explodeValue - delay) / Math.max(0.001, 0.72 - delay), 0, 1);
      local = smoothstep(local);
      const offset = compact ? entry.mobileOffset : entry.desktopOffset;
      tempOffset.copy(offset).multiplyScalar(local);
      entry.group.position.copy(entry.base).add(tempOffset);
      entry.group.rotation.set(
        entry.rotation.x * local,
        entry.rotation.y * local,
        entry.rotation.z * local
      );
    }

    const float = Math.sin(clock.elapsedTime * 0.7) * 0.025;
    device.position.y = float - explodeValue * 0.08;
    device.updateMatrixWorld(true);
  }

  /* --------------------------------------------------------------------------
   * 11. 标注系统
   * ------------------------------------------------------------------------ */

  const annotations = [];

  function initAnnotations() {
    const svgNS = 'http://www.w3.org/2000/svg';
    for (const def of PART_DEFS) {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('class', 'leader-path');
      path.setAttribute('stroke', def.accent);
      dom.leaderSvg.appendChild(path);

      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('class', 'leader-dot');
      dot.setAttribute('r', '2.5');
      dot.setAttribute('fill', def.accent);
      dot.setAttribute('stroke', def.accent);
      dom.leaderSvg.appendChild(dot);

      const pulse = document.createElementNS(svgNS, 'circle');
      pulse.setAttribute('class', 'leader-dot__pulse');
      pulse.setAttribute('r', '3');
      pulse.setAttribute('stroke', def.accent);
      pulse.setAttribute('fill', 'none');
      dom.leaderSvg.appendChild(pulse);

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'anno-card';
      card.dataset.part = def.id;
      card.style.setProperty('--anno-accent', def.accent);
      card.innerHTML = `
        <span class="anno-card__head">
          <span class="anno-card__dot"></span>
          <span class="anno-card__index">PART ${def.no} / ${String(TOTAL_PARTS).padStart(2, '0')}</span>
        </span>
        <span class="anno-card__name">${escapeHTML(def.name)}</span>
        <span class="anno-card__meta">${escapeHTML(def.labelMetric)}</span>
      `;
      card.addEventListener('click', (event) => {
        event.stopPropagation();
        selectPart(def.id, true);
      });
      dom.annotationLayer.appendChild(card);

      annotations.push({ def, path, dot, pulse, card });
    }
  }

  function hideAnnotation(annotation) {
    annotation.card.classList.remove('is-visible', 'is-selected');
    annotation.path.classList.remove('is-visible');
    annotation.dot.classList.remove('is-visible');
    annotation.pulse.classList.remove('is-visible');
  }

  function updateAnnotations() {
    const sheetOpen = isSheetLayout() &&
      (dom.partsPanel.classList.contains('is-open') || dom.inspectorPanel.classList.contains('is-open'));
    if (!state.labels || sheetOpen) {
      annotations.forEach(hideAnnotation);
      return;
    }

    const compact = isCompact();
    const sheet = isSheetLayout();
    const frontView = Math.cos(cam.theta) > 0.04;
    const cardWidth = window.innerWidth <= 680 ? 140 : window.innerWidth <= 980 ? 154 : 174;
    const cardHeight = 47;
    const marginX = compact ? 12 : 24;
    const leftPanelSafe = sheet ? 12 : 36 + 286 + 16;
    const rightPanelSafe = sheet ? window.innerWidth - 12 : window.innerWidth - 36 - 322 - 16;
    const minY = compact ? 88 : 100;
    const maxY = window.innerHeight - (compact ? 74 : 104);
    const showAllLabels = state.exploded && explodeValue > 0.45 && !compact && window.innerWidth >= 1180 && window.innerHeight >= 680;
    const candidates = new Map();
    candidates.set(-1, []);
    candidates.set(1, []);

    const temp = new THREE.Vector3();

    for (const annotation of annotations) {
      const entry = partMap.get(annotation.def.id);
      const isSelected = state.selected === annotation.def.id;
      const isHovered = state.hovered === annotation.def.id;
      let visible = isSelected || isHovered || showAllLabels;

      const face = annotation.def.face;
      if (visible && face === 'back' && !frontView) {
        // 背面部件的标注仅在背面视角出现
      } else if (visible && face === 'back' && frontView) {
        visible = false;
      }
      if (visible && face === 'front' && !frontView && !isSelected) {
        visible = false;
      }
      if (!visible) {
        hideAnnotation(annotation);
        continue;
      }

      entry.anchor.getWorldPosition(temp);
      temp.project(camera);
      if (temp.z > 1 || temp.z < -1) {
        hideAnnotation(annotation);
        continue;
      }

      const x = (temp.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-temp.y * 0.5 + 0.5) * window.innerHeight;

      if (x < -80 || x > window.innerWidth + 80 || y < -80 || y > window.innerHeight + 80) {
        hideAnnotation(annotation);
        continue;
      }

      let side = annotation.def.labelSide === 'left' ? -1 : 1;
      const gap = compact ? 25 : 34;
      const minCardX = sheet ? marginX : leftPanelSafe;
      const maxCardX = sheet ? window.innerWidth - marginX : rightPanelSafe;
      if (side === -1 && x - gap - cardWidth < minCardX) side = 1;
      if (side === 1 && x + gap + cardWidth > maxCardX) side = -1;
      if (side === -1 && x - gap - cardWidth < minCardX) side = 1;

      const item = {
        annotation,
        x,
        y,
        side,
        selected: isSelected,
        desiredY: y + (annotation.def.labelShift || 0),
      };
      candidates.get(side).push(item);
    }

    const placeSide = (items) => {
      if (!items.length) return;
      items.sort((a, b) => a.desiredY - b.desiredY);
      let cursor = minY;
      for (const item of items) {
        const targetCenter = clamp(item.desiredY, minY + cardHeight / 2, maxY - cardHeight / 2);
        const center = Math.max(targetCenter, cursor + cardHeight / 2);
        item.cardY = clamp(center, minY + cardHeight / 2, maxY - cardHeight / 2);
        cursor = item.cardY + cardHeight / 2 + 6;
      }
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const gap = compact ? 25 : 34;
        const cardX = item.side === 1
          ? item.x + gap
          : item.x - gap - cardWidth;
        const minCardX = sheet ? marginX : leftPanelSafe;
        const maxCardX = sheet ? window.innerWidth - marginX - cardWidth : rightPanelSafe - cardWidth;
        const clampedX = clamp(cardX, minCardX, Math.max(minCardX, maxCardX));
        item.cardX = clampedX;
        item.cardTop = item.cardY - cardHeight / 2;
        item.cardCenterY = item.cardY;

        const { annotation } = item;
        annotation.path.setAttribute(
          'd',
          `M ${item.x.toFixed(1)} ${item.y.toFixed(1)} L ${(item.x + item.side * 16).toFixed(1)} ${item.y.toFixed(1)} L ${(item.x + item.side * 16).toFixed(1)} ${item.cardY.toFixed(1)} L ${(item.side === 1 ? clampedX : clampedX + cardWidth).toFixed(1)} ${item.cardY.toFixed(1)}`
        );
        annotation.path.classList.add('is-visible');
        annotation.path.setAttribute('stroke', annotation.def.accent);

        for (const circle of [annotation.dot, annotation.pulse]) {
          circle.setAttribute('cx', item.x.toFixed(1));
          circle.setAttribute('cy', item.y.toFixed(1));
          circle.setAttribute('stroke', annotation.def.accent);
        }
        annotation.dot.setAttribute('fill', annotation.def.accent);
        annotation.dot.classList.add('is-visible');
        annotation.pulse.classList.add('is-visible');

        annotation.card.style.transform = `translate3d(${item.cardX.toFixed(1)}px, ${item.cardTop.toFixed(1)}px, 0)`;
        annotation.card.classList.toggle('is-selected', item.selected);
        annotation.card.classList.add('is-visible');
      }
    };

    placeSide(candidates.get(-1));
    placeSide(candidates.get(1));
  }

  /* --------------------------------------------------------------------------
   * 12. UI 渲染
   * ------------------------------------------------------------------------ */

  function buildPartsList() {
    dom.partCount.textContent = String(TOTAL_PARTS).padStart(2, '0');
    for (const def of PART_DEFS) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'part-row';
      button.dataset.part = def.id;
      button.style.setProperty('--part-accent', def.accent);
      button.innerHTML = `
        <span class="part-row__index">${def.no}</span>
        <span class="part-row__copy">
          <strong><i></i>${escapeHTML(def.name)}</strong>
          <small>${escapeHTML(def.metric)}</small>
        </span>
        <span class="part-row__arrow">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>
        </span>
      `;
      button.addEventListener('click', () => selectPart(def.id, true));
      dom.partsList.appendChild(button);
    }
  }

  function overviewMarkup() {
    return `
      <div class="empty-state">
        <div class="empty-state__visual">
          <span class="empty-state__orbit"></span>
          <span class="empty-state__sweep"></span>
          <span class="empty-state__device"></span>
        </div>
        <h3>整机概览</h3>
        <p>选择任意部件，或直接点击三维模型。<br>结构会在视野中展开，并显示对应技术参数。</p>
        <div class="overview-grid">
          <div class="overview-stat"><span>WEIGHT</span><b>177<small>g</small></b></div>
          <div class="overview-stat"><span>THICKNESS</span><b>7.95<small>mm</small></b></div>
          <div class="overview-stat"><span>CHIP</span><b>A19<small>3nm</small></b></div>
          <div class="overview-stat"><span>PROTECTION</span><b>IP68</b></div>
        </div>
        <div class="empty-state__hint">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><circle cx="12" cy="12" r="5"/></svg>
          <span>提示：拆解状态下使用鼠标拖动或双指滑动，可从背面检查相机模组与 MagSafe 磁吸阵列。</span>
        </div>
      </div>
    `;
  }

  function renderInspector() {
    const def = state.selected ? PART_DEFS.find((part) => part.id === state.selected) : null;
    dom.inspectorIndex.textContent = `${def ? def.no : '00'} / ${String(TOTAL_PARTS).padStart(2, '0')}`;

    if (!def) {
      dom.inspectorBody.innerHTML = overviewMarkup();
      return;
    }

    dom.inspectorBody.innerHTML = `
      <div class="part-hero" style="--part-accent:${def.accent}">
        <div class="part-hero__top">
          <span class="part-hero__badge"><i></i>PART ${def.no} / ${String(TOTAL_PARTS).padStart(2, '0')}</span>
          <span class="part-hero__glyph">${def.no}</span>
        </div>
        <h3>${escapeHTML(def.name)}</h3>
        <p class="part-en">${escapeHTML(def.en)}</p>
        <p class="part-desc">${escapeHTML(def.desc)}</p>
      </div>
      <div class="section-label">SPECIFICATIONS</div>
      <div class="spec-list">
        ${def.specs.map(([label, value]) => `
          <div class="spec-row"><span>${escapeHTML(label)}</span><b>${escapeHTML(value)}</b></div>
        `).join('')}
      </div>
      <div class="tag-row">
        ${def.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join('')}
      </div>
      <div class="tech-note" style="--part-accent:${def.accent}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/></svg>
        <span>${escapeHTML(def.note)}</span>
      </div>
      <div class="inspector-actions">
        <button type="button" id="focusPartBtn" style="--part-accent:${def.accent}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
          定位部件
        </button>
        <button type="button" id="clearPartBtn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
          取消高亮
        </button>
      </div>
    `;

    const focusBtn = dom.inspectorBody.querySelector('#focusPartBtn');
    const clearBtn = dom.inspectorBody.querySelector('#clearPartBtn');
    if (focusBtn) focusBtn.addEventListener('click', () => focusPart(def.id));
    if (clearBtn) clearBtn.addEventListener('click', () => clearSelection(true));
  }

  function updateRows() {
    const rows = dom.partsList.querySelectorAll('.part-row');
    rows.forEach((row) => {
      row.classList.toggle('is-selected', row.dataset.part === state.selected);
      row.setAttribute('aria-current', row.dataset.part === state.selected ? 'true' : 'false');
    });
  }

  function updateExplodeUI() {
    dom.explodeBtn.classList.toggle('is-active', state.exploded);
    dom.explodeBtn.setAttribute('aria-pressed', String(state.exploded));
    dom.explodeLabel.textContent = state.exploded ? '合拢复位' : '一键拆解';
    const small = dom.explodeBtn.querySelector('.tool-btn__copy small');
    if (small) small.textContent = state.exploded ? 'ASSEMBLED VIEW' : 'EXPLODE VIEW';
    dom.statusDot.classList.toggle('is-active', state.exploded);
    dom.systemState.textContent = state.exploded ? 'TEARDOWN ACTIVE' : 'SYSTEM READY';
  }

  function updateViewUI() {
    const back = Math.cos(cam.targetTheta) < 0;
    state.back = back;
    dom.viewLabel.textContent = back ? '正面视角' : '背面视角';
    dom.viewBtn.classList.toggle('is-active', back);
    dom.viewBtn.setAttribute('aria-pressed', String(back));
    dom.viewState.textContent = back ? 'BACK' : 'FRONT';
  }

  function updateRotationUI() {
    dom.rotateBtn.classList.toggle('is-active', state.autoRotate);
    dom.rotateBtn.setAttribute('aria-pressed', String(state.autoRotate));
  }

  function updateLabelsUI() {
    dom.labelsBtn.classList.toggle('is-active', state.labels);
    dom.labelsBtn.setAttribute('aria-pressed', String(state.labels));
  }

  function updateSelectionUI() {
    updateRows();
    renderInspector();
  }

  function setPartSelected(id) {
    if (!id || !partMap.has(id)) return;
    state.selected = id;
    updateSelectionUI();
    updateSelectionVisuals();
  }

  function selectPart(id, fromPanel = false) {
    const def = PART_DEFS.find((part) => part.id === id);
    if (!def) return;
    dismissCoach();
    hideHoverTip();

    if (!state.exploded) {
      setExploded(true, { silent: true });
    }

    state.selected = id;
    updateRows();
    renderInspector();
    updateSelectionVisuals();
    setView(def.camera, false);

    if (isSheetLayout()) {
      closePanels();
      window.setTimeout(() => openInspector(), 160);
    }
    updateViewUI();
  }

  function focusPart(id) {
    const entry = partMap.get(id);
    if (!entry) return;
    setView(entry.def.camera, false);
    cam.zoom = 1;
    cam.targetRadius = fitDistance() * 0.9;
    cam.targetPhi = 1.3;
    showToast(`定位 · ${entry.def.name}`);
  }

  function clearSelection(closePanel = false) {
    state.selected = null;
    updateSelectionUI();
    updateSelectionVisuals();
    if (closePanel) closePanels();
  }

  function setExploded(value, options = {}) {
    const next = Boolean(value);
    if (state.exploded === next) {
      updateExplodeUI();
      return;
    }
    state.exploded = next;
    explodeValue = clamp(explodeValue, 0, 1);
    updateExplodeUI();
    updateCameraFit();

    if (next) {
      const wasBack = Math.cos(cam.targetTheta) < 0;
      setView(wasBack ? 'back' : 'front', false);
      cam.targetPhi = clamp(cam.phi, 1.05, 1.55);
    }

    if (!next) {
      clearSelection(false);
      state.autoRotate = false;
      updateRotationUI();
      setView('front', false);
    }

    if (!options.silent) {
      showToast(next ? '结构展开 · 点击部件查看详情' : '结构已合拢 · 返回整机视图');
    }
    dismissCoach();
  }

  function openInspector() {
    if (!isSheetLayout()) return;
    dom.inspectorPanel.classList.add('is-open');
    dom.partsPanel.classList.remove('is-open');
    dom.partsToggle.setAttribute('aria-expanded', 'false');
  }

  function openParts() {
    if (!isSheetLayout()) return;
    dom.partsPanel.classList.add('is-open');
    dom.inspectorPanel.classList.remove('is-open');
    dom.partsToggle.setAttribute('aria-expanded', 'true');
  }

  function closePanels() {
    dom.partsPanel.classList.remove('is-open');
    dom.inspectorPanel.classList.remove('is-open');
    dom.partsToggle.setAttribute('aria-expanded', 'false');
  }

  /* --------------------------------------------------------------------------
   * 13. 鼠标 / 触摸交互
   * ------------------------------------------------------------------------ */

  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();
  const pointers = new Map();
  let dragDistance = 0;
  let dragStart = null;
  let lastPointer = null;
  let pinchStartDistance = 0;
  let pinchStartZoom = 1;
  let hoverTestQueued = false;
  let hoverClientX = 0;
  let hoverClientY = 0;

  function pointerToNdc(clientX, clientY) {
    pointerNdc.x = (clientX / window.innerWidth) * 2 - 1;
    pointerNdc.y = -(clientY / window.innerHeight) * 2 + 1;
  }

  function findPartRoot(object) {
    let current = object;
    while (current && current !== device) {
      if (current.userData && current.userData.isPart) return current;
      current = current.parent;
    }
    return null;
  }

  function pickPart(clientX, clientY) {
    pointerToNdc(clientX, clientY);
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects(device.children, true);
    for (const hit of hits) {
      if (!hit.object.isMesh) continue;
      const root = findPartRoot(hit.object);
      if (root && root.userData.partId) {
        return root.userData.partId;
      }
    }
    return null;
  }

  function showHoverTip(partId, clientX, clientY) {
    if (!partId) {
      hideHoverTip();
      return;
    }
    const def = PART_DEFS.find((part) => part.id === partId);
    if (!def) return;
    dom.hoverTipText.textContent = def.name;
    const tipWidth = 170;
    const x = clamp(clientX + 15, 8, window.innerWidth - tipWidth - 8);
    const y = clamp(clientY + 17, 84, window.innerHeight - 50);
    dom.hoverTip.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    dom.hoverTip.classList.add('is-visible');
  }

  function hideHoverTip() {
    dom.hoverTip.classList.remove('is-visible');
  }

  function queueHoverTest(clientX, clientY) {
    hoverClientX = clientX;
    hoverClientY = clientY;
    if (hoverTestQueued) return;
    hoverTestQueued = true;
    requestAnimationFrame(() => {
      hoverTestQueued = false;
      if (state.dragging) return;
      const partId = pickPart(hoverClientX, hoverClientY);
      if (partId !== state.hovered) {
        state.hovered = partId;
        updateSelectionVisuals();
        dom.canvas.classList.toggle('is-hovering', Boolean(partId));
      }
      if (partId) showHoverTip(partId, hoverClientX, hoverClientY);
      else hideHoverTip();
    });
  }

  function onPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    dom.canvas.setPointerCapture?.(event.pointerId);
    if (pointers.size === 1) {
      state.dragging = true;
      dragDistance = 0;
      dragStart = { x: event.clientX, y: event.clientY };
      lastPointer = { x: event.clientX, y: event.clientY };
      dom.canvas.classList.add('is-grabbing');
    } else if (pointers.size === 2) {
      const values = [...pointers.values()];
      pinchStartDistance = Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y);
      pinchStartZoom = cam.zoom;
      dragDistance = 20;
    }
    hideHoverTip();
  }

  function onPointerMove(event) {
    if (!pointers.has(event.pointerId)) {
      if (event.pointerType === 'mouse') queueHoverTest(event.clientX, event.clientY);
      return;
    }

    const previous = pointers.get(event.pointerId);
    if (previous) {
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }

    if (pointers.size === 2) {
      const values = [...pointers.values()];
      const distance = Math.hypot(values[0].x - values[1].x, values[0].y - values[1].y);
      if (pinchStartDistance > 4) {
        cam.zoom = clamp(pinchStartZoom * (pinchStartDistance / Math.max(distance, 1)), 0.62, 1.82);
        updateCameraFit();
      }
      dragDistance = 20;
      return;
    }

    if (pointers.size !== 1 || !lastPointer) return;
    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;
    lastPointer = { x: event.clientX, y: event.clientY };
    dragDistance += Math.abs(dx) + Math.abs(dy);

    if (dragDistance > 2) {
      state.dragging = true;
      cam.targetTheta -= dx * 0.0052;
      cam.targetPhi = clamp(cam.targetPhi - dy * 0.0048, 0.48, 2.58);
      cam.zoom = clamp(cam.zoom, 0.62, 1.82);
      updateViewUI();
    }
  }

  function onPointerUp(event) {
    const hadPointer = pointers.has(event.pointerId);
    pointers.delete(event.pointerId);

    if (hadPointer && pointers.size === 0) {
      dom.canvas.classList.remove('is-grabbing');
      const wasClick = dragDistance < 7 && dragStart;
      dragStart = null;
      lastPointer = null;
      state.dragging = false;

      if (wasClick) {
        const partId = pickPart(event.clientX, event.clientY);
        if (partId) {
          selectPart(partId, false);
        } else if (isSheetLayout()) {
          closePanels();
          clearSelection(false);
        } else {
          clearSelection(false);
        }
      }
    }

    if (pointers.size < 2) {
      pinchStartDistance = 0;
    }
  }

  function onPointerCancel(event) {
    pointers.delete(event.pointerId);
    if (pointers.size === 0) {
      state.dragging = false;
      dragStart = null;
      lastPointer = null;
      dom.canvas.classList.remove('is-grabbing');
    }
  }

  function onWheel(event) {
    event.preventDefault();
    const factor = Math.exp(event.deltaY * 0.00115);
    cam.zoom = clamp(cam.zoom * factor, 0.62, 1.82);
    updateCameraFit();
  }

  function bindCanvasEvents() {
    dom.canvas.addEventListener('pointerdown', onPointerDown);
    dom.canvas.addEventListener('pointermove', onPointerMove);
    dom.canvas.addEventListener('pointerup', onPointerUp);
    dom.canvas.addEventListener('pointercancel', onPointerCancel);
    dom.canvas.addEventListener('pointerleave', () => {
      if (!state.dragging) {
        state.hovered = null;
        updateSelectionVisuals();
        dom.canvas.classList.remove('is-hovering');
        hideHoverTip();
      }
    });
    dom.canvas.addEventListener('wheel', onWheel, { passive: false });
    dom.canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    dom.canvas.addEventListener('dblclick', (event) => {
      const partId = pickPart(event.clientX, event.clientY);
      if (partId) focusPart(partId);
    });
  }

  /* --------------------------------------------------------------------------
   * 14. 提示 / 弹层
   * ------------------------------------------------------------------------ */

  let toastTimer = null;
  let coachTimer = null;

  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      dom.toast.classList.remove('is-visible');
    }, 2200);
  }

  function showCoachmark() {
    if (state.coachDismissed) return;
    dom.coachmark.classList.add('is-visible');
    coachTimer = window.setTimeout(dismissCoach, 9000);
  }

  function dismissCoach() {
    state.coachDismissed = true;
    dom.coachmark.classList.remove('is-visible');
    if (coachTimer) {
      window.clearTimeout(coachTimer);
      coachTimer = null;
    }
  }

  function openGuide() {
    state.guideOpen = true;
    dom.guideModal.classList.add('is-open');
    dom.guideModal.setAttribute('aria-hidden', 'false');
  }

  function closeGuide() {
    state.guideOpen = false;
    dom.guideModal.classList.remove('is-open');
    dom.guideModal.setAttribute('aria-hidden', 'true');
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      const promise = document.documentElement.requestFullscreen?.();
      if (promise && promise.catch) {
        promise.catch(() => showToast('当前浏览器不支持全屏'));
      }
    } else {
      document.exitFullscreen?.();
    }
  }

  /* --------------------------------------------------------------------------
   * 15. UI 事件
   * ------------------------------------------------------------------------ */

  function bindUIEvents() {
    dom.explodeBtn.addEventListener('click', () => {
      setExploded(!state.exploded);
    });

    dom.viewBtn.addEventListener('click', () => {
      const back = Math.cos(cam.targetTheta) < 0;
      setView(back ? 'front' : 'back', true);
      updateViewUI();
    });

    dom.rotateBtn.addEventListener('click', () => {
      state.autoRotate = !state.autoRotate;
      updateRotationUI();
      showToast(state.autoRotate ? '自动旋转已开启' : '自动旋转已暂停');
    });

    dom.labelsBtn.addEventListener('click', () => {
      state.labels = !state.labels;
      updateLabelsUI();
      showToast(state.labels ? '三维标注已显示' : '三维标注已隐藏');
    });

    dom.resetBtn.addEventListener('click', () => {
      setExploded(false, { silent: true });
      clearSelection(false);
      resetCamera();
      state.labels = true;
      updateLabelsUI();
      closePanels();
      updateExplodeUI();
      showToast('视角与拆解状态已复位');
    });

    dom.partsToggle.addEventListener('click', () => {
      if (dom.partsPanel.classList.contains('is-open')) {
        closePanels();
      } else {
        openParts();
      }
    });

    dom.partsClose.addEventListener('click', closePanels);
    dom.inspectorClose.addEventListener('click', () => {
      dom.inspectorPanel.classList.remove('is-open');
    });

    dom.guideBtn.addEventListener('click', openGuide);
    dom.guideClose.addEventListener('click', closeGuide);
    dom.guideStart.addEventListener('click', closeGuide);
    dom.guideModal.querySelector('[data-close-modal]').addEventListener('click', closeGuide);

    dom.fullscreenBtn.addEventListener('click', toggleFullscreen);

    dom.brandHome.addEventListener('click', (event) => {
      event.preventDefault();
      dom.resetBtn.click();
    });

    dom.coachClose.addEventListener('click', dismissCoach);

    dom.guideModal.addEventListener('click', (event) => {
      if (event.target === dom.guideModal) closeGuide();
    });

    document.addEventListener('keydown', (event) => {
      const tag = event.target && event.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target?.isContentEditable) return;

      if (event.key === 'Escape') {
        if (state.guideOpen) closeGuide();
        else {
          closePanels();
          hideHoverTip();
        }
        return;
      }

      if (state.guideOpen) return;

      if (event.code === 'Space') {
        event.preventDefault();
        setExploded(!state.exploded);
      } else if (event.key.toLowerCase() === 'r') {
        dom.resetBtn.click();
      } else if (event.key.toLowerCase() === 'l') {
        dom.labelsBtn.click();
      }
    });

    document.querySelectorAll('[data-open-guide]').forEach((button) => {
      button.addEventListener('click', openGuide);
    });
  }

  /* --------------------------------------------------------------------------
   * 16. 窗口尺寸
   * ------------------------------------------------------------------------ */

  function onResize() {
    if (!renderer || !camera) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    updateCameraFit();
    if (!isSheetLayout()) closePanels();
    updateViewUI();
  }

  /* --------------------------------------------------------------------------
   * 17. FPS / 渲染循环
   * ------------------------------------------------------------------------ */

  let fpsFrames = 0;
  let fpsTimer = 0;
  let lastFps = 60;
  let lastCoordUpdate = 0;
  let lastClockSecond = -1;
  let lastExtraUpdate = 0;

  function updateHud(dt, elapsed) {
    fpsFrames += 1;
    fpsTimer += dt;
    if (fpsTimer >= 0.55) {
      lastFps = Math.round(fpsFrames / fpsTimer);
      fpsFrames = 0;
      fpsTimer = 0;
      dom.fpsValue.textContent = String(clamp(lastFps, 0, 120));
    }

    const now = performance.now();
    if (now - lastCoordUpdate > 220) {
      lastCoordUpdate = now;
      const fx = camera.position.x;
      const fy = camera.position.y;
      const fz = camera.position.z;
      const f = (value) => {
        const sign = value >= 0 ? '+' : '−';
        return `${sign}${Math.abs(value).toFixed(1).padStart(4, '0')}`;
      };
      dom.coordX.textContent = `X ${f(fx)}`;
      dom.coordY.textContent = `Y ${f(fy)}`;
      dom.coordZ.textContent = `Z ${f(fz)}`;
      updateViewUI();
    }

    const second = Math.floor(elapsed);
    if (second !== lastClockSecond) {
      lastClockSecond = second;
      dom.localClock.textContent = formatClock();
    }

    if (elapsed - lastExtraUpdate > 0.05) {
      lastExtraUpdate = elapsed;
      selectedGlow.material.opacity = state.selected ? 0.2 + Math.sin(elapsed * 3) * 0.035 : 0;
      hoverGlow.material.opacity = state.hovered ? 0.075 + Math.sin(elapsed * 4) * 0.022 : 0;
      if (floorRing) {
        floorRing.rotation.z += dt * 0.015;
        floorRing.material.opacity = 0.13 + Math.sin(elapsed * 1.3) * 0.035;
      }
      if (floorRing2) floorRing2.rotation.z -= dt * 0.008;
      if (orbitRingA) {
        orbitRingA.rotation.z += dt * 0.018;
        orbitRingA.rotation.y += dt * 0.004;
      }
      if (orbitRingB) {
        orbitRingB.rotation.z -= dt * 0.012;
        orbitRingB.rotation.x += dt * 0.002;
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    updateExplode(dt);
    updateCamera(dt);
    updateSelectionVisuals();
    updateAnnotations();
    updateHud(dt, elapsed);
    renderer.render(scene, camera);
  }

  /* --------------------------------------------------------------------------
   * 18. 启动
   * ------------------------------------------------------------------------ */

  let loaderProgress = 0;

  function setLoader(progress, status) {
    loaderProgress = clamp(progress, 0, 100);
    dom.loaderBar.style.width = `${loaderProgress}%`;
    dom.loaderPct.textContent = `${String(Math.round(loaderProgress)).padStart(2, '0')}%`;
    if (status) dom.loaderStatus.textContent = status;
  }

  function boot() {
    try {
      buildPartsList();
      initAnnotations();
      updateExplodeUI();
      updateLabelsUI();
      updateRotationUI();
      setLoader(8, '初始化渲染引擎');
    } catch (error) {
      console.error('[UI]', error);
    }

    window.setTimeout(() => {
      try {
        setLoader(20, '建立光学环境');
        initRenderer();
        glowTexture = buildGlowTexture();
        contactShadowTexture = buildContactShadowTexture();
        textures.screen = buildScreenTexture();
        textures.glare = buildGlareTexture();
        textures.pcb = buildPCBTexture();
        textures.battery = buildBatteryTexture();
        textures.a19 = buildChipTexture('A19', 'APPLE 2025 · 3NM');
        textures.logo = buildLogoTexture();
        textures.regulatory = buildRegulatoryTexture();
        textures.grille = buildGrilleTexture();
        textures.rearInner = buildRearInnerTexture();
        textures.cameraInner = buildCameraInnerTexture();
        createMaterials();

        setLoader(46, '生成机身与结构件');
        initEnvironment();
        initFloor();
        initParticles();
        initOrbits();

        setLoader(63, '装配 A19 主板');
        buildDevice();
        initSelectionEffects();

        setLoader(82, '校准相机与材质');
        cam.radius = fitDistance();
        cam.targetRadius = fitDistance();
        bindCanvasEvents();
        bindUIEvents();
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden && clock) clock.getDelta();
        });

        updateCamera(0.016);
        updateViewUI();
        updateSelectionUI();

        setLoader(100, '系统就绪');
        animate();

        window.setTimeout(() => {
          dom.loader.classList.add('is-done');
          state.ready = true;
          window.setTimeout(showCoachmark, 620);
        }, 520);
      } catch (error) {
        console.error('[3D]', error);
        const message = error && error.message ? error.message : '未知渲染错误';
        dom.loader.classList.add('is-done');
        dom.webglError.hidden = false;
        const p = dom.webglError.querySelector('p');
        if (p) p.textContent = `无法启动 3D 渲染：${message}。请使用支持 WebGL 的现代浏览器，或关闭省电模式后刷新页面。`;
      }
    });
  }

  boot();
})();
