export function fitOneLine(el: HTMLDivElement | null) {
  if (!el) return;
  const cellWidth = el.parentElement!.clientWidth - 8;   // 4px左右余白
  let font = parseFloat(getComputedStyle(el).fontSize);
  while (el.scrollWidth > cellWidth && font > 12) {
    font -= 0.5;
    el.style.fontSize = `${font}px`;
  }
} 