/**
 * Script da Página de Manutenção — Dr. Luigi Silva
 * Interatividade leve e atualização de status em tempo real
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualização do Status de Atendimento em Tempo Real
  updateOfficeStatus();

  // 2. Funcionalidade do Botão de Copiar Endereço
  setupCopyAddress();
});

/**
 * Verifica o horário comercial de atendimento e atualiza o indicador visual
 * Segunda a Sexta: 08h às 18h
 * Sábado: 08h às 12h
 * Domingo: Fechado (atendimento assíncrono via WhatsApp)
 */
function updateOfficeStatus() {
  const statusText = document.getElementById('liveStatusText');
  if (!statusText) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour + minute / 60;

  let isOpen = false;

  if (day >= 1 && day <= 5) {
    // Segunda a Sexta: 08:00 às 18:00
    if (currentTime >= 8 && currentTime < 18) {
      isOpen = true;
    }
  } else if (day === 6) {
    // Sábado: 08:00 às 12:00
    if (currentTime >= 8 && currentTime < 12) {
      isOpen = true;
    }
  }

  if (isOpen) {
    statusText.textContent = 'Atendimento Aberto Agora';
    statusText.parentElement.style.color = '#15803d';
  } else {
    statusText.textContent = 'WhatsApp Disponível';
    statusText.parentElement.style.color = '#0284c7';
    const dot = statusText.previousElementSibling;
    if (dot) {
      dot.style.backgroundColor = '#0284c7';
    }
  }
}

/**
 * Permite que o usuário copie o endereço do consultório com um único clique
 */
function setupCopyAddress() {
  const copyBtn = document.getElementById('copyAddressBtn');
  const copyText = document.getElementById('copyText');
  const fullAddress = 'Avenida Adolfo Pinheiro, 1000 — Sala 31, Santo Amaro, São Paulo - SP';

  if (!copyBtn || !copyText) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullAddress);
      } else {
        // Fallback para navegadores sem API clipboard moderna
        const tempInput = document.createElement('textarea');
        tempInput.value = fullAddress;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // Feedback visual
      copyBtn.classList.add('copied');
      copyText.textContent = 'Copiado!';

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyText.textContent = 'Copiar endereço';
      }, 2500);
    } catch (err) {
      console.error('Falha ao copiar endereço:', err);
    }
  });
}
