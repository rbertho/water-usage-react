import "./index.css";
import MonthPicker from "simple-react-month-picker";
import moment from "moment";
import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState(null);

  const presets = [
    {
      title: "This month",
      start: moment().startOf("month").toDate(),
      end: moment().endOf("month").toDate()
    }
  ];

  return (
    <div className="App">
      <MonthPicker
        presets={presets}
        highlightCol="#24b364"
        closeDelay={400}
        onChange={(d) => setSelected(d)}
      />
      {selected !== null ? (
        <p>
          Start: {moment(selected[0]).format("D MMM YYYY")} <br />
          End: {moment(selected[1]).format("D MMM YYYY")}
        </p>
      ) : null}
    </div>
  );
}
