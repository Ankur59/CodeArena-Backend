function createJsSnippet(solution, params, testCases, functionName) {
  return `

${solution}
const results = [];
const testCases = ${JSON.stringify(testCases)};
for (const [index, tc] of testCases.entries()) {

  const args = [${params.map(param => `tc.${param}`).join(", ")}];
  const result = ${functionName}(...args);
  const isSuccess = JSON.stringify(result) === JSON.stringify(tc.output);
  results.push({
    input: args,
    expected: tc.output,
    got: result,
    status: isSuccess ? "success" : "fail"
  });
  // console.log("this is results",results)

}
  console.log("results",results)
  
`;
}



export default createJsSnippet



// //   console.log(typeof(tc.output))
//   console.log(JSON.stringify(result) === JSON.stringify(tc.output))