import config from "../config/config";

export default function () {
  let code = ""
  for (let i = 0; i < 4; i++) {
    code += config.emoji[Math.floor(Math.random() * 4)]
  }
  return code
}
