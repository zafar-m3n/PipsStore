import { useEffect, useRef } from "react";

/* CashbackForex Profit Calculator embed.
   The exact provided markup — the two <script> tags and the RemoteCalc(...)
   call with its base64-encoded style params — is preserved verbatim in
   WIDGET_HTML below and never altered.

   <script> tags inserted via innerHTML do not execute, so on mount we parse
   the markup, then re-insert the scripts as executable clones: the external
   remote-widgets.js first, then the inline RemoteCalc(...) once it has loaded
   (or immediately if the library is already present from another calculator). */
const WIDGET_HTML = `<div id="profit-calculator-999066"><script type="text/javascript" src="https://www.cashbackforex.com/Content/remote/remote-widgets.js"></script><script type="text/javascript"> RemoteCalc({"Url":"https://www.cashbackforex.com", "TopPaneStyle":"YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCNmZmZhZjUgMjAlLCAjZjVlZGUxIDQ1JSk7IGNvbG9yOiAjM2QyYjFmOyBib3JkZXI6IHNvbGlkIDFweCAjZTBjZmFlOyBib3JkZXItYm90dG9tOiBub25lOw==","BottomPaneStyle":"YmFja2dyb3VuZDogI2Y1ZWRlMTsgYm9yZGVyOiBzb2xpZCAxcHggI2UwY2ZhZTsgY29sb3I6ICMzZDJiMWY7","ButtonStyle":"YmFja2dyb3VuZDogI2MyNTQyZjsgY29sb3I6IHdoaXRlOyBib3JkZXItcmFkaXVzOiAxMnB4OyBmb250LXdlaWdodDogNjAwOw==","TitleStyle":"dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiAyOHB4OyBmb250LXdlaWdodDogNzAwOyBmb250LWZhbWlseTogJ1NvcmEnLCBzYW5zLXNlcmlmOyBjb2xvcjogIzNkMmIxZjs=","TextboxStyle":"YmFja2dyb3VuZC1jb2xvcjogI2ZmZmFmNTsgY29sb3I6ICMzZDJiMWY7IGJvcmRlcjogc29saWQgMXB4ICNkOWM3YWU7IGJvcmRlci1yYWRpdXM6IDhweDs=","ContainerWidth":"665","HighlightColor":"#ffff00","IsDisplayTitle":false,"IsShowChartLinks":true,"IsShowEmbedButton":true,"CompactType":"large","Calculator":"profit-calculator","ContainerId":"profit-calculator-999066"});</script></div>`;

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
