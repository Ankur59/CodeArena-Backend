function createJsSnippet(solution, params, testCases, functionName, rawTest) {
  return `

${solution}
const rawTest= ${JSON.stringify(rawTest)};
const results = [];
const testCases = ${JSON.stringify(testCases)};

for (const [index, tc] of testCases.entries()) {

  const args = [${params.map(param => `tc.${param}`).join(", ")}];
  const result = ${functionName}(...args);
  const isSuccess = JSON.stringify(result) === JSON.stringify(tc.output);
  results.push({
    input:rawTest[index],
    expected: JSON.stringify(tc.output),
    got: JSON.stringify(result) || "Empty",
    status: isSuccess ? "success" : "fail"
  });

}
console.log(JSON.stringify(results));
  
`;
}

// function for final submit
function createJsSnippetSubmit(solution, params, testCases, functionName, rawTest) {
  return `

${solution}
const func=${JSON.stringify(solution)}
const rawTest = ${JSON.stringify(rawTest)};
const failed = [];
const success = [];
const testCases = ${JSON.stringify(testCases)};

for (const [index, tc] of testCases.entries()) {
  const args = [${params.map(param => `tc.${param}`).join(", ")}];
  const result = ${functionName}(...args);

  const isSuccess = JSON.stringify(result) === JSON.stringify(tc.output);

  if (!isSuccess) {
    failed.push({
      success: false,
      input: rawTest[index],
      total: testCases.length,
      passed: index === 0 ? 0 : index - 1,
      expected: JSON.stringify(tc.output),
      got: JSON.stringify(result) || "Empty",
      function:func
    });
    break; // stop at first failure
  }
} // for loop closing brace

 if (failed.length > 0) {
  console.log(JSON.stringify(failed));
 } 
  else if (failed.length === 0) {
  console.log(JSON.stringify([{success:true},func]));
  }
   else {
  console.log(JSON.stringify({ message: "Something went wrong", failed, success }));
}

`;
}

export { createJsSnippetSubmit, createJsSnippet }