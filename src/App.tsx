import { useState } from "react";
import { API } from "aws-amplify";
import "./App.css";

type ParameterOptions = { limit: number; start: number };
type QueryOpitions = keyof ParameterOptions;
function App() {
  const [coins, setCoins] = useState<Record<string, any>[]>([]);
  const [input, setInput] = useState<ParameterOptions>({
    limit: 5,
    start: 0,
  });
  // input change handler
  const onInputChange = (type: QueryOpitions, value: number) => {
    setInput({ ...input, [type]: value });
  };
  // define function to call API
  const fetchCoins = async () => {
    console.log({ input });
    const limit = input.limit;
    const start = input.start;

    try {
      const response = await API.get(
        "cryptoapi",
        `/coins?limit=${limit}&start=${start}`,
        null
      );
      setCoins(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  // const fetchCoinsRef = useRef(fetchCoins);
  // // call fetchCoins function when components loads
  // useEffect(() => {
  //   fetchCoins();
  // }, []);
  return (
    <div className="App">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onInputChange("limit", +e.target.value)
        }
        placeholder="limit"
      />
      <br />
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onInputChange("start", +e.target.value)
        }
        placeholder="start"
      />
      <br />
      {/* button that trigger the coins fetching */}
      <button onClick={fetchCoins}>Fetch Coins</button>
      {coins.length
        ? coins.map((coin, index) => (
            <div key={coin.name}>
              <h2>
                {coin.name} - {coin.symbol}
              </h2>
              <h5>${coin.price_usd}</h5>
            </div>
          ))
        : null}
    </div>
  );
}

export default App;
