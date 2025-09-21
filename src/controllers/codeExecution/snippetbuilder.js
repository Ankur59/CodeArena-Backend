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
const rawTest= ${JSON.stringify(rawTest)};
const failed = [];
const testCases = ${JSON.stringify(testCases)};

for (const [index, tc] of testCases.entries()) {

  const args = [${params.map(param => `tc.${param}`).join(", ")}];
  const result = ${functionName}(...args);
  const isSuccess = JSON.stringify(result) === JSON.stringify(tc.output);
  if(!isSuccess){
    failed.push(
    { 
    sucess:false,
    input:rawTest[index],
    total:testCases.length,
    current:index+1,
    expected: JSON.stringify(tc.output),
    got: JSON.stringify(result) || "Empty",})
  }
 break
}

  if(failed.length!=0){
  console.log(JSON.stringify(failed));
}
  else{
    console.log("Congrats you got 6969 IQ level")
  }
  
`;

}
export { createJsSnippetSubmit, createJsSnippet }