function jsonChecker(str) {
    if (typeof str !== "string") return str; // already proper type
    try {
        return JSON.parse(str);
    } catch (e) {
        console.warn("⚠️ Invalid JSON format, returning raw:", str);
        return str;
    }
}

export default jsonChecker