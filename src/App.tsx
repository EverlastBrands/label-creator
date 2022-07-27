import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, Math.ceil(time * 1000)));
};

function App() {
  const [height, setHeight] = useState(2.25);
  const [width, setWidth] = useState(3.5);
  const [quantity, setQuantity] = useState(8);
  const [togglePrint, setTogglePrint] = useState(false);

  useEffect(() => {
    window.onafterprint = () => setTogglePrint(false);
  }, []);
  useEffect(() => {
    if (togglePrint) {
      window.print();
    }
  }, [togglePrint]);
  return (
    <div>
      <div className="container">
        <section className="section">
          <h3>Settings</h3>
          <fieldset>
            <label style={{ display: "block" }}>Label Height (inches)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
            />
          </fieldset>
          <fieldset>
            <label style={{ display: "block" }}>Label Width (inches)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
            />
          </fieldset>
          <fieldset>
            <label style={{ display: "block" }}>Label Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </fieldset>
          <div>
            <br />
            <button
              onClick={() => {
                setTogglePrint(true);
              }}
            >
              Print
            </button>
          </div>
        </section>
        <section className="section">
          <h3>Preview</h3>
          <div className="page">
            {new Array(quantity || 0)?.fill(null)?.map((v, i) => (
              <LabelComponent
                togglePrint={togglePrint}
                key={i}
                {...{ height, width }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function LabelComponent({ height, width, togglePrint }) {
  console.log(togglePrint);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("#ffffff");
  return (
    <figure
      className="label__container"
      style={{
        height: `${!togglePrint ? height / 1.5 : height}in`,
        width: `${!togglePrint ? width / 1.5 : width}in`,
        backgroundColor: color,
      }}
    >
      <figcaption className="label__content">
        <input
          className="no-print"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          className="no-print"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="no-show" style={{ textAlign: "center" }}>
          {title ? <h2 className="no-show title">{title}</h2> : null}
          {subTitle ? <h2 className="no-show subtitle">{subTitle}</h2> : null}
        </div>
        <input
          className="no-print"
          placeholder="Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        {price ? <h2 className="no-show price">{price}</h2> : null}
        <input
          className="no-print"
          placeholder="$9.99"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </figcaption>
    </figure>
  );
}

export default App;
