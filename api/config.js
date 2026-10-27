function validInstagramUrl(value) {
    try {
        const url = new URL(value);
        if (url.protocol !== "https:" || !["instagram.com", "www.instagram.com"].includes(url.hostname)) return "";
        return url.href;
    } catch {
        return "";
    }
}

export default {
    async fetch(request) {
        if (request.method !== "GET") {
            return Response.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "GET" } });
        }

        const configuredPhone = (process.env.WHATSAPP_PHONE || "").trim().replace(/[\s().-]/g, "");
        const whatsappPhone = /^\+[1-9]\d{7,14}$/.test(configuredPhone) ? configuredPhone.slice(1) : "";
        const instagramUrl = validInstagramUrl(process.env.INSTAGRAM_PROFILE_URL || "");

        return Response.json({
            aiConfigured: Boolean(process.env.OPENAI_API_KEY),
            whatsappPhone,
            whatsappMessage: whatsappPhone ? (process.env.WHATSAPP_MESSAGE || "").slice(0, 500) : "",
            instagramUrl
        }, { headers: { "Cache-Control": "no-store" } });
    }
};