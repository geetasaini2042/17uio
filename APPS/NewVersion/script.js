const _0xabc = window["Telegram"]["WebApp"];
const _0xde1 = _0xabc["initDataUnsafe"]?.["user"] || {};
const _0x9b2 = _0xde1?.["id"];
const _0xf3d = [_0xde1?.["first_name"], _0xde1?.["last_name"]]["filter"](Boolean)["join"](" ");

const _0xqs = new URLSearchParams(window["location"]["search"]);
const _0xid = _0xqs["get"]("file_id");
const _0xfn = _0xqs["get"]("file_name");
const _0xuid = _0xqs["get"]("uniq_id");
const _0xfs = _0xqs["get"]("file_size");

document["getElementById"]("userInfo")["innerHTML"] = `
  <span>User:</span> ${_0xf3d || "Anonymous"}
  <span>File:</span> ${_0xfn || "-"}
  <span>Size:</span> ${_0xfs || "-"}
`;

document["getElementById"]("tgLink")["href"] = `https://t.me/apps_premiumBot?start=APK_${_0xuid}`;

function _0xwtch(_0xb) {
  if (!_0x9b2 || !_0xid || !_0xfn) {
    alert("❌ Missing required data.");
    return;
  }
  _0xb["disabled"] = true;
  document["getElementById"]("loading")["style"]["display"] = "block";

  show_9429528()["then"](() => {
    fetch("https://premium-app123.onrender.com/send_file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON["stringify"]({
        "user_id": _0x9b2,
        "file_id": _0xid,
        "file_name": _0xfn,
        "uniq_id": _0xuid,
        "file_size": _0xfs
      })
    })["then"](() => {
      alert("✅ App sent! Check your Telegram.");
      document["getElementById"]("linkContainer")["style"]["display"] = "block";
      _0xabc["close"]();
    })["catch"]((_0xe) => {
      alert("❌ Send error: " + _0xe);
      _0xb["disabled"] = false;
      document["getElementById"]("loading")["style"]["display"] = "none";
    });
  })["catch"](() => {
    alert("❌ Ad Failed or Skipped");
    _0xb["disabled"] = false;
    document["getElementById"]("loading")["style"]["display"] = "none";
  });
}
