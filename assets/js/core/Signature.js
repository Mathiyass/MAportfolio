export default function initSignature() {
  // Console Banner
  console.log(
    '%c ███╗   ███╗ █████╗      ██████╗ ███████╗██╗   ██╗\n' +
    '%c ████╗ ████║██╔══██╗     ██╔══██╗██╔════╝██║   ██║\n' +
    '%c ██╔████╔██║███████║     ██║  ██║█████╗  ██║   ██║\n' +
    '%c ██║╚██╔╝██║██╔══██║     ██║  ██║██╔══╝  ╚██╗ ██╔╝\n' +
    '%c ██║ ╚═╝ ██║██║  ██║     ██████╔╝███████╗ ╚████╔╝\n' +
    '%c ╚═╝     ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚══════╝  ╚═══╝',
    'color: #00E5FF; font-weight: bold;',
    'color: #00E5FF; font-weight: bold;',
    'color: #00E5FF; font-weight: bold;',
    'color: #00E5FF; font-weight: bold;',
    'color: #00E5FF; font-weight: bold;',
    'color: #00E5FF; font-weight: bold;'
  );
  console.log("%cHey developer 👾 → github.com/Mathiyass", "color: #8888AA; font-family: monospace;");

  // MADEV key sequence
  let sequence = "";
  window.addEventListener('keydown', (e) => {
    sequence += e.key.toUpperCase();
    sequence = sequence.slice(-5);
    if (sequence === "MADEV") {
      document.title = ">>> MATHIYA SOLUTIONS <<<";
      setTimeout(() => document.title = "MATHIYA PORTFOLIO // MATHISHA ANGIRASA", 3000);
      alert("CREDENTIALS VERIFIED");
    }
  });

  // window.sudo API
  window.sudo = (cmd) => {
    switch(cmd) {
      case 'help': console.log('COMMANDS: help, stats, whereami'); break;
      case 'stats': console.log('FETCHING_INTELLIGENCE...'); break;
      case 'whereami': console.log('MATHIYA Portfolio // mathiyass.github.io // Sri Lanka'); break;
      default: console.log('UNKNOWN_COMMAND');
    }
  };
}
