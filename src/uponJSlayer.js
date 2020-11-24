import U from "./u.js";
const { exec } = require("child_process");

exec('echo "hello"', { shell: "powershell.exe" }, (error, stdout, stderr) => {
  // do whatever with stdout
});

export default U;
