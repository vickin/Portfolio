// Scroll reveal
const obs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function() { entry.target.classList.add('visible'); }, i * 80);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });

// Pyramid data
var LD = {
  4: { color:'#4caf72', badge:'LEVEL 4 · Enterprise / ERP', title:'Enterprise IoT, Smart Factory Strategy & Business ROI',
    what:['Established India CoE for smart factory — dev velocity up 60% at Magna APAC','Led digital transformation for APAC factories with live IoT & AI production visibility','Initiated "Data First" workshop series across 19 European divisions','Scaled IoT solutions to 85% of European plants in under 9 months','Targeting 200+ frontline dashboard deployments across Magna by 2025','Deployed robotics from prototype to scale across 5 Amazon EU sites'],
    tech:['IoT Platform Architecture','Data Observability Frameworks','ISO 27001 Compliance','DevOps · Agile Delivery','Business ROI & KPI Governance','Industry 4.0 Use Case Blueprinting'],
    roles:['Magna APAC — IoT & Smart Factory Manager','Magna Europe — Regional I4.0 Lead','Amazon — Systems Development Engineer II']
  },
  3: { color:'#e07b28', badge:'LEVEL 3 · MES / Operations', title:'MES Development, OEE & Operations Intelligence',
    what:['Developed MES applications using Wonderware/InTouch for production monitoring','Built OEE tracking systems across discrete manufacturing environments','Implemented AR-based predictive maintenance solutions','Standardized factory data models with MQTT and UNS across 14 European plants','Delivered KPI-driven smart monitoring rooms at Magna Europe','Led Lean + Industry 4.0 pilots across Whirlpool European plants'],
    tech:['Wonderware / InTouch MES','MQTT · Unified Namespace (UNS)','OEE Tracking & Analytics','AR-based Predictive Maintenance','Lean Manufacturing','Data Standardization & Integrity'],
    roles:['Autoware Srl — MES Engineer','Whirlpool Corp — Industry 4.0 Lead']
  },
  2: { color:'#d63b3b', badge:'LEVEL 2 · SCADA / HMI', title:'SCADA, HMI & Supervisory Control Systems',
    what:['Designed and deployed real-time dashboards for frontline operators','Built smart monitoring rooms promoting continuous improvement culture','Implemented process visualization for cable manufacturing operations','Planned IT/OT infrastructure integration across production divisions','Enabled shop floor connectivity for higher OEE visibility','Championed collaborative robot integration at supervisory layer'],
    tech:['SCADA Systems','HMI Design & Implementation','Real-time Data Dashboards','IT/OT Network Architecture','Shop Floor Connectivity','Process Visualization'],
    roles:['Whirlpool Corp — I4.0 Lead (Level 2–4)','P&C Automation Italy — Automation Engineer']
  },
  1: { color:'#b82b2b', badge:'LEVEL 1 · PLC / DCS', title:'PLC Control Systems, Logic Design & Commissioning',
    what:['Designed and commissioned PLC-based control systems for cable manufacturing','Focused on logic efficiency and hardware-software integration','Implemented machine-level automation for industrial processes','Developed low-level CNC integration algorithms','Ensured reliable control loops for precision industrial environments','Improved sortation systems with QR-coded label automation at Amazon'],
    tech:['PLC Programming (Ladder, FBD)','DCS Integration','Hardware-Software Integration','Machine-level Automation','CNC Control Interfaces','Control Logic Optimization'],
    roles:['P&C Automation Italy — Automation Engineer','Cannon Automata Italy — Motion Control Engineer']
  },
  0: { color:'#3b9bd4', badge:'LEVEL 0 · Field / Sensors', title:'Motion Control, Robotics & Field Device Engineering',
    what:['Engineered motion control systems for Cartesian robots','Developed robotic dynamics algorithms for precision applications','Mastered low-level CNC integration at the field device layer','Applied kinematic models for accurate robot positioning','Bridged physical process and control layers in manufacturing lines','Foundation of every automation layer built above'],
    tech:['Cartesian Robot Motion Control','CNC Integration Algorithms','Robotic Kinematics & Dynamics','Servo & Actuator Systems','Field Device Communication','Precision Engineering'],
    roles:['Cannon Automata Italy — Motion Control Engineer','Cognizant — Programmer Analyst Trainee']
  }
};

var activeLevel = null;

function toggleLevel(el) {
  var level = parseInt(el.dataset.level);
  var panel = document.getElementById('pyrPanel');
  var inner = document.getElementById('pyrInner');
  document.querySelectorAll('.pyr-layer').forEach(function(l) { l.classList.remove('active'); });
  if (activeLevel === level) { panel.classList.remove('open'); activeLevel = null; return; }
  activeLevel = level;
  el.classList.add('active');
  var d = LD[level];
  inner.style.borderTopColor = d.color;
  document.querySelectorAll('.pyr-col-title').forEach(function(t) { t.style.color = d.color; });
  var bdg = document.getElementById('pdBadge');
  bdg.style.background = d.color; bdg.textContent = d.badge;
  document.getElementById('pdTitle').textContent = d.title;
  document.getElementById('pdWhat').innerHTML = d.what.map(function(t){return '<li>'+t+'</li>';}).join('');
  document.getElementById('pdTech').innerHTML = d.tech.map(function(t){return '<li>'+t+'</li>';}).join('');
  document.getElementById('pdRoles').innerHTML = d.roles.map(function(r){return '<span class="pyr-rchip">'+r+'</span>';}).join('');
  var s = document.getElementById('dynStyle');
  if (!s) { s = document.createElement('style'); s.id = 'dynStyle'; document.head.appendChild(s); }
  s.textContent = '.pyr-items li::before{color:'+d.color+' !important}.pyr-rchip:hover{border-color:'+d.color+' !important;color:white !important}';
  panel.classList.add('open');
  setTimeout(function(){ panel.scrollIntoView({behavior:'smooth',block:'nearest'}); }, 120);
}

function closePanel() {
  document.getElementById('pyrPanel').classList.remove('open');
  document.querySelectorAll('.pyr-layer').forEach(function(l){ l.classList.remove('active'); });
  activeLevel = null;
}