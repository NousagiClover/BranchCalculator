const fromAddress = document.getElementById("fromAddress");
const toAddress = document.getElementById("toAddress");
const result = document.getElementById("result");
const calc = document.getElementById("calc");
const clear = document.getElementById("clear");
const copy = document.getElementById("copy");
const swap = document.getElementById("swap");

function isHex(str)
{
  return /^[0-9a-fA-F]+$/.test(str);
}

function branchValue(from, to)
{
  let fromAddress = parseInt(from, 16);
  let toAddress = parseInt(to, 16);
  let branch = ((toAddress - fromAddress) >> 2) - 2;
  branch = branch & 0x00FFFFFF;
  return "0x" + branch.toString(16).toUpperCase().padStart(6, "0");
}

calc.addEventListener("click", function()
{
  if (!isHex(fromAddress.value) || !isHex(toAddress.value))
  {
    result.innerHTML = "16進数で入力してください (0xは不要)";
    return;
  }
  result.innerText = branchValue(fromAddress.value, toAddress.value);
});

fromAddress.addEventListener("input", function()
{
  if (isHex(fromAddress.value))
    fromAddress.style.border = "";
  else
    fromAddress.style.border = "1px solid red";
});

toAddress.addEventListener("input", function()
{
  if (isHex(toAddress.value))
    toAddress.style.border = "";
  else
    toAddress.style.border = "1px solid red";
});

clear.addEventListener("click", function()
{
  fromAddress.value = "";
  toAddress.value = "";
  result.innerText = "0x000000";
  fromAddress.style.border = "";
  toAddress.style.border = "";
});

copy.addEventListener("click", function()
{
  navigator.clipboard.writeText(result.innerText);
  alert("コピーしました\n" + result.innerText);
});

swap.addEventListener("click", function()
{
  let tmp = fromAddress.value;
  fromAddress.value = toAddress.value;
  toAddress.value = tmp;
  calc.click();
});
