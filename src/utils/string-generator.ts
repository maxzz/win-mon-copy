export function generateTestString({ min = 10, max = 5000 }: { min?: number; max?: number; } = {}) {
    const safeMin = Math.max(0, Math.floor(min));
    const safeMax = Math.max(safeMin, Math.floor(max));
    const len = safeMin + Math.floor(Math.random() * (safeMax - safeMin + 1));

    // Choose one:
    // return generateSimpleLorem(len);
    // return generateConsecutiveChars(len);
    return generateRandomChars(len);
}

function generateSimpleLorem(targetLen: number) {
    const words = [
        "lorem", "ipsum", "dolor", "sit", "amet",
        "consectetur", "adipiscing", "elit", "sed", "do",
        "eiusmod", "tempor", "incididunt", "ut", "labore",
        "et", "dolore", "magna", "aliqua", "enim",
        "ad", "minim", "veniam", "quis", "nostrud",
        "exercitation", "ullamco", "laboris", "nisi", "aliquip",
        "ex", "ea", "commodo", "consequat",
    ] as const;

    let s = "";
    while (s.length < targetLen) {
        const w = words[Math.floor(Math.random() * words.length)];
        s += (s ? " " : "") + w;
    }

    // Keep it roughly at `targetLen` and avoid ending with a partial word if possible.
    if (s.length > targetLen) {
        const cut = s.lastIndexOf(" ", targetLen);
        s = cut > 0 ? s.slice(0, cut) : s.slice(0, targetLen);
    }

    return s;
}

function generateConsecutiveChars(len: number) {
    return "x".repeat(len);
}

function generateRandomChars(len: number) {
    return Array.from(
        { length: len },
        () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    ).join("");
}
