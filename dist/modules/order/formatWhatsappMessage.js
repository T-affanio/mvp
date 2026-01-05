"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWhatsappMessage = formatWhatsappMessage;
function formatWhatsappMessage(order) {
    const items = order.items
        .map((i) => `• ${i.productName} (${i.quantity}x) – R$ ${i.subtotal.toFixed(2)}`)
        .join("\n");
    return `
🍔 *Novo pedido – HoodFood*

👤 Cliente: ${order.customerName}
📞 Telefone: ${order.customerPhone}

📦 Tipo: ${order.deliveryType === "DELIVERY"
        ? "Entrega"
        : "Retirada no local"}

${order.address
        ? `📍 Endereço:
${order.address}
${order.neighborhood ?? ""}

`
        : ""}🧾 *Itens*
${items}

💰 Subtotal: R$ ${order.subtotal.toFixed(2)}
🚚 Entrega: R$ ${order.deliveryFee.toFixed(2)}
💵 *Total: R$ ${order.total.toFixed(2)}*

💳 Pagamento: ${order.paymentMethod}

Confirma este pedido? ✅
`.trim();
}
