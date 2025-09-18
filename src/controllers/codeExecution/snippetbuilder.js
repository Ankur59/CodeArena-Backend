function createJsSnippet(solution, params, testCases, functionName) {
    return `

${solution}

const testCases = ${JSON.stringify(testCases)};

for (const tc of testCases) {
  const args = [${params.map(p => {`${p}:tc.${p}`}).join(", ")}];
  const result = ${functionName}(...args);
  console.log(typeof(result));
  console.log(args)
//   console.log(typeof(tc.output))
//   console.log(JSON.stringify(result) === JSON.stringify(tc.output))
}
`;
}



export default createJsSnippet