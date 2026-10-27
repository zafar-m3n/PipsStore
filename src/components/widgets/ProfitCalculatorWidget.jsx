import { useEffect, useRef } from "react";

/* CashbackForex Profit Calculator embed.
   The provided markup — the two <script> tags and the RemoteCalc(...) call —
   is kept as supplied; only its base64-encoded style params are re-themed to
   the dark tokens (surface-2/3 panes, ink text, field borders, brand button).

   <script> tags inserted via innerHTML do not execute, so on mount we parse
   the markup, then re-insert the scripts as executable clones: the external
   remote-widgets.js first, then the inline RemoteCalc(...) once it has loaded
   (or immediately if the library is already present from another calculator). */
const WIDGET_HTML = `<div id="profit-calculator-999066"><script type="text/javascript" src="https://www.cashbackforex.com/Content/remote/remote-widgets.js"></script><script type="text/javascript"> RemoteCalc({"Url":"https://www.cashbackforex.com", "TopPaneStyle":"YmFja2dyb3VuZDogIzEzMjAxQzsgY29sb3I6ICNFM0VDRTk7IGJvcmRlcjogbm9uZTs=","BottomPaneStyle":"YmFja2dyb3VuZDogIzFCMkIyNjsgY29sb3I6ICNFM0VDRTk7IGJvcmRlcjogbm9uZTs=","ButtonStyle":"YmFja2dyb3VuZDogIzEyRTVBODsgY29sb3I6ICMwMzE0MEU7IGJvcmRlci1yYWRpdXM6IDRweDsgZm9udC13ZWlnaHQ6IDcwMDs=","TitleStyle":"dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiAyOHB4OyBmb250LXdlaWdodDogNzAwOyBmb250LWZhbWlseTogJ0hhbmtlbiBHcm90ZXNrJywgc2Fucy1zZXJpZjsgY29sb3I6ICNFM0VDRTk7","TextboxStyle":"YmFja2dyb3VuZC1jb2xvcjogIzA3MEQwQjsgY29sb3I6ICNFM0VDRTk7IGJvcmRlcjogc29saWQgMXB4ICM3NjkwOEE7IGJvcmRlci1yYWRpdXM6IDRweDs=","ContainerWidth":"665","HighlightColor":"#0A3A2F","IsDisplayTitle":false,"IsShowChartLinks":true,"IsShowEmbedButton":true,"CompactType":"large","Calculator":"profit-calculator","ContainerId":"profit-calculator-999066"});</script></div>`;

export default function ProfitCalculatorWidget() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    host.innerHTML = WIDGET_HTML;
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
  }, []);

  return <div ref={hostRef} className="cbfx-embed w-full" />;
}
