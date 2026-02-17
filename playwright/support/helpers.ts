// Gera um código tipo: VLO-B6A2MC
export function generateOrderCode(prefixo = "VLO", tamanho = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const bytes = new Uint8Array(tamanho)

    // Usa criptografia (melhor aleatoriedade) — funciona no navegador e no Node 19+
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
        crypto.getRandomValues(bytes)
    } else {
        // Fallback caso não tenha crypto (menos ideal, mas funciona)
        for (let i = 0; i < tamanho; i++) bytes[i] = Math.floor(Math.random() * 256)
    }

    let sufixo = ""
    for (let i = 0; i < tamanho; i++) {
        sufixo += chars[bytes[i] % chars.length]
    }

    return `${prefixo}-${sufixo}`
}