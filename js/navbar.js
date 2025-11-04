document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('navTrigger');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('overlay');
  const sheet = document.getElementById('bottomSheet');
  const sheetPanel = document.getElementById('sheet');
  const sheetOverlay = document.getElementById('sheetOverlay');
  const closeBtn = document.getElementById('closeBtn');

  let longPressTimer = null;
  const LONG_PRESS = 600;

  const openSide = () => { sideMenu.classList.remove('-translate-x-full'); overlay.classList.remove('hidden'); };
  const closeSide = () => { sideMenu.classList.add('-translate-x-full'); overlay.classList.add('hidden'); };
  const openSheet = () => { sheet.classList.remove('hidden'); setTimeout(() => sheetPanel.classList.remove('translate-y-full'), 10); };
  const closeSheet = () => { sheetPanel.classList.add('translate-y-full'); setTimeout(() => sheet.classList.add('hidden'), 500); };

  trigger?.addEventListener('click', () => {
    if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; return; }
    sideMenu.classList.contains('-translate-x-full') ? openSide() : closeSide();
  });

  const start = () => longPressTimer = setTimeout(openSheet, LONG_PRESS);
  const cancel = () => { if(longPressTimer) clearTimeout(longPressTimer); longPressTimer = null; };

  trigger?.addEventListener('mousedown', start);
  trigger?.addEventListener('mouseup', cancel);
  trigger?.addEventListener('mouseleave', cancel);
  trigger?.addEventListener('touchstart', start, {passive:true});
  trigger?.addEventListener('touchend', cancel);

  overlay?.addEventListener('click', closeSide);
  sheetOverlay?.addEventListener('click', closeSheet);
  closeBtn?.addEventListener('click', closeSheet);

  document.querySelectorAll('#sideMenu a, #sheet a').forEach(a => {
    if (a.href === location.href) a.classList.add('text-primary', 'font-black');
  });
});