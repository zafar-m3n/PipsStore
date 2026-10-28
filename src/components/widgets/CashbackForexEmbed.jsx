import { useEffect, useRef } from "react";

/* CashbackForex calculator embed. The supplied markup (two <script> tags and
   the RemoteCalc(...) call) is kept as given; only its base64 style params
   are re-themed to the dark tokens.

   <script> tags inserted via innerHTML do not execute, so on mount we parse
   the markup, then re-insert the scripts as executable clones: the external
   remote-widgets.js first, then the inline RemoteCalc(...) once it has loaded
   (or immediately if the library is already present from another calculator). */
function CashbackForexEmbed({ html }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = html;
    const scripts = Array.from(host.querySelectorAll("script"));
    const remote = scripts.find((s) => s.src);
    const inline = scripts.find((s) => !s.src);

    const runInline = () => {
      if (!inline || !inline.isConnected) return;
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.text = inline.textContent;
      inline.replaceWith(s);
    };

    if (remote) {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.src = remote.src;
      s.async = false;
      s.onload = runInline;
      s.onerror = runInline;
      remote.replaceWith(s);
      if (window.RemoteCalc) runInline();
    } else {
      runInline();
    }

    return () => {
      host.innerHTML = "";
    };
  }, [html]);

  return <div ref={hostRef} className="cbfx-embed w-full" />;
}

export default CashbackForexEmbed;
