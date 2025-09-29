function jsonChecker(str) {
    if (typeof str !== "string") return str; // already proper type
    try {
        let a = JSON.parse(str);
        if (typeof a === 'string' && a.startsWith('"') && a.endsWith('"')) {
            try {
                return JSON.parse(a);
            } catch (innerError) {
                // If the inner parse fails, just return the value 'a' as is.
                return a;
            }
        }

        return a;
    } catch (e) {
        console.warn("⚠️ Invalid JSON format, returning raw:", str);
        return str;
    }
}

export default jsonChecker