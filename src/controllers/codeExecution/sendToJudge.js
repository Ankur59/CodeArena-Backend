import fetch from "node-fetch";

const sendToJudge0RapidAPI = async (runnerCode) => {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
            "X-RapidAPI-Key": "5e7f71d8d1msh2a5a01fce24c8bep1108c1jsn059f09e76df9",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            source_code: runnerCode,
            language_id: 63,
            redirect_stderr_to_stdout: true,
            cpu_time_limit: 6,
            cpu_extra_time: 1,
            wall_time_limit: 8,
            memory_limit: 51200,
            enable_network: false
        }),
    });

    if (!response.ok) {
        return `Judge0 API error: ${response.status} ${response.statusText}`;
    }

    const data = await response.json();
    console.log("this is full data", data);

    let parsedResults;
    try {
        parsedResults = JSON.parse(data.stdout || "[]");
    } catch {
        return data.stdout || "Something went unexpected while running your code!";
    }
    return {
        output: parsedResults,
        time: parsedResults[0].success === true ? String(data.time) : "N/A",
        memory: parsedResults[0].success === true ? String(data.memory) : "N/A",
        status: data.status?.description || "Unknown"
    };
};



export default sendToJudge0RapidAPI