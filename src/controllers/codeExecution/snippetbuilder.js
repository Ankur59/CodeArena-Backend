function createJsSnippet(solution, params, testCases, functionName) {
  return `

${solution}

const testCases = ${JSON.stringify(testCases)};
let totalcase=1
for (const [index, tc] of testCases.entries()) {
  const args = [${params.map(param => `tc.${param}`).join(", ")}];
  const result = ${functionName}(...args);
  console.log(result);
   if (JSON.stringify(result) !== JSON.stringify(tc.output)) {
    throw new Error(\`Test case \${index + 1} failed.
Expected: \${JSON.stringify(tc.output)}
Got:      \${JSON.stringify(result)}\`);
  }
  console.log("this is test tc number", index + 1);
}
`;
}



export default createJsSnippet



// //   console.log(typeof(tc.output))
//   console.log(JSON.stringify(result) === JSON.stringify(tc.output))