import assert from "node:assert/strict";
import test from "node:test";
import chat from "./chat.js";
import config from "./config.js";

test("chat endpoint rejects methods other than POST", async () => {
    const response = await chat.fetch(new Request("https://portfolio.test/api/chat"));
    assert.equal(response.status, 405);
});

test("chat endpoint validates JSON and message length", async () => {
    const malformed = await chat.fetch(new Request("https://portfolio.test/api/chat", {
        method: "POST",
        headers: { "x-forwarded-for": "test-invalid-json" },
        body: "not-json"
    }));
    assert.equal(malformed.status, 400);

    const tooLong = await chat.fetch(new Request("https://portfolio.test/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "test-too-long" },
        body: JSON.stringify({ message: "x".repeat(801) })
    }));
    assert.equal(tooLong.status, 400);
});

test("chat endpoint gives a safe setup response without an API key", async () => {
    const originalKey = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    try {
        const response = await chat.fetch(new Request("https://portfolio.test/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json", "x-forwarded-for": "test-no-key" },
            body: JSON.stringify({ message: "Tell me about Raushan." })
        }));
        const result = await response.json();
        assert.equal(response.status, 503);
        assert.equal(result.code, "AI_NOT_CONFIGURED");
        assert.equal("stack" in result, false);
        assert.equal(JSON.stringify(result).includes("OPENAI_API_KEY"), false);
    } finally {
        if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
        else process.env.OPENAI_API_KEY = originalKey;
    }
});

test("chat endpoint rate limits repeated requests", async () => {
    const originalKey = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;
    try {
        const makeRequest = () => chat.fetch(new Request("https://portfolio.test/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json", "x-forwarded-for": "test-rate-limit" },
            body: JSON.stringify({ message: "What are his skills?" })
        }));

        for (let attempt = 0; attempt < 8; attempt += 1) {
            assert.equal((await makeRequest()).status, 503);
        }
        assert.equal((await makeRequest()).status, 429);
    } finally {
        if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
        else process.env.OPENAI_API_KEY = originalKey;
    }
});

test("public config exposes only valid configured contact links", async () => {
    const previous = {
        phone: process.env.WHATSAPP_PHONE,
        message: process.env.WHATSAPP_MESSAGE,
        instagram: process.env.INSTAGRAM_PROFILE_URL,
        key: process.env.OPENAI_API_KEY
    };
    process.env.WHATSAPP_PHONE = "+1 (415) 555-0132";
    process.env.WHATSAPP_MESSAGE = "Hello Raushan";
    process.env.INSTAGRAM_PROFILE_URL = "https://www.instagram.com/example/";
    process.env.OPENAI_API_KEY = "test-key";

    try {
        const response = await config.fetch(new Request("https://portfolio.test/api/config"));
        const result = await response.json();
        assert.deepEqual(result, {
            aiConfigured: true,
            whatsappPhone: "14155550132",
            whatsappMessage: "Hello Raushan",
            instagramUrl: "https://www.instagram.com/example/"
        });
        assert.equal(JSON.stringify(result).includes("test-key"), false);
    } finally {
        for (const [name, value] of [
            ["WHATSAPP_PHONE", previous.phone],
            ["WHATSAPP_MESSAGE", previous.message],
            ["INSTAGRAM_PROFILE_URL", previous.instagram],
            ["OPENAI_API_KEY", previous.key]
        ]) {
            if (value === undefined) delete process.env[name];
            else process.env[name] = value;
        }
    }
});