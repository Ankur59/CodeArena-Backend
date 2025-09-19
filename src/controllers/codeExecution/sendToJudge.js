import fetch from "node-fetch";

const sendToJudge0RapidAPI = async (runnerCode) => {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
            "X-RapidAPI-Key": "c1279f9b3cmsh91be43bc9f418afp1e82e8jsn5ab8c32479bd",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            source_code: runnerCode,
            language_id: 63,
            redirect_stderr_to_stdout: true
        })
    });

    const data = await response.json();
    return data; // contains stdout, status, etc.
};


export default sendToJudge0RapidAPI