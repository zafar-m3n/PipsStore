import CashbackForexEmbed from "@/components/widgets/CashbackForexEmbed.jsx";

/* CashbackForex Profit Calculator, embed markup as supplied (style params re-themed). */
const WIDGET_HTML = `<div id="profit-calculator-999066"><script type="text/javascript" src="https://www.cashbackforex.com/Content/remote/remote-widgets.js"></script><script type="text/javascript"> RemoteCalc({"Url":"https://www.cashbackforex.com", "TopPaneStyle":"YmFja2dyb3VuZDogIzE4MTgxQjsgY29sb3I6ICNENEQ0RDk7IGJvcmRlcjogbm9uZTs=","BottomPaneStyle":"YmFja2dyb3VuZDogIzIyMjIyNjsgY29sb3I6ICNENEQ0RDk7IGJvcmRlcjogbm9uZTs=","ButtonStyle":"YmFja2dyb3VuZDogIzNGRTA1QTsgY29sb3I6ICMwNzE0MEE7IGJvcmRlci1yYWRpdXM6IDk5OTlweDsgZm9udC13ZWlnaHQ6IDYwMDs=","TitleStyle":"dGV4dC1hbGlnbjogbGVmdDsgZm9udC1zaXplOiAyOHB4OyBmb250LXdlaWdodDogNDAwOyBmb250LWZhbWlseTogJ0luc3RydW1lbnQgU2VyaWYnLCBzZXJpZjsgY29sb3I6ICNENEQ0RDk7","TextboxStyle":"YmFja2dyb3VuZC1jb2xvcjogIzBBMEEwQjsgY29sb3I6ICNENEQ0RDk7IGJvcmRlcjogc29saWQgMXB4ICM2RTZFNzc7IGJvcmRlci1yYWRpdXM6IDEycHg7","ContainerWidth":"665","HighlightColor":"#222226","IsDisplayTitle":false,"IsShowChartLinks":true,"IsShowEmbedButton":true,"CompactType":"large","Calculator":"profit-calculator","ContainerId":"profit-calculator-999066"});</script></div>`;

function ProfitCalculatorWidget() {
  return <CashbackForexEmbed html={WIDGET_HTML} />;
}

export default ProfitCalculatorWidget;
