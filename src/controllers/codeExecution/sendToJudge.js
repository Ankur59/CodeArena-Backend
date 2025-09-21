import fetch from "node-fetch";

const sendToJudge0RapidAPI = async (runnerCode) => {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
            "X-RapidAPI-Key": "01d1dc9cb8mshab5081cb8935f1ap1a76b0jsn0842dd126319",
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

    // console.log("this is full data", data)
    
    let extradata = [data.time, data.memory,]
    let parsedResults = [];
    try {
        parsedResults = JSON.parse(data.stdout); // ✅ back into array
    } catch (err) {
        console.error("Failed to parse Judge0 stdout:", data.stdout);
        return data.stdout
    }
    console.log(Array.isArray(parsedResults))
    return parsedResults;
};



export default sendToJudge0RapidAPI