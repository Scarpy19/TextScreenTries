 function fitText()
 {
     const el = document.querySelector('.fullsize-text');
     if (!el) return;
     let fontSize = 10; // em
     el.style.fontSize = fontSize + 'em';
     const parent = el.parentElement;
     const maxWidth = parent.clientWidth;
     const maxHeight = parent.clientHeight;
     // Reduce font size until fits
     while ((el.scrollWidth > maxWidth || el.scrollHeight > maxHeight) && fontSize > 0.1)
     {
         fontSize -= 0.1;
         el.style.fontSize = fontSize + 'em';
     }
     // Increase font size if there's room
     while (el.scrollWidth < maxWidth && el.scrollHeight < maxHeight)
     {
         fontSize += 0.1;
         el.style.fontSize = fontSize + 'em';
         if (el.scrollWidth > maxWidth || el.scrollHeight > maxHeight)
         {
             fontSize -= 0.1;
             el.style.fontSize = fontSize + 'em';
             break;
         }
     }
 }
 window.addEventListener('input', fitText, true);
 window.addEventListener('resize', fitText);
 window.addEventListener('DOMContentLoaded', fitText);